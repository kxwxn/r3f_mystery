"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/glb/cathedral.glb");

const CathedralModel = () => {
  const group = useRef<Group>(null);
  const { nodes, materials, scene } = useGLTF("/glb/cathedral.glb");

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
};

export default CathedralModel;
