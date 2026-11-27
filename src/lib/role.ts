const KEY = 'nexas_role';

export type Role = 'operator' | 'viewer';

export function getRole(): Role {
  try {
    return localStorage.getItem(KEY) === 'viewer' ? 'viewer' : 'operator';
  } catch {
    return 'operator';
  }
}

export function setRole(role: Role) {
  localStorage.setItem(KEY, role);
}

export function isViewer() {
  return getRole() === 'viewer';
}
