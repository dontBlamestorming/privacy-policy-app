import _CanvasDraw from 'react-canvas-draw'

const makeEventHandlerWithDisablePreventDefault = handler => e => {
  const _preventDefault = e.preventDefault
  e.preventDefault = () => undefined
  const ret = handler(e)
  e.preventDefault = _preventDefault
  return ret
}

class CanvasDraw extends _CanvasDraw {
  constructor(props) {
    super(props)

    this.handleDrawStart = makeEventHandlerWithDisablePreventDefault(
      this.handleDrawStart,
    )

    this.handleDrawMove = makeEventHandlerWithDisablePreventDefault(
      this.handleDrawMove,
    )

    this.handleDrawEnd = makeEventHandlerWithDisablePreventDefault(
      this.handleDrawEnd,
    )
  }
}

export default CanvasDraw
