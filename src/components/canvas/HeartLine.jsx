import React, {Component} from 'react';

export default class HeartLine extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        var ctx = this.heart.getContext('2d');
        ctx.clearRect(0, 0, 300, 300);
        var theta = 0;
        var dig = Math.PI / 256;

        this.motion = () => {

            ctx.beginPath();
            let x = 8 * (16 * Math.pow(Math.sin(theta), 3)) + 150;
            let y = 150 - 8 * (13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
            theta = theta + dig;

            if (theta > 2 * Math.PI) {
                theta = 0;
                ctx.clearRect(0, 0, 300, 300);
            }
        }
        setInterval(this.motion, 20);
    }

    render() {
        return (
            <canvas ref={r => this.heart = r} height={300}>

            </canvas>
        )
    }
}
