'use client';
import { useRef, useEffect, useState } from 'react';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [multiplier, setMultiplier] = useState(2);
  const [points, setPoints] = useState(200);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) * 0.9;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'hsl(200, 100%, 70%)';
    ctx.lineWidth = 1;

    const coords = [...Array(points).keys()].map(i => {
      const angle = (2 * Math.PI * i) / points;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });

    for (let i = 0; i < points; i++) {
      const a = coords[i];
      const b = coords[(i * multiplier) % points];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }, [multiplier, points]);

  return (
    <main>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen" />
      <div className="absolute top-4 left-4 bg-black text-white p-4 rounded-xl">
        <label className="block">
          Multiplier: {multiplier}
          <input
            type="range"
            min={1}
            max={20}
            value={multiplier}
            onChange={e => setMultiplier(Number(e.target.value))}
          />
        </label>
        <label className="block mt-2">
          Points: {points}
          <input
            type="range"
            min={50}
            max={300}
            value={points}
            onChange={e => setPoints(Number(e.target.value))}
          />
        </label>
      </div>
    </main>
  );
}
