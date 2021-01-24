import React, {Component} from 'react';
import './App.css';
import {Layout, Menu} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import RouteConfig from "./components/RouteConfig";
import {NavLink} from "react-router-dom";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    onCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={[]}
                        mode="inline"
                        defaultOpenKeys={["c"]}
                    >
                        <Menu.Item key="a" icon={<DesktopOutlined/>}>
                            <NavLink to="/home">首页</NavLink>
                        </Menu.Item>
                        <SubMenu key="b" icon={<PieChartOutlined/>} title="EChart">
                            <Menu.Item key="a1">
                                <NavLink to="/home/chart3d">3D</NavLink>
                            </Menu.Item>
                            <Menu.Item key="a2">
                                <NavLink to="/home/g2">FirstG2</NavLink>
                            </Menu.Item>
                            <Menu.Item key="a3">
                                <NavLink to="/home/antvg2">AntV实例</NavLink>
                            </Menu.Item>
                            <Menu.Item key="a4">
                                <NavLink to="/home/biz">BizCharts</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="c" icon={<UserOutlined/>} title="Plugins">
                            <Menu.Item key="c1">
                                <NavLink to="/home/style-comp">Style-Component</NavLink>
                            </Menu.Item>
                            <Menu.Item key="c2">
                                <NavLink to="/home/anime">Anime</NavLink>
                            </Menu.Item>
                            <Menu.Item key="c3">
                                <NavLink to="/home/full-screen">FullScreen</NavLink>
                            </Menu.Item>
                            <Menu.Item key="c4">
                                <NavLink to="/home/d3">D3</NavLink>
                            </Menu.Item>
                            <Menu.Item key="c5">
                                <NavLink to="/home/gojs">Gojs</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="d" icon={<TeamOutlined/>} title="Three">
                            <Menu.Item key="d1">
                                <NavLink to="/home/three">First Three</NavLink>
                            </Menu.Item>
                            <Menu.Item key="d2">
                                <NavLink to="/home/three-object">Three Object</NavLink>
                            </Menu.Item>
                            <Menu.Item key="d3">
                                <NavLink to="/home/earth">Earth</NavLink>
                            </Menu.Item>
                            <Menu.Item key="d4">
                                <NavLink to="/home/css3d">CSS3DRender</NavLink>
                            </Menu.Item>
                            <Menu.Item key="d5">
                                <NavLink to="/home/full-scene">全景</NavLink>
                            </Menu.Item>
                            <Menu.Item key="d5">
                                <NavLink to="/home/grain">粒子效果</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="e" icon={<TeamOutlined/>} title="WebAPI">
                            <Menu.Item key="e1">
                                <NavLink to="/home/dnd">Drag & Drop</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="f" icon={<TeamOutlined/>} title="Canvas">
                            <Menu.Item key="f1">
                                <NavLink to="/home/canvas">Example</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="z" icon={<FileOutlined/>}>
                            <NavLink to="/home">其他</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0, color: "#fff", textAlign: "center"}}>Header</Header>
                    <Content>
                        <div className="site-layout-background full-height" style={{padding: "24px 24px 0"}}>
                            <RouteConfig/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    };
}

export default App;
