import { strict as assert } from 'assert'
import { setStyle, setTransform } from '../../src/css'

function assertStyle(elem: HTMLElement | SVGElement, name: string, value: string) {
  const capName = name[0].toUpperCase() + name.slice(1)
  const style: any = elem.style
  if (style[name]) {
    assert.equal(style[name], value)
  } else if (style[`webkit${capName}`]) {
    assert.equal(style[`webkit${capName}`], value)
  } else if (style[`moz${capName}`]) {
    assert.equal(style[`moz${capName}`], value)
  } else if (style[`ms${capName}`]) {
    assert.equal(style[`ms${capName}`], value)
  }
}

describe('css', () => {
  describe('setStyle', () => {
    it('sets a style on an HTMLElement', () => {
      const elem = document.createElement('div')
      const border = '1px solid black'
      setStyle(elem, 'border', border)
      assert.equal(elem.style.border, border)
    })
    it('sets a style on a SVGElement', () => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const strokeWidth = '1px'
      setStyle(elem, 'strokeWidth', strokeWidth)
      assert.equal(elem.style.strokeWidth, strokeWidth)
    })
  })

  describe('setTransform', () => {
    it('sets the default transform-origin for HTML', () => {
      const elem = document.createElement('div')
      setTransform(elem, { x: 1, y: 1, scale: 1 })
      assertStyle(elem, 'transform', 'scale(1) translate(1px, 1px)')
    })
    it('sets the default transform-origin for SVG', () => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      setTransform(elem, { x: 1, y: 1, scale: 1 })
      assertStyle(elem, 'transform', 'scale(1) translate(1px, 1px)')
    })
    it('sets the default transform-origin property with roundToPixels = true for HTML', () => {
      const elem = document.createElement('div')
      setTransform(elem, { x: 1.25, y: 1.75, scale: 1 }, { roundToPixels: true })
      assertStyle(elem, 'transform', 'scale(1) translate(1px, 2px)')
    })
    it('sets the default transform-origin property with roundToPixels = true for SCG', () => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      setTransform(elem, { x: 1.25, y: 1.75, scale: 1 }, { roundToPixels: true })
      assertStyle(elem, 'transform', 'scale(1) translate(1px, 2px)')
    })
  })
})
