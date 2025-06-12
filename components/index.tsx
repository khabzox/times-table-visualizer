'use client';

import { useRef, useEffect, useState } from 'react';
import { ControlPanel } from './ControlPanel';
import MathFormula from './MathFormula';
import { useVisualization } from './VisualizationCanvas';
import { getPatternName } from './PatternUtils';
import { ColorMode } from '@/types/unity-roots';

export const UnityRootsVisualization = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    // Core parameters
    const [multiplier, setMultiplier] = useState(53);
    const [points, setPoints] = useState(200);

    // Visual enhancements
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPoints, setShowPoints] = useState(true);
    const [showCircle, setShowCircle] = useState(true);
    const [colorMode, setColorMode] = useState<ColorMode>('rainbow');
    const [lineWidth, setLineWidth] = useState(1);

    // Animation state
    const [animationSpeed, setAnimationSpeed] = useState(0.05);
    const [animationMultiplier, setAnimationMultiplier] = useState(2);

    const { drawVisualization } = useVisualization({
        canvasRef,
        points,
        multiplier,
        showPoints,
        showCircle,
        colorMode,
        lineWidth
    });

    // Animation loop
    useEffect(() => {
        if (isAnimating) {
            const animate = () => {
                setAnimationMultiplier(prev => prev + animationSpeed);
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isAnimating, animationSpeed]);

    // Draw on parameter changes
    useEffect(() => {
        const currentMultiplier = isAnimating ? animationMultiplier : multiplier;
        drawVisualization(currentMultiplier);
    }, [multiplier, points, isAnimating, animationMultiplier, drawVisualization]);

    const exportCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `unity-roots-n${points}-m${multiplier}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <main className="relative w-screen h-screen overflow-hidden" >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full cursor-crosshair"
            />

            <ControlPanel
                multiplier={multiplier}
                points={points}
                isAnimating={isAnimating}
                showPoints={showPoints}
                showCircle={showCircle}
                colorMode={colorMode}
                lineWidth={lineWidth}
                animationSpeed={animationSpeed}
                onMultiplierChange={setMultiplier}
                onPointsChange={setPoints}
                onToggleAnimation={() => setIsAnimating(!isAnimating)}
                onResetAnimation={() => setAnimationMultiplier(2)}
                onAnimationSpeedChange={setAnimationSpeed}
                onTogglePoints={setShowPoints}
                onToggleCircle={setShowCircle}
                onColorModeChange={setColorMode}
                onLineWidthChange={setLineWidth}
                onExport={exportCanvas}
            />

            <MathFormula
                points={points}
                multiplier={isAnimating ? animationMultiplier : multiplier}
                patternName={getPatternName(isAnimating ? animationMultiplier : multiplier)}
            />
        </main>
    );
};