let events: { down: string; move: string; up: string }
if (typeof (window as any).PointerEvent === 'function') {
  events = {
    down: 'pointerdown',
    move: 'pointermove',
    up: 'pointerup pointerleave pointercancel'
  }
} else if (typeof (window as any).TouchEvent === 'function') {
  events = {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend touchcancel'
  }
} else {
  events = {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup mouseleave'
  }
}

export function onPointer(
  event: 'down' | 'move' | 'up',
  elem: HTMLElement | SVGElement | Document,
  handler: (event: PointerEvent) => void,
  eventOpts?: any
) {
  events[event].split(' ').forEach((name) => {
    ;(elem as HTMLElement).addEventListener<
      'pointerdown' | 'pointermove' | 'pointerup' | 'pointerleave' | 'pointercancel'
    >(name as any, handler, eventOpts)
  })
}
