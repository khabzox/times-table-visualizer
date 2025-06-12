'use client';
import { useCallback } from 'react';
import { VisualizationCanvasProps } from '@/types/unity-roots';

export const useVisualization = ({
    canvasRef,
    points,
    showPoints,
    showCircle,
    colorMode,
    lineWidth
}: VisualizationCanvasProps) => {
    const drawVisualization = useCallback((currentMultiplier: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(cx, cy) * 0.8;

        // Clear canvas with gradient background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);

        // Calculate coordinates (n-th roots of unity)
        const coords = Array.from({ length: points }, (_, i) => {
            const angle = (2 * Math.PI * i) / points;
            return {
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle),
                angle: angle
            };
        });

        // Draw unit circle
        if (showCircle) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw connections with color coding
        ctx.lineWidth = lineWidth;
        for (let i = 0; i < points; i++) {
            const a = coords[i];
            const targetIndex = (i * currentMultiplier) % points;
            const b = coords[Math.floor(targetIndex)];

            if (!a || !b || isNaN(a.x) || isNaN(a.y) || isNaN(b.x) || isNaN(b.y)) {
                continue;
            }

            let color;
            switch (colorMode) {
                case 'rainbow':
                    color = `hsl(${(i / points) * 360}, 70%, 60%)`;
                    break;
                case 'gradient':
                    const intensity = Math.sin((i / points) * Math.PI);
                    color = `hsl(200, 100%, ${30 + intensity * 40}%)`;
                    break;
                case 'connection':
                    color = `hsl(${(targetIndex / points) * 360}, 80%, 50%)`;
                    break;
                default:
                    color = 'hsl(200, 100%, 70%)';
            }

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }

        // Draw points
        if (showPoints) {
            coords.forEach((coord, i) => {
                if (!coord || isNaN(coord.x) || isNaN(coord.y)) return;

                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(coord.x, coord.y, 2, 0, 2 * Math.PI);
                ctx.fill();

                if (points <= 20) {
                    ctx.fillStyle = 'white';
                    ctx.font = '12px monospace';
                    ctx.fillText(`z${i}`, coord.x + 5, coord.y - 5);
                }
            });
        }
    }, [canvasRef, points, showPoints, showCircle, colorMode, lineWidth]);

    return { drawVisualization };
};