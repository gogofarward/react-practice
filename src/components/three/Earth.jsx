import React, {Component} from 'react';
import * as THREE from "three";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls"
import imgEarth from "../../assets/image/earth.png"
import {Space} from "antd";

export default class Earth extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.drawEarth();
        this.drawRock();
    }

    drawEarth = () => {
        //render
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 400);
        renderer.setClearColor("#000");
        this.earthRef.appendChild(renderer.domElement);

        //scene
        let scene = new THREE.Scene();

        //camera
        var camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
        camera.position.set(25, 25, 25);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        //global
        let loader = new THREE.TextureLoader();
        let texture = loader.load(imgEarth);
        let material = new THREE.MeshLambertMaterial({
            map: texture
        })
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(3, 64, 64),
            material
        );
        sphere.rotation.x = -.5;
        scene.add(sphere);

        //light
        let directionalLight = new THREE.DirectionalLight("#fff");
        directionalLight.position.set(100, 0, 0);
        scene.add(directionalLight);
        let ambientLight = new THREE.AmbientLight("#fff", 0.2);
        scene.add(ambientLight);

        // 控制器
        let control = new TrackballControls(camera, renderer.domElement);

        const aniFun = () => {
            sphere.rotation.y -= 0.005;
            requestAnimationFrame(aniFun)
            //渲染
            renderer.render(scene, camera);
            control.update();
        }

        aniFun()
    }

    drawRock = () => {
        var scene, camera, renderer;
        var material, rocks, angle = 0;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(80, 2, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(800, 400);
        this.rockRef.appendChild(renderer.domElement);

        function loadRockTexture() {
            var textureLoader = new THREE.TextureLoader();
            textureLoader.crossOrigin = true;
            textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/rock-texture.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(2, 2);
                material = new THREE.MeshLambertMaterial({map: texture});
                rocks = [];
                for (var i = 0; i < 100; i++) {
                    var r = new Rock();
                    rocks.push(r);
                }
            });
        }

        function Rock() {
            // init
            var size = 10 + Math.random() * 10;
            var geometry = new THREE.IcosahedronGeometry(size, 0);
            var icosahedron = new THREE.Mesh(geometry, material);

            for (var i = 0, l = geometry.vertices.length; i < l; i++) {
                geometry.vertices[i].x += size * -0.25 + Math.random() * size * 0.5;
                geometry.vertices[i].y += size * -0.25 + Math.random() * size * 0.5;
            }

            // geometry.verticesNeedUpdate = true;

            // rotate cube
            let variance = 0.1;
            icosahedron.rotation.x = -variance + Math.random() * variance * 2;
            icosahedron.rotation.y = -variance + Math.random() * variance * 2;

            var field = 300;
            icosahedron.position.x = -field + Math.random() * field * 2;
            icosahedron.position.y = -field + Math.random() * field * 2;
            icosahedron.position.z = -field + Math.random() * field * 2;

            this.mesh = icosahedron;

            scene.add(icosahedron);
        }

        let light1 = new THREE.PointLight(0xFFFFFF);
        light1.position.set(300, 300, 0);
        scene.add(light1);

        let light2 = new THREE.PointLight(0xFFFFFF);
        light2.position.set(0, 300, 300);
        scene.add(light2);

        let render = () => {

            angle += 0.005;
            var z = 100 * Math.cos(angle);
            var y = 100 * Math.sin(angle);
            camera.position.z = z;
            camera.position.y = y;
            camera.rotation.x = z * 0.02;

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        loadRockTexture();
        render();
    }

    render() {
        return (
            <Space className="relative">
                <div ref={r => this.earthRef = r}>

                </div>
                <div ref={r => this.rockRef = r}
                     style={{
                         background: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/space-texture.jpg') no-repeat",
                         backgroundSize: "100% 100%"
                     }}>

                </div>
            </Space>
        )
    }
}
