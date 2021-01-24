import React, {Component} from 'react';
import * as d3 from "d3";
import {Button, Col, Row} from "antd";
import D3Bar from "./D3Bar";
import ChordChart from "./ChordChart";
import D3Radar from "./D3Radar";

export default class D3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: "",
            axis: ""
        };
    }

    componentDidMount() {

        this.d3Function();

        // 1. 添加画布
        const width = 600;
        const height = 300;

        const svg = d3.select("#d3Axis").append('svg').attr('width', width).attr('height', height);

        // 完成 静态的  坐标轴
        // 线性比例尺
        const scale = d3.scaleLinear().domain([0, 100]).range([100, 560]);

        const axis = d3.axisTop(scale);

        const g = svg.append('g').attr('id', 'g').attr("transform", "translate(0, 100)").call(axis);

        this.setState({scale, axis})
    }

    updateX = () => {
        // 更新数据
        this.state.scale.domain([0, Math.random() * 100]);
        // g.call(axis);
        // transition d3提供默认的动画
        d3.select('#d3Axis #g').transition().call(this.state.axis)
    }

    d3Function = () => {
        let a = [3,5,8,11,19]
        console.log(d3.quantile(a, 0.25))
    }

    render() {
        return (
            <div>
                <Row justify="space-between">
                    <Col span={10}>
                        <Button onClick={this.updateX}>更新</Button>
                        <div id="d3Axis"/>
                    </Col>
                    <Col span={14}>
                        <D3Bar/>
                    </Col>
                    <Col span={12}>
                        <ChordChart/>
                    </Col>
                    <Col span={12}>
                        <D3Radar/>
                    </Col>
                </Row>
            </div>
        )
    }
}
