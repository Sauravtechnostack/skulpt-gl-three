import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// Adding BufferGeometry;
const geometry = new THREE.BufferGeometry();

// This is where we define each and every coordinate of the Geometry that we need to make.
const vertices = new Float32Array([
  -1.0,
  -1.0,
  1.0, // v0
  1.0,
  -1.0,
  1.0, // v1
  1.0,
  1.0,
  1.0, // v2
  -1.0,
  1.0,
  1.0, // v3
  -1.0,
  -1.0,
  2.0, // v4
]);

// Here we define what all cordintes create a face.(triangle)
const indices = [0, 1, 2, 2, 3, 0];

// Here we attach these vertices to out geometry and specify that we are dealing with 3d and thus one vertex will be composed of 3 elements of the array vertices[0],vertices[1] & vertices[2] i.e.-1.0,-1.0,1.0 // v0
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// Here we also define the indices i.e. faces.
geometry.setIndex(indices);

// Normal is an array representing how much should a light be affecting each vertex. If we remove this then the object will have no effect of light on it.
geometry.computeVertexNormals();

const finalMesh = new THREE.Mesh(
  geometry,
  new THREE.MeshStandardMaterial({ color: "#32a852", side: THREE.DoubleSide })
);
export default finalMesh;
