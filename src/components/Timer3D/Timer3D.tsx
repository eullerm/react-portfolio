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
  function DiamondShape() {
    const x = 0,
      y = 0.5;

    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(x, y + 2.5); // Top
    diamondShape.lineTo(x + 0.25, y); // Right
    diamondShape.lineTo(x, y - 0.25); // Bottom
    diamondShape.lineTo(x - 0.25, y); // Left
    diamondShape.lineTo(x, y + 2.5); // Back to the top

    const geometry = new THREE.ShapeGeometry(diamondShape);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
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

    const radius = 5; // Distance from the center

    // Torus
    const torusGeometry = new THREE.TorusGeometry(radius, 0.5, 32, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
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
    const stickGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const stickMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

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

    angles.forEach((angle) => {
      const stick = new THREE.Mesh(stickGeometry, stickMaterial);

      const dist = radius - 1.5;
      stick.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, 0);

      stick.rotation.z = angle - Math.PI / 2;

      scene.add(stick);
    });

    //SecondLine
    const secondsLine = DiamondShape();
    secondsLine.position.set(0, 0, -0.5);
    scene.add(secondsLine);

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
      rotateLine(secondsLine, secondsAngle);

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
