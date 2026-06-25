const canvas=document.createElement("canvas");
canvas.id="bg";
document.body.prepend(canvas);
const ctx=canvas.getContext("2d");
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
resize();window.addEventListener("resize",resize);
function drawFrame(timestamp){
 const t=timestamp*.001,W=canvas.width,H=canvas.height;
 ctx.fillStyle="#030000";ctx.fillRect(0,0,W,H);
 const fogs=[{x:.15,y:.9,rx:.7,r:"160,0,0",phase:0},{x:.85,y:.85,rx:.6,r:"120,0,0",phase:1.2},{x:.5,y:1.05,rx:.55,r:"180,0,0",phase:2.6},{x:.1,y:.2,rx:.45,r:"50,0,80",phase:3.8},{x:.9,y:.15,rx:.38,r:"35,0,60",phase:5.1},{x:.5,y:.5,rx:.35,r:"90,0,0",phase:.8}];
 for(const f of fogs){
  const pulse=.5+.5*Math.sin(t*.4+f.phase),alpha=.12+.10*pulse;
  const gx=W*f.x+Math.sin(t*.2+f.phase)*25,gy=H*f.y+Math.cos(t*.25+f.phase)*18;
  const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,Math.max(W,H)*f.rx);
  grad.addColorStop(0,`rgba(${f.r},${alpha})`);
  grad.addColorStop(.5,`rgba(${f.r},${alpha*.4})`);
  grad.addColorStop(1,`rgba(${f.r},0)`);
  ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
 }
 if(Math.random()<.06){const y=Math.random()*H,h=1+Math.random()*4;ctx.fillStyle=`rgba(180,0,0,${.12+Math.random()*.18})`;ctx.fillRect(0,y,W,h)}
 for(let y=0;y<H;y+=4){ctx.fillStyle="rgba(0,0,0,.07)";ctx.fillRect(0,y,W,2)}
 const vig=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.85);
 vig.addColorStop(0,"rgba(0,0,0,0)");vig.addColorStop(.65,"rgba(0,0,0,.45)");vig.addColorStop(1,"rgba(0,0,0,.93)");
 ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
 requestAnimationFrame(drawFrame)
}
requestAnimationFrame(drawFrame);

document.querySelectorAll(".asu-button").forEach(button=>{
 for(let i=0;i<7;i++){
  const tentacle=document.createElement("span");
  tentacle.className="tentacle";
  button.appendChild(tentacle);
 }
});
