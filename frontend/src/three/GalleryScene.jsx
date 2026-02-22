import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useCursor, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'

function GalleryCard({ image, position, onSelect }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const texture = useTexture(image.src)

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(image)}
      >
        <planeGeometry args={[1.7, 1.15]} />
        <meshStandardMaterial map={texture} color={hovered ? '#ffffff' : '#d9cbb8'} />
      </mesh>
    </Float>
  )
}

function GalleryContent({ images, onSelect }) {
  const group = useRef()
  const positions = useMemo(() => {
    const radius = 3.4
    return images.map((_, index) => {
      const angle = (index / images.length) * Math.PI * 2
      return [Math.cos(angle) * radius, (index % 3) * 0.4 - 0.4, Math.sin(angle) * radius]
    })
  }, [images])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.pointer.x * 0.4
      group.current.rotation.x = -state.pointer.y * 0.1
    }
  })

  return (
    <group ref={group}>
      {images.map((image, index) => (
        <GalleryCard key={image.name} image={image} position={positions[index]} onSelect={onSelect} />
      ))}
    </group>
  )
}

function GalleryScene({ images, onSelect }) {
  return (
    <Canvas camera={{ position: [0, 0.6, 6], fov: 45 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#0b0c10']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[4, 6, 4]} intensity={1.2} />
      <Suspense fallback={null}>
        <GalleryContent images={images} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  )
}

export default GalleryScene
