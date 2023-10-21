function linkifyText(text: string): string {
  // Regular expression to detect URLs in text
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with hyperlinks
  const linkedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });

  return linkedText;
}

export default linkifyText;
