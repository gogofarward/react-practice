import React, {Component} from 'react';
import {Col, Row} from "antd";
import MyG2Chart from "./MyG2Chart";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row gutter={24}>
                <Col span={8}>
                    <MyG2Chart/>
                </Col>
            </Row>
        )
    }
}
