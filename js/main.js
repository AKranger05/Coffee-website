// Scene setup
const canvas = document.getElementById('coffee-cup-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Cup setup
const cupGroup = new THREE.Group();

// Body
const bodyGeo = new THREE.CylinderGeometry(1, 1, 4, 32);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xD2B48C });
const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
cupGroup.add(bodyMesh);

// Head
const headGeo = new THREE.CylinderGeometry(1, 1, 0.6, 32);
const headMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const headMesh = new THREE.Mesh(headGeo, headMat);
headMesh.position.y = 2.3;
cupGroup.add(headMesh);

scene.add(cupGroup);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Drag rotation
let isDragging = false;
renderer.domElement.addEventListener('mousedown', () => isDragging = true);
renderer.domElement.addEventListener('mouseup', () => isDragging = false);
renderer.domElement.addEventListener('mouseleave', () => isDragging = false);
renderer.domElement.addEventListener('mousemove', (e) => {
  if (isDragging) {
    cupGroup.rotation.y += e.movementX * 0.01;
    cupGroup.rotation.x += e.movementY * 0.01;
  }
});

// Scroll rotation
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const delta = window.scrollY - lastScrollY;
  cupGroup.rotation.x += delta * 0.003;
  lastScrollY = window.scrollY;
});

// Responsive scaling with limits
function resizeCup() {
  // Base scale proportional to screen width/height
  const baseScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  
  // Clamp scale to medium-small / medium-large
  const scaleFactor = Math.min(Math.max(baseScale, 0.8), 1.4);
  
  cupGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', resizeCup);
resizeCup();
