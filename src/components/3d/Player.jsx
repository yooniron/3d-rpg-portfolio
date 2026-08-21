import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';
import { careerData } from '../../data/careerData';

export const Player = () => {
    const groupRef = useRef();
    const leftLegRef = useRef();
    const rightLegRef = useRef();
    const leftArmRef = useRef();
    const rightArmRef = useRef();
    const shadowRef = useRef();

    const { camera } = useThree();

    // Zustand Store
    const setPlayerPos = useGameStore((state) => state.setPlayerPos);
    const setPlayerRotation = useGameStore((state) => state.setPlayerRotation);
    const setIsMoving = useGameStore((state) => state.setIsMoving);
    const setIsRunning = useGameStore((state) => state.setIsRunning);
    const setNearbyBuilding = useGameStore((state) => state.setNearbyBuilding);
    const openModal = useGameStore((state) => state.openModal);
    const activeModal = useGameStore((state) => state.activeModal);
    const cinematicTarget = useGameStore((state) => state.cinematicTarget);
    const targetMovePos = useGameStore((state) => state.targetMovePos);
    const setTargetMovePos = useGameStore((state) => state.setTargetMovePos);
    const teleportTarget = useGameStore((state) => state.teleportTarget);
    const clearTeleport = useGameStore((state) => state.clearTeleport);
    const virtualJoystick = useGameStore((state) => state.virtualJoystick);

    // Input states
    const keys = useRef({ forward: false, backward: false, left: false, right: false, shift: false });
    const playerState = useRef({
        pos: new THREE.Vector3(0, 0, 4),
        velocity: new THREE.Vector3(),
        rotation: 0,
        walkTime: 0
    });

    // Keyboard Event Listeners
    useEffect(() => {
        const onKeyDown = (e) => {
            if (useGameStore.getState().activeModal) {
                if (e.key === 'Escape') {
                    useGameStore.getState().closeModal();
                }
                return;
            }

            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    keys.current.forward = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    keys.current.backward = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    keys.current.left = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    keys.current.right = true;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    keys.current.shift = true;
                    break;
                case 'KeyE':
                case 'Space':
                case 'Enter':
                    {
                        const nearby = useGameStore.getState().nearbyBuilding;
                        if (nearby) {
                            openModal(nearby.id);
                        }
                    }
                    break;
                default:
                    break;
            }
        };

        const onKeyUp = (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    keys.current.forward = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    keys.current.backward = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    keys.current.left = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    keys.current.right = false;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    keys.current.shift = false;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [openModal]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Handle Teleport
        if (teleportTarget) {
            playerState.current.pos.set(teleportTarget[0], 0, teleportTarget[2] || teleportTarget[1]);
            clearTeleport();
        }

        let moveX = 0;
        let moveZ = 0;

        if (keys.current.forward) moveZ -= 1;
        if (keys.current.backward) moveZ += 1;
        if (keys.current.left) moveX -= 1;
        if (keys.current.right) moveX += 1;

        if (virtualJoystick.active) {
            moveX += virtualJoystick.x;
            moveZ += virtualJoystick.y;
        }

        if (targetMovePos && !keys.current.forward && !keys.current.backward && !keys.current.left && !keys.current.right) {
            const targetVec = new THREE.Vector3(targetMovePos[0], 0, targetMovePos[2]);
            const distToTarget = playerState.current.pos.distanceTo(targetVec);

            if (distToTarget > 0.4) {
                const dir = new THREE.Vector3().subVectors(targetVec, playerState.current.pos).normalize();
                moveX = dir.x;
                moveZ = dir.z;
            } else {
                setTargetMovePos(null);
            }
        }

        const isInputActive = moveX !== 0 || moveZ !== 0;
        const isRunning = keys.current.shift;
        const speed = (isRunning ? 11.5 : 6.8) * delta;

        if (isInputActive) {
            const inputDir = new THREE.Vector3(moveX, 0, moveZ).normalize();
            playerState.current.pos.x += inputDir.x * speed;
            playerState.current.pos.z += inputDir.z * speed;

            playerState.current.pos.x = Math.max(-42, Math.min(42, playerState.current.pos.x));
            playerState.current.pos.z = Math.max(-42, Math.min(42, playerState.current.pos.z));

            const targetAngle = Math.atan2(inputDir.x, inputDir.z);
            let angleDiff = targetAngle - playerState.current.rotation;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            playerState.current.rotation += angleDiff * Math.min(1, delta * 15);

            playerState.current.walkTime += delta * (isRunning ? 18 : 11);
            const legSwing = Math.sin(playerState.current.walkTime) * 0.6;
            const armSwing = Math.cos(playerState.current.walkTime) * 0.6;

            if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
            if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
            if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing;
            if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing;

            groupRef.current.position.y = Math.abs(Math.sin(playerState.current.walkTime * 2)) * 0.12;

            setIsMoving(true);
            setIsRunning(isRunning);
        } else {
            if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.8;
            if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.8;
            if (leftArmRef.current) leftArmRef.current.rotation.x *= 0.8;
            if (rightArmRef.current) rightArmRef.current.rotation.x *= 0.8;
            groupRef.current.position.y = 0;

            setIsMoving(false);
            setIsRunning(false);
        }

        groupRef.current.position.x = playerState.current.pos.x;
        groupRef.current.position.z = playerState.current.pos.z;
        groupRef.current.rotation.y = playerState.current.rotation;

        setPlayerPos([playerState.current.pos.x, 0, playerState.current.pos.z]);
        setPlayerRotation(playerState.current.rotation);

        let closestBuilding = null;
        let minDistance = 5.2;

        careerData.landmarks.forEach((landmark) => {
            const lmPos = new THREE.Vector3(landmark.position[0], 0, landmark.position[2]);
            const dist = playerState.current.pos.distanceTo(lmPos);
            if (dist < minDistance) {
                minDistance = dist;
                closestBuilding = landmark;
            }
        });

        setNearbyBuilding(closestBuilding);

        // 3D 시네마틱 카메라 시스템 및 줌인 포커스 엔진 (60FPS 고급 슬로우 글라이딩)
        const targetModalId = activeModal || cinematicTarget;
        const dampFactor = 1 - Math.exp(-2.8 * delta);

        if (targetModalId) {
            const landmark = careerData.landmarks.find((l) => l.id === targetModalId);
            if (landmark) {
                const camOff = landmark.camOffset || [0, 2.2, 9.0];
                const lookOff = landmark.camLookOffset || [0, 4.5, 0];

                const targetCamPos = new THREE.Vector3(
                    landmark.position[0] + camOff[0],
                    landmark.position[1] + camOff[1],
                    landmark.position[2] + camOff[2]
                );
                camera.position.lerp(targetCamPos, dampFactor);

                const lookTarget = new THREE.Vector3(
                    landmark.position[0] + lookOff[0],
                    landmark.position[1] + lookOff[1],
                    landmark.position[2] + lookOff[2]
                );
                camera.lookAt(lookTarget);

                // 45도 대각선 입체 와이드 관찰 시야각 (50도 -> 48도)
                if (Math.abs(camera.fov - 48) > 0.05) {
                    camera.fov = THREE.MathUtils.lerp(camera.fov, 48, dampFactor);
                    camera.updateProjectionMatrix();
                }
            }
        } else {
            // 평상시 탐험 모드 카메라 추적 (시야각 50도)
            const cameraOffset = new THREE.Vector3(0, 11, 14);
            const targetCamPos = new THREE.Vector3().addVectors(playerState.current.pos, cameraOffset);
            camera.position.lerp(targetCamPos, dampFactor);

            const lookTarget = new THREE.Vector3(
                playerState.current.pos.x,
                playerState.current.pos.y + 1.2,
                playerState.current.pos.z
            );
            camera.lookAt(lookTarget);

            if (Math.abs(camera.fov - 50) > 0.05) {
                camera.fov = THREE.MathUtils.lerp(camera.fov, 50, dampFactor);
                camera.updateProjectionMatrix();
            }
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 4]}>
            {/* Ground Shadow Decal (Soft) */}
            <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <circleGeometry args={[0.7, 16]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.2} />
            </mesh>

            {/* Pelvis / Hips */}
            <mesh position={[0, 0.9, 0]} castShadow>
                <boxGeometry args={[0.6, 0.3, 0.4]} />
                <meshStandardMaterial color="#334155" />
            </mesh>

            {/* Torso / Bright Sky-Blue Hoodie */}
            <mesh position={[0, 1.4, 0]} castShadow>
                <boxGeometry args={[0.7, 0.75, 0.45]} />
                <meshStandardMaterial color="#0284c7" roughness={0.3} />
            </mesh>

            {/* Tech Backpack (Ivory & Gold) */}
            <mesh position={[0, 1.4, -0.3]} castShadow>
                <boxGeometry args={[0.5, 0.6, 0.25]} />
                <meshStandardMaterial color="#f8fafc" />
            </mesh>
            <mesh position={[0, 1.4, -0.43]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#f59e0b" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 2.05, 0]} castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#fed7aa" roughness={0.5} />
            </mesh>

            {/* Glowing Golden Visor */}
            <mesh position={[0, 2.08, 0.2]}>
                <boxGeometry args={[0.52, 0.16, 0.15]} />
                <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
            </mesh>

            {/* Stylish Brown/Chestnut Hair */}
            <mesh position={[0, 2.32, -0.02]} castShadow>
                <boxGeometry args={[0.54, 0.15, 0.54]} />
                <meshStandardMaterial color="#78350f" />
            </mesh>

            {/* Left Arm */}
            <group ref={leftArmRef} position={[-0.45, 1.7, 0]}>
                <mesh position={[0, -0.3, 0]} castShadow>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#0284c7" />
                </mesh>
                <mesh position={[0, -0.65, 0]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#fed7aa" />
                </mesh>
            </group>

            {/* Right Arm */}
            <group ref={rightArmRef} position={[0.45, 1.7, 0]}>
                <mesh position={[0, -0.3, 0]} castShadow>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#0284c7" />
                </mesh>
                <mesh position={[0, -0.65, 0]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#fed7aa" />
                </mesh>
            </group>

            {/* Left Leg */}
            <group ref={leftLegRef} position={[-0.2, 0.75, 0]}>
                <mesh position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.22, 0.7, 0.25]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0, -0.72, 0.05]} castShadow>
                    <boxGeometry args={[0.24, 0.15, 0.35]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Right Leg */}
            <group ref={rightLegRef} position={[0.2, 0.75, 0]}>
                <mesh position={[0, -0.35, 0]} castShadow>
                    <boxGeometry args={[0.22, 0.7, 0.25]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0, -0.72, 0.05]} castShadow>
                    <boxGeometry args={[0.24, 0.15, 0.35]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            </group>
        </group>
    );
};
