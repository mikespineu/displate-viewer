import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { Scene } from './Scene'
import './styles/main.css'

function Main() {
  return (
    <div className='main'>
      <Leva
        collapsed={true}
        oneLineLabels={false}
        flat={true}
        neverHide={false}
        theme={{
          sizes: {
            titleBarHeight: '28px',
          },
          fontSizes: {
            root: '10px',
          },
        }}
      />
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 0.6,
          outputEncoding: sRGBEncoding,
        }}
        linear={false}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
          position: [0, 0, 7],
        }}
        eventPrefix={'client'}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
