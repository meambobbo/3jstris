import * as THREE from 'three';
import { SomeTrimino } from './SomeTrimino';
import * as constants from '../constants';

export abstract class SomeTrimino2 extends SomeTrimino {
	skeleton: THREE.Skeleton;

	constructor() {
		super();
		var bone: THREE.Bone = new THREE.Bone();
		this.skeleton = new THREE.Skeleton([bone]);
	}

	moveBone(direction: constants.Direction, magnitude: number): void {
			switch (direction) {
				case constants.Direction.Up:
					this.skeleton.bones[0].position.y += magnitude;
					break;
				case constants.Direction.Down:
					this.skeleton.bones[0].position.y -= magnitude;
					break;
				case constants.Direction.Left:
					this.skeleton.bones[0].position.x -= magnitude;
					break;
				case constants.Direction.Right:
					this.skeleton.bones[0].position.x += magnitude;
					break;
				default:
					throw Error("invalid direction");
					break;
			}
	}
}