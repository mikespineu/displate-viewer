function Plane() {
  return (
    <mesh position={[0, 0, -0.03]} scale={[20, 10, 10]} receiveShadow>
      <planeGeometry />
      <meshStandardMaterial color='greenyellow' />
    </mesh>
  )
}

export { Plane }
