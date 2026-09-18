"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type AvatarProps = {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  skinColor: string;
  shirtColor: string;
};

function Person({
  height,
  weight,
  chest,
  waist,
  hips,
  skinColor,
  shirtColor,
}: AvatarProps) {
  const heightScale = height / 175;

  const weightScale = Math.max(
    0.75,
    Math.min(1.35, weight / 75)
  );

  const chestScale = chest / 95;
  const waistScale = waist / 82;
  const hipScale = hips / 96;

  return (
    <group scale={[1, heightScale, 1]}>

      {/* HEAD */}
      <mesh position={[0, 2.45, 0]} castShadow>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 2.03, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.3, 24]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* UPPER BODY / SHIRT */}
      <mesh
        position={[0, 1.35, 0]}
        scale={[
          chestScale * weightScale,
          1,
          0.72 * weightScale,
        ]}
        castShadow
      >
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color={shirtColor}
          roughness={0.75}
        />
      </mesh>

      {/* WAIST */}
      <mesh
        position={[0, 0.78, 0]}
        scale={[
          waistScale * weightScale,
          0.72,
          0.68 * weightScale,
        ]}
        castShadow
      >
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color={shirtColor}
          roughness={0.75}
        />
      </mesh>

      {/* HIPS */}
      <mesh
        position={[0, 0.15, 0]}
        scale={[
          hipScale * weightScale,
          0.65,
          0.72 * weightScale,
        ]}
        castShadow
      >
        <sphereGeometry args={[0.64, 32, 32]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* LEFT ARM */}
      <mesh
        position={[
          -0.82 * chestScale * weightScale,
          1.18,
          0,
        ]}
        rotation={[0, 0, -0.06]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.1, 1.55, 24]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* RIGHT ARM */}
      <mesh
        position={[
          0.82 * chestScale * weightScale,
          1.18,
          0,
        ]}
        rotation={[0, 0, 0.06]}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.1, 1.55, 24]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* LEFT LEG */}
      <mesh
        position={[
          -0.25 * hipScale * weightScale,
          -1.12,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry args={[0.2, 0.16, 2.15, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* RIGHT LEG */}
      <mesh
        position={[
          0.25 * hipScale * weightScale,
          -1.12,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry args={[0.2, 0.16, 2.15, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* LEFT SHOE */}
      <mesh position={[-0.25, -2.24, 0.16]} castShadow>
        <boxGeometry args={[0.38, 0.18, 0.62]} />
        <meshStandardMaterial color="#09090b" />
      </mesh>

      {/* RIGHT SHOE */}
      <mesh position={[0.25, -2.24, 0.16]} castShadow>
        <boxGeometry args={[0.38, 0.18, 0.62]} />
        <meshStandardMaterial color="#09090b" />
      </mesh>

    </group>
  );
}

export default function AvatarViewer(props: AvatarProps) {
  return (
    <div className="h-[650px] w-full overflow-hidden rounded-3xl">
      <Canvas
        shadows
        camera={{
          position: [0, 0.35, 7],
          fov: 38,
        }}
      >
        <color attach="background" args={["#cbd5e1"]} />

        <ambientLight intensity={1.4} />

        <directionalLight
          position={[5, 7, 5]}
          intensity={2.5}
          castShadow
        />

        <directionalLight
          position={[-4, 3, -4]}
          intensity={0.8}
        />

        <Person {...props} />

        <gridHelper
          args={[10, 10]}
          position={[0, -2.35, 0]}
        />

        <OrbitControls
          enablePan={false}
          target={[0, 0.2, 0]}
          minDistance={4}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}