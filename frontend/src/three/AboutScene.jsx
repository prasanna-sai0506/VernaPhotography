import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

function Particles() {
  const group = useRef()
  const points = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 4,
        ],
        scale: 0.04 + Math.random() * 0.08,
      })),
    []
  )

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={group}>
      {points.map((point) => (
        <mesh key={point.id} position={point.position}>
          <sphereGeometry args={[point.scale, 16, 16]} />
          <meshStandardMaterial color="#f4c46b" emissive="#ff6b3d" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function AboutScene() {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 6], fov: 55 }}>
      <color attach="background" args={['#0b0c10']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 3]} intensity={0.6} />
      <Particles />
    </Canvas>
  )
}

export default AboutScene
