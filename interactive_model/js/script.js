let particles,
	saturn;

let scene,
	camera,
	renderer;

const colors = [0x37BE95, 0xF3F3F3, 0x6549C0];

init();
animate();

let width = window.innerWidth,
	height = window.innerHeight;

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamoing = true;
controls.camoingFacotr = 0.25;
controls.enableZoom = true;

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
	drawSaturn();


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

var objLoader = new THREE.OBJLoader();
//objLoader.setPath('js/examples');
objLoader.load('models/bigmax.obj', function (object) {
	object.position.y -= 60;
	scene.add(object);
});

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



function drawSaturn() {
	saturn = new THREE.Group();
	saturn.rotation.set(0.4, 0.3, 0);
	scene.add(saturn);

	const planetGeometry = new THREE.IcosahedronGeometry(100, 1);

	const planetMaterial = new THREE.MeshPhongMaterial({
		color: 0x37BE95,
		shading: THREE.FlatShading
	});
	const planet = new THREE.Mesh(planetGeometry, planetMaterial);

	planet.castShadow = true;
	planet.receiveShadow = true;
	planet.position.set(0, 40, 0);
	saturn.add(planet);

	const ringGeometry = new THREE.TorusGeometry(20, 12, 6, 15);
	const ringMeterial = new THREE.MeshStandardMaterial({
		color: 0x6549C0,
		shading: THREE.FlatShading
	});
	const ring = new THREE.Mesh(ringGeometry, ringMeterial);
	ring.position.set(0, 40, 0)
	ring.rotateX(80);
	ring.castShadow = true;
	ring.receiveShadow = true;
	saturn.add(ring);
}

