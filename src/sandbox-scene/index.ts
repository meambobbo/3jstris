import * as THREE from '../../node_modules/three';
import { JTrimino } from '../models/JTrimino';
import { LTrimino } from '../models/LTrimino';
import { OTrimino } from '../models/OTrimino';
import { STrimino } from '../models/STrimino';
import { ZTrimino } from '../models/ZTrimino';
import { ITrimino } from '../models/ITrimino';
import { TTrimino } from '../models/TTrimino';
import { JTrimino2 } from '../models/JTrimino2';
import * as c from '../constants';

function quickRand(): number {
  return (Math.random() - Math.random()) * 20;
}

export class SandboxScene {
  stop: boolean;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
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
  j2: JTrimino2;

  jSpin: number = Math.random();
  lSpin: number = Math.random();
  tSpin: number = Math.random();
  iSpin: number = Math.random();
  sSpin: number = Math.random();
  zSpin: number = Math.random();
  oSpin: number = Math.random();

  cube1: THREE.Mesh;
  cube2: THREE.Mesh;

  moveCounter: number = 0;
  moveDirection: c.Direction = c.Direction.Up;

  cameraMovementSpeed: number = -0.1;
  cameraMovementDirection: c.Direction = c.Direction.Left;

  constructor() {
    console.log('new SandboxScene');
    this.stop = false;
    this.bgCubes = [];

    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    window.addEventListener('resize', this.OnWindowResize, false);

    const geometry = new THREE.BoxGeometry(1, 4, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x8888ff });
    this.cube1 = new THREE.Mesh(geometry, material);
    this.cube1.position.set(2, 3, 5);

    var geometry2 = new THREE.BoxGeometry(1.5, 1.7, 1.5);
    var material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.set(-4, 3, 3);

    this.j = new JTrimino();
    this.l = new LTrimino();
    this.i = new ITrimino();
    this.s = new STrimino();
    this.z = new ZTrimino();
    this.t = new TTrimino();
    this.o = new OTrimino();
    this.j2 = new JTrimino2();
  }

  init(): void {
    // console.log('SandboxScene.init');
    this.initBgCubes(20);
    this.lights();
    this.addTriminos();
    this.scene.add(this.cube1);
    this.scene.add(this.cube2);
    document.body.append(this.renderer.domElement);
  }

  addTriminos(): void {
    this.j.move(c.Direction.Down, 3.0);
    this.j.move(c.Direction.Right, 2.0);
    this.j.addToScene(this.scene);

    this.l.move(c.Direction.Down, 3.0);
    this.l.move(c.Direction.Left, 2.0);
    this.l.addToScene(this.scene);

    this.o.move(c.Direction.Down, 3.0);
    this.o.move(c.Direction.Left, 5.0);
    this.o.addToScene(this.scene);

    this.z.move(c.Direction.Down, 3.0);
    this.z.move(c.Direction.Right, 5.0);
    this.z.addToScene(this.scene);

    this.s.move(c.Direction.Left, 8.0);
    this.s.addToScene(this.scene);

    this.i.move(c.Direction.Right, 8.0);
    this.i.addToScene(this.scene);

    this.t.move(c.Direction.Up, 8.0);
    this.t.addToScene(this.scene);

    // this.j2.moveBone(c.Direction.Up, 5.0);
    // this.j2.addToScene(this.scene);
  }

  initBgCubes(count: number): void {
    // console.log('SandboxScene.initBgCubes');
    for (var i = 0; i < count; i++) {
      this.addNewRandomCube();
    }
  }

  addNewRandomCube(): void {
    // console.log('SandboxScene.addNewRandomCube');
    var geometryTemp = new THREE.BoxGeometry(1, 1, 1);
    var materialTemp = new THREE.MeshStandardMaterial({ color: 0x8888ff });

    var cubeTemp = new THREE.Mesh(geometryTemp, materialTemp);
    cubeTemp.name = "hehe" + Math.random();
    cubeTemp.position.set(
      quickRand() * (window.innerWidth / window.innerHeight) * 1.5,
      quickRand() * 1.5, // / (window.innerWidth / window.innerHeight),
      Math.random() * .8 - 10);

    this.scene.add(cubeTemp);
    this.bgCubes.push(cubeTemp);
  }

  lights(): void {
    // console.log('SandboxScene.lights');
    // var light = new THREE.PointLight(0xddffff, 1, 100);
    // light.position.set(0, 0, 8);
    // this.scene.add(light);

    // var light2 = new THREE.PointLight(0xffffdd, 1, 50);
    // light2.position.set(15, 10, 10);
    // this.scene.add(light2);

    var ambLight = new THREE.AmbientLight(0xaa8888);
    // var ambLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambLight);

    var light3 = new THREE.PointLight(0xffffff, 0.50, 0);
    light3.position.set(4, 3, 8);
    this.scene.add(light3);

    var light4 = new THREE.PointLight(0xffffff, 0.50, 0);
    light4.position.set(-4, 3, 8);
    this.scene.add(light4);
  }


  Animate = () => {
    // console.log('SandboxScene.animate');
    if (!this.stop) {
      this.cube1.rotation.x += 0.01;
      this.cube1.rotation.y += 0.01;
      this.cube1.rotation.z += 0.04;

      this.cube2.rotation.x += 0.06;
      this.cube2.rotation.y += 0.01;
      this.cube2.rotation.z += 0.02;

      this.animateTriminos();
      this.animateBgCubes();
      this.animateCamera();

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.Animate);
    }
  }

  animateBgCubes(): void {
    if (this.bgCubeFrameTimer === 0) {
      var ind = Math.floor(Math.random() * this.bgCubes.length);
      if (this.scene.getObjectByName(this.bgCubes[ind].name)) {
        var obj: THREE.Object3D = this.scene.getObjectByName(
          this.bgCubes[ind].name) as THREE.Object3D;
        obj.position.set(
          quickRand() * (window.innerWidth / window.innerHeight) * 1.5,
          quickRand() * 1.5, 
          Math.random() * .8 - 10);
      }
      this.bgCubeFrameTimer = this.bgCubeWaitFrames;
    }

    this.bgCubeFrameTimer--;
  }

  animateTriminos(): void {

    if (this.moveCounter < 30) {
      this.moveCounter++;
    } else {
      // this.j.move(this.moveDirection, 1);
      this.l.move(this.moveDirection, 1);
      // this.i.move(this.moveDirection, 1);
      this.s.move(this.moveDirection, 1);
      this.z.move(this.moveDirection, 1);
      // this.t.move(this.moveDirection, 1);
      // this.o.move(this.moveDirection, 1);

      this.moveCounter = 0;
      switch (this.moveDirection) {
        case c.Direction.Up:
          this.moveDirection = c.Direction.Right;
          break;
        case c.Direction.Right:
          this.moveDirection = c.Direction.Down;
          break;
        case c.Direction.Down:
          this.moveDirection = c.Direction.Left;
          break;
        case c.Direction.Left:
          this.moveDirection = c.Direction.Up;
          break;
        default:
          // code...
          break;
      }
    }
  }

  createCamera(): THREE.PerspectiveCamera {
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    return camera;
  }

  createRenderer(): THREE.WebGLRenderer {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
    return renderer;
  }

  OnWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animateCamera(): void {
    if (this.camera.position.x >= 4.0 && this.cameraMovementDirection !== c.Direction.Left) {
      this.cameraMovementDirection = c.Direction.Left;
      this.cameraMovementSpeed *= -1.0;
    } else if (this.camera.position.x <= -4.0 && this.cameraMovementDirection !== c.Direction.Right) {
      this.cameraMovementDirection = c.Direction.Right;
      this.cameraMovementSpeed *= -1.0;
    }

    if (this.cameraMovementSpeed <= 0.1) {
      this.cameraMovementSpeed += 0.001;
    }

    if (this.cameraMovementDirection == c.Direction.Left) {
      this.camera.position.x += this.cameraMovementSpeed * -1.0;
    } else {
      this.camera.position.x += this.cameraMovementSpeed;
    }

    this.camera.lookAt(this.scene.position);
    this.camera.updateProjectionMatrix();
  }
}
