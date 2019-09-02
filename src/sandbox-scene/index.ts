import * as THREE from '../../node_modules/three';
import { JTrimino } from '../models/JTrimino';
import { LTrimino } from '../models/LTrimino';
import { OTrimino } from '../models/OTrimino';
import { STrimino } from '../models/STrimino';
import { ZTrimino } from '../models/ZTrimino';
import { ITrimino } from '../models/ITrimino';
import { TTrimino } from '../models/TTrimino';
import * as constants from '../constants';

function quickRand(): number {
  return (Math.random() - Math.random()) * 20;
}

export class SandboxScene {
  stop: boolean;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  bgCubes: THREE.Mesh[];
  bgCubeFrameTimer: number = 10;
  bgCubeWaitFrames: number = 10;
  j: JTrimino;
  l: LTrimino;
  t: TTrimino;
  i: ITrimino;
  s: STrimino;
  z: ZTrimino;
  o: OTrimino;

  jSpin: number = Math.random();
  lSpin: number = Math.random();
  tSpin: number = Math.random();
  iSpin: number = Math.random();
  sSpin: number = Math.random();
  zSpin: number = Math.random();
  oSpin: number = Math.random();

  cube1: THREE.Mesh;
  cube2: THREE.Mesh;

  constructor() {
    console.log('new SandboxScene');
    this.stop = false;
    this.bgCubes = [];

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);

    const geometry = new THREE.BoxGeometry(1, 4, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x8888ff });
    this.cube1 = new THREE.Mesh(geometry, material);
    this.cube1.position.set(2, 3, 0);

    var geometry2 = new THREE.BoxGeometry(1.5, 1.7, 1.5);
    var material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.set(-4, 3, 0);

    this.j = new JTrimino();
    this.l = new LTrimino();
    this.i = new ITrimino();
    this.s = new STrimino();
    this.z = new ZTrimino();
    this.t = new TTrimino();
    this.o = new OTrimino();

    document.body.appendChild(this.renderer.domElement);
  }

  init(): void {
    console.log('SandboxScene.init');
    this.initBgCubes(260);
    this.lights();
    this.addTriminos();
    // this.scene.add(this.cube1);
    // this.scene.add(this.cube2);
  }

  addTriminos() {

    this.j.move(constants.Direction.Down, 3.0);
    this.j.move(constants.Direction.Right, 2.0);
    this.j.addToScene(this.scene);

    this.l.move(constants.Direction.Down, 3.0);
    this.l.move(constants.Direction.Left, 2.0);
    this.l.addToScene(this.scene);

    this.o.move(constants.Direction.Down, 3.0);
    this.o.move(constants.Direction.Left, 5.0);
    this.o.addToScene(this.scene);

    this.z.move(constants.Direction.Down, 3.0);
    this.z.move(constants.Direction.Right, 5.0);
    this.z.addToScene(this.scene);

    this.s.move(constants.Direction.Left, 8.0);
    this.s.addToScene(this.scene);

    this.i.move(constants.Direction.Right, 8.0);
    this.i.addToScene(this.scene);

    this.t.addToScene(this.scene);
  }

  initBgCubes(count: number) {
    console.log('SandboxScene.initBgCubes');
    for (var i = 0; i < count; i++) {
      this.addNewRandomCube();
    }
  }

  addNewRandomCube() {
    console.log('SandboxScene.addNewRandomCube');
    var geometryTemp = new THREE.BoxGeometry(1, 1, 1);
    var materialTemp = new THREE.MeshStandardMaterial({ color: 0x8888ff });

    var cubeTemp = new THREE.Mesh(geometryTemp, materialTemp);
    cubeTemp.name = "hehe" + Math.random();
    cubeTemp.position.set(
      quickRand() * (window.innerWidth / window.innerHeight),
      quickRand(), // / (window.innerWidth / window.innerHeight),
      Math.random() * .8 - 10);

    this.scene.add(cubeTemp);
    this.bgCubes.push(cubeTemp);
  }

  lights() {
    console.log('SandboxScene.lights');
    var light = new THREE.PointLight(0x88ffff, 1, 100);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    var light2 = new THREE.PointLight(0xff8888, 1, 50);
    light2.position.set(-5, -5, 5);
    this.scene.add(light2);

    var light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(-2, -10, 2);
    this.scene.add(light3);

    var light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(2, 10, -2);
    this.scene.add(light4);
  }


  Animate = () => {
    console.log('SandboxScene.animate');
    if (!this.stop) {

      requestAnimationFrame(this.Animate);

      this.cube1.rotation.x += 0.01;
      this.cube1.rotation.y += 0.01;
      this.cube1.rotation.z += 0.04;

      this.cube2.rotation.x += 0.06;
      this.cube2.rotation.y += 0.01;
      this.cube2.rotation.z += 0.02;

      this.j.move(constants.Direction.Left, Math.random() *0.05);
      this.l.move(constants.Direction.Left, Math.random() *0.05);
      this.i.move(constants.Direction.Left, Math.random() *0.05);
      this.s.move(constants.Direction.Left, Math.random() *0.05);
      this.z.move(constants.Direction.Left, Math.random() *0.05);
      this.t.move(constants.Direction.Left, Math.random() *0.05);
      this.o.move(constants.Direction.Left, Math.random() *0.05);

      this.j.move(constants.Direction.Right, Math.random() *0.05);
      this.l.move(constants.Direction.Right, Math.random() *0.05);
      this.i.move(constants.Direction.Right, Math.random() *0.05);
      this.s.move(constants.Direction.Right, Math.random() *0.05);
      this.z.move(constants.Direction.Right, Math.random() *0.05);
      this.t.move(constants.Direction.Right, Math.random() *0.05);
      this.o.move(constants.Direction.Right, Math.random() *0.05);

      this.j.move(constants.Direction.Up, Math.random() *0.05);
      this.l.move(constants.Direction.Up, Math.random() *0.05);
      this.i.move(constants.Direction.Up, Math.random() *0.05);
      this.s.move(constants.Direction.Up, Math.random() *0.05);
      this.z.move(constants.Direction.Up, Math.random() *0.05);
      this.t.move(constants.Direction.Up, Math.random() *0.05);
      this.o.move(constants.Direction.Up, Math.random() *0.05);

      this.j.move(constants.Direction.Down, Math.random() *0.05);
      this.l.move(constants.Direction.Down, Math.random() *0.05);
      this.i.move(constants.Direction.Down, Math.random() *0.05);
      this.s.move(constants.Direction.Down, Math.random() *0.05);
      this.z.move(constants.Direction.Down, Math.random() *0.05);
      this.t.move(constants.Direction.Down, Math.random() *0.05);
      this.o.move(constants.Direction.Down, Math.random() *0.05);

      if (this.bgCubeFrameTimer === 0) {
        var ind = Math.floor(Math.random() * this.bgCubes.length);
        if (this.scene.getObjectByName(this.bgCubes[ind].name)) {
          var obj: THREE.Object3D = this.scene.getObjectByName(
            this.bgCubes[ind].name) as THREE.Object3D;
          this.scene.remove(obj as THREE.Object3D);
          this.bgCubes.splice(ind, 1);
          this.addNewRandomCube();
        }
        this.bgCubeFrameTimer = this.bgCubeWaitFrames;
      }

      this.bgCubeFrameTimer--;
      this.renderer.render(this.scene, this.camera);
    }
  }
}
