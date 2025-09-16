import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Timer3D: React.FC<{ seconds: number }> = ({ seconds }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  function rotateLine(line: THREE.Object3D, angle: number) {
    let rmatrix = new THREE.Matrix4().makeRotationAxis(
      new THREE.Vector3(0, 0, 1),
      angle
    );

    line.matrix.copy(new THREE.Matrix4().multiply(rmatrix));
    line.matrixAutoUpdate = false;
    line.matrixWorldNeedsUpdate = false;
  }
  function DiamondShape(maxSize: number, minSize: number) {
    const x = 0,
      y = 0.5;

    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(x, y + maxSize); // Top
    diamondShape.lineTo(x + minSize, y); // Right
    diamondShape.lineTo(x, y - minSize); // Bottom
    diamondShape.lineTo(x - minSize, y); // Left
    diamondShape.lineTo(x, y + maxSize); // Back to the top

    const geometry = new THREE.ShapeGeometry(diamondShape);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.FrontSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;
    }

    if (!mountRef.current.contains(renderer.domElement)) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const radius = 4; // Distance from the center

    // Torus
    const torusGeometry = new THREE.TorusGeometry(radius, radius / 10, 32, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Circle
    const circleGeometry = new THREE.CircleGeometry(radius, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);

    // Stick
    const stickGeometry = new THREE.PlaneGeometry(0.2, radius / 8); //new THREE.CylinderGeometry(0.1, 0.1, radius / 10, 16);
    const stickMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.FrontSide,
    });
    const sticks: THREE.Object3D[] = [];

    // Angles of the sticks
    const angles = [
      Math.PI / 2, // 90°
      Math.PI / 4, // 45°
      0, // 0°
      (7 * Math.PI) / 4, // 315°
      (3 * Math.PI) / 2, // 270°
      (5 * Math.PI) / 4, // 225°
      Math.PI, // 180°
      (3 * Math.PI) / 4, // 135°
    ];
    const distOfSticks = radius - radius / 5;

    angles.forEach((angle) => {
      const s = new THREE.Mesh(stickGeometry, stickMaterial);

      s.position.set(
        Math.cos(angle) * distOfSticks,
        Math.sin(angle) * distOfSticks,
        0
      );

      s.rotation.z = angle - Math.PI / 2;

      sticks.push(s);
      scene.add(s);
    });

    //SecondLine
    const pointer = DiamondShape(radius / 2, radius / 10);
    pointer.position.set(0, 0, -0.5);
    scene.add(pointer);
    const pointerCircleGeometry = new THREE.RingGeometry(
      radius / 20,
      radius / 10,
      64
    );
    const pointerCircleGeometryMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.FrontSide,
    });
    const pointerCircle = new THREE.Mesh(
      pointerCircleGeometry,
      pointerCircleGeometryMaterial
    );
    scene.add(pointerCircle);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Animation
    let frameId: number;
    const animate = (time: number) => {
      controls.update();
      let elapsed = Math.floor(time / 1000);

      // Don't let the timer go below 0
      let currentSeconds = Math.max(seconds - elapsed, 0);

      let secondsAngle = ((currentSeconds % 60) / 60) * Math.PI * 2;
      rotateLine(pointer, secondsAngle);

      if (currentSeconds != 0) {
        const t = time / 1000;

        const cycle = Math.floor(t % 4);

        if (cycle < 2) {
          const intensity = 0.1;
          const x = Math.sin(t * 40) * intensity;
          const y = Math.cos(t * 35) * intensity;
          pointer.position.x = x;
          pointer.position.y = y;
          /*  torus.position.x = x;
          torus.position.y = y;
          circle.position.x = x;
          circle.position.y = y;
          sticks.forEach((stick, index) => {
            stick.position.set(
              Math.cos(angles[index]) * distOfSticks + x,
              Math.sin(angles[index]) * distOfSticks + y,
              0
            );
          }); */
        } else {
          pointer.position.x = 0;
          pointer.position.y = 0;
          torus.position.x = 0;
          torus.position.y = 0;
          circle.position.x = 0;
          circle.position.y = 0;
          sticks.forEach((stick, index) => {
            stick.position.set(
              Math.cos(angles[index]) * distOfSticks,
              Math.sin(angles[index]) * distOfSticks,
              0
            );
          });
        }
      }

      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      scene.clear();
      controls.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "400px",
        background: "transparent",
      }}
    />
  );
};

export default Timer3D;
