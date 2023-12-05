import { Center, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { MathUtils } from 'three'

import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Lights } from './Lights'
import { DisplatePoster } from './components/DisplatePoster'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })
  const [margin, setMargin] = useState<number>(3)
  const [targetMargin, setTargetMargin] = useState<number>(0.2)

  // please lerp margin from 3 to 0.
  useFrame(() => {
    setMargin(MathUtils.lerp(targetMargin, margin, 0.05))
  })

  return (
    <>
      {performance && <Perf position='top-left' />}
      <color attach='background' args={['#ffffff']} />
      {/*<OrbitControls makeDefault />*/}
      <Lights />
      {/*<PresentationControls*/}
      {/*  config={{ mass: 2, tension: 200 }}*/}
      {/*  snap={{ mass: 2, tension: 100 }}*/}
      {/*  rotation={[0, 0, 0]}*/}
      {/*  polar={[-Math.PI / 6, Math.PI / 6]}*/}
      {/*  azimuth={[-Math.PI, Math.PI]}*/}
      {/*  speed={2.5}*/}
      {/*>*/}
      <Float
        speed={3} // Animation speed, defaults to 1
        rotationIntensity={0.25} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.3} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.05, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Center>
          <DisplatePoster />
        </Center>
      </Float>
      {/*</PresentationControls>*/}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.95}
        scale={6}
        blur={2.5}
        far={10}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <OrbitControls maxAzimuthAngle={Math.PI} maxPolarAngle={Math.PI} />
      {/*<Backdrop*/}
      {/*  floor={0.5} // Stretches the floor segment, 0.25 by default*/}
      {/*  segments={30} // Mesh-resolution, 20 by default*/}
      {/*  receiveShadow={false}*/}
      {/*  scale={[2000, 20, 10]}*/}
      {/*  position={[-2, -5, 0]}*/}
      {/*>*/}
      {/*  <meshStandardMaterial color='#ececec' />*/}
      {/*</Backdrop>*/}
    </>
  )
}

export { Scene }
