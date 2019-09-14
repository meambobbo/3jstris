import * as THREE from 'three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino2 } from './SomeTrimino2';
import { v4 as uuid } from 'uuid';
import GLTFLoader from 'three-gltf-loader';


export class LTrimino2 extends SomeTrimino2 {
	uuid: String = uuid();
	meshes: THREE.SkinnedMesh[] = [];
	color: number = 0xff00dd;
	scene: THREE.Scene;
	bone: THREE.Bone;
	ready: boolean = false;

	constructor() {
		super();

		this.skeleton = new THREE.Skeleton([new THREE.Bone()]);
		this.scene = new THREE.Scene();
		this.bone = new THREE.Bone();

		var loader: GLTFLoader = new GLTFLoader();
		loader.load('../assets/JTrimino.glb', (gltf: any) => {
			this.scene = gltf.scene;
			var bone: THREE.Bone = this.scene.getObjectByName('Bone') as THREE.Bone;
			if (bone) {
				bone.rotation.y = Math.PI;
				this.bone = bone;
			}
			this.ready = true;
		}, (progress: any) => {
			console.log('loading');
		}, (err: ErrorEvent) => {
			console.log(err);
		});
	}
}
