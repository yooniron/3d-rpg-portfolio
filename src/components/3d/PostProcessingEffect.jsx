import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useGameStore } from '../../stores/useGameStore';

export const PostProcessingEffect = () => {
    const postProcessingEnabled = useGameStore((state) => state.postProcessingEnabled);
    const timeOfDay = useGameStore((state) => state.timeOfDay);

    if (!postProcessingEnabled) return null;

    // 시간대별 Bloom 광원 블룸 강도 설정
    const bloomIntensity = timeOfDay === 'night' ? 1.4 : (timeOfDay === 'sunset' ? 1.0 : 0.7);

    return (
        <EffectComposer disableNormalPass>
            {/* 네온 사인 및 조명 광원 발광 (Glow) */}
            <Bloom
                intensity={bloomIntensity}
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                height={300}
            />
            {/* 화면 외곽 감성적 시야 비네팅 (Vignette) */}
            <Vignette
                eskil={false}
                offset={0.1}
                darkness={0.5}
            />
        </EffectComposer>
    );
};

export default PostProcessingEffect;
