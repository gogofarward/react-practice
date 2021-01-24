import React, {Component} from 'react';
import {DeleteOutlined, LineChartOutlined, PieChartOutlined, TableOutlined} from "@ant-design/icons";
import {Button, Divider, Input, Space} from "antd";
import {readClip, writeClip} from "../../utils/webUtil";
import ResizeObserver from "resize-observer-polyfill";

export default class DragAndDrop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clipText: "",
            resizeNumber: 50
        };
    }

    componentDidMount() {

        this.textEl.ondragstart = ev => {
            console.log("dragstart");
            ev.dataTransfer.setData("txtId", "hello world");
        }

        this.AreaEl.ondragover = ev => {
            ev.preventDefault();
            console.log("dragover");
        }

        this.AreaEl.ondrop = ev => {
            this.AreaEl.appendChild(this.textEl);
            console.log("drop", ev.dataTransfer.getData("txtId"));
        }

        let observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                console.log(entry.contentRect);
                entry.target.style.color = "green";
                if (entry.contentRect.width > 200) {
                    entry.target.style.color = "red";
                }
            })
        })

        observer.observe(this.resizeBtn)
    }

    dragStart = event => {
        event.dataTransfer.setData("dragEl", event.target.id)
    }

    dragOver = event => {
        event.preventDefault();
    }

    drop = event => {
        let id = event.dataTransfer.getData("dragEl");
        console.log(id)
        if (id) {
            document.getElementById(id).remove();
        }
    }

    clip = () => {
        let text = this.copyInput.state.value;
        // navigator.clipboard.writeText(text);
        writeClip(text).then(result => console.log(text, result));
    }

    paste = () => {
        readClip().then(result => {
            console.log(result)
            this.setState({clipText: result});
        });
    }

    resize = event => {
        // console.log(event.target.valueAsNumber)
        this.setState({resizeNumber: event.target.valueAsNumber})
    }

    render() {
        return (
            <div>
                <div ref={r => this.textEl = r} draggable={true}>文字元素</div>
                <Space>
                    <div ref={r => this.AreaEl = r} style={{width: 400, height: 400, border: "1px solid blue"}}>
                        <Space>
                            <div draggable={true} onDragStart={this.dragStart} id="icon1">
                                <LineChartOutlined/>
                            </div>
                            <div draggable={true} onDragStart={this.dragStart} id="icon2">
                                <TableOutlined/>
                            </div>
                            <div draggable={true} onDragStart={this.dragStart} id="icon3">
                                <PieChartOutlined/>
                            </div>
                        </Space>
                    </div>
                    <div onDragOver={this.dragOver} onDrop={this.drop}>
                        <DeleteOutlined style={{fontSize: 40}}/>
                    </div>
                </Space>

                <Divider orientation="left">clipboard</Divider>
                <Space>
                    <Input ref={r => this.copyInput = r}/>
                    <Button onClick={this.clip}>复制到粘贴板</Button>
                </Space>
                <br/>
                <Space>
                    <Input value={this.state.clipText}/>
                    <Button onClick={this.paste}>获取粘贴板</Button>
                </Space>
                <Divider orientation="left">resize</Divider>
                <input
                    onChange={(event) => this.resize(event)}
                    type="range"
                    min={10}
                    max={100}
                    defaultValue={this.state.resizeNumber}/>
                <Button ref={r => this.resizeBtn = r}
                        style={{color: "#333", width: this.state.resizeNumber * 3}}>颜色和宽度变化</Button>
            </div>
        )
    }
}
