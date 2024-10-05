export function formatList(itemNames: string[]) {
  if (itemNames.length === 0) return '';
  if (itemNames.length === 1) return itemNames[0];

  const formatted = `${itemNames.slice(0, -1).join(', ')}, ${
    itemNames[itemNames.length - 1]
  }`;

  return formatted;
}
