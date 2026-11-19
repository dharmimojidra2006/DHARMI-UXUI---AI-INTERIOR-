import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export interface LightboxPlateItem {
  id: string;
  plate: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

interface Props {
  items: LightboxPlateItem[];
  activeId: string | null;
  onSelectId: (id: string) => void;
  onClose: () => void;
}

const MIN_ZOOM = 50;
const MAX_ZOOM = 400;
const ZOOM_STEP = 25;

export const DrawingLightbox: React.FC<Props> = ({
  items,
  activeId,
  onSelectId,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const pinchStateRef = useRef<{
    active: boolean;
    startDist: number;
    startZoom: number;
  }>({
    active: false,
    startDist: 0,
    startZoom: 100,
  });

  const activeIndex = activeId ? items.findIndex((d) => d.id === activeId) : -1;
  const activeItem = activeIndex >= 0 ? items[activeIndex] : null;

  // Reset zoom & pan whenever active plate changes
  useEffect(() => {
    setZoomLevel(100);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    dragStateRef.current.active = false;
    pinchStateRef.current.active = false;
  }, [activeId]);

  const clampZoom = (next: number) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(next)));

  const handleZoomIn = () => setZoomLevel((z) => clampZoom(z + ZOOM_STEP));
  const handleZoomOut = () =>
    setZoomLevel((z) => {
      const next = clampZoom(z - ZOOM_STEP);
      if (next <= 100) setPan({ x: 0, y: 0 });
      return next;
    });
  const handleReset = () => {
    setZoomLevel(100);
    setPan({ x: 0, y: 0 });
  };

  const goPrev = () => {
    if (items.length <= 1) return;
    const prevIdx = (activeIndex - 1 + items.length) % items.length;
    onSelectId(items[prevIdx].id);
  };

  const goNext = () => {
    if (items.length <= 1) return;
    const nextIdx = (activeIndex + 1) % items.length;
    onSelectId(items[nextIdx].id);
  };

  // Capture-phase keyboard handling so ESC closes lightbox before underlying modal
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (items.length > 1) {
          const nextIdx = (activeIndex + 1) % items.length;
          onSelectId(items[nextIdx].id);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (items.length > 1) {
          const prevIdx = (activeIndex - 1 + items.length) % items.length;
          onSelectId(items[prevIdx].id);
        }
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomLevel((z) => clampZoom(z + ZOOM_STEP));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoomLevel((z) => {
          const next = clampZoom(z - ZOOM_STEP);
          if (next <= 100) setPan({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        e.preventDefault();
        setZoomLevel(100);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [activeItem, activeIndex, items, onClose, onSelectId]);

  if (!activeItem || typeof document === 'undefined') return null;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 15 : -15;
    setZoomLevel((z) => {
      const next = clampZoom(z + delta);
      if (next <= 100) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (e.button !== 0 || zoomLevel <= 100) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active) return;
    setPan({
      x: dragStateRef.current.originX + (e.clientX - dragStateRef.current.startX),
      y: dragStateRef.current.originY + (e.clientY - dragStateRef.current.startY),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStateRef.current = {
        active: true,
        startDist: dist,
        startZoom: zoomLevel,
      };
      dragStateRef.current.active = false;
      setIsDragging(false);
    } else if (e.touches.length === 1 && zoomLevel > 100) {
      const t = e.touches[0];
      dragStateRef.current = {
        active: true,
        startX: t.clientX,
        startY: t.clientY,
        originX: pan.x,
        originY: pan.y,
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStateRef.current.active) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      if (pinchStateRef.current.startDist > 0) {
        const scale = dist / pinchStateRef.current.startDist;
        const next = clampZoom(pinchStateRef.current.startZoom * scale);
        setZoomLevel(next);
        if (next <= 100) setPan({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && dragStateRef.current.active) {
      const t = e.touches[0];
      setPan({
        x: dragStateRef.current.originX + (t.clientX - dragStateRef.current.startX),
        y: dragStateRef.current.originY + (t.clientY - dragStateRef.current.startY),
      });
    }
  };

  const handleTouchEnd = () => {
    pinchStateRef.current.active = false;
    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (zoomLevel > 100) {
      handleReset();
    } else {
      setZoomLevel(225);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-[#101626]/95 backdrop-blur-md flex flex-col select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.plate} — ${activeItem.title}`}
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-3.5 border-b border-[#EFE6D5]/15 text-[#EFE6D5] shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs font-mono min-w-0 flex items-center gap-2 truncate">
          <span className="text-[#E598AC] font-semibold shrink-0">{activeItem.plate}</span>
          <span className="text-[#EFE6D5]/40 shrink-0">·</span>
          <span className="text-[#EFE6D5] font-medium truncate">{activeItem.title}</span>
          {items.length > 1 && (
            <span className="hidden md:inline text-[#EFE6D5]/55 ml-1 shrink-0">
              ({activeIndex + 1} / {items.length})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Zoom Controls */}
          <div className="flex items-center border border-[#EFE6D5]/25 bg-[#101626]/75 px-2 py-1 text-xs font-mono">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= MIN_ZOOM}
              className="p-1 hover:text-[#E598AC] disabled:opacity-40 cursor-pointer"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 min-w-12 text-center tabular-nums">{zoomLevel}%</span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= MAX_ZOOM}
              className="p-1 hover:text-[#E598AC] disabled:opacity-40 cursor-pointer"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1 ml-1 hover:text-[#E598AC] cursor-pointer"
              aria-label="Reset zoom"
              title="Reset zoom (100%)"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-[#F3EBDD] dark:bg-[#1C2845] text-[#263D78] dark:text-[#EFE6D5] hover:bg-[#802C43] hover:text-[#F8F3E8] dark:hover:bg-[#C45D77] dark:hover:text-[#101626] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Interactive Zoom & Pan Viewport */}
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="grow overflow-hidden p-3 sm:p-6 flex items-center justify-center relative touch-none"
        style={{
          cursor: zoomLevel > 100 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        <div
          className="bg-[#F8F3E8] dark:bg-[#1E2A47] p-2 sm:p-4 shadow-2xl max-w-[92vw] max-h-[82vh] flex items-center justify-center will-change-transform"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomLevel / 100})`,
            transformOrigin: 'center center',
            transition: isDragging || pinchStateRef.current.active ? 'none' : 'transform 0.16s ease-out',
          }}
        >
          <img
            src={activeItem.imageUrl}
            alt={activeItem.title}
            draggable={false}
            referrerPolicy="no-referrer"
            className="max-h-[78vh] max-w-[88vw] w-auto h-auto object-contain block pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Bottom Caption & Plate Switcher */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-3 border-t border-[#EFE6D5]/15 text-xs font-mono text-[#EFE6D5]/80 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="truncate max-w-2xl">
          {activeItem.subtitle ||
            (zoomLevel > 100
              ? 'Drag to inspect details · Double-click or Reset to fit'
              : 'Scroll, pinch, or click + to zoom · Double-click to inspect details')}
        </span>

        {items.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              className="px-3 py-1.5 border border-[#EFE6D5]/25 hover:border-[#E598AC] text-[#EFE6D5] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="px-3 py-1.5 border border-[#EFE6D5]/25 hover:border-[#E598AC] text-[#EFE6D5] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
