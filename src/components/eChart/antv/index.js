import React, {Component} from 'react';
import {Col, Row} from "antd";
import Constellation from "./Constellation";
import DynamicChart from "./DynamicChart";
import WordCloud from "./WordCloud";
import PanelChart from "./PanelChart";
import RoundChart from "./RoundChart";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row gutter={24} align="center">
                <Col span={8}>
                    <Constellation/>
                </Col>
                <Col span={8}>
                    <PanelChart/>
                </Col>
                <Col span={8}>
                    <RoundChart/>
                </Col>
                <Col span={8}>
                    <WordCloud/>
                </Col>
                <Col span={8}>
                    <DynamicChart/>
                </Col>
            </Row>
        )
    }
}
