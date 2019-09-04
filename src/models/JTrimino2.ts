import * as THREE from '../../node_modules/three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino2 } from './SomeTrimino2';
import { v4 as uuid } from 'uuid';

export class JTrimino2 extends SomeTrimino2 {
	uuid: String = uuid();
	meshes: THREE.SkinnedMesh[] = [];
	color: number = 0xff00dd;
	skeleton: THREE.Skeleton;

	constructor() {
		super();

		var cube1 = lib.quickSkinnedCube(this.color);
		var cube2 = lib.quickSkinnedCube(this.color);
		var cube3 = lib.quickSkinnedCube(this.color);
		var cube4 = lib.quickSkinnedCube(this.color);

		var rootBone: THREE.Bone = new THREE.Bone();
		var cube1Bone: THREE.Bone = new THREE.Bone();
		var cube2Bone: THREE.Bone = new THREE.Bone();
		var cube3Bone: THREE.Bone = new THREE.Bone();
		var cube4Bone: THREE.Bone = new THREE.Bone();
		rootBone.add(cube1Bone);
		rootBone.add(cube2Bone);
		rootBone.add(cube3Bone);
		rootBone.add(cube4Bone);

		// bone.position.set(-1,-1, 0);
		var bones: THREE.Bone[] = [rootBone, cube1Bone, cube2Bone, cube3Bone, cube4Bone];
		this.skeleton = new THREE.Skeleton(bones);

		cube1.add(cube1Bone);
		cube2.add(cube2Bone);
		cube3.add(cube3Bone);
		cube4.add(cube4Bone);
		cube1.bind(this.skeleton);
		cube2.bind(this.skeleton);
		cube3.bind(this.skeleton);
		cube4.bind(this.skeleton);

		cube1Bone.position.set(0, constants.GRID_SIZE, 0);
		cube2Bone.position.set(0, 0, 0);
		cube3Bone.position.set(0, constants.GRID_SIZE * -1, 0);
		cube4Bone.position.set(constants.GRID_SIZE * -1, constants.GRID_SIZE * -1, 0);

		cube1.name = 'J1-' + this.uuid;
		cube2.name = 'J2-' + this.uuid;
		cube3.name = 'J3-' + this.uuid;
		cube4.name = 'J4-' + this.uuid;

		this.meshes.push(cube1);
		this.meshes.push(cube2);
		this.meshes.push(cube3);
		this.meshes.push(cube4);
	}
}
