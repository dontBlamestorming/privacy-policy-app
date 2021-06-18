import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import {
  Dialog,
  DialogActions,
  Button,
  Hidden,
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core'

import CanvasDraw from '../components/CanvasDraw'
import canvasBackground from '../assets/canvas.png'

const SignatureSpace = observer(({ form, setForm, canvasRef }) => {
  const [open, setOpen] = useState(false)
  const [signURL, setSignURL] = useState(null)
  const classes = useStyles()

  const completeSign = () => {
    const signature = canvasRef.current.canvas.drawing

    signature.toBlob(data => {
      const objectURL = URL.createObjectURL(data)

      setSignURL(objectURL)
      setForm({ ...form, signature: data })
    })
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
        <Button
          className={classes.button}
          onClick={() => {
            URL.revokeObjectURL(signURL)
            setOpen(true)
          }}
        >
          (필수)서명하기
        </Button>
        <MobileCanvas
          open={open}
          setOpen={setOpen}
          completeSign={completeSign}
          canvasRef={canvasRef}
        />
        <Grid container justify="center" style={{ marginTop: '39px' }}>
          <Grid item sm={6} xs={5}>
            {signURL ? (
              <Paper style={{ borderRadius: '10px' }}>
                <img
                  className={classes.signImage}
                  alt="서명"
                  src={`${signURL}`}
                />
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Hidden>
    </>
  )
})

const MobileCanvas = ({ open, setOpen, completeSign, canvasRef }) => {
  return (
    <>
      <Dialog open={open} fullWidth onClose={e => setOpen(false)}>
        <DialogActions style={{ padding: '0 0' }}>
          <Grid
            container
            justify="space-evenly"
            style={{ backgroundColor: '#30bbc3' }}
          >
            <Canvas completeSign={completeSign} canvasRef={canvasRef} />

            <Button
              style={{ color: '#ffffff', fontSize: '1.3rem' }}
              onClick={() => canvasRef.current.clear()}
            >
              다시하기
            </Button>
            <Button
              style={{ color: '#ffffff', fontSize: '1.3rem' }}
              onClick={() => {
                completeSign()
                setOpen(false)
              }}
            >
              완료
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
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
      brushColor="#000"
      lazyRadius={0}
      onChange={completeSign ? completeSign : null}
      ref={canvasRef}
    />
  )
}

const useStyles = makeStyles(theme => ({
  signImage: {
    maxWidth: '100%',
    height: 'auto',
  },
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
