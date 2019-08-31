import * as THREE from './node_modules/three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

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

function quickRand(): number {
	return (Math.random() - Math.random()) * 20;
}

var cubeList: THREE.Mesh[] = [];

function addNewRandomCube() {
	var geometryTemp = new THREE.BoxGeometry( 1,1,1 );
    var materialTemp = new THREE.MeshStandardMaterial( { color: 0x8888ff } );
    var cubeTemp = new THREE.Mesh( geometryTemp, materialTemp );
    cubeTemp.position.set(quickRand(), quickRand(), Math.random() * .5 - 10);
    cubeTemp.name="hehe" + Math.random(); 
    scene.add( cubeTemp );
    cubeList.push(cubeTemp);
    console.log("cubeList.length" + cubeList.length);
}

for (var i = 0; i < 300; i++) {
    addNewRandomCube();
}

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

var counter = 0;

var animate = function () {
  requestAnimationFrame( animate );
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.04;

  cube2.rotation.x += 0.06;
  cube2.rotation.y += 0.01;
  cube2.rotation.z += 0.02;
    
  //cube.position.x -= 0.01;

  if (counter > 10) {

    var ind = Math.floor(Math.random() * cubeList.length);
    if (scene.getObjectByName(cubeList[ind].name)) {
       var obj : THREE.Object3D = scene.getObjectByName(cubeList[ind].name) as THREE.Object3D;
       scene.remove( obj as THREE.Object3D);
       cubeList.splice(ind, 1);
       addNewRandomCube();
    }
    counter = 0;
  }

  //var ind = Math.floor(Math.random() * cubeList.length);
  //if (scene.getObjectByName(cubeList[ind].name)) {
  //   obj = scene.getObjectByName(cubeList[ind].name) as THREE.Object3D;
     //var x: number = Math.random();
     //if (x < 0.33) {
     //    obj.rotation.x += 0.1;
     //} else if (x > 0.66) {
     //    obj.rotation.y += 0.1;
     //} else {
     //    obj.rotation.z += 0.1;
     //}
     //obj.rotation.x += 0.5;
  //}



  counter++;

  renderer.render( scene, camera );
};

animate();
