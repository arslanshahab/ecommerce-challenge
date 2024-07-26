export function validateImageSource(src: string): boolean {
  // Check if the source is a valid URL or data URL
  const urlPattern = /^(https?:\/\/|data:image\/)/i;
  if (!urlPattern.test(src)) {
    return false;
  }

  // For URLs, check if it ends with a common image extension
  if (src.startsWith("http")) {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    return validExtensions.some((ext) => src.toLowerCase().endsWith(ext));
  }

  // For data URLs, check if it's a valid image MIME type
  if (src.startsWith("data:")) {
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    return validMimeTypes.some((type) => src.startsWith(`data:${type}`));
  }

  return true;
}
