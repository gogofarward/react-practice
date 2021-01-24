import React, {Component} from 'react';
import styles from "~/assets/css/plugins/anime.module.css";
import anime from "animejs"
import {Button, Space} from "antd";
import {IconCheck, IconCircle, SvgAnime} from "../../svgs/PluginSvg";
import Fade from "./Fade";

export default class Anime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            battery: {
                charged: '0%',
                cycles: 120
            },
            number: 1,
            inProp: true
        };

        this.rectRef = React.createRef();
        this.rectRef1 = React.createRef();
    }

    componentDidMount() {
        anime({
            targets: this.rectRef.current,
            translateX: 270,
            duration: 2000,
            direction: 'alternate',
            rotate: {
                value: 360,
                duration: 1800,
                easing: 'easeInOutSine'
            },
        })

        anime({
            targets: this.state.battery,
            charged: '100%',
            cycles: 130,
            round: 1,
            easing: 'linear',
            update: () => {
                this.setState({battery: this.state.battery})
            }
        })

        //svg
        let path = anime.path(".anime-path path");
        anime({
            targets: this.rectRef1.current,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: 4000,
            loop: true
        });

        anime({
            targets: "." + styles["anime-path-anime"] + ' path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function (el, i) {
                return i * 250
            },
            direction: 'alternate',
            loop: true
        });

        anime({
            targets: "." + styles["anime-path-check"] + ' path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function (el, i) {
                return i * 250
            },
            direction: 'alternate',
            loop: true
        });
    }

    startTransition = () => {
        let {inProp, number} = this.state;
        this.setState({
            inProp: !inProp
        }/*, () => {
            inProp = this.state.inProp;
            this.setState({
                inProp: !inProp,
                number: ++number
            })
        }*/)
    }

    render() {

        let {number, inProp} = this.state;

        return (
            <Space direction="vertical">
                <div ref={this.rectRef} className={styles.rect}/>
                <div>
                    {JSON.stringify(this.state.battery)}
                </div>
                <div ref={this.rectRef1} className={styles.circle}/>
                <div className="anime-path">
                    <IconCircle/>
                </div>
                <div className={styles["anime-path-check"]}>
                    <IconCheck/>
                </div>
                <div className={styles["anime-path-anime"]}>
                    <SvgAnime/>
                </div>

                <Button onClick={this.startTransition}>点击开始transition</Button>
                <Fade in={inProp} self={this.startTransition} dur={1000}>
                    <div>数字动画：{number}</div>
                </Fade>
            </Space>
        )
    }
}
