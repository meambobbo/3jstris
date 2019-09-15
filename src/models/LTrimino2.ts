import * as THREE from 'three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino2 } from './SomeTrimino2';
import { v4 as uuid } from 'uuid';
import GLTFLoader from 'three-gltf-loader';

export class LTrimino2 extends SomeTrimino2 {
	uuid: String = uuid();
	mesh: THREE.SkinnedMesh;
	color: number = 0xff00dd;
	bone: THREE.Bone;
	ready: boolean = false;

	constructor() {
		super();
		this.bone = new THREE.Bone();
		this.mesh = new THREE.SkinnedMesh();
	}

	loadInto(scene: THREE.Scene) {
		var loader: GLTFLoader = new GLTFLoader();
		loader.load('../assets/JTrimino.glb', (gltf: any) => {
			console.log('loaded, importing into scene');
			console.log('gltf.scene');
			console.log(gltf);
			this.mesh = gltf.scene.getObjectByName('Cube', true);
			this.mesh.scale.y = 1; // set this from 3 to 1 - will reset it with the bone, so it follows rotations

			this.bone = gltf.scene.getObjectByName('Bone', true);
			this.mesh.add(this.bone);
			this.mesh.bind(new THREE.Skeleton([this.bone]));

			scene.add(this.mesh);
			this.bone.scale.x = 3; // setting scale to match the mesh export from Blender
			this.bone.rotateX(Math.PI / -2); // this aligns the trimino to the gameboard
			this.ready = true;
			
			console.log('asset loaded into scene');
			console.log(this.mesh);
			console.log(this.bone);

		}, (progress: any) => {
			console.log('loading');
		}, (err: ErrorEvent) => {
			console.log(err);
		});
	}

	skinIndicesAndWeights(geometry: THREE.BufferGeometry) {
		var position: THREE.BufferAttribute = geometry.attributes.position as THREE.BufferAttribute;
		var vertex = new THREE.Vector3();
		var skinIndices = [];
		var skinWeights = [];

		for (var i = 0; i < position.count; i++) {
			vertex.fromBufferAttribute(position, i);
			skinIndices.push(0, 0, 0, 0);
			skinWeights.push(1, 0, 0, 0);
		}
		geometry.removeAttribute('skinIndex');
		geometry.removeAttribute('skinWeight');
		geometry.addAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
		geometry.addAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
	}
}
