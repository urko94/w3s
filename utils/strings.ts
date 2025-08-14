export function removeLastSlash(val: string): string {
  return val.replace(/\/$/, '');
}

export function truncate(source: string): string {
  return source.length > 9
    ? source.slice(0, 3) + '…' + source.slice(source.length - 3, source.length)
    : source;
}
