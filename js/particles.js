class TechGrid {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: null, y: null, radius: 200 };
    this.time = 0;
    this.gridSize = 50;
    this.init();
  }

  init() {
    this.resize();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const hero = this.canvas.parentElement;
    this.canvas.width = hero.offsetWidth;
    this.canvas.height = hero.offsetHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawGrid() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const gs = this.gridSize;
    const cols = Math.ceil(w / gs) + 1;
    const rows = Math.ceil(h / gs) + 1;
    const baseAlpha = 0.04;
    const pulse = Math.sin(this.time * 0.008) * 0.015;

    this.ctx.lineWidth = 1;

    for (let i = 0; i <= cols; i++) {
      const x = i * gs;
      let alpha = baseAlpha + pulse;

      if (this.mouse.x !== null) {
        const dist = Math.abs(x - this.mouse.x);
        if (dist < this.mouse.radius) {
          const influence = 1 - dist / this.mouse.radius;
          alpha += influence * 0.06;
        }
      }

      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.strokeStyle = `rgba(61, 154, 106, ${alpha})`;
      this.ctx.stroke();
    }

    for (let j = 0; j <= rows; j++) {
      const y = j * gs;
      let alpha = baseAlpha + pulse;

      if (this.mouse.y !== null) {
        const dist = Math.abs(y - this.mouse.y);
        if (dist < this.mouse.radius) {
          const influence = 1 - dist / this.mouse.radius;
          alpha += influence * 0.06;
        }
      }

      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.strokeStyle = `rgba(61, 154, 106, ${alpha})`;
      this.ctx.stroke();
    }
  }

  drawIntersections() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const gs = this.gridSize;
    const cols = Math.ceil(w / gs) + 1;
    const rows = Math.ceil(h / gs) + 1;

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gs;
        const y = j * gs;
        let alpha = 0.06;
        let radius = 1;

        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = x - this.mouse.x;
          const dy = y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const influence = 1 - dist / this.mouse.radius;
            alpha += influence * 0.35;
            radius += influence * 2;
          }
        }

        const dotPulse = Math.sin(this.time * 0.012 + i * 0.5 + j * 0.3) * 0.02;
        alpha += dotPulse;

        if (alpha > 0.01) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, radius, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(82, 184, 130, ${Math.max(0, alpha)})`;
          this.ctx.fill();
        }
      }
    }
  }

  animate() {
    this.time++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawIntersections();
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TechGrid('hero-canvas');
});
