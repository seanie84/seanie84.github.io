const db = { users: [], clients: [], events: [], audit: [] };

function hash(password, salt = Math.random().toString(36).slice(2)) {
  return salt + ':' + Buffer.from(salt + password).toString('base64');
}
function check(password, stored) {
  const [salt] = stored.split(':');
  return hash(password, salt) === stored;
}
function tokenFor(email) {
  return Buffer.from(email + ':' + Date.now()).toString('base64url');
}
function userFrom(event) {
  const h = (event.headers.authorization || event.headers.Authorization || '').replace(/^Bearer /, '');
  if (!h) return null;
  try {
    const email = Buffer.from(h, 'base64url').toString('utf8').split(':')[0];
    return db.users.find((u) => u.email === email) || null;
  } catch { return null; }
}
function reply(code, body) {
  return { statusCode: code, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type, authorization', 'access-control-allow-methods': 'GET,POST,OPTIONS' }, body: JSON.stringify(body) };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return reply(204, {});
  const path = (event.path || '').replace(/^\/.netlify\/functions\/api/, '') || '/';
  const body = event.body ? JSON.parse(event.body) : {};
  if (path === '/health' || path === '/' || path === '') return reply(200, { ok: true, name: 'nexas-server', payment: false, draftOnly: true });
  if (path === '/auth/register' && event.httpMethod === 'POST') {
    if (!body.email || !body.password || String(body.password).length < 8) return reply(400, { error: 'Email and a password of 8 or more.' });
    if (db.users.some((u) => u.email === body.email)) return reply(409, { error: 'That email is already on the desk.' });
    db.users.push({ email: body.email, name: body.name || body.email, password: hash(body.password) });
    return reply(201, { token: tokenFor(body.email), name: body.name || body.email });
  }
  if (path === '/auth/login' && event.httpMethod === 'POST') {
    const user = db.users.find((u) => u.email === body.email);
    if (!user || !check(String(body.password || ''), user.password)) return reply(401, { error: 'Email or password is wrong.' });
    return reply(200, { token: tokenFor(user.email), name: user.name });
  }
  const me = userFrom(event);
  if (!me) return reply(401, { error: 'Sign in first.' });
  if (path === '/clients' && event.httpMethod === 'GET') return reply(200, db.clients.filter((c) => c.owner === me.email));
  if (path === '/clients' && event.httpMethod === 'POST') {
    const row = { id: Date.now().toString(36), owner: me.email, name: body.name || 'Unnamed', email: body.email || '', note: body.note || '' };
    db.clients.unshift(row);
    return reply(201, row);
  }
  if (path === '/calendar' && event.httpMethod === 'GET') return reply(200, db.events.filter((e) => e.owner === me.email));
  if (path === '/calendar' && event.httpMethod === 'POST') {
    const row = { id: Date.now().toString(36), owner: me.email, title: body.title || 'Untitled', when: body.when || '', note: 'Draft. Not booked.' };
    db.events.unshift(row);
    return reply(201, row);
  }
  if (path === '/send' || path === '/pay') return reply(403, { error: 'Draft only. Nothing is sent or paid.' });
  return reply(404, { error: 'Not on this server.' });
};
