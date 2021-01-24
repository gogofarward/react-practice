import React, {Component} from 'react';

/* 圆形爆炸的粒子效果 */
const ExplodingParticle = function () {
    // 设置想要的粒子动画的时长
    this.animationDuration = 1000;
    // in ms
    // 设置粒子的速度
    this.speed = {x: -5 + Math.random() * 10, y: -5 + Math.random() * 10};
    // 粒子大小
    this.radius = 5 + Math.random() * 5;
    // 为粒子设定一个最大的生存时间
    this.life = 30 + Math.random() * 10;
    this.remainingLife = this.life;
    // 这个函数稍后将会调用动画相关的逻辑
    this.draw = ctx => {
        let p = this;
        if (this.remainingLife > 0 && this.radius > 0) {
            // 在当前位置绘制一个圆
            ctx.beginPath();
            ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
            // ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
            ctx.fillStyle = "red"
            ctx.fill();
            // 更新粒子的位置和生命
            p.remainingLife--;
            p.radius -= 0.25;
            p.startX += p.speed.x;
            p.startY += p.speed.y;
        }
    }
}

export default class ParticleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.particles = [];
    }

    click = e => {

        const ctx = this.canvasRef.getContext("2d");

        // 获取颜色数据
        let localX = e.clientX;
        let localY = e.clientY;
        let rgbaColorArr = ctx.getImageData(localX, localY, 1, 1).data;

        // 根据window获取按钮的位置
        let bcr = e.currentTarget.getBoundingClientRect();
        let globalX = bcr.left + localX;
        let globalY = bcr.top + localY;

        // 使用window的位置获取颜色数据，创建一个粒子
        this.createParticleAtPoint(globalX, globalY, rgbaColorArr);
    }

    createParticleAtPoint = (x, y, colorData) => {
        let particle = new ExplodingParticle();
        particle.rgbArray = colorData;
        particle.startX = x;
        particle.startY = y;
        particle.startTime = Date.now();
        this.particles.push(particle);

        this.update()
    }

    update = () => {

        const particleCtx = this.canvasRef.getContext("2d");
        let particles = this.particles;
        // 清除旧粒子
        if(typeof particleCtx !== "undefined") {
            particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        // 在新位置绘制所有粒子
        for(let i = 0; i < particles.length; i++) {
            particles[i].draw(particleCtx);
            // 如果最后一个粒子完成动画，清除旧的粒子
            if(i === particles.length - 1) {
                let percent = (Date.now() - particles[i].startTime) / particles.animationDuration;
                if(percent > 1) {
                    particles = [];
                }
            }
        }

        window.requestAnimationFrame(this.update)
    }

    render() {
        return (
            <div className="relative flex align-center justify-center" style={{height: 300}}>
                <div style={{
                    width: 150,
                    height: 50,
                    background: "linear-gradient(to right, blue, green)",
                    lineHeight: "50px",
                    textAlign: "center",
                    color: "#fff"
                }} onClick={this.click}>BUTTON
                </div>
                <canvas style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }} ref={r => this.canvasRef = r}>

                </canvas>
            </div>
        )
    }
}
