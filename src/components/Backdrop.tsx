import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

function Backdrop() {
  return (
    <AccumulativeShadows
      frames={30}
      alphaTest={1}
      scale={8}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.001]}
      resolution={1024}
      color={'#000000'}
      colorBlend={7}
      opacity={0.65}
    >
      <RandomizedLight radius={6} ambient={0.6} position={[10, 5, -15]} bias={0.003} />
    </AccumulativeShadows>
  )
}

export default Backdrop
