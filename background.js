/*Canvas Fiber Effect*/

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fiberCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const mouse = {
    x:null,
    y:null,
    radius:150
    
};
    const PARTICLE_COUNT = 55;

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove",(e)=>{
    mouse.x=e.clientX;
    mouse.y=e.clientY;
    });

    class Particle{

    constructor(){
        this.reset();
    }

    reset(){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.radius=Math.random()*2+1;
        this.speedX=(Math.random()-.5)*0.4;
        this.speedY=(Math.random()-.5)*0.4;
    }

update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    const dx=this.x-mouse.x;
    const dy=this.y-mouse.y;
    const distance=Math.sqrt(dx*dx+dy*dy);

    if(distance<mouse.radius){
        this.x+=dx*0.015;
        this.y+=dy*0.015;
    }

    if(this.x<0||this.x>canvas.width){
        this.speedX*=-1;
    }

    if(this.y<0||this.y>canvas.height){
        this.speedY*=-1;
    }
}

    draw(){
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fillStyle="rgba(0,194,255,.9)";
        ctx.fill();
    }
}

for(let i=0;i<PARTICLE_COUNT;i++){
    particles.push(new Particle());
}

function connectParticles(){
    for(let a=0;a<particles.length;a++){
        for(let b=a+1;b<particles.length;b++){
            const dx=particles[a].x-particles[b].x;
            const dy=particles[a].y-particles[b].y;
            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<140){
                ctx.beginPath();
                ctx.strokeStyle=
                `rgba(0,194,255,${
                    1-distance/140
                })`;
                ctx.lineWidth=1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );
                ctx.stroke();
            }
        }
    }
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

animate();
});