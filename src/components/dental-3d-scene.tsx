"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type MotionState = {
  chapter: React.MutableRefObject<number>;
  chapterProgress: React.MutableRefObject<number>;
  mobile: boolean;
  reduced: boolean;
};

const pearl = new THREE.MeshPhysicalMaterial({
  color: "#fffdfa",
  roughness: 0.12,
  metalness: 0.02,
  transmission: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
});
const translucentPearl = new THREE.MeshPhysicalMaterial({
  color: "#dffcf8",
  roughness: 0.08,
  transparent: true,
  opacity: 0.72,
  transmission: 0.62,
  thickness: 0.8,
  clearcoat: 1,
});
const chrome = new THREE.MeshStandardMaterial({
  color: "#b9d5d9",
  roughness: 0.12,
  metalness: 0.9,
});
const aqua = new THREE.MeshPhysicalMaterial({
  color: "#49d4cf",
  roughness: 0.2,
  metalness: 0.08,
  clearcoat: 1,
});
const blueGlass = new THREE.MeshPhysicalMaterial({
  color: "#78dfe4",
  roughness: 0.06,
  transparent: true,
  opacity: 0.34,
  transmission: 0.78,
  thickness: 0.5,
});
const glow = new THREE.MeshBasicMaterial({
  color: "#7ff8ee",
  transparent: true,
  opacity: 0.8,
});

const chapterCamera = [
  new THREE.Vector3(0.3, 0.15, 8.4),
  new THREE.Vector3(0, 0, 5.2),
  new THREE.Vector3(0, 0.2, 8),
  new THREE.Vector3(0, 0, 7),
  new THREE.Vector3(0, 0, 8.2),
  new THREE.Vector3(0, 0.1, 8),
  new THREE.Vector3(0, 0.3, 8.4),
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(0, 0.6, 9),
];

function storyPosition(state: MotionState) {
  return state.chapter.current + state.chapterProgress.current;
}

function weightAt(state: MotionState, index: number) {
  const distance = Math.abs(storyPosition(state) - index);
  return THREE.MathUtils.smoothstep(1.05 - distance, 0, 1);
}

function seeded(index: number, channel: number) {
  const value = Math.sin(index * 91.173 + channel * 47.77) * 43758.5453;
  return value - Math.floor(value);
}

function stage(group: THREE.Group | null, state: MotionState, index: number, delta: number, position: [number, number, number]) {
  if (!group) return 0;
  const weight = weightAt(state, index);
  group.visible = weight > 0.015;
  const speed = 1 - Math.exp(-delta * 5);
  group.position.lerp(new THREE.Vector3(...position), speed);
  const scale = THREE.MathUtils.lerp(group.scale.x, 0.72 + weight * 0.28, speed);
  group.scale.setScalar(scale);
  return weight;
}

function ToothModel({ split = 0, translucent = false }: { split?: number; translucent?: boolean }) {
  const material = translucent ? translucentPearl : pearl;
  return <group>
    <group position={[-split, 0, 0]}>
      <mesh material={material} scale={[0.72, 0.92, 0.88]} position={[-0.32, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.78, 36, 28]} />
      </mesh>
      <mesh material={material} position={[-0.52, -0.84, 0]} rotation={[0, 0, 0.1]} castShadow>
        <coneGeometry args={[0.29, 1.55, 28]} />
      </mesh>
    </group>
    <group position={[split, 0, 0]}>
      <mesh material={material} scale={[0.72, 0.92, 0.88]} position={[0.32, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.78, 36, 28]} />
      </mesh>
      <mesh material={material} position={[0.52, -0.84, 0]} rotation={[0, 0, -0.1]} castShadow>
        <coneGeometry args={[0.29, 1.55, 28]} />
      </mesh>
    </group>
  </group>;
}

function Instrument({ type, scale = 1 }: { type: "mirror" | "brush" | "crown" | "aligner"; scale?: number }) {
  if (type === "mirror") return <group scale={scale}>
    <mesh material={chrome}><torusGeometry args={[0.48, 0.07, 16, 36]} /></mesh>
    <mesh material={blueGlass}><circleGeometry args={[0.4, 36]} /></mesh>
    <mesh position={[0, -1.2, 0]} material={chrome}><cylinderGeometry args={[0.05, 0.08, 1.6, 16]} /></mesh>
  </group>;
  if (type === "brush") return <group scale={scale}>
    <RoundedBox args={[0.28, 2.6, 0.28]} radius={0.14} smoothness={4} material={aqua} />
    <RoundedBox args={[0.66, 0.5, 0.32]} radius={0.12} smoothness={4} position={[0, 1.52, 0]} material={pearl} />
    {[-0.2, -0.06, 0.08, 0.22].map((x) => <mesh key={x} position={[x, 1.84, 0]} material={blueGlass}><boxGeometry args={[0.07, 0.35, 0.14]} /></mesh>)}
  </group>;
  if (type === "crown") return <group scale={scale}>
    <mesh scale={[0.9, 0.78, 0.84]} material={pearl}><sphereGeometry args={[0.68, 28, 22]} /></mesh>
    <mesh position={[0, -0.42, 0]} material={pearl}><cylinderGeometry args={[0.5, 0.58, 0.44, 28]} /></mesh>
  </group>;
  return <group scale={scale} rotation={[Math.PI / 2, 0, 0]}>
    <mesh material={blueGlass}><torusGeometry args={[0.75, 0.17, 16, 44, Math.PI]} /></mesh>
    {[-0.52, -0.26, 0, 0.26, 0.52].map((x) => <mesh key={x} position={[x, 0.04 + Math.abs(x) * 0.2, 0]} scale={[0.24, 0.34, 0.24]} material={pearl}><sphereGeometry args={[0.5, 16, 12]} /></mesh>)}
  </group>;
}

function ImplantModel({ scale = 1 }: { scale?: number }) {
  return <group scale={scale}>
    <mesh material={chrome}><cylinderGeometry args={[0.36, 0.22, 2.25, 28]} /></mesh>
    {[-0.78, -0.5, -0.22, 0.06, 0.34, 0.62].map((y) => <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={chrome}><torusGeometry args={[0.34, 0.055, 10, 28]} /></mesh>)}
    <mesh position={[0, 1.32, 0]} scale={[0.92, 0.76, 0.84]} material={pearl}><sphereGeometry args={[0.58, 28, 20]} /></mesh>
  </group>;
}

function CameraDirector({ state }: { state: MotionState }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((clock, delta) => {
    const chapter = Math.min(8, state.chapter.current);
    const next = Math.min(8, chapter + 1);
    const t = state.reduced ? 0 : THREE.MathUtils.smootherstep(state.chapterProgress.current, 0, 1);
    target.current.lerpVectors(chapterCamera[chapter], chapterCamera[next], t);
    if (!state.mobile && !state.reduced) {
      target.current.x += pointer.x * 0.24;
      target.current.y += pointer.y * 0.14;
      if (chapter === 0) target.current.x += Math.sin(clock.clock.elapsedTime * 0.18) * 0.28;
    }
    camera.position.lerp(target.current, 1 - Math.exp(-delta * 2.8));
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function HeroUniverse({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((clock, delta) => {
    const weight = stage(ref.current, state, 0, delta, [state.mobile ? 1.9 : 2.45, 0.15, -0.5]);
    if (!ref.current) return;
    ref.current.rotation.y += state.reduced ? 0 : delta * (0.08 + weight * 0.08);
    ref.current.rotation.z = Math.sin(clock.clock.elapsedTime * 0.35) * 0.04;
  });
  return <group ref={ref}>
    <ToothModel translucent />
    {[0, 1, 2].map((i) => <mesh key={i} rotation={[Math.PI / 2 + i * 0.48, i * 0.7, i]} material={blueGlass}><torusGeometry args={[2.05 + i * 0.35, 0.018, 8, 80]} /></mesh>)}
    <group position={[-2, 0.55, 0]} rotation={[0.2, 0, -0.65]}><Instrument type="brush" scale={0.38} /></group>
    <group position={[1.8, 0.9, 0.2]} rotation={[0.1, 0.3, 0.5]}><Instrument type="mirror" scale={0.48} /></group>
    <group position={[0.9, -1.7, 0.5]}><Instrument type="aligner" scale={0.48} /></group>
  </group>;
}

function PortalLab({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  const tooth = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const weight = stage(ref.current, state, 1, delta, [0, 0.1, -0.7]);
    if (!ref.current) return;
    ref.current.rotation.y += state.reduced ? 0 : delta * 0.06;
    ref.current.rotation.z = weight * 0.04;
    const split = THREE.MathUtils.smoothstep(state.chapterProgress.current, 0.08, 0.72) * 1.15;
    if (tooth.current) {
      const toothRoot = tooth.current.children[0] as THREE.Group | undefined;
      const left = toothRoot?.children[0] as THREE.Group | undefined;
      const right = toothRoot?.children[1] as THREE.Group | undefined;
      if (left && right) {
        left.position.x = -split;
        right.position.x = split;
      }
    }
  });
  return <group ref={ref}>
    <group ref={tooth} scale={1.65}><ToothModel translucent /></group>
    {[0, 1, 2, 3].map((i) => <mesh key={i} position={[0, 0, -1 - i * 1.1]} rotation={[Math.PI / 2, 0, i * 0.35]} material={i % 2 ? glow : blueGlass}><torusGeometry args={[1.5 + i * 0.18, 0.025, 10, 70]} /></mesh>)}
    <group position={[-2.8, 1.3, -1]} rotation={[0.5, 0.2, -0.6]}><Instrument type="aligner" scale={0.55} /></group>
    <group position={[2.7, -1.1, -1.4]} rotation={[0.1, 0.4, 0.3]}><Instrument type="crown" scale={0.58} /></group>
    <group position={[2.6, 1.4, -2]} rotation={[0.4, 0, -0.3]}><ImplantModel scale={0.35} /></group>
  </group>;
}

function ServiceAssembly({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  const cards = [
    { p: [-2.6, 1.3, 0] as [number, number, number], type: "mirror" as const },
    { p: [0, -1.4, 0] as [number, number, number], type: "brush" as const },
    { p: [2.6, 1.2, 0] as [number, number, number], type: "aligner" as const },
  ];
  useFrame((clock, delta) => {
    stage(ref.current, state, 2, delta, [state.mobile ? 2.3 : 0.5, 0, -1.8]);
    if (ref.current) ref.current.rotation.y = Math.sin(clock.clock.elapsedTime * 0.22) * 0.08;
  });
  return <group ref={ref}>
    {cards.map((card, i) => <group key={card.type} position={card.p}>
      <RoundedBox args={[2.05, 2.45, 0.18]} radius={0.2} smoothness={5} material={blueGlass} />
      <group position={[0, 0, 0.55]} rotation={[0.2, i * 0.4, i === 1 ? -0.25 : 0]}><Instrument type={card.type} scale={0.52} /></group>
      <mesh position={[0, -0.88, 0.25]} material={glow}><boxGeometry args={[0.9, 0.025, 0.02]} /></mesh>
    </group>)}
    <mesh rotation={[Math.PI / 2, 0, 0]} material={blueGlass}><torusGeometry args={[4.25, 0.02, 8, 96]} /></mesh>
  </group>;
}

function ImplantShowcase({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  const implant = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    stage(ref.current, state, 3, delta, [state.mobile ? 2.2 : 2.7, -0.1, -0.6]);
    if (implant.current) implant.current.rotation.y += state.reduced ? 0 : delta * 0.45;
  });
  return <group ref={ref}>
    <group ref={implant} rotation={[0.08, 0, -0.18]}><ImplantModel scale={1.32} /></group>
    {[0.9, 1.35, 1.8].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, i * 0.32, 0]} material={i === 1 ? glow : blueGlass}><torusGeometry args={[r, 0.022, 10, 72]} /></mesh>)}
    {[-1.7, -1.25, 1.25, 1.7].map((x, i) => <mesh key={x} position={[x, (i % 2 ? 1 : -1) * 1.3, 0]} material={glow}><sphereGeometry args={[0.07, 12, 8]} /></mesh>)}
  </group>;
}

function ParticleSmile({ state, finale = false }: { state: MotionState; finale?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = state.mobile ? 170 : 420;
  const { start, target } = useMemo(() => {
    const from = new Float32Array(count * 3);
    const to = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI;
      const row = i % 6;
      from[i * 3] = (seeded(i, 0) - 0.5) * 7;
      from[i * 3 + 1] = (seeded(i, 1) - 0.5) * 4.5;
      from[i * 3 + 2] = (seeded(i, 2) - 0.5) * 2;
      to[i * 3] = Math.cos(a) * (3.1 - row * 0.12);
      to[i * 3 + 1] = -Math.sin(a) * 1.55 + row * 0.1;
      to[i * 3 + 2] = Math.sin(i * 1.7) * 0.12;
    }
    return { start: from, target: to };
  }, [count]);
  useFrame((clock) => {
    if (!ref.current) return;
    const index = finale ? 8 : 4;
    const weight = weightAt(state, index);
    ref.current.visible = weight > 0.02;
    const morph = state.reduced ? 1 : THREE.MathUtils.smootherstep(state.chapterProgress.current, 0.05, 0.82);
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i++) positions[i] = THREE.MathUtils.lerp(start[i], target[i], morph);
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = finale ? -0.18 : Math.sin(clock.clock.elapsedTime * 0.25) * 0.08;
    ref.current.position.set(state.mobile ? 1.7 : 2.25, finale ? 1.1 : 0.2, -1.2);
    ref.current.scale.setScalar(0.78 + weight * 0.22);
  });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[start.slice(), 3]} /></bufferGeometry>
    <pointsMaterial color={finale ? "#c5fff8" : "#7ff4e8"} size={state.mobile ? 0.045 : 0.062} transparent opacity={0.9} sizeAttenuation />
  </points>;
}

function SmileTransformation({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  const teeth = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    stage(ref.current, state, 5, delta, [state.mobile ? 2.25 : 2.7, 0, -1.2]);
    const progress = THREE.MathUtils.smootherstep(state.chapterProgress.current, 0.06, 0.88);
    teeth.current?.children.forEach((tooth, i) => {
      const x = (i - 3.5) * 0.38;
      const beforeY = -0.5 + Math.sin(i * 2.1) * 0.2;
      const afterY = -0.52 + Math.abs(x) * 0.08;
      tooth.position.y = THREE.MathUtils.lerp(beforeY, afterY, progress);
      tooth.rotation.z = THREE.MathUtils.lerp((i % 2 ? 1 : -1) * 0.17, 0, progress);
    });
  });
  return <group ref={ref}>
    <mesh position={[-1.35, 0, 0]} material={blueGlass}><sphereGeometry args={[1.45, 32, 24, 0, Math.PI]} /></mesh>
    <mesh position={[1.35, 0, 0]} rotation={[0, Math.PI, 0]} material={translucentPearl}><sphereGeometry args={[1.45, 32, 24, 0, Math.PI]} /></mesh>
    <mesh material={blueGlass}><planeGeometry args={[0.035, 3.5]} /></mesh>
    <group ref={teeth}>{Array.from({ length: 8 }).map((_, i) => {
      const x = (i - 3.5) * 0.38;
      const beforeY = -0.5 + Math.sin(i * 2.1) * 0.2;
      return <mesh key={i} position={[x, beforeY, 1.3]} rotation={[0, 0, (i % 2 ? 1 : -1) * 0.17]} scale={[0.32, 0.44, 0.22]} material={pearl}><sphereGeometry args={[0.5, 18, 14]} /></mesh>;
    })}</group>
  </group>;
}

function DoctorClinic({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((clock, delta) => {
    stage(ref.current, state, 6, delta, [state.mobile ? 2.2 : 2.8, -0.1, -1.7]);
    if (ref.current) ref.current.rotation.y = Math.sin(clock.clock.elapsedTime * 0.18) * 0.04;
  });
  return <group ref={ref}>
    <RoundedBox args={[4.8, 3.7, 0.18]} radius={0.26} smoothness={5} position={[0, 0, -0.7]} material={blueGlass} />
    <RoundedBox args={[1.45, 2.6, 0.3]} radius={0.3} smoothness={5} position={[0, -0.15, 0]} material={translucentPearl} />
    <mesh position={[0, 0.55, 0.28]} material={pearl}><sphereGeometry args={[0.46, 24, 18]} /></mesh>
    <RoundedBox args={[0.84, 1.25, 0.3]} radius={0.26} smoothness={5} position={[0, -0.55, 0.25]} material={aqua} />
    {[[-1.65, 0.95], [1.65, 0.95], [-1.65, -0.95], [1.65, -0.95]].map(([x, y], i) => <group key={i} position={[x, y, 0.2]}>
      <RoundedBox args={[1.05, 0.66, 0.08]} radius={0.12} smoothness={4} material={blueGlass} />
      <mesh position={[0, 0, 0.07]} material={glow}><boxGeometry args={[0.55, 0.02, 0.01]} /></mesh>
    </group>)}
  </group>;
}

function AppointmentPod({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((clock, delta) => {
    stage(ref.current, state, 7, delta, [state.mobile ? 2.2 : 2.75, -0.2, -1.5]);
    if (ref.current) ref.current.rotation.y = Math.sin(clock.clock.elapsedTime * 0.24) * 0.06;
  });
  return <group ref={ref}>
    <mesh position={[0, -1.6, 0]} material={blueGlass}><cylinderGeometry args={[2.1, 2.5, 0.28, 48]} /></mesh>
    <RoundedBox args={[3.45, 3.15, 0.35]} radius={0.38} smoothness={6} material={translucentPearl} />
    <RoundedBox args={[2.65, 2.2, 0.16]} radius={0.25} smoothness={5} position={[0, 0, 0.28]} material={blueGlass} />
    {[-0.85, 0, 0.85].map((x, i) => <group key={x} position={[x, 0.65 - i * 0.12, 0.5]}>
      <RoundedBox args={[0.62, 0.62, 0.08]} radius={0.12} smoothness={3} material={i === 1 ? aqua : pearl} />
      <mesh position={[0, 0, 0.06]} material={glow}><circleGeometry args={[0.08, 18]} /></mesh>
    </group>)}
    {[0, 1, 2].map((i) => <mesh key={i} rotation={[Math.PI / 2, i * 0.75, 0]} material={blueGlass}><torusGeometry args={[2.45 + i * 0.25, 0.018, 8, 72]} /></mesh>)}
  </group>;
}

function Finale({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { stage(ref.current, state, 8, delta, [0, -1.8, -2.5]); });
  return <group ref={ref}>
    {Array.from({ length: state.mobile ? 8 : 17 }).map((_, i) => {
      const x = (i - 8) * 0.62;
      const h = 0.5 + ((i * 7) % 9) * 0.19;
      return <RoundedBox key={i} args={[0.48, h, 0.45]} radius={0.06} smoothness={2} position={[x, h / 2, -0.4 - (i % 3) * 0.25]} material={i % 4 === 0 ? aqua : blueGlass} />;
    })}
    <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]} material={blueGlass}><circleGeometry args={[5.8, 64]} /></mesh>
  </group>;
}

function MedicalParticles({ state }: { state: MotionState }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = state.mobile ? 70 : 180;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      values[i * 3] = (seeded(i, 3) - 0.5) * 12;
      values[i * 3 + 1] = (seeded(i, 4) - 0.5) * 7;
      values[i * 3 + 2] = (seeded(i, 5) - 0.5) * 6 - 1;
    }
    return values;
  }, [state.mobile]);
  useFrame((_, delta) => {
    if (!ref.current || state.reduced) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.position.y += delta * 0.015;
    if (ref.current.position.y > 0.35) ref.current.position.y = -0.35;
  });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#8ae9e0" size={0.025} transparent opacity={0.45} sizeAttenuation />
  </points>;
}

function JourneyWorld({ state }: { state: MotionState }) {
  return <>
    <ambientLight intensity={1.25} />
    <directionalLight position={[4, 7, 5]} intensity={2.4} color="#ffffff" castShadow />
    <pointLight position={[-5, -1, 4]} intensity={20} color="#5fe7df" distance={14} />
    <pointLight position={[5, 2, 2]} intensity={16} color="#acdfff" distance={13} />
    <CameraDirector state={state} />
    <MedicalParticles state={state} />
    <HeroUniverse state={state} />
    <PortalLab state={state} />
    <ServiceAssembly state={state} />
    <ImplantShowcase state={state} />
    <ParticleSmile state={state} />
    <SmileTransformation state={state} />
    <DoctorClinic state={state} />
    <AppointmentPod state={state} />
    <Finale state={state} />
    <ParticleSmile state={state} finale />
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
  const chapter = useRef(0);
  const chapterProgress = useRef(0);
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
    update();
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-journey]")).map((element) => {
      const index = Number(element.dataset.journey || 0);
      return ScrollTrigger.create({
        trigger: element,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => { chapter.current = index; chapterProgress.current = 0; },
        onEnterBack: () => { chapter.current = index; chapterProgress.current = 1; },
        onUpdate: (self) => {
          chapter.current = index;
          chapterProgress.current = self.progress;
        },
      });
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  if (!ready) return <div className="dental-3d-fallback photo-fallback" aria-hidden="true"><span /><span /><span /></div>;

  const state = { chapter, chapterProgress, mobile, reduced };
  return <div className="dental-3d-layer" aria-hidden="true">
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 40 }}
      dpr={mobile ? 1 : [1, 1.45]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      shadows={!mobile}
      frameloop={reduced ? "demand" : "always"}
    >
      <JourneyWorld state={state} />
    </Canvas>
  </div>;
}
