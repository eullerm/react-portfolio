import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Timer3D: React.FC<{ seconds: number }> = ({ seconds }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  function DiamondShape({
    maxSize,
    minSize,
  }: {
    maxSize: number;
    minSize: number;
  }) {
    const x = 0,
      y = 0.5;

    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(x, y + maxSize); // Top
    diamondShape.lineTo(x + minSize, y); // Right
    diamondShape.lineTo(x, y - minSize); // Bottom
    diamondShape.lineTo(x - minSize, y); // Left
    diamondShape.lineTo(x, y + maxSize); // Back to the top

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: false,
    };
    const geometry = new THREE.ExtrudeGeometry(diamondShape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x0f62fe,
      side: THREE.FrontSide,
      emissive: 0x0f62fe,
      metalness: 0.5,
      roughness: 0.15,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  function updateNumberCanvas({
    number,
    numberCtx,
    width,
    height,
  }: {
    number: number;
    numberCtx: CanvasRenderingContext2D;
    width: number;
    height: number;
  }) {
    numberCtx.fillStyle = "#111111";
    numberCtx.fillRect(0, 0, width, height);

    numberCtx.fillStyle = "#0f62fe";
    numberCtx.font = 'bold 4rem "Orbitron", monospace';
    numberCtx.textAlign = "center";
    numberCtx.textBaseline = "middle";
    numberCtx.fillText(
      number.toString().padStart(2, "0"),
      width / 2,
      height / 2
    );

    return true;
  }

  function overTimer({
    event,
    torus,
    controls,
    renderer,
    camera,
  }: {
    event: MouseEvent;
    torus: THREE.Mesh;
    controls: OrbitControls;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
  }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const rect = renderer!.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(torus);

    if (intersects.length > 0) {
      renderer!.domElement.style.cursor = "pointer";
      controls.enableRotate = true;
    } else {
      renderer!.domElement.style.cursor = "default";
      controls.enableRotate = false;
    }
  }

  function rotateTimer({
    event,
    torus,
    controls,
    renderer,
    camera,
  }: {
    event: MouseEvent;
    torus: THREE.Mesh;
    controls: OrbitControls;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
  }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const rect = renderer!.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(torus);

    controls.enableRotate = intersects.length > 0;
  }

  function createButton({
    width = 1.2,
    height = 0.6,
    radius = 0.1,
    baseHeight = 0.8,
  }: {
    width?: number;
    height?: number;
    radius?: number;
    baseHeight?: number;
  }) {
    const buttonGroup = new THREE.Group();

    const mainShape = new THREE.Shape();

    mainShape.moveTo(-width / 2 + radius, -height / 2);
    mainShape.lineTo(width / 2 - radius, -height / 2);
    mainShape.quadraticCurveTo(
      width / 2,
      -height / 2,
      width / 2,
      -height / 2 + radius
    );
    mainShape.lineTo(width / 2, height / 2 - radius);
    mainShape.quadraticCurveTo(
      width / 2,
      height / 2,
      width / 2 - radius,
      height / 2
    );
    mainShape.lineTo(-width / 2 + radius, height / 2);
    mainShape.quadraticCurveTo(
      -width / 2,
      height / 2,
      -width / 2,
      height / 2 - radius
    );
    mainShape.lineTo(-width / 2, -height / 2 + radius);
    mainShape.quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2 + radius,
      -height / 2
    );

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };
    const geometry = new THREE.ExtrudeGeometry(mainShape, extrudeSettings);
    geometry.center();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x424242,
      emissive: 0x424242,
      metalness: 0.5,
      roughness: 0.15,
    });
    const mainButton = new THREE.Mesh(geometry, material);
    mainButton.castShadow = true;
    mainButton.receiveShadow = true;
    buttonGroup.add(mainButton);

    const baseGeometry = new THREE.BoxGeometry(0.5, baseHeight, 0.15);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x393939,
      emissive: 0x393939,
      metalness: 0.5,
      roughness: 0.15,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -height;
    buttonGroup.add(baseMesh);
    buttonGroup.castShadow = true;

    return buttonGroup;
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

    // Light
    // Main Light (Key) - luz azul IBM, lateral superior direita
    const mainLight = new THREE.DirectionalLight(0x0f62fe, 1.2);
    mainLight.position.set(5, 8, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Fill Light - luz neutra, bem fraca, para clarear sombras
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -2, 5);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);

    scene.add(ambientLight);

    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
    }

    if (!mountRef.current.contains(renderer.domElement)) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const radius = 4; // Distance from the center

    // Torus
    const torusGeometry = new THREE.TorusGeometry(radius, radius / 10, 32, 100);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x424242,
      emissive: 0x424242,
      metalness: 0.5,
      roughness: 0.15,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Circle
    const circleGeometry = new THREE.CircleGeometry(radius, 32);
    const circleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    scene.add(circle);

    // Glass
    const glassGeometry = new THREE.CircleGeometry(radius, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdddddd,
      metalness: 0.2,
      roughness: 0,
      transmission: 0.9,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
      clearcoat: 1,
      clearcoatRoughness: 0,
      depthWrite: false,
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    scene.add(glass);

    // Stick
    const stickGeometry = new THREE.BoxGeometry(0.2, radius / 8, 0.1);
    const stickMaterial = new THREE.MeshStandardMaterial({
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
    const pointer = DiamondShape({ maxSize: radius / 2, minSize: radius / 10 });
    scene.add(pointer);

    const pointerCircleGeometry = new THREE.TorusGeometry(
      radius / 20,
      0.1,
      16,
      64
    );
    const pointerCircleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f62fe,
      emissive: 0x0f62fe,
      metalness: 0.5,
      roughness: 0.15,
    });
    const pointerCircle = new THREE.Mesh(
      pointerCircleGeometry,
      pointerCircleMaterial
    );
    scene.add(pointerCircle);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableZoom = true;
    controls.update();

    // Number
    const numberCanvas = document.createElement("canvas");
    numberCanvas.width = 128;
    numberCanvas.height = 64;
    const numberCtx = numberCanvas.getContext("2d")!;

    const numberTexture = new THREE.CanvasTexture(numberCanvas);
    numberTexture.needsUpdate = updateNumberCanvas({
      number: 0,
      numberCtx,
      width: numberCanvas.width,
      height: numberCanvas.height,
    });
    const numberMaterial = new THREE.MeshBasicMaterial({
      map: numberTexture,
      transparent: true,
    });
    const numberPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(radius / 3, radius / 6),
      numberMaterial
    );

    numberPlane.position.set(radius / 3, radius / 4, 0);
    scene.add(numberPlane);

    // Positions
    torus.position.z = -0.02;
    circle.position.z = -0.1;
    glass.position.z = 0.2;
    sticks.forEach((s) => (s.position.z = 0.01));
    pointer.position.z = 0.03;
    pointerCircle.position.z = 0.03;
    numberPlane.position.z = 0.02;

    // Animation
    let frameId: number;

    // Start Button
    const startButtonWidth = 1.2;
    const startButtonHeight = 0.6;
    const startButtonRadius = 0.1;
    const startButtonBaseHeight = 0.9;
    const startButton = createButton({
      width: startButtonWidth,
      height: startButtonHeight,
      radius: startButtonRadius,
      baseHeight: startButtonBaseHeight,
    });
    startButton.rotation.z = -Math.PI / 4;
    const startButtonPositionX =
      radius * Math.cos(Math.PI / 4) + startButtonBaseHeight;
    const startButtonPositionY =
      radius * Math.sin(Math.PI / 4) + startButtonBaseHeight;
    startButton.position.set(startButtonPositionX, startButtonPositionY, 0);
    scene.add(startButton);

    // Stop Button
    const stopButtonWidth = 1.5;
    const stopButtonHeight = 0.6;
    const stopButtonRadius = 0.1;
    const stopButtonBaseHeight = 1;
    const stopButton = createButton({
      width: stopButtonWidth,
      height: stopButtonHeight,
      radius: stopButtonRadius,
      baseHeight: stopButtonBaseHeight,
    });
    const stopButtonPositionY =
      radius + startButtonBaseHeight + stopButtonHeight;
    stopButton.position.set(0, stopButtonPositionY, 0);
    scene.add(stopButton);

    // Special Button
    const specialButtonWidth = 1.2;
    const specialButtonHeight = 0.6;
    const specialButtonRadius = 0.1;
    const specialButtonBaseHeight = 0.9;
    const specialButton = createButton({
      width: specialButtonWidth,
      height: specialButtonHeight,
      radius: specialButtonRadius,
      baseHeight: specialButtonBaseHeight,
    });
    specialButton.rotation.z = Math.PI / 4;
    const specialButtonPositionX =
      radius * Math.sin(Math.PI / 4) + specialButtonBaseHeight;
    const specialButtonPositionY =
      radius * Math.cos(Math.PI / 4) + specialButtonBaseHeight;
    specialButton.position.set(
      -specialButtonPositionX,
      specialButtonPositionY,
      0
    );
    scene.add(specialButton);

    let introAnimStart: number | null = null;
    const introDelay = 2000; // Seconds delay
    const pressDuration = 0.5; // Total time (go down and go up)
    const pressAmplitude = 0.2; // How much the button go down

    const animate = (time: number) => {
      controls.update();

      if (introAnimStart === null) {
        introAnimStart = time + introDelay;
      }
      if (
        time > introAnimStart &&
        time < introAnimStart + pressDuration * 1000
      ) {
        const tAnim = (time - introAnimStart) / 1000;
        const half = pressDuration / 2;
        let offset = 0;

        if (tAnim < half) {
          const p = tAnim / half;
          offset = -p * pressAmplitude;
        } else {
          const p = (tAnim - half) / half;
          offset = -(1 - p) * pressAmplitude;
        }

        startButton.position.y = startButtonPositionY + offset;
        startButton.position.x = startButtonPositionX + offset;
      } else if (time >= introAnimStart + pressDuration * 1000) {
        startButton.position.y = startButtonPositionY;
        startButton.position.x = startButtonPositionX;

        let elapsed = Math.floor(
          (time - (introAnimStart + pressDuration * 1000)) / 1000
        );

        // Don't let the timer go below 0
        let currentSeconds = Math.max(seconds - elapsed, 0);

        let secondsAngle = ((currentSeconds % 60) / 60) * Math.PI * 2;
        pointer.rotation.z = secondsAngle;
        numberTexture.needsUpdate = updateNumberCanvas({
          number: currentSeconds,
          numberCtx,
          width: numberCanvas.width,
          height: numberCanvas.height,
        });

        if (currentSeconds === 0) {
          const t = time / 1000;

          const cycle = Math.floor(t % 4);

          if (cycle < 2) {
            const intensity = 0.1;
            const x = Math.sin(t * 40) * intensity;
            const y = Math.cos(t * 35) * intensity;
            pointer.position.x = x;
            pointer.position.y = y;
            pointerCircle.position.x = x;
            pointerCircle.position.y = y;
            torus.position.x = x;
            torus.position.y = y;
            circle.position.x = x;
            circle.position.y = y;
            sticks.forEach((stick, index) => {
              stick.position.set(
                Math.cos(angles[index]) * distOfSticks + x,
                Math.sin(angles[index]) * distOfSticks + y,
                0
              );
            });
            numberPlane.position.x = x;
            numberPlane.position.y = y;
            numberPlane.position.x = radius / 3 + x;
            numberPlane.position.y = radius / 4 + y;
            startButton.position.y = startButtonPositionY + y;
            startButton.position.x = startButtonPositionX + x;
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
            numberPlane.position.x = radius / 3;
            numberPlane.position.y = radius / 4;
          }
        }
      }

      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    renderer!.domElement.addEventListener("mousedown", (event) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const rect = renderer!.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([stopButton]);

      if (intersects.length > 0) {
        console.log("Start button clicked!");
      }
    });

    renderer!.domElement.addEventListener("mousedown", (event) =>
      rotateTimer({
        event,
        torus,
        controls,
        renderer,
        camera,
      })
    );

    renderer!.domElement.addEventListener("mousemove", (event) =>
      overTimer({
        event,
        torus,
        controls,
        renderer,
        camera,
      })
    );

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      renderer!.domElement.removeEventListener("mousedown", (event) =>
        rotateTimer({
          event,
          torus,
          controls,
          renderer,
          camera,
        })
      );

      renderer!.domElement.removeEventListener("mousemove", (event) =>
        overTimer({
          event,
          torus,
          controls,
          renderer,
          camera,
        })
      );

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
        height: "500px",
        background: "transparent",
      }}
    />
  );
};

export default Timer3D;
