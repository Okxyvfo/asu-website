const canvas = document.createElement("canvas");
canvas.id = "bg";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

function drawFrame(timestamp) {
    const t = timestamp * 0.001;
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = "#030000";
    ctx.fillRect(0, 0, W, H);

    const fogs = [
        { x: 0.15, y: 0.9, rx: 0.7, r: "160,0,0", phase: 0 },
        { x: 0.85, y: 0.85, rx: 0.6, r: "120,0,0", phase: 1.2 },
        { x: 0.5, y: 1.05, rx: 0.55, r: "180,0,0", phase: 2.6 },
        { x: 0.1, y: 0.2, rx: 0.45, r: "50,0,80", phase: 3.8 },
        { x: 0.9, y: 0.15, rx: 0.38, r: "35,0,60", phase: 5.1 },
        { x: 0.5, y: 0.5, rx: 0.35, r: "90,0,0", phase: 0.8 },
    ];

    for (const f of fogs) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.4 + f.phase);
        const alpha = 0.12 + 0.10 * pulse;
        const gx = W * f.x + Math.sin(t * 0.2 + f.phase) * 25;
        const gy = H * f.y + Math.cos(t * 0.25 + f.phase) * 18;

        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * f.rx);
        grad.addColorStop(0, `rgba(${f.r},${alpha})`);
        grad.addColorStop(0.5, `rgba(${f.r},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${f.r},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
    }

    if (Math.random() < 0.06) {
        const barY = Math.random() * H;
        const barH = 1 + Math.random() * 4;
        ctx.fillStyle = `rgba(180,0,0,${0.12 + Math.random() * 0.18})`;
        ctx.fillRect(0, barY, W, barH);
    }

    for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.07)";
        ctx.fillRect(0, y, W, 2);
    }

    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(0.65, "rgba(0,0,0,0.45)");
    vig.addColorStop(1, "rgba(0,0,0,0.93)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(drawFrame);
}

requestAnimationFrame(drawFrame);
