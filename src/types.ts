import { setTransform } from './css'

export type PanzoomEvent =
  | 'panzoomstart'
  | 'panzoomchange'
  | 'panzoompan'
  | 'panzoomzoom'
  | 'panzoomreset'
  | 'panzoomend'

export interface PanzoomEventDetail {
  x: number
  y: number
  scale: number
  isSVG: boolean
  originalEvent: PointerEvent | TouchEvent | MouseEvent
}

export interface MiscOptions {
  /** Whether to animate transitions */
  animate?: boolean
  /**
   * This option treats the Panzoom element's parent
   * as a canvas. Effectively, Panzoom binds the
   * down handler to the parent instead of the Panzoom
   * element, so that pointer events anywhere on the "canvas"
   * moves its children. See issue #472.
   *
   * **Note**: setting this option to `true` also changes
   * where the `cursor` style is applied (i.e. the parent).
   */
  canvas?: boolean
  /** Duration of the transition (ms) */
  duration?: number
  /** CSS Easing used for transitions */
  easing?: string
  /**
   * Add elements to this array that should be excluded
   * from Panzoom handling.
   * Ancestors of event targets are also checked.
   * e.g. links and buttons that should not propagate the click event.
   */
  exclude?: Element[]
  /**
   * Add this class to any element within the Panzoom element
   * that you want to exclude from Panzoom handling. That
   * element's children will also be excluded.
   * e.g. links and buttons that should not propagate the click event.
   */
  excludeClass?: string
  /**
   * `force` should be used sparingly to temporarily
   * override and ignore options such as disablePan,
   * disableZoom, and panOnlyWhenZoomed.
   * This option cannot be passed to the
   * Panzoom constructor or setOptions (to avoid
   * setting this option globally).
   *
   * ```js
   * // Overrides disablePan and panOnlyWhenZoomed
   * panzoom.pan(50, 100, { force: true })
   * // Overrides disableZoom
   * panzoom.zoom(1, { force: true })
   * ```
   */
  force?: boolean
  /**
   * On the first pointer event, when panning starts,
   * the default Panzoom behavior is to call
   * `event.preventDefault()` and `event.stopPropagation()`
   * on that event. The former is almost certainly a necessity;
   * the latter enables Panzoom elements within Panzoom elements.
   *
   * But there are some cases where the default is
   * not the desired behavior. Set this option to override that behavior.
   *
   * ```js
   * // Only call preventDefault()
   * Panzoom(elem, {
   *   handleStartEvent: (event) => {
   *     event.preventDefault()
   *   }
   * })
   * // Do nothing.
   * // This can change dragging behavior on mobile.
   * Panzoom(elem, {
   *   handleStartEvent: () => {}
   * })
   * ```
   */
  handleStartEvent?: (event: Event) => void
  /**
   * Skip binding the default Panzoom event listeners
   */
  noBind?: boolean
  /**
   * **Change this at your own risk.**
   * The `transform-origin` is the origin from which transforms are applied.
   * Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
   * The defaults are set because changing the `transform-origin` on
   * SVG elements doesn't work in IE.
   *
   * Changing this should work with many things, but
   * it will break focal point zooming, which assumes the
   * defaults are set to do the more complicated calculations.
   *
   * And again, changing this for SVG in IE doesn't work at all.
   */
  origin?: string
  /** The overflow CSS value for the parent. Defaults to 'hidden' */
  overflow?: string
  /**
   * Override the transform setter.
   * This is exposed mostly so the user could
   * set other parts of a transform
   * aside from scale and translate.
   * Default is defined in src/css.ts.
   *
   * ```js
   * // This example always sets a rotation
   * // when setting the scale and translation
   * const panzoom = Panzoom(elem, {
   *   setTransform: (elem, { scale, x, y }) => {
   *     panzoom.setStyle('transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
   *   }
   * })
   * ```
   */
  setTransform?: typeof setTransform
  /** Silence all events */
  silent?: boolean
  /** X Value used to set the beginning transform */
  startX?: number
  /** Y Value used to set the beginning transform */
  startY?: number
  /** Scale used to set the beginning transform */
  startScale?: number
  /**
   * This value is used to set touch-action on both the
   * Panzoom element and its parent.
   * It is needed because that the native scroll on mobile
   * interferes with panning and pinch zooming.
   * Set this to empty string to re-enable scrolling
   * on mobile, but note that both scrolling and panning
   * cannot work at the same time.
   */
  touchAction?: string
  /** Pass through any options like data */
  [key: string]: any
}

export interface PanOnlyOptions {
  /**
   * Contain the panzoom element either
   * inside or outside the parent.
   * Inside: The panzoom element is smaller
   *   than its parent and cannot be panned
   *   to the outside.
   * Outside: The panzoom element is larger
   *   than its parent and cannot be panned
   *   to the inside. In other words, no
   *   empty space around the element will be shown.
   *
   * **Note**: the containment pan adjustment is not affected by the `disablePan` option.
   */
  contain?: 'inside' | 'outside'
  /** The cursor style to set on the panzoom element */
  cursor?: string
  /**
   * Disable panning functionality.
   * Note: disablePan does not affect focal point zooming or the contain option.
   *   The element will still pan accordingly.
   */
  disablePan?: boolean
  /** Pan only on the Y axis */
  disableXAxis?: boolean
  /** Pan only on the X axis */
  disableYAxis?: boolean
  /** When passing x and y values to .pan(), treat the values as relative to their current values */
  relative?: boolean
  /** Disable panning while the scale is equal to the starting value */
  panOnlyWhenZoomed?: boolean
  /** Round transform-translate x and values to whole pixels. (Prevents images getting blurry)  */
  roundToPixels?: boolean
}

export interface ZoomOnlyOptions {
  /** Disable zooming functionality */
  disableZoom?: boolean
  /**
   * Zoom to the given point on the panzoom element.
   * This point is expected to be relative to
   * the panzoom element's dimensions and is unrelated
   * to the parent dimensions.
   */
  focal?: { x: number; y: number }
  /** The minimum scale when zooming */
  minScale?: number
  /** The maximum scale when zooming */
  maxScale?: number
  /** The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut */
  step?: number
}

export type PanOptions = MiscOptions & PanOnlyOptions
export type ZoomOptions = MiscOptions & ZoomOnlyOptions
export type PanzoomOptions = PanOptions & ZoomOptions & MiscOptions

export interface CurrentValues {
  x: number
  y: number
  scale: number
  isSVG?: boolean
}

export interface PanzoomObject {
  /**
   * Bind the default down, move, and up event listeners to the Panzoom element.
   * This does not normally need to be called.
   * It gets called by default when creating a new Panzoom object,
   * but can be skipped with the `noBind` option.
   *
   * ```js
   * const panzoom = Panzoom(elem, { noBind: true })
   * // ...
   * panzoom.bind()
   * ```
   */
  bind: () => void
  /** Remove all event listeners bound to the the Panzoom element */
  destroy: () => void
  /**
   * This object exposes the event names used by Panzoom,
   * depending on the current browser's support for
   * Pointer or Touch events.
   */
  eventNames: { down: string; move: string; up: string }
  /** Get the current x/y translation */
  getPan: () => { x: number; y: number }
  /** Get the current scale */
  getScale: () => number
  /** Returns a _copy_ of the current options object */
  getOptions: () => PanzoomOptions
  /**
   * Pan the Panzoom element to the given x and y coordinates
   *
   * ```js
   * // Translates the element to 50px, 100px
   * panzoom.pan(50, 100)
   * // Pans the element right 10px and down 10px from its current position
   * panzoom.pan(10, 10, { relative: true })
   * ```
   */
  pan: (x: number | string, y: number | string, panOptions?: PanOptions) => CurrentValues
  /**
   * Reset the pan and zoom to startX, startY, and startScale.
   * Animates by default, ignoring the global option.
   * Pass `{ animate: false }` to override.
   * Reset ignores the `disablePan`, `disableZoom`, and `panOnlyWhenZoomed` options.
   * Pass `{ force: false }` to override.
   *
   * ```js
   * panzoom.reset()
   * panzoom.reset({ animate: false })
   * ```
   */
  reset: (resetOptions?: PanzoomOptions) => CurrentValues
  /**
   * Reset the styles set on the Panzoom element
   * and its parent (such as overflow, cursor, etc.)
   *
   * ```js
   * panzoom.resetStyle()
   * ```
   */
  resetStyle: () => void
  /**
   * Change any number of options on a Panzoom instance.
   * Setting some options will have side-effects.
   * For instance, changing the cursor option
   * will also set the cursor style.
   *
   * ```js
   * const panzoom = Panzoom(elem, { cursor: 'move' })
   * // ...
   * panzoom.setOptions({ cursor: 'default' })
   * ```
   */
  setOptions: (options?: PanzoomOptions) => void
  /** A convenience method for setting prefixed styles on the Panzoom element */
  setStyle: (name: string, value: string) => void
  /**
   * Zoom the Panzoom element to the given scale
   *
   * ```js
   * panzoom.zoom(2.2)
   * panzoom.zoom(2.2, { animate: true })
   * ```
   */
  zoom: (scale: number, zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom in using the predetermined increment set in options.
   * Animates by default, ignoring the global option.
   * Pass `{ animate: false }` to override.
   *
   * ```js
   * panzoom.zoomIn()
   * panzoom.zoomIn({ animate: false })
   * ```
   */
  zoomIn: (zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom out using the predetermined increment set in options.
   * Animates by default, ignoring the global option.
   * Pass `{ animate: false }` to override.
   *
   * ```js
   * panzoom.zoomOut()
   * panzoom.zoomOut({ animate: false })
   * ```
   */
  zoomOut: (zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom the Panzoom element to a focal point using
   * the given pointer/touch/mouse event or constructed point.
   * The clientX/clientY values should be calculated
   * the same way as a `pointermove` event on the Panzoom element's parent.
   *
   * ```js
   * panzoom.zoomToPoint(1.2, pointerEvent)
   * ```
   */
  zoomToPoint: (
    scale: number,
    point: { clientX: number; clientY: number },
    zoomOptions?: ZoomOptions
  ) => CurrentValues
  /**
   * Zoom the Panzoom element to a focal point using the given WheelEvent
   *
   * This is a convenience function that may not handle all use cases.
   * Other cases should handroll solutions using the `zoomToPoint`
   * method or the `zoom` method's focal option.
   *
   * **Notes**:
   *
   * - the focal point zooming pan adjustment is
   *   not affected by the `disablePan` option.
   * - animate should not be used when zooming with the wheel,
   *   and is therefore always disabled.
   *
   * ```js
   * // Bind to mousewheel
   * elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
   * // Bind to shift+mousewheel
   * elem.parentElement.addEventListener('wheel', function(event) {
   *   if (!event.shiftKey) return
   *   // Panzoom will automatically use `deltaX` here instead
   *   // of `deltaY`. On a mac, the shift modifier usually
   *   // translates to horizontal scrolling, but Panzoom assumes
   *   // the desired behavior is zooming.
   *   panzoom.zoomWithWheel(event)
   * })
   * ```
   */
  zoomWithWheel: (event: WheelEvent, zoomOptions?: ZoomOptions) => CurrentValues
}
