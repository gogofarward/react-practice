import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import styles from '~/assets/css/plugins/styleComp.module.css'
import commonStyles from '~/assets/css/common.css'

export default class StyleComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(styles)
    }

    render() {

        const MyAnimation = keyframes`
            from {
                padding-left: 0;
            }
            
            to {
                padding-left: 200px
            }
        `

        const ItemWrap = styled.ul`
            text-align: center;
        `

        const Item = styled.li`
            font-size: 1rem;
            list-style: none;
            text-decoration: ${props => props.underline && "underline"};
            color: ${props => props.color || "#333"};
        `

        const GreenItem = styled(Item)`
            color: #fff;
            background-color: green;
        `

        const MoveItem = styled(Item)`
            animation: ${MyAnimation} 3s linear infinite;
        `

        return (
            <>
                <ItemWrap>
                    <Item>我是一个普通li</Item>
                    <Item underline>我是一个带underline的li</Item>
                    <Item color="red">我是一个红色的li</Item>
                    <GreenItem>我是GreenItem</GreenItem>
                    <MoveItem>我是移动Item</MoveItem>
                    <Item>感觉这玩意还不如直接写在style里面</Item>
                </ItemWrap>
                <br/>
                <div>
                    <div className="blue">外部的blue内容</div>
                    <div className={styles.blue}>引用module的blue内容</div>
                    <div className={styles.title}>Title的local样式</div>
                    <br/>
                    <div className="title">外部的title内容</div>
                    <div className="red">common文件外部red样式</div>
                    <div className={commonStyles.red}>common引入red样式</div>
                    <br/>
                    <div id={styles['module-style']}>
                        id作为样式
                        <div className={styles["child-style"]}>
                            子样式能识别吗
                        </div>
                    </div>
                    <div className={styles["style-after"]}>带after的伪元素</div>
                </div>
            </>
        )
    }
}
