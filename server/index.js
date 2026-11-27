import { createServer } from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const db = { users: [], clients: [], events: [], audit: [] };

function json(res, code, body) {
  res.writeHead(code, {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(body));
}

function read(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve({}); }
    });
  });
}

function hash(password, salt = randomBytes(16).toString('hex')) {
  const key = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${key}`;
}

function check(password, stored) {
  const [salt, key] = stored.split(':');
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(key, 'hex');
  return next.length === prev.length && timingSafeEqual(next, prev);
}

function tokenFor(email) {
  return Buffer.from(`${email}:${Date.now()}`).toString('base64url');
}

function userFrom(req) {
  const h = req.headers.authorization || '';
  const token = h.replace(/^Bearer /, '');
  if (!token) return null;
  try {
    const email = Buffer.from(token, 'base64url').toString('utf8').split(':')[0];
    return db.users.find((u) => u.email === email) || null;
  } catch { return null; }
}

function audit(action, detail) {
  db.audit.unshift({ at: new Date().toISOString(), action, detail: String(detail).slice(0, 240) });
  db.audit = db.audit.slice(0, 200);
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 204, {});
  const url = new URL(req.url || '/', 'http://localhost');
  const path = url.pathname;

  if (path === '/health') return json(res, 200, { ok: true, name: 'nexas-server', payment: false, draftOnly: true });

  if (path === '/auth/register' && req.method === 'POST') {
    const body = await read(req);
    if (!body.email || !body.password || String(body.password).length < 8) return json(res, 400, { error: 'Email and a password of 8 or more.' });
    if (db.users.some((u) => u.email === body.email)) return json(res, 409, { error: 'That email is already on the desk.' });
    db.users.push({ email: body.email, name: body.name || body.email, password: hash(body.password) });
    audit('register', body.email);
    return json(res, 201, { token: tokenFor(body.email), name: body.name || body.email });
  }

  if (path === '/auth/login' && req.method === 'POST') {
    const body = await read(req);
    const user = db.users.find((u) => u.email === body.email);
    if (!user || !check(String(body.password || ''), user.password)) return json(res, 401, { error: 'Email or password is wrong.' });
    audit('login', user.email);
    return json(res, 200, { token: tokenFor(user.email), name: user.name });
  }

  const me = userFrom(req);
  if (!me && path !== '/health') return json(res, 401, { error: 'Sign in first.' });

  if (path === '/clients' && req.method === 'GET') return json(res, 200, db.clients.filter((c) => c.owner === me.email));
  if (path === '/clients' && req.method === 'POST') {
    const body = await read(req);
    const row = { id: randomBytes(6).toString('hex'), owner: me.email, name: body.name || 'Unnamed', email: body.email || '', note: body.note || '' };
    db.clients.unshift(row);
    audit('client', row.name);
    return json(res, 201, row);
  }

  if (path === '/calendar' && req.method === 'GET') return json(res, 200, db.events.filter((e) => e.owner === me.email));
  if (path === '/calendar' && req.method === 'POST') {
    const body = await read(req);
    const row = { id: randomBytes(6).toString('hex'), owner: me.email, title: body.title || 'Untitled', when: body.when || '', note: 'Draft. Not booked.' };
    db.events.unshift(row);
    audit('calendar', row.title);
    return json(res, 201, row);
  }

  if (path === '/audit' && req.method === 'GET') return json(res, 200, db.audit.filter((a) => a.detail.includes(me.email) || true).slice(0, 50));

  if (path === '/send' || path === '/pay' || path === '/checkout') return json(res, 403, { error: 'Draft only. Nothing is sent or paid.' });

  return json(res, 404, { error: 'Not on this server.' });
});

server.listen(PORT, () => console.log(`nexas-server on ${PORT}`));
