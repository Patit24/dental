"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type MotionState = {
  progress: React.MutableRefObject<number>;
  mobile: boolean;
  reduced: boolean;
};

const aqua = new THREE.MeshPhysicalMaterial({
  color: "#60d5d0", roughness: 0.24, metalness: 0.06, transmission: 0.08,
  clearcoat: 1, clearcoatRoughness: 0.16,
});
const pearl = new THREE.MeshPhysicalMaterial({
  color: "#fffef9", roughness: 0.18, metalness: 0.02, transmission: 0.06,
  clearcoat: 1, clearcoatRoughness: 0.12,
});
const chrome = new THREE.MeshStandardMaterial({
  color: "#b8d5d7", roughness: 0.15, metalness: 0.88,
});
const mintGlass = new THREE.MeshPhysicalMaterial({
  color: "#b8f1e8", roughness: 0.08, metalness: 0, transparent: true,
  opacity: 0.45, transmission: 0.72, thickness: 0.4,
});

function follow(
  group: THREE.Group,
  target: [number, number, number],
  rotation: [number, number, number],
  delta: number,
  scale = 1,
) {
  const speed = 1 - Math.exp(-delta * 4.5);
  group.position.lerp(new THREE.Vector3(...target), speed);
  group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, rotation[0], speed);
  group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, rotation[1], speed);
  group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, rotation[2], speed);
  const nextScale = THREE.MathUtils.lerp(group.scale.x, scale, speed);
  group.scale.setScalar(nextScale);
}

function Tooth({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const x = THREE.MathUtils.lerp(2.5, -3.15, Math.min(p / 0.24, 1));
    const y = 1.05 - Math.sin(p * Math.PI * 2.4) * 0.7;
    const z = -1.1 + Math.sin(p * Math.PI) * 0.55;
    follow(ref.current, [x, y, z], [0.1 + p * 1.2, -0.45 + p * 2.8, -0.08], delta, state.mobile ? 0.62 : 1.04);
  });
  return <group ref={ref}>
    <mesh material={pearl} scale={[1.05, 0.92, 0.88]} castShadow>
      <sphereGeometry args={[0.76, 32, 24]} />
    </mesh>
    <mesh position={[-0.28, -0.8, 0]} rotation={[0, 0, 0.13]} material={pearl} castShadow>
      <coneGeometry args={[0.28, 1.35, 24]} />
    </mesh>
    <mesh position={[0.28, -0.8, 0]} rotation={[0, 0, -0.13]} material={pearl} castShadow>
      <coneGeometry args={[0.28, 1.35, 24]} />
    </mesh>
    <mesh position={[0, 0.36, 0.61]} material={mintGlass}>
      <torusGeometry args={[0.34, 0.045, 12, 32, Math.PI]} />
    </mesh>
  </group>;
}

function Toothbrush({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    follow(
      ref.current,
      [-4.7 + p * 9.2, 2.7 - p * 5.3, -1.9],
      [0.2, p * 4.4, -0.72 + p * 1.6],
      delta,
      state.mobile ? 0.5 : 0.75,
    );
  });
  return <group ref={ref}>
    <RoundedBox args={[0.38, 3.4, 0.34]} radius={0.18} smoothness={4} material={aqua} />
    <RoundedBox args={[0.78, 0.62, 0.38]} radius={0.14} smoothness={4} position={[0, 1.9, 0]} material={pearl} />
    {[-0.24, -0.08, 0.08, 0.24].map((x) =>
      <mesh key={x} position={[x, 2.28, 0]} material={mintGlass}>
        <boxGeometry args={[0.09, 0.42, 0.18]} />
      </mesh>
    )}
  </group>;
}

function Mirror({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const mx = state.mobile || state.reduced ? 0 : pointer.x * 0.32;
    const my = state.mobile || state.reduced ? 0 : pointer.y * 0.24;
    follow(ref.current, [3.8 + mx - p * 1.8, -1.9 + my + p * 2.7, -2.4], [0.4, -0.3 + mx, 0.7 + p], delta, 0.72);
  });
  return <group ref={ref}>
    <mesh material={chrome}><torusGeometry args={[0.7, 0.09, 18, 40]} /></mesh>
    <mesh material={mintGlass}><circleGeometry args={[0.61, 40]} /></mesh>
    <mesh position={[0, -1.75, 0]} material={chrome}><cylinderGeometry args={[0.07, 0.1, 2.2, 18]} /></mesh>
  </group>;
}

function Drill({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const orbit = p * Math.PI * 5;
    follow(ref.current, [Math.cos(orbit) * 2.6, -1.1 + Math.sin(orbit) * 1.4, -3], [1.2, orbit, 0.4], delta, 0.58);
  });
  return <group ref={ref}>
    <mesh rotation={[0, 0, Math.PI / 2]} material={chrome}><cylinderGeometry args={[0.25, 0.34, 1.8, 24]} /></mesh>
    <mesh position={[1.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={chrome}><coneGeometry args={[0.11, 0.7, 20]} /></mesh>
    <mesh position={[-0.35, -0.75, 0]} rotation={[0, 0, -0.18]} material={aqua}><cylinderGeometry args={[0.2, 0.27, 1.25, 24]} /></mesh>
  </group>;
}

function Aligner({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const reveal = THREE.MathUtils.smoothstep(p, 0.18, 0.48);
    follow(ref.current, [4.4 - reveal * 2.3, -0.2 + reveal * 1.2, -2.2], [1.0, p * 2.4, -0.25], delta, 0.78);
  });
  return <group ref={ref}>
    <mesh material={mintGlass} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.88, 0.2, 16, 48, Math.PI]} /></mesh>
    {[-0.62, -0.31, 0, 0.31, 0.62].map((x) =>
      <mesh key={x} position={[x, 0.08 + Math.abs(x) * 0.22, 0]} scale={[0.28, 0.4, 0.28]} material={pearl}>
        <sphereGeometry args={[0.5, 16, 12]} />
      </mesh>
    )}
  </group>;
}

function Implant({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const t = THREE.MathUtils.smoothstep(p, 0.34, 0.66);
    follow(ref.current, [-4.4 + t * 2.4, 1.8 - t * 1.25, -2.4], [0.2, p * 9, -0.32], delta, 0.72);
  });
  return <group ref={ref}>
    <mesh material={chrome}><cylinderGeometry args={[0.32, 0.2, 1.65, 24]} /></mesh>
    {[-0.55, -0.28, 0, 0.28, 0.55].map((y) =>
      <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={chrome}>
        <torusGeometry args={[0.29, 0.055, 10, 24]} />
      </mesh>
    )}
    <mesh position={[0, 1.02, 0]} material={pearl} scale={[1, 0.8, 0.9]}><sphereGeometry args={[0.48, 22, 16]} /></mesh>
  </group>;
}

function Crown({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const drop = THREE.MathUtils.smoothstep(p, 0.48, 0.76);
    follow(ref.current, [3.6 - drop * 1.1, 4.5 - drop * 4.2, -2], [0.1, p * 3, 0], delta, 0.7);
  });
  return <group ref={ref}>
    <mesh scale={[0.92, 0.78, 0.82]} material={pearl}><sphereGeometry args={[0.72, 28, 20]} /></mesh>
    <mesh position={[0, -0.44, 0]} material={pearl}><cylinderGeometry args={[0.54, 0.62, 0.48, 28]} /></mesh>
    <mesh position={[0, 0.36, 0.58]} material={aqua}><torusGeometry args={[0.25, 0.035, 10, 28, Math.PI]} /></mesh>
  </group>;
}

function FlossAndSmile({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    follow(ref.current, [-3.8 + p * 7.4, -2.8 + Math.sin(p * 7) * 0.5, -3.4], [0.4, p * 2, -0.2], delta, 0.64);
  });
  return <group ref={ref}>
    <RoundedBox args={[1.15, 0.92, 0.38]} radius={0.22} smoothness={4} material={aqua} />
    <mesh position={[0, 0, 0.23]} material={mintGlass}><torusGeometry args={[0.28, 0.055, 12, 32]} /></mesh>
    <mesh position={[1.15, 0.35, 0]} rotation={[0, 0, -0.35]} material={pearl}><torusGeometry args={[0.7, 0.06, 12, 36, Math.PI]} /></mesh>
  </group>;
}

function Toothpaste({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    follow(ref.current, [4.6 - p * 8.3, 2.6 - Math.sin(p * Math.PI * 2) * 2.2, -3.1], [0.15, p * 4, 0.7 - p], delta, 0.58);
  });
  return <group ref={ref}>
    <RoundedBox args={[1.05, 2.25, 0.48]} radius={0.22} smoothness={4} material={pearl} />
    <RoundedBox args={[0.68, 0.38, 0.52]} radius={0.1} smoothness={3} position={[0, -1.28, 0]} material={aqua} />
    <mesh position={[0, 0.25, 0.27]} material={aqua}><circleGeometry args={[0.27, 28]} /></mesh>
  </group>;
}

function Braces({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = state.progress.current;
    const t = THREE.MathUtils.smoothstep(p, 0.2, 0.52);
    follow(ref.current, [-4 + t * 6.7, -2.2 + t * 3.2, -2.8], [0.8, -0.2 + p * 2, 0.1], delta, 0.62);
  });
  return <group ref={ref}>
    <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1, 0.045, 10, 48, Math.PI]} /></mesh>
    {[-0.72, -0.36, 0, 0.36, 0.72].map((x) =>
      <group key={x} position={[x, 0.05 + Math.abs(x) * 0.28, 0]}>
        <mesh material={pearl} scale={[0.45, 0.58, 0.35]}><sphereGeometry args={[0.5, 16, 12]} /></mesh>
        <RoundedBox args={[0.2, 0.18, 0.16]} radius={0.035} smoothness={2} position={[0, 0, 0.2]} material={chrome} />
      </group>
    )}
  </group>;
}

function Sparkles({ state }: { state: MotionState }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => Array.from({ length: state.mobile ? 8 : 18 }, (_, i) => {
    const a = i * 2.399;
    return [Math.cos(a) * (2.2 + (i % 3) * 0.5), Math.sin(a) * (1.5 + (i % 4) * 0.35), -3.8] as [number, number, number];
  }), [state.mobile]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const p = state.progress.current;
    group.current.visible = p > 0.46 && p < 0.84;
    group.current.rotation.z += state.reduced ? 0 : delta * 0.06;
  });
  return <group ref={group}>{positions.map((position, i) =>
    <mesh key={i} position={position} scale={0.05 + (i % 3) * 0.025} material={i % 2 ? pearl : aqua}>
      <octahedronGeometry args={[1, 0]} />
    </mesh>
  )}</group>;
}

function Scene({ state }: { state: MotionState }) {
  return <>
    <ambientLight intensity={1.45} />
    <directionalLight position={[4, 7, 5]} intensity={2.2} color="#ffffff" castShadow />
    <pointLight position={[-5, -2, 4]} intensity={18} color="#68e2da" distance={12} />
    <pointLight position={[5, 1, 2]} intensity={12} color="#b9e9ff" distance={10} />
    <Tooth state={state} />
    <Toothbrush state={state} />
    <Mirror state={state} />
    {!state.mobile && <><Drill state={state} /><Aligner state={state} /><Implant state={state} /><Crown state={state} /><FlossAndSmile state={state} /><Toothpaste state={state} /><Braces state={state} /><Sparkles state={state} /></>}
  </>;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function Dental3DScene() {
  const progress = useRef(0);
  const [ready] = useState(() => typeof window !== "undefined" && supportsWebGL());
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMobile(mobileQuery.matches);
      setReduced(motionQuery.matches);
    };
    const initialUpdate = window.requestAnimationFrame(update);
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => { progress.current = self.progress; },
    });
    return () => {
      trigger.kill();
      window.cancelAnimationFrame(initialUpdate);
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  if (!ready) {
    return <div className="dental-3d-fallback" aria-hidden="true"><span /><span /><span /></div>;
  }

  const state = { progress, mobile, reduced };
  return <div className="dental-3d-layer" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={mobile ? 1 : [1, 1.5]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      shadows={!mobile}
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene state={state} />
    </Canvas>
  </div>;
}
