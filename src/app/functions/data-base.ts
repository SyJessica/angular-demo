export function getItem(key: string) {
  const result = localStorage.getItem(key);
  if (!result) {
    return null;
  }
  return JSON.parse(result);
}

export function setItem(key: string, value: any) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}
