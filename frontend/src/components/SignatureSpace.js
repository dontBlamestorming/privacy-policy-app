import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'

import appStore from '../stores/appStore'

import CanvasDraw from 'react-canvas-draw'
import canvasBackground from '../assets/canvas.png'

const SignatureSpace = observer(({ form, setForm, canvasRef }) => {
  const completeSign = () => {
    const signature = canvasRef.current.canvas.drawing

    signature.toBlob(data => setForm({ ...form, signature: data }))
  }
  return (
    <>
      <CanvasDraw
        style={{
          backgroundImage: `url(${canvasBackground})`,
          backgroundSize: '9.313rem 1.563rem',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          marginBottom: '0.75rem',
        }}
        canvasWidth={780}
        canvasHeight={420}
        hideGrid
        hideInterface={false}
        brushRadius={1}
        brushColor={'#000'}
        lazyRadius={0}
        onChange={completeSign}
        ref={canvasRef}
      />

      <Button
        style={{
          width: '100%',
          height: '3.125rem',
          marginTop: '0.75px',
          color: '#ffffff',
          backgroundColor: '#30bbc3',
          fontSize: '1.563rem',
          lineHeight: 1.28,
        }}
        onClick={() => canvasRef.current.clear()}
      >
        다시 서명
      </Button>
    </>
  )
})

export default SignatureSpace
