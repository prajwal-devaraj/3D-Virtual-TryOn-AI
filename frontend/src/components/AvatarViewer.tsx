"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

type BodyProfile = "male" | "female" | "neutral";
type CameraView = "front" | "side" | "back";

type AvatarProps = {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  armLength: number;
  inseam: number;
  skinColor: string;
  shirtColor: string;
  bodyProfile: BodyProfile;
  view: CameraView;
};

function CameraController({ view }: { view: CameraView }) {
  const { camera } = useThree();

  useEffect(() => {
    if (view === "front") {
      camera.position.set(0, 0.3, 7);
    }

    if (view === "side") {
      camera.position.set(7, 0.3, 0);
    }

    if (view === "back") {
      camera.position.set(0, 0.3, -7);
    }

    camera.lookAt(0, 0.2, 0);
  }, [view, camera]);

  return null;
}

function Person({
  height,
  weight,
  chest,
  waist,
  hips,
  shoulder,
  armLength,
  inseam,
  skinColor,
  shirtColor,
  bodyProfile,
}: AvatarProps) {
  const heightScale = height / 175;

  const weightScale = Math.max(
    0.72,
    Math.min(1.45, weight / 75)
  );

  const chestScale = chest / 95;
  const waistScale = waist / 82;
  const hipScale = hips / 96;
  const shoulderScale = shoulder / 45;
  const armScale = armLength / 62;
  const inseamScale = inseam / 80;

  let profileShoulder = 1;
  let profileChest = 1;
  let profileHip = 1;

  if (bodyProfile === "male") {
    profileShoulder = 1.08;
    profileChest = 1.05;
    profileHip = 0.95;
  }

  if (bodyProfile === "female") {
    profileShoulder = 0.94;
    profileChest = 1;
    profileHip = 1.1;
  }

  const shoulderWidth =
    shoulderScale * profileShoulder;

  const chestWidth =
    chestScale * weightScale * profileChest;

  const waistWidth =
    waistScale * weightScale;

  const hipWidth =
    hipScale * weightScale * profileHip;

  const legLength = 2.15 * inseamScale;
  const legCenterY = 0.05 - legLength / 2;
  const footY = 0.05 - legLength - 0.08;

  return (
    <group scale={[1, heightScale, 1]}>
      {/* HEAD */}
      <mesh position={[0, 2.55, 0]} castShadow>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color={skinColor}
          roughness={0.65}
        />
      </mesh>

      {/* FACE DEPTH */}
      <mesh
        position={[0, 2.5, 0.25]}
        scale={[0.8, 1, 0.55]}
      >
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color={skinColor}
          roughness={0.65}
        />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 2.08, 0]} castShadow>
        <cylinderGeometry
          args={[0.14, 0.16, 0.32, 24]}
        />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* SHOULDERS */}
      <mesh
        position={[0, 1.82, 0]}
        scale={[
          shoulderWidth,
          0.42,
          0.72 * weightScale,
        ]}
        castShadow
      >
        <sphereGeometry args={[0.72, 32, 32]} />

        <meshStandardMaterial
          color={shirtColor}
          roughness={0.78}
        />
      </mesh>

      {/* TORSO */}
      <mesh
        position={[0, 1.2, 0]}
        scale={[1, 1, 0.68 * weightScale]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.66 * chestWidth,
            0.53 * waistWidth,
            1.25,
            32,
          ]}
        />

        <meshStandardMaterial
          color={shirtColor}
          roughness={0.78}
        />
      </mesh>

      {/* HIPS */}
      <mesh
        position={[0, 0.3, 0]}
        scale={[
          0.78 * hipWidth,
          0.55,
          0.63 * weightScale,
        ]}
        castShadow
      >
        <sphereGeometry args={[0.72, 32, 32]} />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.82}
        />
      </mesh>

      {/* LEFT ARM */}
      <mesh
        position={[
          -0.87 * shoulderWidth,
          1.05,
          0,
        ]}
        rotation={[0, 0, -0.055]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.135 * weightScale,
            0.105 * weightScale,
            1.7 * armScale,
            24,
          ]}
        />

        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* RIGHT ARM */}
      <mesh
        position={[
          0.87 * shoulderWidth,
          1.05,
          0,
        ]}
        rotation={[0, 0, 0.055]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.135 * weightScale,
            0.105 * weightScale,
            1.7 * armScale,
            24,
          ]}
        />

        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* LEFT HAND */}
      <mesh
        position={[
          -0.87 * shoulderWidth,
          0.13 * armScale,
          0,
        ]}
      >
        <sphereGeometry
          args={[0.12 * weightScale, 24, 24]}
        />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* RIGHT HAND */}
      <mesh
        position={[
          0.87 * shoulderWidth,
          0.13 * armScale,
          0,
        ]}
      >
        <sphereGeometry
          args={[0.12 * weightScale, 24, 24]}
        />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* LEFT LEG */}
      <mesh
        position={[
          -0.26 * hipWidth,
          legCenterY,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.21 * weightScale,
            0.155 * weightScale,
            legLength,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.82}
        />
      </mesh>

      {/* RIGHT LEG */}
      <mesh
        position={[
          0.26 * hipWidth,
          legCenterY,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.21 * weightScale,
            0.155 * weightScale,
            legLength,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.82}
        />
      </mesh>

      {/* LEFT SHOE */}
      <mesh
        position={[
          -0.26 * hipWidth,
          footY,
          0.15,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.4 * weightScale,
            0.2,
            0.68,
          ]}
        />

        <meshStandardMaterial color="#09090b" />
      </mesh>

      {/* RIGHT SHOE */}
      <mesh
        position={[
          0.26 * hipWidth,
          footY,
          0.15,
        ]}
        castShadow
      >
        <boxGeometry
          args={[
            0.4 * weightScale,
            0.2,
            0.68,
          ]}
        />

        <meshStandardMaterial color="#09090b" />
      </mesh>
    </group>
  );
}

export default function AvatarViewer(
  props: AvatarProps
) {
  return (
    <div className="h-[650px] w-full overflow-hidden rounded-3xl">
      <Canvas
        shadows
        camera={{
          position: [0, 0.3, 7],
          fov: 38,
        }}
      >
        <color
          attach="background"
          args={["#cbd5e1"]}
        />

        <ambientLight intensity={1.35} />

        <directionalLight
          position={[5, 7, 5]}
          intensity={2.4}
          castShadow
        />

        <directionalLight
          position={[-4, 4, -4]}
          intensity={0.8}
        />

        <Person {...props} />

        <gridHelper
          args={[10, 10]}
          position={[0, -2.3, 0]}
        />

        <CameraController view={props.view} />

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