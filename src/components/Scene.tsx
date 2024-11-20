"use client";

import CathedralModel from "@/models/cathedralModel";
import {
  Center,
  Html,
  OrbitControls,
  ScrollControls,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const Loader = () => {
  const { progress, active } = useProgress();

  return <Html center> {progress.toFixed(1)} % loaded</Html>;
};

const Scene = () => {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
      <OrbitControls />
      <ambientLight intensity={2} position={[-5, -5, 5]} />
      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.2} pages={2}>
          <Center>
            <CathedralModel />
          </Center>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
