import React, {Component} from 'react';
import {Col, Row} from "antd";
import Basic from "./Basic";
import State from "./State";
import Process from "./Process";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row gutter={[24, 24]}>
                <Col span={8}>
                    <Basic/>
                </Col>
                <Col span={16}>
                    <State/>
                </Col>
                <Col span={24}>
                    <Process/>
                </Col>
            </Row>
        )
    }
}
