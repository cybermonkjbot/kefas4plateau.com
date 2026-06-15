import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function detectWebGLSupport() {
  if (typeof window === "undefined") return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 980px)").matches;
  const nav = navigator;
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  const saveData = Boolean(connection?.saveData);
  const slowConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
  const cpuThreads = nav.hardwareConcurrency ?? 8;
  const memoryGb = nav.deviceMemory ?? 8;
  const constrainedDevice = cpuThreads <= 4 || memoryGb <= 4;

  return !(prefersReducedMotion || isSmallScreen || saveData || slowConnection || constrainedDevice);
}

function SoftField({ palette, activeIndex }) {
  const materialRef = useRef(null);
  const targetColorA = useMemo(() => new THREE.Color(palette.glowStrong), [palette.glowStrong]);
  const targetColorB = useMemo(() => new THREE.Color(palette.accent), [palette.accent]);

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uShift.value = activeIndex * 0.14;
    materialRef.current.uniforms.uColorA.value.lerp(targetColorA, 0.06);
    materialRef.current.uniforms.uColorB.value.lerp(targetColorB, 0.06);
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uShift: { value: activeIndex * 0.14 },
          uColorA: { value: new THREE.Color(palette.glowStrong) },
          uColorB: { value: new THREE.Color(palette.accent) },
        }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uShift;
          uniform vec3 uColorA;
          uniform vec3 uColorB;

          float softCircle(vec2 uv, vec2 center, float radius) {
            return smoothstep(radius, radius - 0.22, distance(uv, center));
          }

          void main() {
            vec2 uv = vUv;
            float drift = sin(uTime * 0.14 + uShift) * 0.04;
            vec2 centerA = vec2(0.68 + drift, 0.32);
            vec2 centerB = vec2(0.3 - drift * 0.6, 0.72);

            float glowA = softCircle(uv, centerA, 0.46);
            float glowB = softCircle(uv, centerB, 0.32);
            float ribbon = smoothstep(0.38, 0.0, abs(uv.y - (0.52 + sin(uTime * 0.1 + uv.x * 3.2) * 0.05)));

            vec3 color = uColorA * glowA * 0.46 + uColorB * glowB * 0.28 + mix(uColorA, uColorB, 0.5) * ribbon * 0.08;
            float alpha = min(0.34, glowA * 0.24 + glowB * 0.16 + ribbon * 0.05);

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export function AgendaAmbientScene({ palette, activeIndex }) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    function syncEnabled() {
      setIsEnabled(detectWebGLSupport());
    }

    syncEnabled();
    window.addEventListener("resize", syncEnabled);

    return () => window.removeEventListener("resize", syncEnabled);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="agenda-ambient" aria-hidden="true">
      <Canvas className="agenda-ambient-canvas" dpr={[1, 1.25]} camera={{ position: [0, 0, 2], fov: 32 }}>
        <SoftField activeIndex={activeIndex} palette={palette} />
      </Canvas>
    </div>
  );
}
