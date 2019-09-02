import * as THREE from '../../node_modules/three';
import * as c from '../constants';
import * as lib from './lib';
import { SomeTrimino } from './SomeTrimino';
import { v4 as uuid } from 'uuid';

export class ZTrimino extends SomeTrimino {
	uuid: String = uuid();
	meshes: THREE.Mesh[] = [];
	color: number = 0xff0000;

	constructor() {
		super();

		var cube1 = lib.quickCube(this.color);
		var cube2 = lib.quickCube(this.color);
		var cube3 = lib.quickCube(this.color);
		var cube4 = lib.quickCube(this.color);

		cube1.position.set(c.GRID_SIZE * -1, c.GRID_SIZE, 0);
		cube2.position.set(0, c.GRID_SIZE, 0);
		cube3.position.set(0, 0, 0);
		cube4.position.set(c.GRID_SIZE, 0, 0);

		cube1.name = 'Z1-' + this.uuid;
		cube2.name = 'Z2-' + this.uuid;
		cube3.name = 'Z3-' + this.uuid;
		cube4.name = 'Z4-' + this.uuid;

		this.meshes.push(cube1);
		this.meshes.push(cube2);
		this.meshes.push(cube3);
		this.meshes.push(cube4);
	}
}
