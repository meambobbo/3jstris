import * as THREE from 'three';
import * as constants from '../constants';

export abstract class SomeTrimino {
	meshes: THREE.Mesh[] = [];

	move(direction: constants.Direction, magnitude: number): void {
		for (var i = 0; i < this.meshes.length; i++) {
			const mesh: THREE.Mesh = this.meshes[i];
			switch (direction) {
				case constants.Direction.Up:
					mesh.position.y += magnitude;
					break;
				case constants.Direction.Down:
					mesh.position.y -= magnitude;
					break;
				case constants.Direction.Left:
					mesh.position.x -= magnitude;
					break;
				case constants.Direction.Right:
					mesh.position.x += magnitude;
					break;
				default:
					throw Error("invalid direction");
					break;
			}
		}
	}

	addToScene(scene: THREE.Scene) {
		for (var i = 0; i < this.meshes.length; i++) {
			const mesh: THREE.Mesh = this.meshes[i];
			scene.add(mesh);
		}
	}
}