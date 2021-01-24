import React, {Component} from 'react';
import {Button, Result} from "antd";

export default class ErrorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    backHome = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={this.backHome}>Back Home</Button>}
            />
        )
    }
}
