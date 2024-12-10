import { Terrain } from "@react-three/drei";

export default function MoonSurface() {
  return (
    <Terrain
      position={[0, -1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      segments={100}
      width={100}
      height={100}
      maxHeight={2}
      seed={1}
    >
      {(texture) => (
        <meshStandardMaterial
          color="#808080"
          metalness={0.2}
          roughness={0.8}
          displacementScale={0.5}
        />
      )}
    </Terrain>
  );
}