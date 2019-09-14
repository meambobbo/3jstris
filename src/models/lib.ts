import * as THREE from 'three';
import * as c from '../constants';

export function quickCube(materialColor: number): THREE.Mesh {
	var geometryTemp = new THREE.BoxGeometry(
		c.GRID_SIZE,
		c.GRID_SIZE,
		c.GRID_SIZE);
	var materialTemp = new THREE.MeshStandardMaterial({ color: materialColor });
	return new THREE.Mesh(geometryTemp, materialTemp);
}

export function quickSkinnedCube(materialColor: number): THREE.SkinnedMesh {
	var geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

	var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0] );

	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

	var material = new THREE.MeshStandardMaterial({ color: materialColor });
	return new THREE.SkinnedMesh(geometry, material);
}
