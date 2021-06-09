import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import { Button, Hidden } from '@material-ui/core'

import CanvasDraw from 'react-canvas-draw'
import canvasBackground from '../assets/canvas.png'
import { makeStyles, useTheme } from '@material-ui/core'

const SignatureSpace = observer(({ form, setForm, canvasRef }) => {
  const [open, setOpen] = useState(false)

  const classes = useStyles()
  const theme = useTheme()

  const completeSign = () => {
    const signature = canvasRef.current.canvas.drawing

    signature.toBlob(data => setForm({ ...form, signature: data }))
  }

  return (
    <>
      {/* desktop */}
      <Hidden smDown>
        <Canvas completeSign={completeSign} canvasRef={canvasRef} />
        <Button
          className={classes.button}
          onClick={() => canvasRef.current.clear()}
        >
          다시 서명
        </Button>
      </Hidden>
      {/* mobile */}
      <Hidden mdUp>
        <Button className={classes.button} onClick={() => setOpen(true)}>
          (필수)서명하기
        </Button>
        <MobileCanvas
          open={open}
          setOpen={setOpen}
          completeSign={completeSign}
          canvasRef={canvasRef}
        />
      </Hidden>
    </>
  )
})

const MobileCanvas = ({ open, setOpen, completeSign, canvasRef }) => {
  return (
    <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
      <Canvas completeSign={completeSign} canvasRef={canvasRef} />
      <DialogActions>
        <Button color="primary" onClick={() => canvasRef.current.clear()}>
          다시하기
        </Button>
        <Button color="primary" onClick={() => setOpen(false)}>
          완료
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Canvas = ({ completeSign, canvasRef }) => {
  const classes = useStyles()

  return (
    <CanvasDraw
      className={classes.canvasDraw}
      style={{
        width: '100%',
        backgroundImage: `url(${canvasBackground})`,
        backgroundSize: '9.313rem 1.563rem',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        marginBottom: '0.75rem',
      }}
      hideGrid
      hideInterface={false}
      brushRadius={1}
      brushColor={'#000'}
      lazyRadius={0}
      onChange={completeSign}
      ref={canvasRef}
    />
  )
}

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
