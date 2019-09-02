import * as THREE from '../../node_modules/three';
import * as constants from '../constants';

export function quickCube(materialColor: number): THREE.Mesh {
	var geometryTemp = new THREE.BoxGeometry(
		constants.GRID_SIZE,
		constants.GRID_SIZE,
		constants.GRID_SIZE);
	var materialTemp = new THREE.MeshStandardMaterial({ color: materialColor });
	return new THREE.Mesh(geometryTemp, materialTemp);
}