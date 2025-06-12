'use client';
import { ColorMode, ControlPanelProps } from '@/types/unity-roots';

export const ControlPanel = ({
    multiplier,
    points,
    isAnimating,
    showPoints,
    showCircle,
    colorMode,
    lineWidth,
    animationSpeed,
    onMultiplierChange,
    onPointsChange,
    onToggleAnimation,
    onResetAnimation,
    onAnimationSpeedChange,
    onTogglePoints,
    onToggleCircle,
    onColorModeChange,
    onLineWidthChange,
    onExport
}: ControlPanelProps) => (
    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white p-4 rounded-xl max-w-sm">
        <h3 className="font-bold mb-3 text-lg">N-th Roots of Unity</h3>

        {/* Core Parameters */}
        <div className="space-y-3">
            <label className="block">
                <span className="text-sm font-medium">Multiplier: {multiplier}</span>
                <input
                    type="range"
                    min={1}
                    max={100}
                    step={0.1}
                    value={multiplier}
                    onChange={e => onMultiplierChange(Number(e.target.value))}
                    className="w-full mt-1"
                    disabled={isAnimating}
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium">Points (n): {points}</span>
                <input
                    type="range"
                    min={10}
                    max={500}
                    value={points}
                    onChange={e => onPointsChange(Number(e.target.value))}
                    className="w-full mt-1"
                />
            </label>
        </div>

        {/* Animation Controls */}
        <div className="mt-4 pt-3 border-t border-gray-600">
            <div className="flex items-center gap-2 mb-2">
                <button
                    onClick={onToggleAnimation}
                    className={`px-3 py-1 rounded text-sm font-medium ${isAnimating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {isAnimating ? '⏸ Pause' : '▶ Animate'}
                </button>
                <button
                    onClick={onResetAnimation}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                >
                    Reset
                </button>
            </div>

            {isAnimating && (
                <label className="block">
                    <span className="text-sm">Speed: {animationSpeed.toFixed(3)}</span>
                    <input
                        type="range"
                        min={0.001}
                        max={0.2}
                        step={0.001}
                        value={animationSpeed}
                        onChange={e => onAnimationSpeedChange(Number(e.target.value))}
                        className="w-full mt-1"
                    />
                </label>
            )}
        </div>

        {/* Visual Options */}
        <div className="mt-4 pt-3 border-t border-gray-600">
            <h4 className="text-sm font-medium mb-2">Visual Options</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={showPoints}
                        onChange={e => onTogglePoints(e.target.checked)}
                        className="mr-1"
                    />
                    Points
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={showCircle}
                        onChange={e => onToggleCircle(e.target.checked)}
                        className="mr-1"
                    />
                    Circle
                </label>
            </div>

            <label className="block mt-2">
                <span className="text-sm">Color Mode:</span>
                <select
                    value={colorMode}
                    onChange={e => onColorModeChange(e.target.value as ColorMode)}
                    className="w-full mt-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                >
                    <option value="rainbow">Rainbow</option>
                    <option value="gradient">Gradient</option>
                    <option value="connection">Connection-based</option>
                    <option value="single">Single Color</option>
                </select>
            </label>

            <label className="block mt-2">
                <span className="text-sm">Line Width: {lineWidth}</span>
                <input
                    type="range"
                    min={0.5}
                    max={5}
                    step={0.5}
                    value={lineWidth}
                    onChange={e => onLineWidthChange(Number(e.target.value))}
                    className="w-full mt-1"
                />
            </label>
        </div>

        {/* Export */}
        <button
            onClick={onExport}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-medium"
        >
            📸 Export PNG
        </button>
    </div>
);