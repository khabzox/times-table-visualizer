N-th Roots of Unity Visualization

An interactive visualization of modular multiplication patterns on the unit circle, revealing beautiful mathematical structures.

Features:
- Dynamic visualization of complex roots of unity
- Real-time parameter adjustments
- Multiple color modes (rainbow, gradient, connection-based)
- Mathematical formula display with KaTeX rendering
- Export high-quality PNG images
- Animation system for pattern exploration

Mathematical Foundation:
Visualizes the mapping:
z_k = e^(2πik/n) = cos(2πk/n) + i·sin(2πk/n)
k → (k × multiplier) mod n

Where:
- n = number of points (roots)
- multiplier = connection pattern generator

Installation:
1. Clone the repository:
git clone https://github.com/khabzox/times-table-visualizer.git
cd unity-roots-visualization

2. Install dependencies:
npm install

3. Run the development server:
npm run dev

Usage:
Controls:
Parameter        Range       Description
Points (n)      10-500     Number of roots of unity to display
Multiplier      1-100      Connection pattern generator
Animation Speed 0.001-0.2  Speed of automatic pattern evolution

Visual Options:
- Points: Toggle visibility of individual roots
- Circle: Show/hide unit circle
- Color Mode:
  - Rainbow: Color by root index
  - Gradient: Color by position
  - Connection: Color by target root
- Line Width: Adjust connection line thickness

Technical Stack:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- KaTeX (for math rendering)
- HTML5 Canvas API


## 📚 Further Reading

### Mathematical Background
- "Visual Complex Analysis" by Tristan Needham
- "The Geometry of Complex Numbers" by Hans Schwerdtfeger
- Online resources on cyclotomic polynomials and Galois theory

### Related Visualizations
- Spirographs and mathematical art
- Fourier series and epicycles
- Mandelbrot and Julia sets
- Lissajous curves and parametric equations

## 🤝 Contributing

We welcome contributions that enhance the mathematical accuracy, visual appeal, or educational value of this project. Areas of particular interest:

- Additional curve families and pattern types
- Performance optimizations for large n values
- Educational content and tutorials
- Mobile-responsive design improvements

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute for educational and research purposes.

## 🙏 Acknowledgments

Inspired by the mathematical beauty revealed through computational visualization and the rich history of complex analysis and geometric pattern generation.

---

*"Mathematics is the art of giving the same name to different things." - Henri Poincaré*

Transform mathematical abstractions into visual discoveries with this interactive exploration of the n-th roots of unity!