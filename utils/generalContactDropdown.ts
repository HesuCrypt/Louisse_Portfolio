export function getNextInquiryIndex(currentIndex: number, options: readonly string[]) {
  return (currentIndex + 1) % options.length;
}

export function getPreviousInquiryIndex(currentIndex: number, options: readonly string[]) {
  return (currentIndex - 1 + options.length) % options.length;
}

export function isValidInquiryOption(value: string, options: readonly string[]) {
  return value.trim().length > 0 && options.includes(value);
}
