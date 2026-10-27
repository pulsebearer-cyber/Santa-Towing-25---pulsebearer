import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Sliders,
  Type,
  Sparkles,
  Download,
  Save,
  Undo2,
  Redo2,
  Eye,
  Check,
  X,
  Lock,
  Unlock,
  AlertCircle,
  FileImage,
  Layers,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { StudioImage, ImageFormat, ImageCategory } from '@/lib/imageStudioStorage';
import { formatFileSize } from '@/admin/lib/imageCompressor';

export type AspectRatioType = 'original' | '1:1' | '3:2' | '2:3' | '16:9' | '9:16' | 'custom';

export interface OverlayConfig {
  enabled: boolean;
  type: 'text' | 'logo';
  text: string;
  textColor: string;
  fontSize: number;
  position: 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  opacity: number;
  logoUrl?: string;
  logoSizePercent: number; // 5% to 50%
}

interface EditState {
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
  flipH: boolean;
  flipV: boolean;
  cropRect: { x: number; y: number; width: number; height: number } | null;
  quality: number; // 0.1 to 1.0
  format: ImageFormat;
  overlay: OverlayConfig;
}

interface ImageCanvasEditorProps {
  sourceImage: StudioImage;
  onSaveAsNew: (image: { name: string; dataUrl: string; width: number; height: number; format: ImageFormat; size: number; category: ImageCategory }) => void;
  onOverwrite?: (image: { id: string; name: string; dataUrl: string; width: number; height: number; format: ImageFormat; size: number }) => void;
  onClose: () => void;
}

const PRESET_LOGOS = [
  { label: 'Santa Towing Official Wordmark', url: 'https://i.ibb.co/KgkfFKV/Santa-Logo.png' },
  { label: 'Santa Badge Icon', url: 'https://i.ibb.co/KgkfFKV/Santa-Logo.png' },
];

export default function ImageCanvasEditor({
  sourceImage,
  onSaveAsNew,
  onOverwrite,
  onClose,
}: ImageCanvasEditorProps) {
  const [activeTab, setActiveTab] = useState<'transform' | 'crop' | 'overlay' | 'export'>('transform');

  // Loaded base HTML Image element
  const [loadedImg, setLoadedImg] = useState<HTMLImageElement | null>(null);
  const [loadedLogo, setLoadedLogo] = useState<HTMLImageElement | null>(null);

  // Original image dimensions
  const [origDims, setOrigDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Aspect ratio lock toggle
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatioType>('original');

  // Working edit state
  const [currentState, setCurrentState] = useState<EditState>({
    width: sourceImage.width || 800,
    height: sourceImage.height || 600,
    rotation: 0,
    flipH: false,
    flipV: false,
    cropRect: null,
    quality: 0.9,
    format: sourceImage.format || 'image/jpeg',
    overlay: {
      enabled: false,
      type: 'text',
      text: 'Santa Towing & Garage Services Ltd. • 0244753849',
      textColor: '#ffffff',
      fontSize: 24,
      position: 'bottom-right',
      opacity: 0.85,
      logoUrl: PRESET_LOGOS[0].url,
      logoSizePercent: 20,
    },
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<EditState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Before & After comparison toggle
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);

  // Export name & category
  const [exportName, setExportName] = useState(`${sourceImage.name} (Edited)`);
  const [exportCategory, setExportCategory] = useState<ImageCategory>(sourceImage.category || 'General');

  // Canvas refs
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [estimatedSize, setEstimatedSize] = useState<number>(sourceImage.size || 0);

  // Load image asset
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setLoadedImg(img);
      setOrigDims({ width: img.naturalWidth, height: img.naturalHeight });
      const initial: EditState = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        rotation: 0,
        flipH: false,
        flipV: false,
        cropRect: null,
        quality: 0.9,
        format: sourceImage.format || 'image/jpeg',
        overlay: {
          enabled: false,
          type: 'text',
          text: 'Santa Towing & Garage Services Ltd. • 0244753849',
          textColor: '#ffffff',
          fontSize: 24,
          position: 'bottom-right',
          opacity: 0.85,
          logoUrl: PRESET_LOGOS[0].url,
          logoSizePercent: 20,
        },
      };
      setCurrentState(initial);
      setHistory([initial]);
      setHistoryIndex(0);
    };
    img.src = sourceImage.dataUrl;
  }, [sourceImage]);

  // Load logo when overlay logo changes
  useEffect(() => {
    if (currentState.overlay.logoUrl) {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.onload = () => setLoadedLogo(logoImg);
      logoImg.src = currentState.overlay.logoUrl;
    }
  }, [currentState.overlay.logoUrl]);

  // Helper to push history
  const pushState = (newState: EditState) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newState);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    setCurrentState(newState);
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setCurrentState(history[nextIdx]);
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCurrentState(history[nextIdx]);
    }
  };

  // Reset to original
  const handleReset = () => {
    if (!loadedImg) return;
    const resetState: EditState = {
      width: origDims.width,
      height: origDims.height,
      rotation: 0,
      flipH: false,
      flipV: false,
      cropRect: null,
      quality: 0.9,
      format: sourceImage.format || 'image/jpeg',
      overlay: {
        ...currentState.overlay,
        enabled: false,
      },
    };
    setSelectedAspectRatio('original');
    pushState(resetState);
  };

  // Render to canvas
  const renderCanvas = useCallback(() => {
    if (!loadedImg || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, rotation, flipH, flipV, cropRect, quality, format, overlay } = currentState;

    // Set canvas dimensions
    canvas.width = Math.max(10, width);
    canvas.height = Math.max(10, height);

    // High smoothing quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    // Move to center of canvas for rotation and flipping
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply flip
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Source rect
    const sx = cropRect ? cropRect.x : 0;
    const sy = cropRect ? cropRect.y : 0;
    const sWidth = cropRect ? cropRect.width : loadedImg.naturalWidth;
    const sHeight = cropRect ? cropRect.height : loadedImg.naturalHeight;

    // Draw rotated image centered
    const isSideways = rotation === 90 || rotation === 270;
    const dw = isSideways ? canvas.height : canvas.width;
    const dh = isSideways ? canvas.width : canvas.height;

    ctx.drawImage(loadedImg, sx, sy, sWidth, sHeight, -dw / 2, -dh / 2, dw, dh);

    ctx.restore();

    // Draw Overlay if enabled
    if (overlay.enabled) {
      ctx.save();
      ctx.globalAlpha = Math.max(0.05, Math.min(1, overlay.opacity));

      if (overlay.type === 'text' && overlay.text.trim()) {
        const padding = Math.max(16, Math.round(canvas.width * 0.025));
        const fontSize = Math.max(12, Math.round(overlay.fontSize * (canvas.width / 1000)));
        ctx.font = `bold ${fontSize}px sans-serif`;

        const textMetrics = ctx.measureText(overlay.text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        let tx = padding;
        let ty = padding + textHeight;

        if (overlay.position.includes('center')) {
          tx = (canvas.width - textWidth) / 2;
        } else if (overlay.position.includes('right')) {
          tx = canvas.width - textWidth - padding;
        }

        if (overlay.position === 'center') {
          ty = (canvas.height + textHeight) / 2;
        } else if (overlay.position.startsWith('bottom')) {
          ty = canvas.height - padding;
        }

        // Draw shadow/outline for contrast
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = overlay.textColor;
        ctx.fillText(overlay.text, tx, ty);
      } else if (overlay.type === 'logo' && loadedLogo) {
        const padding = Math.max(16, Math.round(canvas.width * 0.025));
        const targetWidth = Math.round(canvas.width * (overlay.logoSizePercent / 100));
        const aspect = loadedLogo.naturalWidth / loadedLogo.naturalHeight;
        const targetHeight = Math.round(targetWidth / aspect);

        let lx = padding;
        let ly = padding;

        if (overlay.position.includes('center')) {
          lx = (canvas.width - targetWidth) / 2;
        } else if (overlay.position.includes('right')) {
          lx = canvas.width - targetWidth - padding;
        }

        if (overlay.position === 'center') {
          ly = (canvas.height - targetHeight) / 2;
        } else if (overlay.position.startsWith('bottom')) {
          ly = canvas.height - targetHeight - padding;
        }

        ctx.drawImage(loadedLogo, lx, ly, targetWidth, targetHeight);
      }

      ctx.restore();
    }

    try {
      const dataUrl = canvas.toDataURL(format, quality);
      setPreviewDataUrl(dataUrl);

      // Estimate byte size from base64 string
      const head = `data:${format};base64,`;
      const base64Length = dataUrl.length - head.length;
      const byteSize = Math.round((base64Length * 3) / 4);
      setEstimatedSize(byteSize);
    } catch (err) {
      console.warn('Canvas toDataURL failed', err);
    }
  }, [loadedImg, loadedLogo, currentState]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Dimension changes
  const handleWidthChange = (newWidth: number) => {
    const w = Math.max(10, Math.min(6000, newWidth));
    if (lockAspectRatio && origDims.width > 0) {
      const ratio = origDims.height / origDims.width;
      const h = Math.round(w * ratio);
      pushState({ ...currentState, width: w, height: h });
    } else {
      pushState({ ...currentState, width: w });
    }
  };

  const handleHeightChange = (newHeight: number) => {
    const h = Math.max(10, Math.min(6000, newHeight));
    if (lockAspectRatio && origDims.height > 0) {
      const ratio = origDims.width / origDims.height;
      const w = Math.round(h * ratio);
      pushState({ ...currentState, width: w, height: h });
    } else {
      pushState({ ...currentState, height: h });
    }
  };

  // Aspect ratio crop selector
  const handleSelectAspectRatio = (ratio: AspectRatioType) => {
    setSelectedAspectRatio(ratio);
    if (!loadedImg) return;

    if (ratio === 'original') {
      pushState({
        ...currentState,
        cropRect: null,
        width: origDims.width,
        height: origDims.height,
      });
      return;
    }

    let targetRatio = 1;
    switch (ratio) {
      case '1:1':
        targetRatio = 1;
        break;
      case '3:2':
        targetRatio = 3 / 2;
        break;
      case '2:3':
        targetRatio = 2 / 3;
        break;
      case '16:9':
        targetRatio = 16 / 9;
        break;
      case '9:16':
        targetRatio = 9 / 16;
        break;
    }

    const imgW = loadedImg.naturalWidth;
    const imgH = loadedImg.naturalHeight;
    const currentRatio = imgW / imgH;

    let cropW = imgW;
    let cropH = imgH;
    let cropX = 0;
    let cropY = 0;

    if (currentRatio > targetRatio) {
      // Image is wider than target ratio: crop width
      cropW = Math.round(imgH * targetRatio);
      cropX = Math.round((imgW - cropW) / 2);
    } else {
      // Image is taller than target ratio: crop height
      cropH = Math.round(imgW / targetRatio);
      cropY = Math.round((imgH - cropH) / 2);
    }

    pushState({
      ...currentState,
      cropRect: { x: cropX, y: cropY, width: cropW, height: cropH },
      width: cropW,
      height: cropH,
    });
  };

  // Rotation
  const handleRotateCW = () => {
    const newRot = (currentState.rotation + 90) % 360;
    pushState({
      ...currentState,
      rotation: newRot,
      width: currentState.height,
      height: currentState.width,
    });
  };

  const handleRotateCCW = () => {
    const newRot = (currentState.rotation - 90 + 360) % 360;
    pushState({
      ...currentState,
      rotation: newRot,
      width: currentState.height,
      height: currentState.width,
    });
  };

  // Flip
  const handleFlipH = () => {
    pushState({ ...currentState, flipH: !currentState.flipH });
  };

  const handleFlipV = () => {
    pushState({ ...currentState, flipV: !currentState.flipV });
  };

  // Save handler
  const handleSaveAsNewCopy = () => {
    if (!previewDataUrl) return;
    onSaveAsNew({
      name: exportName.trim() || 'Santa_Edited_Image.jpg',
      dataUrl: previewDataUrl,
      width: currentState.width,
      height: currentState.height,
      format: currentState.format,
      size: estimatedSize,
      category: exportCategory,
    });
  };

  const handleOverwriteOriginal = () => {
    if (!previewDataUrl || !onOverwrite) return;
    onOverwrite({
      id: sourceImage.id,
      name: exportName.trim() || sourceImage.name,
      dataUrl: previewDataUrl,
      width: currentState.width,
      height: currentState.height,
      format: currentState.format,
      size: estimatedSize,
    });
  };

  // Download directly to disk
  const handleDownload = () => {
    if (!previewDataUrl) return;
    const ext = currentState.format === 'image/png' ? 'png' : currentState.format === 'image/webp' ? 'webp' : 'jpg';
    const filename = `${exportName.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;
    const a = document.createElement('a');
    a.href = previewDataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 200);
  };

  // Custom logo upload
  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        pushState({
          ...currentState,
          overlay: {
            ...currentState.overlay,
            enabled: true,
            type: 'logo',
            logoUrl: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/90 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="h-16 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#015557] flex items-center justify-center text-white">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Image Editor Studio</span>
              <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {sourceImage.name}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic crop, dimension scaling, aspect locking, and text/logo overlays
            </p>
          </div>
        </div>

        {/* History & Compare Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2 text-slate-300 hover:text-white disabled:text-slate-600 hover:bg-slate-800 rounded-lg transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-slate-300 hover:text-white disabled:text-slate-600 hover:bg-slate-800 rounded-lg transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Reset back to unmodified original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => setShowOriginalComparison(!showOriginalComparison)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              showOriginalComparison ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showOriginalComparison ? 'Viewing Original' : 'Compare Original'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Canvas Preview Area */}
        <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Hidden rendering canvas */}
          <canvas ref={previewCanvasRef} className="hidden" />

          {/* Centered Preview Display */}
          <div className="relative max-w-full max-h-[75vh] flex items-center justify-center border border-slate-800 rounded-xl overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] shadow-2xl p-2">
            {showOriginalComparison ? (
              <img
                src={sourceImage.dataUrl}
                alt="Original Unmodified"
                className="max-h-[70vh] max-w-full object-contain rounded"
              />
            ) : previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Edited Preview"
                className="max-h-[70vh] max-w-full object-contain rounded"
              />
            ) : (
              <div className="p-12 text-slate-500 text-sm">Processing image canvas...</div>
            )}

            {/* Comparison watermark banner */}
            {showOriginalComparison && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider">
                Original Unmodified Reference
              </div>
            )}
          </div>

          {/* Bottom Live Dimension & File Size Status Bar */}
          <div className="mt-4 flex items-center gap-6 px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-full text-xs font-mono text-slate-300 shadow-lg">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">Original:</span>
              <span className="font-bold text-white">
                {origDims.width} &times; {origDims.height} px
              </span>
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">Output:</span>
              <span className="font-bold text-emerald-400">
                {currentState.width} &times; {currentState.height} px
              </span>
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-500">Est. Size:</span>
              <span className="font-bold text-emerald-400">{formatFileSize(estimatedSize)}</span>
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="uppercase text-slate-400">
              {currentState.format.replace('image/', '')} ({Math.round(currentState.quality * 100)}%)
            </span>
          </div>
        </div>

        {/* Right Sidebar Control Tabs */}
        <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
          {/* Tool Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/80">
            <button
              type="button"
              onClick={() => setActiveTab('transform')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'transform'
                  ? 'border-[#015557] text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Resize & Flip</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('crop')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'crop'
                  ? 'border-[#015557] text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crop className="w-3.5 h-3.5" />
              <span>Aspect Crop</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('overlay')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'overlay'
                  ? 'border-[#015557] text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Watermark</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'export'
                  ? 'border-[#015557] text-white bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Export</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-200">
            {/* 1. RESIZE & TRANSFORM TAB */}
            {activeTab === 'transform' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Image Dimensions (Pixels)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter precise pixel width and height. Lock ratio to preserve geometric proportions.
                  </p>
                </div>

                {/* Aspect Lock Indicator */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    {lockAspectRatio ? (
                      <Lock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Unlock className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="font-semibold text-white">
                      {lockAspectRatio ? 'Aspect Ratio Locked' : 'Independent Scaling (Free)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                  >
                    {lockAspectRatio ? 'Unlock' : 'Lock Ratio'}
                  </button>
                </div>

                {/* Width & Height Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Width (px)</label>
                    <input
                      type="number"
                      min="10"
                      max="6000"
                      value={currentState.width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 10)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Height (px)</label>
                    <input
                      type="number"
                      min="10"
                      max="6000"
                      value={currentState.height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 10)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                </div>

                {/* Quick Presets for Common Dimensions */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Quick Standard Dimensions
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        handleWidthChange(1920);
                        handleHeightChange(1080);
                      }}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-left transition-colors font-mono"
                    >
                      1920 &times; 1080 <span className="text-slate-500 block text-[10px]">FHD Hero</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleWidthChange(1200);
                        handleHeightChange(800);
                      }}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-left transition-colors font-mono"
                    >
                      1200 &times; 800 <span className="text-slate-500 block text-[10px]">Standard 3:2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleWidthChange(800);
                        handleHeightChange(800);
                      }}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-left transition-colors font-mono"
                    >
                      800 &times; 800 <span className="text-slate-500 block text-[10px]">Square 1:1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleWidthChange(600);
                        handleHeightChange(400);
                      }}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-left transition-colors font-mono"
                    >
                      600 &times; 400 <span className="text-slate-500 block text-[10px]">Card Preview</span>
                    </button>
                  </div>
                </div>

                {/* Rotation & Flip Controls */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Rotation &amp; Orientation
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleRotateCCW}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-emerald-400" />
                      <span>Rotate -90&deg;</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRotateCW}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                    >
                      <RotateCw className="w-4 h-4 text-emerald-400" />
                      <span>Rotate +90&deg;</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFlipH}
                      className={`p-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                        currentState.flipH
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <FlipHorizontal className="w-4 h-4" />
                      <span>Flip Horizontal</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFlipV}
                      className={`p-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                        currentState.flipV
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <FlipVertical className="w-4 h-4" />
                      <span>Flip Vertical</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ASPECT RATIO & CROP TAB */}
            {activeTab === 'crop' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Aspect Ratio Options
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select a standard target aspect ratio to automatically compute and preview crop boundaries.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'original', label: 'Original Dimensions', desc: 'Preserves unmodified original bounds' },
                    { key: '1:1', label: '1:1 — Square', desc: 'Vehicle profiles, spare parts, and avatars' },
                    { key: '3:2', label: '3:2 — Landscape', desc: 'Standard photography and fleet cards' },
                    { key: '2:3', label: '2:3 — Portrait', desc: 'Vertical posters and mobile banners' },
                    { key: '16:9', label: '16:9 — Widescreen Landscape', desc: 'Hero banners, video stills, slides' },
                    { key: '9:16', label: '9:16 — Vertical Portrait', desc: 'Mobile stories, tall display boards' },
                  ].map((preset) => {
                    const isSelected = selectedAspectRatio === preset.key;
                    return (
                      <button
                        key={preset.key}
                        type="button"
                        onClick={() => handleSelectAspectRatio(preset.key as AspectRatioType)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                          isSelected
                            ? 'bg-[#015557] border-emerald-400 text-white shadow-md'
                            : 'bg-slate-800/70 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-sm block">{preset.label}</span>
                          <span
                            className={`text-xs block mt-0.5 ${
                              isSelected ? 'text-emerald-100' : 'text-slate-400'
                            }`}
                          >
                            {preset.desc}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {currentState.cropRect && (
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono space-y-1">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold block">
                      Active Crop Boundaries:
                    </span>
                    <div className="text-emerald-400">
                      Crop Area: {currentState.cropRect.width} &times; {currentState.cropRect.height} px
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Offset: X:{currentState.cropRect.x}px, Y:{currentState.cropRect.y}px
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TEXT & LOGO OVERLAY TAB */}
            {activeTab === 'overlay' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Text &amp; Logo Overlay
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add branded text, emergency phone numbers, or corporate logo watermarks.
                  </p>
                </div>

                {/* Enable toggle */}
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Enable Watermark Overlay</span>
                  <input
                    type="checkbox"
                    checked={currentState.overlay.enabled}
                    onChange={(e) =>
                      pushState({
                        ...currentState,
                        overlay: { ...currentState.overlay, enabled: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#015557] rounded cursor-pointer"
                  />
                </div>

                {currentState.overlay.enabled && (
                  <div className="space-y-4 pt-2">
                    {/* Overlay Type Switch */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          pushState({
                            ...currentState,
                            overlay: { ...currentState.overlay, type: 'text' },
                          })
                        }
                        className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          currentState.overlay.type === 'text'
                            ? 'bg-[#015557] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Text Overlay
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          pushState({
                            ...currentState,
                            overlay: { ...currentState.overlay, type: 'logo' },
                          })
                        }
                        className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          currentState.overlay.type === 'logo'
                            ? 'bg-[#015557] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Company Logo
                      </button>
                    </div>

                    {/* Text Overlay Controls */}
                    {currentState.overlay.type === 'text' && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300">Watermark Text</label>
                          <textarea
                            rows={2}
                            value={currentState.overlay.text}
                            onChange={(e) =>
                              pushState({
                                ...currentState,
                                overlay: { ...currentState.overlay, text: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300">Font Size ({currentState.overlay.fontSize}px)</label>
                            <input
                              type="range"
                              min="12"
                              max="72"
                              value={currentState.overlay.fontSize}
                              onChange={(e) =>
                                pushState({
                                  ...currentState,
                                  overlay: { ...currentState.overlay, fontSize: parseInt(e.target.value) },
                                })
                              }
                              className="w-full accent-[#015557]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300">Text Color</label>
                            <input
                              type="color"
                              value={currentState.overlay.textColor}
                              onChange={(e) =>
                                pushState({
                                  ...currentState,
                                  overlay: { ...currentState.overlay, textColor: e.target.value },
                                })
                              }
                              className="w-full h-8 bg-transparent cursor-pointer rounded"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Logo Overlay Controls */}
                    {currentState.overlay.type === 'logo' && (
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Select Preset Logo</label>
                          <select
                            value={currentState.overlay.logoUrl}
                            onChange={(e) =>
                              pushState({
                                ...currentState,
                                overlay: { ...currentState.overlay, logoUrl: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                          >
                            {PRESET_LOGOS.map((pl) => (
                              <option key={pl.url} value={pl.url}>
                                {pl.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Or Upload Custom Logo PNG</label>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleCustomLogoUpload}
                            className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300">
                            Logo Scale ({currentState.overlay.logoSizePercent}%)
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="50"
                            value={currentState.overlay.logoSizePercent}
                            onChange={(e) =>
                              pushState({
                                ...currentState,
                                overlay: {
                                  ...currentState.overlay,
                                  logoSizePercent: parseInt(e.target.value),
                                },
                              })
                            }
                            className="w-full accent-[#015557]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Common Positioning & Opacity */}
                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Position &amp; Alignment</label>
                        <select
                          value={currentState.overlay.position}
                          onChange={(e) =>
                            pushState({
                              ...currentState,
                              overlay: {
                                ...currentState.overlay,
                                position: e.target.value as OverlayConfig['position'],
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                        >
                          <option value="bottom-right">Bottom Right (Recommended)</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="bottom-center">Bottom Center</option>
                          <option value="top-right">Top Right</option>
                          <option value="top-left">Top Left</option>
                          <option value="top-center">Top Center</option>
                          <option value="center">Direct Center</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Watermark Opacity ({Math.round(currentState.overlay.opacity * 100)}%)
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={currentState.overlay.opacity}
                          onChange={(e) =>
                            pushState({
                              ...currentState,
                              overlay: {
                                ...currentState.overlay,
                                opacity: parseFloat(e.target.value),
                              },
                            })
                          }
                          className="w-full accent-[#015557]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. SAVE & EXPORT TAB */}
            {activeTab === 'export' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Export &amp; Quality Settings
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adjust compression quality, select format, and save directly to your library or download.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Save Image Name</label>
                    <input
                      type="text"
                      value={exportName}
                      onChange={(e) => setExportName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Category Tag</label>
                    <select
                      value={exportCategory}
                      onChange={(e) => setExportCategory(e.target.value as ImageCategory)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#015557]"
                    >
                      <option value="Fleet">Fleet Vehicles</option>
                      <option value="Towing">Towing &amp; Recovery</option>
                      <option value="Haulage">Heavy Haulage</option>
                      <option value="Garage">Garage &amp; Repairs</option>
                      <option value="Documents">Documents &amp; Branding</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Output Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['image/jpeg', 'image/png', 'image/webp'] as ImageFormat[]).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => pushState({ ...currentState, format: fmt })}
                          className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                            currentState.format === fmt
                              ? 'bg-[#015557] border-emerald-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {fmt === 'image/jpeg' ? 'JPEG' : fmt === 'image/png' ? 'PNG' : 'WebP'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentState.format !== 'image/png' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <label className="font-semibold text-slate-300">Compression Quality</label>
                        <span className="font-mono text-emerald-400 font-bold">
                          {Math.round(currentState.quality * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={currentState.quality}
                        onChange={(e) =>
                          pushState({ ...currentState, quality: parseFloat(e.target.value) })
                        }
                        className="w-full accent-[#015557]"
                      />
                    </div>
                  )}

                  {/* Summary Card */}
                  <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Final Dimensions:</span>
                      <span className="text-white font-bold">
                        {currentState.width} &times; {currentState.height} px
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated File Size:</span>
                      <span className="text-emerald-400 font-bold">{formatFileSize(estimatedSize)}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2.5 pt-3">
                  <button
                    type="button"
                    onClick={handleSaveAsNewCopy}
                    className="w-full py-3 bg-[#015557] hover:bg-[#014345] text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save as New Copy (Preserve Original)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Image File</span>
                  </button>

                  {onOverwrite && (
                    <button
                      type="button"
                      onClick={handleOverwriteOriginal}
                      className="w-full py-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors text-center"
                    >
                      Overwrite original file directly
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
