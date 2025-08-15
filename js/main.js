let scene, camera, renderer, cup;

init();
animate();

function init() {
  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('coffee-cup-canvas'), alpha: true });
  renderer.setSize(300, 300);

  // Simple 3D Cup (Cylinder + Hemisphere for top)
  const cupMaterial = new THREE.MeshStandardMaterial({ color: 0x6f4e37, metalness: 0.3, roughness: 0.7 });

  const cupBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), cupMaterial);
  cupBody.position.y = -0.25;

  const coffeeTop = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI/2), new THREE.MeshStandardMaterial({ color: 0x4b3621 }));
  coffeeTop.position.y = 0.25;

  cup = new THREE.Group();
  cup.add(cupBody);
  cup.add(coffeeTop);
  scene.add(cup);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5,5,5);
  scene.add(directionalLight);

  // Drag rotation
  let isDragging = false;
  let previousX;

  renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousX = e.clientX;
    renderer.domElement.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    renderer.domElement.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (e) => {
    if(isDragging){
      const deltaX = e.clientX - previousX;
      cup.rotation.y += deltaX * 0.01;
      previousX = e.clientX;
    }
  });

  // Scroll rotation
  window.addEventListener('scroll', () => {
    cup.rotation.y += window.scrollY * 0.0005;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
