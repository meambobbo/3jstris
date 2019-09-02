import * as THREE from '../../node_modules/three';
import * as constants from '../constants';
import * as lib from './lib';
import { SomeTrimino } from './SomeTrimino';
import { v4 as uuid } from 'uuid';

export class OTrimino extends SomeTrimino {
	uuid: String = uuid();
	meshes: THREE.Mesh[] = [];
	color: number = 0xffff00;

	constructor() {
		super();

		var cube1 = lib.quickCube(this.color);
		var cube2 = lib.quickCube(this.color);
		var cube3 = lib.quickCube(this.color);
		var cube4 = lib.quickCube(this.color);

		cube1.position.set(0, constants.GRID_SIZE, 0);
		cube2.position.set(constants.GRID_SIZE, constants.GRID_SIZE, 0);
		cube3.position.set(constants.GRID_SIZE, 0, 0);
		cube4.position.set(0, 0, 0);

		cube1.name = 'O1-' + this.uuid;
		cube2.name = 'O2-' + this.uuid;
		cube3.name = 'O3-' + this.uuid;
		cube4.name = 'O4-' + this.uuid;

		this.meshes.push(cube1);
		this.meshes.push(cube2);
		this.meshes.push(cube3);
		this.meshes.push(cube4);
	}
}
