import React, {Component} from 'react';
import {Route} from "react-router-dom";
import EChart3D from "./eChart/EChart3D";
import HomePage from "./home/HomePage";
import AntV from "./eChart/antv";
import StyleComponent from "./plugins/StyleComponent";
import ThreeObject from "./three/ThreeObject";
import Anime from "./plugins/Anime";
import FullScreen from "./plugins/FullScreen";
import D3 from "./plugins/d3";
import GoJs from "./plugins/gojs";
import FirstG2 from "./eChart/g2";
import BizCharts from "./eChart/biz";
import FirstThree from "./three/FirstThree";
import DnD from "./webapi/DnD";
import Canvas from "./canvas";
import Earth from "./three/Earth";
import Chemistry from "./three/Chemistry";
import Grain from "./three/Grain";

export default class RouteConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Route exact path="/home" component={HomePage}/>
                <Route path="/home/chart3d" component={EChart3D}/>
                <Route path="/home/antvg2" component={AntV}/>
                <Route path="/home/g2" component={FirstG2}/>
                <Route path="/home/biz" component={BizCharts}/>
                <Route path="/home/style-comp" component={StyleComponent}/>
                <Route path="/home/three" component={FirstThree}/>
                <Route path="/home/three-object" component={ThreeObject}/>
                <Route path="/home/anime" component={Anime}/>
                <Route path="/home/full-screen" component={FullScreen}/>
                <Route path="/home/d3" component={D3}/>
                <Route path="/home/gojs" component={GoJs}/>
                <Route path="/home/dnd" component={DnD}/>
                <Route path="/home/canvas" component={Canvas}/>
                <Route path="/home/earth" component={Earth}/>
                <Route path="/home/css3d" component={Chemistry}/>
                <Route path="/home/grain" component={Grain}/>
            </>
        )
    }
}
