export function loadList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T[] : [];
  } catch {
    return [];
  }
}

export function saveList<T>(key: string, rows: T[]) {
  localStorage.setItem(key, JSON.stringify(rows));
}
