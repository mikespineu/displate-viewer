import { easing } from 'maath'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef()
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta)
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta,
    )
  })
  return <group ref={group}>{children}</group>
}

export { CameraRig }
