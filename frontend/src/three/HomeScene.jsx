import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Environment, Float, Sparkles, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { portfolioCategories } from '../data/portfolioData.js'

function CarouselCard({ image, index, total, radius }) {
  const angle = (index / total) * Math.PI * 2
  const position = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius]
  const texture = useTexture(image.src)
  const materialRef = useRef()
  const groupRef = useRef()
  const { camera } = useThree()
  const dirToCard = useMemo(() => new Vector3(), [])
  const cameraDir = useMemo(() => new Vector3(), [])

  useFrame(() => {
    if (!groupRef.current || !materialRef.current) return

    groupRef.current.getWorldPosition(dirToCard)
    dirToCard.normalize()
    camera.getWorldDirection(cameraDir)

    const frontness = (1 - dirToCard.dot(cameraDir)) * 0.5
    const opacity = 0.25 + frontness * 0.75
    const scale = 0.65 + frontness * 0.45

    materialRef.current.opacity = opacity
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={position}>
      <Billboard>
        <mesh>
          <planeGeometry args={[1.55, 1.05]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#ffffff"
            emissive="#11131a"
            emissiveIntensity={0.2}
            map={texture}
            transparent
            opacity={1}
          />
        </mesh>
      </Billboard>
    </group>
  )
}

function CarouselRing() {
  const group = useRef()
  const radius = 4.2
  const frames = useMemo(() => (
    portfolioCategories.map((category) => ({
      src: category.images[0].src,
      name: category.title,
    }))
  ), [])

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={group} position={[0, -0.3, 0]}>
        {frames.map((image, index) => (
          <CarouselCard
            key={image.name}
            image={image}
            index={index}
            total={frames.length}
            radius={radius}
          />
        ))}
      </group>
    </Float>
  )
}

function BaseRing() {
  const ringRef = useRef()

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    ringRef.current.position.y = -1.4 + Math.sin(clock.getElapsedTime() * 0.8) * 0.05
    ringRef.current.rotation.z += 0.001
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[3.1, 0.05, 16, 90]} />
      <meshStandardMaterial color="#b6a894" emissive="#201a14" emissiveIntensity={0.6} />
    </mesh>
  )
}

function CameraRig() {
  const { camera, pointer, clock } = useThree()

  useFrame(() => {
    const time = clock.getElapsedTime()
    const breathe = Math.sin(time * 0.6) * 0.2

    camera.position.x = pointer.x * 0.6
    camera.position.y = 1.2 + breathe + pointer.y * 0.35
    camera.position.z = 7.5 + Math.cos(time * 0.5) * 0.15
    camera.fov = 50 + Math.sin(time * 0.4) * 0.4
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  })

  return null
}

function HomeScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 1.2, 7.5], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#05060b']} />
      <fog attach="fog" args={['#05060b', 7.5, 16]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <spotLight position={[-4, 6, 2]} intensity={1.2} />
      <CameraRig />
      <Suspense fallback={null}>
        <Sparkles count={120} speed={0.4} opacity={0.7} size={1.6} scale={[12, 6, 12]} color="#b8b0a2" />
        <CarouselRing />
        <BaseRing />
      </Suspense>
      <Environment preset="city" />
    </Canvas>
  )
}

export default HomeScene
