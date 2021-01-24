import React, {Component} from 'react';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Grain extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        this.setState({a: 1}, this.draw)
    }

    draw = () => {
        // 创建场景对象
        var scene = new THREE.Scene();

        // 粒子系统
        var geom = new THREE.Geometry();
        var material = new THREE.ParticleBasicMaterial({ //创建粒子模型
            size: 0.01, //粒子大小(默认1)
            vertexColors: true // 指定粒子颜色
        });
        var n = 1200; // 粒子数量
        for (var i = 0; i < 3000; i++) {
            var particle = new THREE.Vector3(
                (Math.random() - 0.5) * n,
                (Math.random() - 0.5) * n,
                (Math.random() - 0.5) * n
            );
            geom.vertices.push(particle);
            let color_ = Math.random();
            geom.colors.push(new THREE.Color(color_, color_, color_ * 0.6));
        }
        var cloud = new THREE.ParticleSystem(geom, material);

        scene.add(cloud)
        // 点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        // 相机设置
        var width = this.curRef.clientWidth;//窗口宽度
        var height = this.curRef.clientHeight;//窗口高度
        var k = width / height;//窗口宽高比
        var s = 200;//三维场景缩放系数
        // var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // 透视相机
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);  // 正交相机
        camera.position.set(200, 300, 200); // 设置相机位置
        camera.lookAt(scene.position); // 设置相机方向（指向的场景对象）

        // 创建渲染器对象
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 1); //设置背景颜色
        this.curRef.appendChild(renderer.domElement); //body元素中插入canvas对象

        //鼠标控制
        var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
        //渲染函数
        let T0 = new Date();//上次时间
        function render() {
            let T1 = new Date();//本次时间
            let t = T1 - T0;//时间差
            T0 = T1;//把本次时间赋值给上次时间
            requestAnimationFrame(render);//请求再次执行渲染函数render
            camera.rotateY(-0.00001*t);//让相机转动以此来实现整个场景的旋转
            camera.rotateX(0.000005*t);
            camera.rotateZ(0.000005*t);
            renderer.render(scene, camera);//执行渲染操作
            controls.addEventListener('change', render); //监听鼠标、键盘事件
        }

        //执行渲染函数
        render();
    }

    render() {
        return (
            <div ref={r => this.curRef = r} className="full-width full-height">

            </div>
        )
    }
}
