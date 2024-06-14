import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

/**
 * Ray casting: How this works is we take a point and direction in the plane and emmit a beam of light in that direction from that point. Now what will happen is that the ray casting algorithms will tell us what all objects collided with the ray.
 */

export default class RayCastingLocal {
  constructor(camera, arrayOfObjectsToTrack, scene) {
    if (!(this instanceof RayCastingLocal)) {
      throw new Error("MyClass must be called with new");
    }
    this.camera = camera;
    this.arrayOfObjectsToTrack = arrayOfObjectsToTrack;
    this.mouse = {
      x: 0,
      y: 0,
    };

    // Create a Raycaster
    const raycaster = new THREE.Raycaster();

    // Lets adjust the direction and origin of the ray
    const rayOrigin = new THREE.Vector3(0, 0, -5);
    const rayDirection = new THREE.Vector3(0, 0, 1);
    rayDirection.normalize();

    // Set the direction and origin of the ray
    raycaster.set(rayOrigin, rayDirection);

    // Now to we need to pass the objects for which we need to check if the ray is intersecting or not.
    // This method lists all the objects that ray intersected with and returns us an array of objects along with what vertex did the ray hit, the distance between the ray's origin and intersection.

    // We can also use mouse as the origin and direction of mouse to cast a ray.
    // To do this we need to constantly get the mouse's direction and the position and then use that as the rayOrigin and rayDirection. We can check this whenever a mouse button is clicked.
    window.addEventListener("mousemove", (event) =>
      this.onMouseMove(event, this.mouse)
    );

    window.addEventListener("pointerdown", () => {
      raycaster.setFromCamera(this.mouse, camera);
      const intersects = raycaster.intersectObjects(arrayOfObjectsToTrack);
      console.log("Intercets: ", intersects);
    });
  }

  onMouseMove(event, mouse) {
    // Understand this
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}
