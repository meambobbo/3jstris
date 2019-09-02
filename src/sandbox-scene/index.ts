import * as THREE from '../../node_modules/three';

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 4, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x8888ff });
    this.cube1 = new THREE.Mesh(geometry, material);
    this.cube1.position.set(2, 0, 0);

    var geometry2 = new THREE.BoxGeometry(1.5, 1.7, 1.5);
    var material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.set(-4, 0, 0);

    document.body.appendChild(this.renderer.domElement);
  }

  init(): void {
    console.log('SandboxScene.init');
    this.initBgCubes(260);
    this.lights();
    this.scene.add(this.cube1);
    this.scene.add(this.cube2);
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
    var light = new THREE.PointLight(0x00ffff, 1, 100);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    var light2 = new THREE.PointLight(0xff0000, 1, 50);
    light2.position.set(-5, -5, 5);
    this.scene.add(light2);

    var light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(-2, -10, 2);
    this.scene.add(light3);

    var light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(2, 10, -2);
    this.scene.add(light4);
  }


  animate() {
    console.log('SandboxScene.animate');
    if (!this.stop) {

      this.cube1.rotation.x += 0.01;
      this.cube1.rotation.y += 0.01;
      this.cube1.rotation.z += 0.04;

      this.cube2.rotation.x += 0.06;
      this.cube2.rotation.y += 0.01;
      this.cube2.rotation.z += 0.02;

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
      
      this.bgCubeFrameTimer --;
      this.renderer.render(this.scene, this.camera);
    }
  }
}
