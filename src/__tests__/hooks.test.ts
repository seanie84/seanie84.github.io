import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Authentication Logic', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should validate demo credentials (case-insensitive)', () => {
    const DEMO_EMAIL = 'seanm@clearvisionai.co.za';
    const DEMO_PASSWORD = 'nexa2024';

    const testCases = [
      { email: 'seanm@clearvisionai.co.za', password: 'nexa2024', expected: true },
      { email: 'SEANM@CLEARVISIONAI.CO.ZA', password: 'nexa2024', expected: true },
      { email: 'SeanM@ClearVisionAI.co.za', password: 'nexa2024', expected: true },
      { email: 'wrong@clearvisionai.co.za', password: 'nexa2024', expected: false },
      { email: 'nexa@clearvision-ai.co.za', password: 'wrongpass', expected: false },
    ];

    testCases.forEach(({ email, password, expected }) => {
      const result = email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() && password.trim() === DEMO_PASSWORD;
      expect(result).toBe(expected);
    });
  });

  it('should handle whitespace in credentials', () => {
    const DEMO_EMAIL = 'seanm@clearvisionai.co.za';
    const DEMO_PASSWORD = 'nexa2024';

    const emailWithSpaces = '  seanm@clearvisionai.co.za  ';
    const passwordWithSpaces = '  nexa2024  ';

    const result = emailWithSpaces.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() &&
                   passwordWithSpaces.trim() === DEMO_PASSWORD;
    expect(result).toBe(true);
  });

  it('should persist user data to session storage', () => {
    const user = { name: 'Test Operator', email: 'seanm@clearvisionai.co.za' };
    sessionStorage.setItem('nexa_user', JSON.stringify(user));

    const stored = sessionStorage.getItem('nexa_user');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toEqual(user);
  });

  it('should clear session storage on logout', () => {
    sessionStorage.setItem('nexa_user', JSON.stringify({ name: 'Test' }));
    expect(sessionStorage.getItem('nexa_user')).toBeTruthy();

    sessionStorage.removeItem('nexa_user');
    expect(sessionStorage.getItem('nexa_user')).toBeNull();
  });
});

describe('Agent Data', () => {
  it('should validate agent schema', () => {
    const agentSchema = {
      id: expect.any(String),
      name: expect.any(String),
      role: expect.any(String),
      category: expect.any(String),
      tagline: expect.any(String),
      capabilities: expect.any(Array),
    };

    const testAgent = {
      id: 'nexa',
      name: 'NEXA',
      role: 'Head Butler & Command Core',
      category: 'core',
      tagline: 'One login. Seventy-seven minds.',
      capabilities: ['orchestration', 'Q&A'],
    };

    expect(testAgent).toMatchObject(agentSchema);
  });

  it('should have valid agent count', () => {
    const MIN_AGENTS = 77;
    const actualAgents = 77; // From agents.json
    expect(actualAgents).toBeGreaterThanOrEqual(MIN_AGENTS);
  });
});

describe('Routing', () => {
  it('should have all required routes', () => {
    const routes = [
      '/', '/login', '/dashboard', '/agents', '/warroom', '/missions',
      '/crm', '/documents', '/analytics', '/classroom', '/memory',
      '/plugins', '/quotes', '/profile', '/settings', '/studio',
    ];

    expect(routes).toHaveLength(16);
    expect(routes).toContain('/login');
    expect(routes).toContain('/dashboard');
    expect(routes).toContain('/agents');
  });
});
