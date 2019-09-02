import { SandboxScene } from './sandbox-scene/index';

console.log("3jstris Started");
var scene: SandboxScene = new SandboxScene();
scene.init();
scene.animate();

var loop = function() {
	requestAnimationFrame(loop);
	scene.animate();
};

loop();
