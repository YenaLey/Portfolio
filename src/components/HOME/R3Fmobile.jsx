import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Plane } from '@react-three/drei'; 

function R3Fmobile() {
  const [dynamicText, setDynamicText] = useState("");
  const phrases = ["Front End", "Developer", "Hard Coder"]; // 순차적으로 표시할 단어들
  const [phraseIndex, setPhraseIndex] = useState(0); // 현재 표시 중인 단어의 인덱스
  const [isDeleting, setIsDeleting] = useState(false); // 현재 텍스트를 지우고 있는지 여부

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const updateText = () => {
      if (!isDeleting) {
        // 글자를 추가하는 경우
        setDynamicText(currentPhrase.substring(0, dynamicText.length + 1));
      } else {
        // 글자를 지우는 경우
        setDynamicText(currentPhrase.substring(0, dynamicText.length - 1));
      }
    };

    let timeoutId;
    if (!isDeleting && dynamicText === currentPhrase) {
      // 단어를 모두 썼으면 일정 시간 후에 지우기 시작
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && dynamicText === '') {
      // 단어를 모두 지웠으면 다음 단어로 넘어감
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    } else {
      // 글자를 추가하거나 지우는 중
      timeoutId = setTimeout(updateText, isDeleting ? 100 : 100);
    }

    return () => clearTimeout(timeoutId);
  }, [dynamicText, isDeleting, phraseIndex]);

  return (
    <Canvas shadows shadowMap
      camera={{ fov: 50, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000, position: [0, 0, 1.5] }}>
      <ambientLight intensity={0} />
      <spotLight
        color="#ffc900"
        position={[0.1, 0, 0.5]}
        angle={0.5}
        penumbra={1}
        intensity={100}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <spotLight
        color="gray"
        position={[-0.1, -0.1, 0.5]}
        angle={0.5}
        penumbra={1}
        intensity={100}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <Text
        color="black"
        fontSize={0.15}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        position={[0, 0.4, 0]}
      >
        Hi, there!
      </Text>
      <Text
        color="black"
        fontSize={0.15}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        position={[0, 0.3, 0]}
      >
        I'm
      </Text>
      <Text
        color="#E63946"
        fontSize={0.25}
        letterSpacing={0}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        position={[0, 0.1, 0]}
        castShadow
      >
          Yena
      </Text>
      <Text
        color="black"
        fontSize={0.1}
        letterSpacing={0}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        position={[0, -0.1, 0]}
        castShadow
      >
        {dynamicText}
      </Text>
      <Plane
        receiveShadow
        rotation={[0, 0, 0]}
        position={[0, -0.5, -1]}
        args={[7, 7]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </Canvas>
  );
}

export default R3Fmobile;