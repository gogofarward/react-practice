import React, {Component} from 'react';
import * as THREE from "three"
import {Font} from "three"
import {Space} from "antd";
import fontOptimer from "../../assets/fonts/optimer_regular.typeface"

export default class FirstThree extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.cube();
        this.line();
        this.cube2();
        this.global();
        this.torusKnot();
        this.text();
    }

    cube = () => {

        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        renderer.setClearColor("#bcedf2");
        this.cubeRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        let camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 10);
        // let camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
        camera.position.set(0, 0, 2);
        // camera.position.set(4, -3, 5);
        // camera.lookAt(new THREE.Vector3(0, 0, 0))
        scene.add(camera);

        //cube
        let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
            color: "#995fff",
            wireframe: true,
        }));
        scene.add(cube);

        //渲染
        renderer.render(scene, camera);

    }

    line = () => {
        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        renderer.setClearColor("#acf2bf");
        this.lineRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        let camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 1, 100);
        camera.position.set(0, -25, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        scene.add(camera);

        //geometry
        const geometry = new THREE.Geometry();
        const material = new THREE.LineBasicMaterial({vertexColors: true});
        const p1 = new THREE.Vector3(-2, 0, 0);
        const p2 = new THREE.Vector3(2, 0, 0);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        const color1 = new THREE.Color("red");
        const color2 = new THREE.Color("blue");
        geometry.colors.push(color1);
        geometry.colors.push(color2);

        for (let i = 0; i <= 5; i++) {

            const line = new THREE.Line(geometry, material);
            line.position.z = i * 0.8 - 2;
            scene.add(line);

            const line1 = new THREE.Line(geometry, material);
            line1.position.x = i * 0.8 - 2;
            line1.rotation.y = Math.PI / 2;
            scene.add(line1)
        }

        //渲染
        renderer.render(scene, camera);
    }

    cube2 = () => {
        // 调用渲染器
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        this.cubeRef2.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000);

// 调用场景
        var scene = new THREE.Scene();

// 调用相机
        var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
        camera.position.set(25, 25, 25);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

// 新建一个几何体(长方体)
        var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 4, 6), new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        }));

        scene.add(cube);

        // x-axis
        var xGeo = new THREE.Geometry();
        xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        xGeo.vertices.push(new THREE.Vector3(3, 0, 0));
        var xMat = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        var xAxis = new THREE.Line(xGeo, xMat);
        scene.add(xAxis);

        // y-axis
        var yGeo = new THREE.Geometry();
        yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        yGeo.vertices.push(new THREE.Vector3(0, 3, 0));
        var yMat = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        var yAxis = new THREE.Line(yGeo, yMat);
        scene.add(yAxis);

        // z-axis
        var zGeo = new THREE.Geometry();
        zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        zGeo.vertices.push(new THREE.Vector3(0, 0, 3));
        var zMat = new THREE.LineBasicMaterial({
            color: 0x00ccff
        });
        var zAxis = new THREE.Line(zGeo, zMat);
        scene.add(zAxis);

        //渲染
        renderer.render(scene, camera);
    }

    global = () => {
        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        renderer.setClearColor("#c6aaf2");
        this.globalRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
        camera.position.set(25, 25, 25);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        //global
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(3, 18, 16),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            })
        );
        scene.add(sphere);

        const aniFun = () => {
            sphere.rotation.y -= 0.005;
            requestAnimationFrame(aniFun)
            //渲染
            renderer.render(scene, camera);
        }

        aniFun()
    }

    torusKnot = () => {
        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        renderer.setClearColor("#f2cbd1");
        this.torusKnotRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
        camera.position.set(25, 25, 25);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        //torus
        var torus = new THREE.Mesh(
            new THREE.TorusKnotGeometry(2, 0.6, 36, 16),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            })
        );
        scene.add(torus);

        //渲染
        renderer.render(scene, camera);
    }

    text = () => {
        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 300);
        renderer.setClearColor("#c6aaf2");
        this.textRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        var camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 100);
        camera.position.set(8, 8, 20);
        camera.lookAt(new THREE.Vector3(2.5, .8, 0));
        scene.add(camera);

        //torus
        // 定义材质
        var material = new THREE.MeshLambertMaterial({
            color: 0xffff00
        });

        // 中文字符不能解析
        var mesh = new THREE.Mesh(new THREE.TextGeometry('hello', {
            font: new Font(fontOptimer),
            size: 2,
            height: 1
        }), material);

        scene.add(mesh);

        // 加上一束方向光
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 0, 0.5);
        scene.add(light);

        renderer.render(scene, camera);
    }

    render() {
        return (
            <div>
                <Space size={24}>
                    <div ref={r => this.cubeRef = r}/>
                    <div ref={r => this.lineRef = r}/>
                    <div ref={r => this.cubeRef2 = r}/>
                </Space>
                <Space size={24}>
                    <div ref={r => this.globalRef = r}/>
                    <div ref={r => this.torusKnotRef = r}/>
                    <div ref={r => this.textRef = r}/>
                </Space>
            </div>
        )
    }
}
