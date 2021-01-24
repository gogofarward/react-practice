import React, {Component} from 'react';
import styles from "~/assets/css/fullpage.module.css"
import ReactFullpage from "@fullpage/react-fullpage";
import {NavLink} from "react-router-dom";

export default class FullPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: ['#A49714', '#53A486', '#7E58A4', '#2F5EA4']
        }
    }

    componentDidMount() {

        // 监听postMessage消息事件
        window.addEventListener("message", this.autoLogin);
    }

    autoLogin = event => {
        // 获取用户信息，origin是消息来源，作为拦截
        let {origin, data: {username, password}} = event;
        if (username && password) {
            // 必须取消监听，不然会重复登录
            window.removeEventListener("message", this.autoLogin);
            // 拿到用户名密码去调用登录交易，我这里是直接跳转
            this.props.history.push("/home");
        }
    }

    render() {
        return (
            <>
                <div className={styles["top-btn"]}>
                    <NavLink to="/home">主页</NavLink>
                </div>
                <ReactFullpage
                    scrollingSpeed={1000}
                    navigation
                    render={({state, fullpageApi}) => {
                        return (
                            <ReactFullpage.Wrapper>
                                {
                                    this.state.color.map((item, index) => (
                                        <div className="section" key={index}>
                                            <div style={{backgroundColor: item}} className={styles["pure-page"]}>
                                                第{index + 1}个页面
                                            </div>
                                        </div>
                                    ))
                                }
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
            </>
        )
    }
}
