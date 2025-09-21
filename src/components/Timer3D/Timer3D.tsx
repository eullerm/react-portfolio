import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Timer3D: React.FC<{ seconds: number }> = ({ seconds }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentSecondsRef = useRef(seconds);
  let intervalId: number | null = null;

  function startTimer() {
    const start = performance.now();
    let lastElapsed = 0;
    currentSecondsRef.current = seconds;

    intervalId = window.setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      if (elapsed !== lastElapsed) {
        lastElapsed = elapsed;
        currentSecondsRef.current = Math.max(seconds - elapsed, 0);
      }
    }, 100); // atualiza a cada 100ms
  }

  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

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

  function recenterGroup(group: THREE.Group) {
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);

    group.children.forEach((child) => {
      child.position.sub(center);
    });

    group.position.add(center);
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
    renderer,
    camera,
  }: {
    event: MouseEvent;
    torus: THREE.Mesh;
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

    return intersects.length > 0;
  }

  function overButtons({
    event,
    buttons,
    renderer,
    camera,
  }: {
    event: MouseEvent;
    buttons: THREE.Object3D[];
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
  }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const rect = renderer!.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(buttons);

    return intersects.length > 0;
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

    return intersects.length > 0;
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

    recenterGroup(buttonGroup);

    return buttonGroup;
  }

  function clickButtonAnimation({
    button,
    amplitude,
    duration,
    currentTime,
    animationTime,
    initPositionX,
    initPositionY,
    quadrant,
  }: {
    button: THREE.Object3D;
    amplitude: number;
    duration: number;
    currentTime: number;
    animationTime: number;
    initPositionX: number;
    initPositionY: number;
    quadrant: 1 | 2 | 3 | 4;
  }) {
    const elapsed = (currentTime - animationTime) / 1000;
    if (elapsed > duration) {
      button.position.set(initPositionX, initPositionY, button.position.z);
      return false;
    }

    const { x, y }: { x: number; y: number } = {
      1: { x: 1, y: 1 },
      2: { x: 1, y: -1 },
      3: { x: -1, y: -1 },
      4: { x: -1, y: 1 },
    }[quadrant];

    const half = duration / 2;
    let offset = 0;

    if (elapsed < half) {
      const p = elapsed / half;
      offset = -p * amplitude;
    } else {
      const p = (elapsed - half) / half;
      offset = -(1 - p) * amplitude;
    }

    button.position.set(
      initPositionX + offset * x,
      initPositionY + offset * y,
      button.position.z
    );
    return true;
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
    const mainLight = new THREE.DirectionalLight(0x0f62fe, 1.2);
    mainLight.position.set(5, 8, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

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

    // Start/Stop Button
    const startStopButtonWidth = 1.2;
    const startStopButtonHeight = 0.6;
    const startStopButtonRadius = 0.1;
    const startStopButtonBaseHeight = 0.9;
    const startStopButton = createButton({
      width: startStopButtonWidth,
      height: startStopButtonHeight,
      radius: startStopButtonRadius,
      baseHeight: startStopButtonBaseHeight,
    });
    startStopButton.rotation.z = -Math.PI / 4;
    const startStopButtonPositionX =
      radius * Math.cos(Math.PI / 4) +
      (startStopButtonBaseHeight + startStopButtonHeight) / 2;
    const startStopButtonPositionY =
      radius * Math.sin(Math.PI / 4) +
      (startStopButtonBaseHeight + startStopButtonHeight) / 2;
    startStopButton.position.set(
      startStopButtonPositionX,
      startStopButtonPositionY,
      0
    );
    scene.add(startStopButton);

    // Switch Button
    const switchModeButtonWidth = 1.5;
    const switchModeButtonHeight = 0.6;
    const switchModeButtonRadius = 0.1;
    const switchModeButtonBaseHeight = 1.2;
    const switchModeButton = createButton({
      width: switchModeButtonWidth,
      height: switchModeButtonHeight,
      radius: switchModeButtonRadius,
      baseHeight: switchModeButtonBaseHeight,
    });
    const switchModeButtonPositionY =
      radius + (switchModeButtonBaseHeight + switchModeButtonHeight) / 2;
    switchModeButton.position.set(0, switchModeButtonPositionY, 0);
    scene.add(switchModeButton);

    // Special Button
    const resetButtonWidth = 1.2;
    const resetButtonHeight = 0.6;
    const resetButtonRadius = 0.1;
    const resetButtonBaseHeight = 0.9;
    const resetButton = createButton({
      width: resetButtonWidth,
      height: resetButtonHeight,
      radius: resetButtonRadius,
      baseHeight: resetButtonBaseHeight,
    });
    resetButton.rotation.z = Math.PI / 4;
    const resetButtonPositionX =
      radius * Math.sin(Math.PI / 4) +
      (resetButtonBaseHeight + resetButtonHeight) / 2;
    const resetButtonPositionY =
      radius * Math.cos(Math.PI / 4) +
      (resetButtonBaseHeight + resetButtonHeight) / 2;
    resetButton.position.set(-resetButtonPositionX, resetButtonPositionY, 0);
    scene.add(resetButton);

    let introAnimStart: number | null = null;
    const introDelay = 2000; // Seconds delay
    const pressDuration = 0.5; // Total time (go down and go up)
    const pressAmplitude = 0.2; // How much the button go down
    let isRunning = true;
    let clickStart: number | null = null;
    let isReset: boolean = false;
    let shouldStartTimer: boolean = true;

    const animate = (time: number) => {
      controls.update();

      if (introAnimStart === null || clickStart || isReset) {
        introAnimStart =
          introAnimStart === null
            ? (clickStart ?? time) + introDelay
            : (clickStart ?? time);
      }

      if (
        time > introAnimStart &&
        time < introAnimStart + pressDuration * 1000
      ) {
        if (!isReset) {
          clickButtonAnimation({
            button: startStopButton,
            amplitude: pressAmplitude,
            duration: pressDuration,
            currentTime: time,
            animationTime: introAnimStart,
            initPositionX: startStopButtonPositionX,
            initPositionY: startStopButtonPositionY,
            quadrant: 1,
          });
        } else if (isReset) {
          clickButtonAnimation({
            button: resetButton,
            amplitude: pressAmplitude,
            duration: pressDuration,
            currentTime: time,
            animationTime: introAnimStart,
            initPositionX: -resetButtonPositionX,
            initPositionY: resetButtonPositionY,
            quadrant: 4,
          });
        }
      } else if (time >= introAnimStart + pressDuration * 1000) {
        clickStart = null;
        isReset = false;

        if (shouldStartTimer) {
          startTimer();
          shouldStartTimer = false;
        }

        let secondsAngle =
          ((currentSecondsRef.current % 60) / 60) * Math.PI * 2;
        pointer.rotation.z = secondsAngle;
        numberTexture.needsUpdate = updateNumberCanvas({
          number: currentSecondsRef.current,
          numberCtx,
          width: numberCanvas.width,
          height: numberCanvas.height,
        });

        if (currentSecondsRef.current === 0) {
          const t = time / 1000;
          isRunning = false;
          stopTimer();
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
            startStopButton.position.y = startStopButtonPositionY + y;
            startStopButton.position.x = startStopButtonPositionX + x;
            switchModeButton.position.y = switchModeButtonPositionY + y;
            switchModeButton.position.x = x;
            resetButton.position.y = resetButtonPositionY + y;
            resetButton.position.x = -resetButtonPositionX + x;
          } else {
            pointer.position.x = 0;
            pointer.position.y = 0;
            pointerCircle.position.x = 0;
            pointerCircle.position.y = 0;
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
            startStopButton.position.y = startStopButtonPositionY;
            startStopButton.position.x = startStopButtonPositionX;
            switchModeButton.position.y = switchModeButtonPositionY;
            switchModeButton.position.x = 0;
            resetButton.position.y = resetButtonPositionY;
            resetButton.position.x = -resetButtonPositionX;
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
      const intersects = raycaster.intersectObjects([startStopButton]);

      if (intersects.length > 0) {
        isRunning = !isRunning;

        clickStart = performance.now();

        if (isRunning) {
          startTimer();
        } else {
          stopTimer();
        }
      }
    });

    renderer!.domElement.addEventListener("mousedown", (event) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const rect = renderer!.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([resetButton]);

      if (intersects.length > 0) {
        isRunning = true;
        introAnimStart = null;
        clickStart = performance.now();
        isReset = true;
        stopTimer();
        shouldStartTimer = true;
      }
    });

    renderer!.domElement.addEventListener("mousedown", (event) => {
      const isRotating = rotateTimer({
        event,
        torus,
        controls,
        renderer,
        camera,
      });
      if (isRotating) {
        renderer!.domElement.style.cursor = "grabbing";
      }
    });

    renderer!.domElement.addEventListener("mousemove", (event) => {
      const isOverButton = overButtons({
        event,
        buttons: [resetButton, startStopButton],
        renderer,
        camera,
      });

      const isOverTimer = overTimer({
        event,
        torus,
        renderer,
        camera,
      });

      const isOverSpecialButton = overButtons({
        event,
        buttons: [switchModeButton],
        renderer,
        camera,
      });

      if (isOverButton) {
        renderer!.domElement.style.cursor = "pointer";
      } else if (isOverTimer) {
        renderer!.domElement.style.cursor = "grab";
        controls.enableRotate = true;
      } else if (isOverSpecialButton) {
        renderer!.domElement.style.cursor = "alias";
      } else {
        renderer!.domElement.style.cursor = "default";
        controls.enableRotate = false;
      }
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();

      renderer!.domElement.removeEventListener("mousemove", (event) => {
        const isOverButton = overButtons({
          event,
          buttons: [resetButton, switchModeButton, startStopButton],
          renderer,
          camera,
        });

        const isOverTimer = overTimer({
          event,
          torus,
          renderer,
          camera,
        });

        if (isOverButton) {
          renderer!.domElement.style.cursor = "pointer";
        } else if (isOverTimer) {
          renderer!.domElement.style.cursor = "pointer";
          controls.enableRotate = true;
        } else {
          renderer!.domElement.style.cursor = "default";
          controls.enableRotate = false;
        }
      });

      renderer!.domElement.removeEventListener("mousedown", (event) =>
        rotateTimer({
          event,
          torus,
          controls,
          renderer,
          camera,
        })
      );

      scene.clear();
      controls.dispose();
      stopTimer();
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
