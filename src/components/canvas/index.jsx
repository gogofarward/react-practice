import React, {Component} from 'react';
import {Col, Row} from "antd";
import HeartLine from "./HeartLine";
import ParticleBtn from "./ParticleBtn"

export default class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Row justify="space-between">
                    <Col span={8}>
                        <HeartLine/>
                    </Col>
                    <Col span={8}>
                        <ParticleBtn/>
                    </Col>
                </Row>
            </div>
        )
    }
}
