import * as THREE from './node_modules/three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 4, 1 );
var material = new THREE.MeshStandardMaterial( { color: 0x8888ff } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(2, 0, 0);
scene.add( cube );

var geometry2 = new THREE.BoxGeometry( 1.5, 1.7, 1.5 );
var material2 = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
var cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(-4, 0, 0);
scene.add( cube2 );

var light = new THREE.PointLight( 0x00ffff, 1, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

var light2 = new THREE.PointLight( 0xff0000, 1, 50 );
light2.position.set( -5, -5, 5 );
scene.add( light2 );

var light3 = new THREE.PointLight( 0xffffff, 1, 100 );
light3.position.set( -2, -10, 2 );
scene.add( light3 );

var light4 = new THREE.PointLight( 0xffffff, 1, 100 );
light4.position.set( 2, 10, -2 );
scene.add( light4 );

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame( animate );
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.04;

  cube2.rotation.x += 0.06;
  cube2.rotation.y += 0.01;
  cube2.rotation.z += 0.02;
    
  //cube.position.x -= 0.01;
   
  renderer.render( scene, camera );
};

animate();
