import React, {Component} from "react";
import {Col, Row} from "antd";
import GComponent from "./GComponent";
import BizLine from "./BizLine";

export default class BizCharts extends Component {

    render() {
        return (
            <Row>
                <Col span={8}>
                    <GComponent/>
                </Col>
                <Col span={8}>
                    <BizLine/>
                </Col>
            </Row>
        )
    }
}
