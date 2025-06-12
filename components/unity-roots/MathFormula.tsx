import { useEffect, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathFormula({
    points,
    multiplier,
    patternName = ""
}: {
    points: number;
    multiplier: number;
    patternName?: string;
}) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        if (points > 50) {
            // Using arithmetic bracket notation for modulus
            const formula = `z_k = e^{2\\pi i k/${points}}`;
            const mapping = `k' \\equiv ${multiplier.toFixed(2)} \\times k \\,[${points}]`;
            const pattern = patternName ? `\\text{${patternName.replace(/ /g, '\\ ')}}` : '';

            const combined = patternName
                ? `${formula} \\\\ ${mapping} \\\\ ${pattern}`
                : `${formula} \\\\ ${mapping}`;

            setHtml(katex.renderToString(combined, {
                throwOnError: false,
                displayMode: true
            }));
        } else {
            setHtml('');
        }
    }, [points, multiplier, patternName]);

    if (points <= 50) {
        return (
            <div className="absolute top-4 right-4 p-3 items-start flex flex-col gap-2 bg-black/80 rounded-lg text-white text-xs">
                <p className="font-mono">zₖ = exp(2πik/{points})</p>
                <p className="font-mono">k' ≡ {multiplier.toFixed(2)}×k [{points}]</p>
                {patternName && <p className="font-mono">{patternName}</p>}
            </div>
        );
    }

    return (
        <div
            className="absolute top-4 right-4 p-3 items-start bg-black/80 rounded-lg text-white text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}