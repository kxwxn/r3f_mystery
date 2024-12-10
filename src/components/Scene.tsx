"use client";

import Alien from "@/models/alien";
import CathedralModel from "@/models/cathedralModel";
import MoonSurface from "@/models/MoonSurface";
import {
  Center,
  Html,
  OrbitControls,
  ScrollControls,
  Stars,
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
      {/* <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      /> */}
      <ambientLight intensity={2} position={[-5, -5, 5]} />
      <Suspense fallback={<Loader />}>
        {/* <ScrollControls damping={0.2} pages={2}>
          <Center>
            <CathedralModel />
          </Center>
        </ScrollControls> */}

        <color attach="background" args={["#000"]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
        <MoonSurface/>
        <Alien />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
