export function maxBy<T>(list: T[], selector: (el: T) => number) {
  return list.reduce((acc, val) => Math.max(acc, selector(val)), -Infinity);
}