import * as THREE from 'three';
import { JTrimino } from '../models/JTrimino';
import { LTrimino } from '../models/LTrimino';
import { OTrimino } from '../models/OTrimino';
import { STrimino } from '../models/STrimino';
import { ZTrimino } from '../models/ZTrimino';
import { ITrimino } from '../models/ITrimino';
import { TTrimino } from '../models/TTrimino';
import { JTrimino2 } from '../models/JTrimino2';
import { LTrimino2 } from '../models/LTrimino2';
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
  l2: LTrimino2;

  l2x: LTrimino2;
  l2y: LTrimino2;
  l2z: LTrimino2;

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
  circleCameraFrameCount: number = 0;

  frameCounter: number = 0;

  rotationAxis: string = 'x';
  testSkinBox: THREE.SkinnedMesh;
  testSkinBoxBone: THREE.Bone;

  constructor() {
    console.log('new SandboxScene');
    this.stop = false;
    this.bgCubes = [];

    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.testSkinBox = new THREE.SkinnedMesh();
    this.testSkinBoxBone = new THREE.Bone();
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
    this.l2 = new LTrimino2();

    this.l2x = new LTrimino2();
    this.l2y = new LTrimino2();
    this.l2z = new LTrimino2();
  }

  init(): void {
    // console.log('SandboxScene.init');
    this.initBgCubes(40);
    this.lights();
    // this.addTriminos();
    this.addSkinnedTriminos();
    // this.scene.add(this.cube1);
    // this.scene.add(this.cube2);
    // this.addSkinnedBox();
    document.body.append(this.renderer.domElement);
  }

  addSkinnedBox() {
    var simpleGeom: THREE.Geometry = new THREE.BoxGeometry();
    var bufferGeom: THREE.BufferGeometry = new THREE.BufferGeometry().fromGeometry(simpleGeom);
    var position = bufferGeom.getAttribute('position');
    var skinInds = [];
    var skinWeights = [];
    for (let i = 0; i < position.count; i++) {
      skinInds.push(0, 0, 0, 0);
      skinWeights.push(1, 0, 0, 0);
    }
    bufferGeom.removeAttribute('skinIndex');
    bufferGeom.removeAttribute('skinWeight');

    bufferGeom.addAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinInds, 4));
    bufferGeom.addAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
    var mesh: THREE.SkinnedMesh = new THREE.SkinnedMesh(bufferGeom, new THREE.MeshStandardMaterial());
    mesh.scale.x = 6;
    mesh.scale.y = 4;

    var bone: THREE.Bone = new THREE.Bone();
    mesh.add(bone);
    mesh.bind(new THREE.Skeleton([bone]));
    this.scene.add(mesh);
    this.testSkinBox = mesh;
    this.testSkinBoxBone = mesh.skeleton.bones[0];
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
  }

  addSkinnedTriminos(): void {
    // this.l2.loadInto(this.scene);
    // this.l2.addToScene(this.scene);

    this.l2x.loadInto(this.scene);
    this.l2y.loadInto(this.scene);
    this.l2z.loadInto(this.scene);

    this.j2.addToScene(this.scene);
    this.j2.bone!.position.y = 8;
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
    this.frameCounter++;
    if (!this.stop) {

      if (this.frameCounter % (60) == 0) {
        this.l2x.bone.position.x = -10;
        this.l2z.bone.position.x = 10;

        this.l2x.rotateBone(c.Spin.CW, Math.PI / 2);
        this.l2y.rotateBone(c.Spin.CCW, Math.PI / 2);
        this.l2z.rotateBone(c.Spin.CW, Math.PI / 2);

        this.j2.rotateBone(c.Spin.CCW, Math.PI /8);
      }

      // this.animateTriminos();
      this.animateBgCubes();
      // this.animateCamera();
      this.animateCameraCircle();

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
    camera.position.set(0, 0, 40);
    camera.lookAt(0, 0, 0);
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

    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  animateCameraCircle(): void {
    // map a framecount to radians to make a full circle
    // r^2 = x^2 + y^2

    this.camera.position.x = (Math.cos(this.circleCameraFrameCount / 150.0 * Math.PI)) * 10;
    this.camera.position.y = (Math.sin(this.circleCameraFrameCount / 150.0 * Math.PI)) * 10;
    // this.camera.position.x += (Math.cos(this.circleCameraFrameCount / 150.0 * Math.PI)) * 0.55;
    // this.camera.position.y += (Math.sin(this.circleCameraFrameCount / 150.0 * Math.PI)) * 0.55;
    if (this.circleCameraFrameCount >= 300) {
      this.circleCameraFrameCount = -1;
    }
    this.circleCameraFrameCount++;
    this.camera.lookAt(this.scene.position);
    this.camera.updateProjectionMatrix();
  }
}