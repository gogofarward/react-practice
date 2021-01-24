import React, {Component} from 'react';
import * as THREE from "three";
import {CSS3DObject, CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {elementTable} from "../../assets/data/chemistryElement";
import styles from "../../assets/css/threejs/chemist.module.css";
import {TWEEN} from "../../utils/tween.module.min";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

export default class Chemistry extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({a: 1}, this.drawChem)
    }

    drawChem = () => {

        //渲染器
        const {clientHeight, clientWidth} = this.chemRef;
        const renderer = new CSS3DRenderer();
        renderer.setSize(clientWidth, clientHeight);
        this.chemRef.appendChild(renderer.domElement);

        //相机
        const camera = new THREE.PerspectiveCamera(50, clientWidth / clientHeight, 1, 10000);
        camera.position.z = 3000;

        //场景
        const scene = new THREE.Scene();

        const shapes = {table: [], sphere: [], helix: [], grid: []}, objects = [];
        //添加元素
        for (let i = 0; i < elementTable.length; i += 5) {

            let element = document.createElement('div');
            element.className = styles.element;
            element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

            let number = document.createElement('div');
            number.className = styles.number;
            number.textContent = (i / 5) + 1;
            element.appendChild(number);

            let symbol = document.createElement('div');
            symbol.className = styles.symbol;
            symbol.textContent = elementTable[i];
            element.appendChild(symbol);

            let details = document.createElement('div');
            details.className = styles.details;
            details.innerHTML = elementTable[i + 1] + '<br>' + elementTable[i + 2];
            element.appendChild(details);

            const cssObject = new CSS3DObject(element);
            scene.add(cssObject);
            objects.push(cssObject);

            //添加table形态
            const object3d = new THREE.Object3D();
            object3d.position.x = (elementTable[i + 3] * 140) - 1330;
            object3d.position.y = -(elementTable[i + 4] * 180) + 990;

            shapes.table.push(object3d);
        }

        for (let i = 0, l = objects.length; i < objects.length; i++) {

            //sphere
            const vector1 = new THREE.Vector3();
            let phi = Math.acos(-1 + (2 * i) / l);
            let theta = Math.sqrt(l * Math.PI) * phi;

            let object1 = new THREE.Object3D();
            object1.position.setFromSphericalCoords(800, phi, theta);
            vector1.copy(object1.position).multiplyScalar(2);

            object1.lookAt(vector1);
            shapes.sphere.push(object1);

            //helix
            const vector2 = new THREE.Vector3();
            let theta2 = i * 0.175 + Math.PI;
            let y = -(i * 8) + 450;
            let object2 = new THREE.Object3D();

            object2.position.setFromCylindricalCoords(900, theta2, y);

            vector2.x = object2.position.x * 2;
            vector2.y = object2.position.y;
            vector2.z = object2.position.z * 2;

            object2.lookAt(vector2);
            shapes.helix.push(object2);

            //grid
            let object3 = new THREE.Object3D();
            object3.position.x = ((i % 5) * 400) - 800;
            object3.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800;
            object3.position.z = (Math.floor(i / 25)) * 1000 - 2000;

            shapes.grid.push(object3)
        }

        //渲染
        const render = () => {
            renderer.render(scene, camera);
        }

        let count = 0, duration = 2000;

        //animate
        const objectTransform = count => {

            let target = Object.values(shapes)[count];
            TWEEN.removeAll();

            objects.forEach((object, index) => {
                let targetObject = target[index];
                new TWEEN.Tween(object.position)
                    .to({
                        x: targetObject.position.x,
                        y: targetObject.position.y,
                        z: targetObject.position.z
                    }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();

                new TWEEN.Tween(object.rotation)
                    .to({
                        x: targetObject.rotation.x,
                        y: targetObject.rotation.y,
                        z: targetObject.rotation.z
                    }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
            })

            new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start();
        }

        //第一次执行
        objectTransform(count);

        //每隔6s再执行
        setInterval(() => {
            objectTransform(++count % 4)
        }, 5000)

        //控制器
        const controls = new TrackballControls(camera, renderer.domElement);

        const animate = () => {

            TWEEN.update();
            controls.update();

            requestAnimationFrame(animate);
        }

        animate();
    }

    render() {
        return (
            <div ref={r => this.chemRef = r} className="full-height bg-black">

            </div>
        )
    }
}
