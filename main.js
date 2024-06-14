import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import finalMesh from "./BufferGeometry.js";
import RayCastingLocal from "./RayCasting.js";

// Basic Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding buffer geometry
scene.add(finalMesh);

// Add Grid
const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xffffff);
grid.position.y = -1; // Position the grid at the bottom
scene.add(grid);

// Add Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
camera.position.z = 5;

// Orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Raycasting
const rayCasting = new RayCastingLocal(camera, [finalMesh], scene);

/**
 * Mouse
 */
const mouse = new THREE.Vector2();
// Flag to indicate if rotation controls should be enabled
let allowRotation = true;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
// Event Listener for Mouse Click
// function onMouseDown(event) {
//   event.preventDefault();
//   console.log("Inside");
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects([sphere1, sphere2]);
//   console.log("Mouse Down intersection: ", intersects);
//   if (intersects.length > 0) {
//     allowRotation = false; // Disable rotation controls
//     // console.log("Intersection point:", intersects[0].point);
//     sculptSphere(intersects[0].point);
//   }
// }
// Event Listener for Mouse Up
// function onMouseUp(event) {
//   console.log("Mouse click up");
//   console.log("Mouse up event: ", allowRotation);
//   event.preventDefault();
//   allowRotation = true; // Enable rotation controls
// }
// document.addEventListener("pointerdown", onMouseDown, false);
// document.addEventListener("pointerup", onMouseUp, false);
// window.addEventListener("pointerdown", () => console.log("hjellasd"));
window.addEventListener("mousemove", onMouseMove);

function animate() {
  requestAnimationFrame(animate);
  // if (allowRotation) {
  //   renderer.domElement.style.cursor = "grab";
  //   controls.enabled = true;
  // } else {
  //   renderer.domElement.style.cursor = "pointer";
  //   controls.enabled = false;
  // }
  controls.update(); // Update controls in animation loop
  renderer.render(scene, camera);
}

animate();

// Function to sculpt the sphere
function sculptSphere(point) {}
