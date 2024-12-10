import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3, MathUtils } from "three";

export default function Alien() {
  const modelRef = useRef<Group>(null);
  const velocity = useRef<Vector3>(new Vector3(0, 0, 0));
  const keys = useRef<{ [key: string]: boolean }>({});
  const { camera } = useThree(); // 카메라 참조 가져오기.
  // 현재 회전값을 저장할 ref 추가
  const currentRotation = useRef(0);

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
  }, [scene]);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    // 이동 속도 설정
    const moveSpeed = 1;
    const deceleration = 0.95;
    // 회전 속도 설정
    const rotationSpeed = 5;

    // WASD로 이동
    if (keys.current["arrowup"]) velocity.current.z -= moveSpeed * delta;
    if (keys.current["arrowdown"]) velocity.current.z += moveSpeed * delta;
    if (keys.current["arrowright"]) velocity.current.x -= moveSpeed * delta;
    if (keys.current["arrowleft"]) velocity.current.x += moveSpeed * delta;

    // Space와 Shift로 상하 이동
    if (keys.current[" "]) velocity.current.y += moveSpeed * delta;
    if (keys.current["shift"]) velocity.current.y -= moveSpeed * delta;

    // 감속 적용
    velocity.current.multiplyScalar(deceleration);
    modelRef.current.position.add(velocity.current);

    // 위치 업데이트
    modelRef.current.position.add(velocity.current);

    // 카메라가 모델을 따라나디도록 설정
    const offset = new Vector3(0, 2, 5); // 카메라의 상대적 위치 (모델 뒤쪽 위에서 바라봄)
    const tartgetPosition = modelRef.current.position.clone().add(offset);
    camera.position.lerp(tartgetPosition, 0.1);
    camera.lookAt(modelRef.current.position);

    // 부드러운 회전 처리
    if (velocity.current.length() > 0.01) {
      const targetRotation = Math.atan2(velocity.current.x, velocity.current.z);
      //lerp를 사용하여 현재 회전값을 목표 회전값으로 부드럽게 보간
      currentRotation.current = MathUtils.lerp(
        currentRotation.current,
        targetRotation,
        delta * rotationSpeed
      );
      modelRef.current.rotation.y = currentRotation.current;
    }

    // 이동 방향으로 회전
    if (velocity.current.length() > 0.01) {
      const targetRotation = Math.atan2(velocity.current.x, velocity.current.z);
      modelRef.current.rotation.y = targetRotation;
    }

    // 움직임에 따른 기울기 효과
    modelRef.current.rotation.z = -velocity.current.x * 0.5;
    modelRef.current.rotation.x = velocity.current.z * 0.5;

    const targetTiltZ = -velocity.current.x * 0.5;
    const targetTiltX = velocity.current.z * 0.5;
    modelRef.current.rotation.z = MathUtils.lerp(
      modelRef.current.rotation.z,
      targetTiltZ,
      delta * rotationSpeed
    );
    modelRef.current.rotation.x = MathUtils.lerp(
      modelRef.current.rotation.x,
      targetTiltX,
      delta * rotationSpeed
    );
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[0.07, 0.07, 0.07]} // 모델 크기 조절이 필요할 수 있습니다
      rotation={[0, Math.PI, Math.PI / 2]}
    />
  );
}
