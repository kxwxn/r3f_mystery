"use client";

import CathedralModel from "@/models/cathedralModel";
import { Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const Scene = () => {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={2} position={[-5, -5, 5]} />
      <Suspense fallback={null}>
        <Center>
          <CathedralModel />
        </Center>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
