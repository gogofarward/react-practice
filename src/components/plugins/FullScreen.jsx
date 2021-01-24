import React, {Component} from 'react';
import screenfull from "screenfull";
import blackBG from "~/assets/image/black-blue-bg.png"
import {Button, Space} from "antd";

export default class FullScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    fullImage = e => {
        screenfull.request(e.target)
    }

    fullPage = () => {
        screenfull.request()
    }

    toggle = () => {
        screenfull.toggle()
    }

    fullImage1 = event => {
        event.target.requestFullscreen()
    }

    fullPage1 = () => {
        document.body.requestFullscreen();
    }

    render() {
        return (
            <Space direction="vertical">
                <Space size={48}>
                    <Space direction="vertical">
                        <img height={100} src={blackBG} onClick={this.fullImage}/>
                        <Button type="primary" onClick={this.fullPage}>点击全屏</Button>
                        <Button type="primary" onClick={this.toggle}>切换正常和全屏</Button>
                    </Space>
                    <Space direction="vertical">
                        <img height={100} src={blackBG} onClick={this.fullImage1}/>
                        <Button type="primary" onClick={this.fullPage1}>原生全屏</Button>
                    </Space>
                </Space>

                <br/>
                --svg--
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
                                  stroke="black"
                                  fill="none"
                                  stroke-width="3"
                        />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <g>
                            <text x="0" y="15" fill="red">I love SVG</text>
                        </g>
                    </svg>
                </div>
            </Space>
        )
    }
}
