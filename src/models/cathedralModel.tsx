"use client";

import { useAnimations, useGLTF } from "@react-three/drei";

useGLTF("/glb/cathedral.glb");

const CathedralModel = () => {
  const { nodes, animations, scene } = useGLTF("/glb/cathedral.glb}");
  const { actions } = useAnimations(animations, scene);
  return (
    <group>
      <primitive object={scene} />
    </group>
  );
};

export default CathedralModel;
