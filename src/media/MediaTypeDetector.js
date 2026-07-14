const VIDEO_EXTENSIONS = ['.mp4', '.webm'];

/**
 * Parses media type from data: URI format.
 */
function getMediaTypeFromDataUri(uri) {
  const mimeMatch = uri.match(/^data:([^;]+);/);
  if (!mimeMatch) return null;

  const mime = mimeMatch[1].toLowerCase();
  if (mime.startsWith('video/')) return 'video';
  if (mime === 'image/gif') return 'gif';
  if (mime.startsWith('image/')) return 'image';
  return null;
}

/**
 * Determines media type based on file extension.
 */
function getMediaTypeFromExtension(uri) {
  const cleanUri = uri.split('?')[0].split('#')[0];
  const lower = cleanUri.toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
  if (isVideo) return 'video';
  if (lower.endsWith('.gif')) return 'gif';
  return 'image';
}

/**
 * Returns the media category type based on extension or data URI prefix.
 */
export function getMediaType(uri) {
  if (!uri) return 'none';
  if (uri.startsWith('data:')) {
    return getMediaTypeFromDataUri(uri) || 'image';
  }
  return getMediaTypeFromExtension(uri);
}
