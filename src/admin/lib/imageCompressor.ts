/**
 * Santa Towing - Client-side Image Compression & Resizing Utility
 * 
 * Uses HTML5 Canvas to resize large images and compress to lightweight JPEG/WebP
 * data URLs so they can be saved safely into contentStorage without exceeding browser quotas.
 */

export interface CompressionResult {
  dataUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  dimensions: { width: number; height: number };
  mimeType: string;
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  mimeType?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1440,
    maxHeight = 1080,
    quality = 0.82,
    mimeType = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read file'));

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => reject(new Error('Failed to load image into canvas'));

      img.onload = () => {
        let targetWidth = img.naturalWidth;
        let targetHeight = img.naturalHeight;

        // Calculate aspect-ratio-preserving dimensions
        if (targetWidth > maxWidth || targetHeight > maxHeight) {
          const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
          targetWidth = Math.round(targetWidth * ratio);
          targetHeight = Math.round(targetHeight * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not create 2D canvas context'));
          return;
        }

        // Draw with smoothing for crisp resize
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill white background for transparent images converted to JPEG
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Export data URL
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Approximate byte size of base64
        const stringLength = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSizeBytes = Math.round((stringLength * 3) / 4);

        resolve({
          dataUrl,
          originalSizeBytes: file.size,
          compressedSizeBytes,
          dimensions: { width: targetWidth, height: targetHeight },
          mimeType,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
