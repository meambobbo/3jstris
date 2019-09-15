import * as THREE from '../../node_modules/three';
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
	var geometry: THREE.BufferGeometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1,1,1));
	skinIndicesAndWeights(geometry);
	var material = new THREE.MeshStandardMaterial({ color: materialColor });
	return new THREE.SkinnedMesh(geometry, material);
}

export function skinIndicesAndWeights(geometry: THREE.BufferGeometry) {
	var position: THREE.BufferAttribute = geometry.attributes.position as THREE.BufferAttribute;
	var vertex = new THREE.Vector3();
	var skinIndices = [];
	var skinWeights = [];

	for (var i = 0; i < position.count; i++) {
		vertex.fromBufferAttribute(position, i);
		skinIndices.push(0, 0, 0, 0);
		skinWeights.push(1, 0, 0, 0);
	}
	geometry.removeAttribute('skinIndex');
	geometry.removeAttribute('skinWeight');
	geometry.addAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
	geometry.addAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
}
