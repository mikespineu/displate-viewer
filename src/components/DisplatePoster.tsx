import React, { useRef, useState } from 'react'
import {
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  Vector2,
} from 'three'
import { Html, useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { buttonGroup, useControls } from 'leva'

interface ExtendedGLTF extends GLTF {
  nodes: any
}

function DisplatePoster() {
  const sphereRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null)
  const pivotRef = useRef<Group>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [targetRotation, setTargetRotation] = useState(0)
  const [currentPoster, setCurrentPoster] = useState(1)

  // @ts-ignore
  const { nodes } = useGLTF('/assets/poster/poster.gltf') as ExtendedGLTF

  const posters = [
    {
      name: 'nature',
      map: '/assets/poster/originals2/front.jpg',
      normalMap: '/assets/poster/originals2/normal-map.jpg',
      roughnessMap: '/assets/poster/originals2/roug-map.jpg',
      settings: {},
    },
    {
      name: 'optimus',
      map: '/assets/poster/prime/front.jpg',
      normalMap: '/assets/poster/prime/normal-map.jpg',
      roughnessMap: '/assets/poster/prime/roug-map.jpg',
      settings: {},
    },
    {
      name: 'optimus',
      map: '/assets/poster/cola/front.jpg',
      normalMap: '/assets/poster/cola/normal-map.jpg',
      roughnessMap: '/assets/poster/cola/roug-map.jpg',
      settings: {},
    },
  ]
  const map = useLoader(TextureLoader, posters[currentPoster].map)
  const normalMap = useLoader(TextureLoader, posters[currentPoster].normalMap)
  const roughnessMap = useLoader(TextureLoader, posters[currentPoster].roughnessMap)

  map.flipY = false
  normalMap.flipY = false
  roughnessMap.flipY = false

  // @ts-ignore
  const [values, set] = useControls(() => ({
    Poster: buttonGroup({
      First: () => {
        setCurrentPoster(0)
      },
      Optimus: () => {
        setCurrentPoster(1)
      },
      Cola: () => {
        setCurrentPoster(2)
      },
    }),
  }))

  const {
    isRoughnessMap,
    roughnessMapIntensity,
    isNormalMap,
    normalMapScale,
    envMapIntensity,
  } = useControls('Poster Material', {
    roughnessMapIntensity: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.1,
    },
    isRoughnessMap: true,
    normalMapScale: {
      value: 0.05,
      min: 0,
      max: 1,
      step: 0.01,
    },
    isNormalMap: true,
    envMapIntensity: {
      value: 0.01,
      min: 0,
      max: 3,
      step: 0.01,
    },
  })

  const frontCutomMaterial = new MeshStandardMaterial({
    map: map, // Assuming your original material has a texture map
    normalMap: isNormalMap ? normalMap : null,
    envMapIntensity: envMapIntensity,
    normalScale: new Vector2(-normalMapScale, -normalMapScale),
    roughnessMap: isRoughnessMap ? roughnessMap : null,
    roughness: roughnessMapIntensity,
  })

  const backCutomMaterial = new MeshStandardMaterial({
    map: nodes.front.children[1].material.map, // Assuming your original material has a texture map
    envMapIntensity: 0,
    roughness: 0.4,
    metalness: 0.4,
  })

  const poster = useRef<Group>(null)

  return (
    <group ref={poster}>
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        onPointerOver={() => {
          setIsVisible(true)
        }}
        onPointerOut={() => {
          setIsVisible(false)
        }}
        castShadow
        geometry={nodes.front.children[0].geometry}
        material={frontCutomMaterial}
        dispose={null}
      >
        <Html
          scale={1}
          rotation={[0, Math.PI / 2, 0]}
          position={[0, -2.6, 0.1]}
          transform
        >
          <div
            className='annotation'
            style={{
              fontSize: '4px',
              background: '#fff',
              color: 'black',
              padding: '4px 8px',
              borderRadius: '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.15s ease-in-out',
            }}
          >
            Vibrant <b>Colors</b> Printed on <b>Metal</b>
          </div>
        </Html>
      </mesh>
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
        geometry={nodes.front.children[1].geometry}
        material={backCutomMaterial}
        dispose={null}
      ></mesh>
    </group>
  )
}

export { DisplatePoster }
