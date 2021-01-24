import React, {Component} from 'react';
import _ from "lodash";
import {Button, Divider, Input} from "antd";
import ReactEcharts from "echarts-for-react";

const {TextArea} = Input;

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            broadMsg: ""
        };
    }

    componentDidMount() {

        this.lodash();
        // this.printTime();
    }

    lodash = () => {

        _.times(5, i => console.log(i))
        console.log(_.random(15, 20))

        let smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];
        console.log(_.sample(smartTeam));
        console.log(_.sampleSize(smartTeam, 2));
        console.log(_.includes(smartTeam, '杨海月', 1));

        console.log("-----------\n", _.isEmpty([1]))
        console.log(_.now())

        let func = _.once(data => console.log("once func", data))
        func(1);
        func(2);
        console.clear();

        this.addBroadListener();
        console.log("%c欢迎来到react项目首页!", "color: red; font-size: 30px")
        console.time("100次循环计时");
        let temp = 0;
        for (let i = 0; i < 100; i++) {
            temp += temp + i;
        }
        console.log(temp);
        console.timeEnd("100次循环计时")
    }

    addBroadListener = () => {
        let broad = new BroadcastChannel("myBroad");
        broad.addEventListener("message", ev => {
            console.log(ev)
            this.setState({broadMsg: ev.data})
        })
    }

    sendBroad = () => {
        let broad = new BroadcastChannel("myBroad");
        broad.postMessage("数风流人物，还看今朝！")
    }

    openUrl = () => {

        // HTSE免登录地址，生成环境改为服务器域名或地址
        let htse = window.open("http://192.168.0.114:1234/autoLogin", 'myWindow');

        let count = 0;
        // 考虑到目标页面可能未加载完成，每隔3s发送1次消息
        let timer = setInterval(function () {

            let message = {uid: "admin", password: "admin"};    //用户信息
            htse.postMessage(message, "http://192.168.0.114:1234");     //目标域名+端口，必须与上面目标地址一致
            if (++count > 3) {
                clearInterval(timer);
            }
        }, 2000);

    }

    locationUrl = () => {
        window.location.href = "http://192.168.0.114:1234/autoLogin?uid=admin&password=admin";
        // window.open("http://192.168.0.114:1234/autoLogin?uid=admin&password=admi")
    }

    printTime = () => {
        requestAnimationFrame(this.printTime);
        console.log(new Date().getTime())
    }

    downLoad = () => {
        fetch("http://localhost:6602/download", {
            responseType: "blob"
        }).then(response => response.blob()).then(res => {

            let type = 'application/octet-stream'
            let blob = new Blob([res], {type: type})
            let fileName = res.headers?.filename || 'test.xlsx'
            let objectUrl = URL.createObjectURL(blob)
            var a = document.createElement('a')

            a.href = objectUrl
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove();
        })

        /*let request = new XMLHttpRequest();
        request.open("get", "http://localhost:6602/download")
        request.responseType = "blob";

        request.onreadystatechange = function (event) {
            if (request.status === 200 && request.readyState === 4) {
                let type = 'application/octet-stream'
                let blob = new Blob([request.response], {type: type})
                let fileName = request.headers?.filename || 'test.xlsx'
                let objectUrl = URL.createObjectURL(blob)
                var a = document.createElement('a')

                a.href = objectUrl
                a.download = fileName
                document.body.appendChild(a)
                a.click()
                a.remove();
            }
        }
        request.send();*/
    }

    render() {

        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        }

        return (
            <div>
                <button onClick={this.openUrl}>openWindow跳转</button>
                <button onClick={this.locationUrl}>location跳转</button>
                <Divider>broadcast</Divider>
                <div>
                    <Button onClick={this.sendBroad}>发布消息</Button>
                    <span>接收到的消息：</span><TextArea value={this.state.broadMsg}/>
                </div>
                <br/>
                <Button onClick={this.downLoad}>下载</Button>
                <div>
                    <ReactEcharts option={option}/>
                </div>
            </div>
        )
    }
}
