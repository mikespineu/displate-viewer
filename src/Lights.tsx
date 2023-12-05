import { useRef } from 'react'
import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'
import { useControls } from 'leva'
import { Environment } from '@react-three/drei'

function Lights() {
  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)
  const refGroupEnv = useRef<Group>(null)

  const {
    position: directionalPosition,
    intensity: directionalIntensity,
    visible: directionalVisible,
  } = useControls('Directional Light', {
    position: [1, 0, 3],
    intensity: {
      value: 0.8,
      min: 0,
      max: 20,
      step: 0.1,
    },
    visible: true,
  })

  const {
    position: directionalPosition2,
    intensity: directionalIntensity2,
    visible: directionalVisible2,
  } = useControls('Directional Light 2', {
    position: [-1, 1, 5],
    intensity: {
      value: 0.5,
      min: 0,
      max: 20,
      step: 0.1,
    },
    visible: true,
  })

  const { intensity: ambientIntensity, visible: ambientVisible } = useControls(
    'Ambient Light',
    {
      intensity: {
        value: 0.5,
        min: 0,
        max: 20,
        step: 0.1,
      },
      visible: true,
    },
  )

  const { PresetEnvMap } = useControls('Env', {
    PresetEnvMap: false,
  })

  return (
    <>
      <directionalLight
        position={directionalPosition}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        visible={directionalVisible}
      />
      <directionalLight
        position={directionalPosition2}
        intensity={directionalIntensity2}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        visible={directionalVisible2}
      />
      <directionalLight
        position={[0, 0, -2]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
        visible={directionalVisible}
      />
      <ambientLight intensity={ambientIntensity} visible={ambientVisible} />

      <group>{PresetEnvMap && <Environment preset='studio' blur={1} background />}</group>
    </>
  )
}

export { Lights }
