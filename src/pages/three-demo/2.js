import React from "react";
import * as THREE from 'three';

// 折线
export default class Demo2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { val: "" };
  }
  componentDidMount() {
    this.init();
  }
  init=()=>{
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    //create a blue LineBasicMaterial
    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));
    var line = new THREE.Line(geometry, material);
    scene.add(line);
    renderer.render(scene, camera);
  }

  render() {
    console.log(this.props);
    const { dataList = {} } = this.props;
    const { list = [] } = dataList;
    return (
      <div>
        线
      </div>
    );
  }
}
