import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";

export default function Alien() {
  const modelRef = useRef<Group>(null);
  const velocity = useRef<Vector3>(new Vector3(0, 0, 0));
  const keys = useRef<{ [key: string]: boolean }>({});

  // astronaut 모델 로드
  const { scene } = useGLTF("/glb/astronaut.glb");

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
    if (!modelRef.current) return;

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
    modelRef.current.position.add(velocity.current);

    // 이동 방향으로 회전
    if (velocity.current.length() > 0.01) {
      const targetRotation = Math.atan2(velocity.current.x, velocity.current.z);
      modelRef.current.rotation.y = targetRotation;
    }

    // 움직임에 따른 기울기 효과
    modelRef.current.rotation.z = -velocity.current.x * 0.5;
    modelRef.current.rotation.x = velocity.current.z * 0.5;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[0.07, 0.07, 0.07]} // 모델 크기 조절이 필요할 수 있습니다
    />
  );
}
