import { Move, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    open: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onCrop: (file: File) => void;
    isUploading: boolean;
};

const VIEWPORT_SIZE = 260; // Size of circular crop area in px
const OUTPUT_SIZE = 400; // Resolution of exported cropped square image

export function AvatarCropperModal({
    open,
    imageSrc,
    onClose,
    onCrop,
    isUploading,
}: Props) {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);

    // Reset settings when a new image is loaded
    useEffect(() => {
        if (open && imageSrc) {
            setZoom(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });

            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
            };
        }
    }, [open, imageSrc]);

    // Pointer down: start dragging
    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    // Pointer move: update position
    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    // Pointer up: stop dragging
    const handlePointerUp = (e: React.PointerEvent) => {
        if (isDragging) {
            setIsDragging(false);
            try {
                (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            } catch {
                // Ignore if not captured
            }
        }
    };

    // Wheel zoom
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * -0.002;
        setZoom((prev) => Math.min(Math.max(1, prev + delta), 3));
    };

    // Compute cropped image using HTML5 Canvas
    const handleSave = () => {
        if (!imageSrc || !naturalSize) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = OUTPUT_SIZE;
            canvas.height = OUTPUT_SIZE;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Fill background in case of transparent PNG
            ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

            ctx.save();

            // Move to center of canvas
            ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);

            // Apply rotation
            ctx.rotate((rotation * Math.PI) / 180);

            // Apply zoom
            ctx.scale(zoom, zoom);

            // Apply position scaled from viewport coordinates to canvas coordinates
            const factor = OUTPUT_SIZE / VIEWPORT_SIZE;
            ctx.translate(position.x * factor, position.y * factor);

            // Calculate base dimensions to fit inside viewport
            const ratio = naturalSize.width / naturalSize.height;
            let drawW = OUTPUT_SIZE;
            let drawH = OUTPUT_SIZE;

            if (ratio > 1) {
                // Landscape
                drawH = OUTPUT_SIZE;
                drawW = OUTPUT_SIZE * ratio;
            } else {
                // Portrait or square
                drawW = OUTPUT_SIZE;
                drawH = OUTPUT_SIZE / ratio;
            }

            // Draw image centered
            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

            ctx.restore();

            // Export to File
            canvas.toBlob(
                (blob) => {
                    if (!blob) return;
                    const croppedFile = new File([blob], 'cropped-avatar.jpg', {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    });
                    onCrop(croppedFile);
                },
                'image/jpeg',
                0.92
            );
        };
    };

    // Compute initial base dimensions for the preview
    const ratio = naturalSize ? naturalSize.width / naturalSize.height : 1;
    const baseW = ratio > 1 ? VIEWPORT_SIZE * ratio : VIEWPORT_SIZE;
    const baseH = ratio > 1 ? VIEWPORT_SIZE : VIEWPORT_SIZE / ratio;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && !isUploading && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Adjust Profile Photo</DialogTitle>
                    <DialogDescription>
                        Drag to center your face and use the zoom slider to adjust framing.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-5 py-3">
                    {/* Circular Viewport */}
                    <div
                        className="relative flex items-center justify-center overflow-hidden rounded-full border-4 border-primary/80 bg-neutral-900 shadow-2xl select-none touch-none cursor-grab active:cursor-grabbing"
                        style={{
                            width: `${VIEWPORT_SIZE}px`,
                            height: `${VIEWPORT_SIZE}px`,
                        }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onWheel={handleWheel}
                    >
                        {imageSrc && (
                            <img
                                ref={imgRef}
                                src={imageSrc}
                                alt="Crop preview"
                                draggable={false}
                                className="pointer-events-none select-none max-w-none max-h-none absolute origin-center"
                                style={{
                                    width: `${baseW}px`,
                                    height: `${baseH}px`,
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) rotate(${rotation}deg) scale(${zoom})`,
                                    transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                                }}
                            />
                        )}

                        {/* Guide Overlay Crosshairs / Hint */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-full rounded-full ring-1 ring-white/20" />
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Move className="h-3.5 w-3.5" />
                        <span>Drag to reposition &bull; Scroll to zoom</span>
                    </div>

                    {/* Controls Toolbar */}
                    <div className="flex w-full flex-col gap-3 px-2">
                        {/* Zoom Slider */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                                title="Zoom Out"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </button>

                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.05}
                                value={zoom}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
                                aria-label="Zoom level"
                            />

                            <button
                                type="button"
                                onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                                title="Zoom In"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Additional Action Buttons */}
                        <div className="flex items-center justify-center gap-2 pt-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setRotation((r) => (r + 90) % 360)}
                                className="h-8 text-xs gap-1.5"
                            >
                                <RotateCw className="h-3.5 w-3.5" />
                                Rotate 90&deg;
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setZoom(1);
                                    setRotation(0);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className="h-8 text-xs"
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isUploading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isUploading}
                    >
                        {isUploading && <Spinner className="mr-2 h-4 w-4" />}
                        Apply & Save Photo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
