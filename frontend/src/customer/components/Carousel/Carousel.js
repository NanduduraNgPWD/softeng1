import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import './css/embla.css'
const OPTIONS = { loop: true }
const SLIDE_COUNT = 8
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Carousel = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
)



export default Carousel;