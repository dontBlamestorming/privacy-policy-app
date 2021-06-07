import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'

import appStore from '../stores/appStore'

import CanvasDraw from 'react-canvas-draw'
import canvasBackground from '../assets/canvas.png'
import { makeStyles, useTheme } from '@material-ui/core'

const SignatureSpace = observer(({ form, setForm, canvasRef }) => {
  const classes = useStyles()
  const theme = useTheme()

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
          width: '100%',
        }}
        hideGrid
        hideInterface={false}
        brushRadius={1}
        brushColor={'#000'}
        lazyRadius={0}
        onChange={completeSign}
        ref={canvasRef}
      />

      <Button
        className={classes.button}
        onClick={() => canvasRef.current.clear()}
      >
        다시 서명
      </Button>
    </>
  )
})

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    height: '3.125rem',
    marginTop: '0.75px',
    color: '#ffffff',
    backgroundColor: '#30bbc3',
    fontSize: '1.563rem',
    lineHeight: 1.28,
  },
}))

export default SignatureSpace
