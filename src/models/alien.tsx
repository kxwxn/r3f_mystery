import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

export default function Alien() {
  const meshRef = useRef<Mesh>(null);
  const velocity = useRef<Vector3>(new Vector3(0, 0, 0));
  const keys = useRef<{ [key: string]: boolean }>({});

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 이동 속도 설정
    const moveSpeed = 5;
    const deceleration = 0.95;

    // WASD로 이동
    if (keys.current["w"]) velocity.current.z -= moveSpeed * delta;
    if (keys.current["s"]) velocity.current.z += moveSpeed * delta;
    if (keys.current["a"]) velocity.current.x -= moveSpeed * delta;
    if (keys.current["d"]) velocity.current.x += moveSpeed * delta;

    // Space와 Shift로 상하 이동
    if (keys.current[" "]) velocity.current.y += moveSpeed * delta;
    if (keys.current["shift"]) velocity.current.y -= moveSpeed * delta;

    // 감속 적용
    velocity.current.multiplyScalar(deceleration);

    // 위치 업데이트
    meshRef.current.position.add(velocity.current);

    // 이동 방향으로 회전 (부드럽게)
    if (velocity.current.length() > 0.01) {
      const targetRotation = Math.atan2(velocity.current.x, velocity.current.z);
      meshRef.current.rotation.y = targetRotation;
    }

    // 움직임에 따른 기울기 효과
    meshRef.current.rotation.z = -velocity.current.x * 0.5;
    meshRef.current.rotation.x = velocity.current.z * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={"#50c878"}
          roughness={0.3}
          metalness={0.7}
          emissive={"#204030"}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* 에일리언의 눈 */}
      <group position={[0, 0.5, 0.8]}>
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial
            color="#000"
            emissive="#ff0000"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial
            color="#000"
            emissive="#ff0000"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* 에일리언의 더듬이 */}
        <group position={[0, 0.8, 0]}>
          <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5]} />
            <meshStandardMaterial color="#50c878" />
          </mesh>
          <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5]} />
            <meshStandardMaterial color="#50c878" />
          </mesh>
        </group>
      </group>
    </mesh>
  );
}
