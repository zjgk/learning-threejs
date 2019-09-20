import React from "react";
import * as THREE from 'three';
import Demo2 from "./2"

// 旋转盒子
export default class Demo1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { val: "" };
  }
  componentDidMount(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
  }

  render() {
    console.log(this.props);
    const { dataList = {} } = this.props;
    const { list = [] } = dataList;
    return (
      <div>
        旋转盒子
        <Demo2/>
      </div>
    );
  }
}
