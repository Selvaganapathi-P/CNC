import React, { useEffect, useRef, useState } from 'react';
import './RocketScene.css';

/*
  Pure Three.js rocket scene — no React Three Fiber needed.
  Uses THREE from window (loaded via CDN in public/index.html)
  or falls back to a CSS-animated placeholder if Three.js isn't available.
*/

export default function RocketScene() {
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const [hint, setHint] = useState('Click the ring to assemble the rocket');
  const [assembled, setAssembled] = useState(false);
  const [threeAvailable, setThreeAvailable] = useState(true);

  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE) {
      setThreeAvailable(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020208);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 2, 14);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0x222244, 1);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xc0161c, 3, 20);
    redLight.position.set(4, 4, 4);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x3344ff, 2, 20);
    blueLight.position.set(-4, 6, -4);
    scene.add(blueLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 10, 5);
    scene.add(topLight);

    // ── Materials ──
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x8899aa,
      metalness: 0.9,
      roughness: 0.2,
    });
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xc0161c,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x330005,
      emissiveIntensity: 0.3,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc8a84b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x223344,
      metalness: 0.6,
      roughness: 0.4,
    });

    // ── ROCKET BODY ──
    const rocketGroup = new THREE.Group();
    scene.add(rocketGroup);

    // Base cylinder
    const bodyGeo = new THREE.CylinderGeometry(0.8, 1.0, 5, 32);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    body.position.y = 2.5;
    rocketGroup.add(body);

    // Upper stage
    const upperGeo = new THREE.CylinderGeometry(0.6, 0.8, 2.5, 32);
    const upper = new THREE.Mesh(upperGeo, darkMat);
    upper.position.y = 6.25;
    rocketGroup.add(upper);

    // Nose cone
    const noseGeo = new THREE.ConeGeometry(0.6, 2, 32);
    const nose = new THREE.Mesh(noseGeo, redMat);
    nose.position.y = 8.5;
    rocketGroup.add(nose);

    // Fins (3 fins)
    for (let i = 0; i < 3; i++) {
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(1.2, 0);
      finShape.lineTo(0.3, 2.0);
      finShape.lineTo(0, 2.0);
      finShape.closePath();
      const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.1, bevelEnabled: false });
      const fin = new THREE.Mesh(finGeo, redMat);
      fin.rotation.y = (i * Math.PI * 2) / 3;
      fin.position.y = 0;
      fin.position.x = 0.8 * Math.cos((i * Math.PI * 2) / 3);
      fin.position.z = 0.8 * Math.sin((i * Math.PI * 2) / 3);
      rocketGroup.add(fin);
    }

    // Engine nozzle
    const nozzleGeo = new THREE.CylinderGeometry(0.7, 1.0, 0.6, 32);
    const nozzle = new THREE.Mesh(nozzleGeo, goldMat);
    nozzle.position.y = -0.3;
    rocketGroup.add(nozzle);

    // Stripes
    const stripeGeo = new THREE.TorusGeometry(0.82, 0.06, 8, 32);
    for (let i = 0; i < 3; i++) {
      const stripe = new THREE.Mesh(stripeGeo, redMat);
      stripe.position.y = 1 + i * 1.5;
      stripe.rotation.x = Math.PI / 2;
      rocketGroup.add(stripe);
    }

    rocketGroup.position.y = -2;

    // ── FLOATING RING ──
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringGeo = new THREE.TorusGeometry(1.6, 0.18, 16, 64);
    const ring = new THREE.Mesh(ringGeo, goldMat);
    ringGroup.add(ring);

    // Ring detail bolts
    for (let i = 0; i < 12; i++) {
      const boltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8);
      const bolt = new THREE.Mesh(boltGeo, metalMat);
      const angle = (i * Math.PI * 2) / 12;
      bolt.position.x = 1.6 * Math.cos(angle);
      bolt.position.z = 1.6 * Math.sin(angle);
      bolt.rotation.z = Math.PI / 2;
      bolt.rotation.y = angle;
      ringGroup.add(bolt);
    }

    ringGroup.position.set(5, 4, 0);
    ringGroup.rotation.x = Math.PI * 0.15;

    // ── STARS ──
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 300; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // ── ORBIT CONTROLS (manual) ──
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let spherical = { theta: 0, phi: Math.PI / 2 - 0.2, radius: 14 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      spherical.theta -= dx * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi + dy * 0.01));
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging = false; };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events
    renderer.domElement.addEventListener('touchstart', (e) => {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    renderer.domElement.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      spherical.theta -= dx * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi + dy * 0.01));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    renderer.domElement.addEventListener('touchend', () => { isDragging = false; });

    // ── CLICK HANDLER ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isAssembled = false;
    let animating = false;
    let assembleProgress = 0;
    let ringStartPos = { x: 5, y: 4, z: 0 };
    let ringTargetPos = { x: 0, y: 3.5, z: 0 };
    let disassembleProgress = 0;

    const onClick = (e) => {
      if (animating) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const ringIntersects = raycaster.intersectObjects(ringGroup.children, true);
      const rocketIntersects = raycaster.intersectObjects(rocketGroup.children, true);

      if (ringIntersects.length > 0 && !isAssembled) {
        animating = true;
        assembleProgress = 0;
        ringStartPos = { x: ringGroup.position.x, y: ringGroup.position.y, z: ringGroup.position.z };
      } else if (rocketIntersects.length > 0 && isAssembled) {
        animating = true;
        isAssembled = false;
        disassembleProgress = 0;
      }
    };

    renderer.domElement.addEventListener('click', onClick);

    // ── ANIMATION LOOP ──
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Camera orbit
      if (!isDragging) {
        spherical.theta += 0.003;
      }
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi) + 2;
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 2, 0);

      // Ring idle float
      if (!animating && !isAssembled) {
        ringGroup.position.y = 4 + Math.sin(t * 0.8) * 0.3;
        ringGroup.rotation.y = t * 0.5;
        ringGroup.position.x = 5 + Math.cos(t * 0.4) * 0.3;
      }

      // Assemble animation
      if (animating && !isAssembled) {
        assembleProgress = Math.min(1, assembleProgress + 0.015);
        const ease = 1 - Math.pow(1 - assembleProgress, 3);
        ringGroup.position.x = ringStartPos.x + (ringTargetPos.x - ringStartPos.x) * ease;
        ringGroup.position.y = ringStartPos.y + (ringTargetPos.y - ringStartPos.y) * ease;
        ringGroup.position.z = ringStartPos.z + (ringTargetPos.z - ringStartPos.z) * ease;
        ringGroup.rotation.x = Math.PI * 0.15 * (1 - ease);
        ringGroup.rotation.y = t * 2 * (1 - ease) + Math.PI * 2 * ease;

        if (assembleProgress >= 1) {
          isAssembled = true;
          animating = false;
          setAssembled(true);
          setHint('Click the rocket body to disassemble');
        }
      }

      // Disassemble animation
      if (animating && !isAssembled) {
        disassembleProgress = Math.min(1, disassembleProgress + 0.012);
        const ease = 1 - Math.pow(1 - disassembleProgress, 3);
        ringGroup.position.x = 0 + 5 * ease;
        ringGroup.position.y = 3.5 + 0.5 * ease;
        ringGroup.rotation.x = Math.PI * 0.15 * ease;

        if (disassembleProgress >= 1) {
          animating = false;
          setAssembled(false);
          setHint('Click the ring to assemble the rocket');
        }
      }

      // Rocket slow rotation
      if (!isAssembled) {
        rocketGroup.rotation.y = Math.sin(t * 0.2) * 0.08;
      } else {
        rocketGroup.rotation.y = t * 0.3;
      }

      // Stars slow rotation
      stars.rotation.y = t * 0.02;

      // Red light pulse
      redLight.intensity = 2.5 + Math.sin(t * 2) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    sceneRef.current = { renderer, scene, camera, frameId };

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!threeAvailable) {
    return <FallbackScene />;
  }

  return (
    <div className="rocket-scene-wrapper">
      <div className="rocket-canvas-mount" ref={mountRef} />
      <div className={`rocket-hint ${assembled ? 'rocket-hint--success' : ''}`}>
        <span className="rocket-hint-dot" />
        {hint}
      </div>
      <div className="rocket-controls-hint">
        <span>🖱 Drag to rotate</span>
        <span>👆 Click to interact</span>
      </div>
    </div>
  );
}

// CSS-animated fallback when Three.js is not loaded
function FallbackScene() {
  const [assembled, setAssembled] = useState(false);

  return (
    <div className="rocket-fallback">
      <div
        className={`rocket-2d ${assembled ? 'assembled' : ''}`}
        onClick={() => setAssembled(!assembled)}
      >
        <div className="r2d-nose" />
        <div className="r2d-body">
          <div className="r2d-stripe" />
          <div className="r2d-stripe" />
          <div className="r2d-window" />
        </div>
        <div className={`r2d-ring ${assembled ? 'r2d-ring--on' : ''}`} />
        <div className="r2d-fins">
          <div className="r2d-fin r2d-fin--left" />
          <div className="r2d-fin r2d-fin--right" />
        </div>
        <div className="r2d-exhaust">
          <div className="r2d-flame" />
        </div>
      </div>
      <p className="rocket-fallback-hint">Click the rocket to toggle assembly</p>
      <p className="rocket-fallback-note">
        Add <code>{'<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'}</code>
        {' '}to <code>public/index.html</code> for the full 3D experience.
      </p>
    </div>
  );
}