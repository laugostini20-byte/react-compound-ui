/** Human-readable file size, e.g. 1536 → "1.5 KB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unit]}`;
}

export interface FileRules {
  /** Same syntax as the `accept` attribute, e.g. "image/*,.pdf". */
  accept?: string;
  /** Largest allowed size in bytes. */
  maxSize?: number;
}

/** Returns a reason the file is rejected, or `null` if it passes. */
export function checkFile(file: File, { accept, maxSize }: FileRules): string | null {
  if (maxSize !== undefined && file.size > maxSize) return `Larger than ${formatBytes(maxSize)}`;
  if (accept) {
    const patterns = accept.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    const ok = patterns.some((p) =>
      p.startsWith('.') ? name.endsWith(p) : p.endsWith('/*') ? type.startsWith(p.slice(0, -1)) : type === p,
    );
    if (!ok) return 'File type not allowed';
  }
  return null;
}
