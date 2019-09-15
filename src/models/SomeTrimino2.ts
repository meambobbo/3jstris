import * as THREE from 'three';
import { SomeTrimino } from './SomeTrimino';
import * as constants from '../constants';

export abstract class SomeTrimino2 extends SomeTrimino {
	bone?: THREE.Bone;
	mesh?: THREE.SkinnedMesh;

	// constructor() {
	// 	super();
	// 	this.bone: THREE.Bone = new THREE.Bone();
	// }

	moveBone(direction: constants.Direction, magnitude: number): void {
		switch (direction) {
			case constants.Direction.Up:
				this.bone!.position.y += magnitude;
				break;
			case constants.Direction.Down:
				this.bone!.position.y -= magnitude;
				break;
			case constants.Direction.Left:
				this.bone!.position.x -= magnitude;
				break;
			case constants.Direction.Right:
				this.bone!.position.x += magnitude;
				break;
			default:
				throw Error("invalid direction");
				break;
		}
	}

	rotateBone(spin: constants.Spin, radians: number): void {
		switch (spin) {
			case constants.Spin.CW:
				this.bone!.rotateY(radians);
				break;
			case constants.Spin.CCW:
				this.bone!.rotateY(-1 * radians);
				break;
		}
	}
}