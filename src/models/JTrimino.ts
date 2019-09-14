import * as THREE from 'three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino } from './SomeTrimino';
import { v4 as uuid } from 'uuid';

export class JTrimino extends SomeTrimino {
	uuid: String = uuid();
	meshes: THREE.Mesh[] = [];
	color: number = 0xff00dd;

	constructor() {
		super();

		var cube1 = lib.quickCube(this.color);
		var cube2 = lib.quickCube(this.color);
		var cube3 = lib.quickCube(this.color);
		var cube4 = lib.quickCube(this.color);

		cube1.position.set(0, constants.GRID_SIZE, 0);
		cube2.position.set(0, 0, 0);
		cube3.position.set(0, constants.GRID_SIZE * -1, 0);
		cube4.position.set(constants.GRID_SIZE * -1, constants.GRID_SIZE * -1, 0);

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
