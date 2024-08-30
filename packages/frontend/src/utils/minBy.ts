export function minBy<T>(list: T[], selector: (el: T) => number) {
  return list.reduce((acc, val) => Math.min(acc, selector(val)), Infinity);
}
