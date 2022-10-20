/**
 * Returns a random integer from min (inclusive) to max (inclusive)
 * @param min Minimum number in range
 * @param max Maximum number in range
 */
export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertToCamelCase(label: string) {
  return label.replace(/\s+(.)/g, (match, group) => {
    return group.toUpperCase();
  })
}
