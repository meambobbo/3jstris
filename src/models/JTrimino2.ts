import * as THREE from 'three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino2 } from './SomeTrimino2';
import { v4 as uuid } from 'uuid';

export class JTrimino2 extends SomeTrimino2 {
	uuid: String = uuid();
	color: number = 0xff00dd;

	constructor() {
		super();

		var cube1: THREE.SkinnedMesh = lib.quickSkinnedCube(this.color);
		var cube2: THREE.SkinnedMesh = lib.quickSkinnedCube(this.color);
		var cube3: THREE.SkinnedMesh = lib.quickSkinnedCube(this.color);
		var cube4: THREE.SkinnedMesh = lib.quickSkinnedCube(this.color);
		this.bone = new THREE.Bone();
		var bone2 = new THREE.Bone();
		var bone3 = new THREE.Bone();
		var bone4 = new THREE.Bone();
		this.bone.add(bone2);
		this.bone.add(bone3);
		this.bone.add(bone4);

		this.bone.position.set(0, -1, 0);
		let skeleton: THREE.Skeleton = new THREE.Skeleton([this.bone, bone2, bone3, bone4]);

		cube1.add(this.bone);
		cube2.add(bone2);
		cube3.add(bone3);
		cube4.add(bone4);
		cube1.bind(skeleton);
		cube2.bind(skeleton);
		cube3.bind(skeleton);
		cube4.bind(skeleton);

		cube1.position.set(0, 1, 0);
		cube2.position.set(0, 0, 0);
		cube3.position.set(0, -1, 0);
		cube4.position.set(-1, -1, 0);
		
		this.meshes.push(cube1, cube2, cube3, cube4);

		cube1.name = 'J1-' + this.uuid;
		cube2.name = 'J2-' + this.uuid;
		cube3.name = 'J3-' + this.uuid;
		cube4.name = 'J4-' + this.uuid;

		console.log('J2 created');
		console.log(this);
	}
}
