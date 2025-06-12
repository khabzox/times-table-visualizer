export type ColorMode = 'rainbow' | 'gradient' | 'connection' | 'single';

export interface ControlPanelProps {
    multiplier: number;
    points: number;
    isAnimating: boolean;
    showPoints: boolean;
    showCircle: boolean;
    colorMode: ColorMode;
    lineWidth: number;
    animationSpeed: number;
    onMultiplierChange: (value: number) => void;
    onPointsChange: (value: number) => void;
    onToggleAnimation: () => void;
    onResetAnimation: () => void;
    onAnimationSpeedChange: (value: number) => void;
    onTogglePoints: (checked: boolean) => void;
    onToggleCircle: (checked: boolean) => void;
    onColorModeChange: (mode: ColorMode) => void;
    onLineWidthChange: (width: number) => void;
    onExport: () => void;
}

export interface VisualizationCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    points: number;
    multiplier: number;
    showPoints: boolean;
    showCircle: boolean;
    colorMode: ColorMode;
    lineWidth: number;
}