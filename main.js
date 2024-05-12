import './style.css'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'

new Glide('#slider', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  autoplay: 2000,
  hoverpause: true,
}).mount()
