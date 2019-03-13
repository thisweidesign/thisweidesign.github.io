var scene = new THREE.Scene();

let particles;
let renderer;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//var renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.z = 200;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamoing = true;
controls.camoingFacotr = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30,100%,75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240,100%,75%)'), 0.75);
keyLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, 100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


var objLoader = new THREE.OBJLoader();
//objLoader.setPath('js/examples');
objLoader.load('models/bigmax.obj', function (object) {
	object.position.y -= 60;
	scene.add(object);
});

var animate = function () {
	requestAnimationFrame(animate);
	controls.update();

	renderer.render(scene, camera);
}

animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.lookAt(scene.position);
	camera.position.z = 500;
  
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.setClearColor(0x000000, 0);
	renderer.shadowMap.enabled = true;
  
	controls = new THREE.OrbitControls(camera, renderer.domElement);
  
	const ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);
  
	const light = new THREE.DirectionalLight();
	light.position.set(200, 100, 200);
	light.castShadow = true;
	light.shadow.camera.left = -100;
	light.shadow.camera.right = 100;
	light.shadow.camera.top = 100;
	light.shadow.camera.bottom = -100;
	scene.add(light);
  
	drawParticles();
  
  
	document.getElementById('world').appendChild(renderer.domElement);
  
	window.addEventListener('resize', onResize);
  }
  
  function onResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
  }
  
  function animate() {
	requestAnimationFrame(animate);
  
	render();
  }
  
  function render() {
	particles.rotation.x += 0.001;
	particles.rotation.y -= 0.004;
	saturn.rotation.y += 0.003;
	renderer.render(scene, camera);
  }
  
  function drawParticles() {
	particles = new THREE.Group();
	scene.add(particles);
	const geometry = new THREE.TetrahedronGeometry(5, 0);
  
	for (let i = 0; i < 500; i++) {
	  const material = new THREE.MeshPhongMaterial({
		color: colors[Math.floor(Math.random() * colors.length)],
		shading: THREE.FlatShading
	  });
	  const mesh = new THREE.Mesh(geometry, material);
	  mesh.position.set((Math.random() - 0.5) * 1000,
		(Math.random() - 0.5) * 1000,
		(Math.random() - 0.5) * 1000);
	  mesh.updateMatrix();
	  mesh.matrixAutoUpdate = false;
	  particles.add(mesh);
	}
  }
  
  
