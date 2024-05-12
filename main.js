import './style.css'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import noticias from './noticias'

//Crea el slider con Glide
new Glide('#slider', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  autoplay: 2000,
  hoverpause: true,
}).mount()

//Crea las noticias en el DOM
const contenedorNoticias = document.getElementById('posts')

noticias.map(({ id, titulo, fechaPublicacion, noticia }) => {
  const extracto = noticia.slice(0, 300)
  const textoCompleto = noticia.slice(300)

  const articleNoticia = document.createElement('article')
  articleNoticia.className = 'p-2'
  articleNoticia.innerHTML = `
    <h2 class="text-3xl text-[#333333] font-semibold">${titulo}</h2>
    <span class="block text-gray-500 mt-2">${fechaPublicacion.toLocaleDateString()}</span>
    <p class="mt-3 mb-5 text-justify leading-6" id="noticia-${id}">
      ${extracto}
      <span id="textoCompleto-${id}" style="display: none;">${textoCompleto}</span>
    </p>
    <a href="" class="block w-32 p-4 bg-[#235e3d] text-white mt-3 text-sm text-center mb-5" id="boton-${id}">Ver más...</a>
  `

  contenedorNoticias.appendChild(articleNoticia)

  //Agrega el evento para mostrar el texto completo
  document.getElementById(`boton-${id}`).addEventListener('click', (event) => {
    event.preventDefault()
    const textoCompletoElement = document.getElementById(`textoCompleto-${id}`)
    if (textoCompletoElement.style.display === 'none') {
      textoCompletoElement.style.display = 'inline'
      event.target.textContent = '...Ver menos'
    } else {
      textoCompletoElement.style.display = 'none'
      event.target.textContent = 'Ver más...'
    }
  })
})

//Función para mostrar u ocultar el usuario guardado
function actualizarSpanUsuario() {
  const usuario = localStorage.getItem('usuario')
  const spanUsuario = document.getElementById('userSaved')
  const divHiddable = document.getElementById('hiddable')

  if (usuario) {
    spanUsuario.textContent = usuario
    divHiddable.style.display = 'flex'
  } else {
    spanUsuario.textContent = ''
    divHiddable.style.display = 'none'
  }
}

//Guarda el usuario y contraseña en el localStorage
const formularioLogin = document.getElementById('login')

formularioLogin.addEventListener('submit', (event) => {
  event.preventDefault()

  const usuario = document.getElementById('user').value
  const contraseña = document.getElementById('password').value

  localStorage.setItem('usuario', usuario)
  localStorage.setItem('contraseña', contraseña)

  actualizarSpanUsuario()
})

//Escucha el evento de cambio en el localStorage
window.addEventListener('storage', (event) => {
  if (event.key === 'usuario') {
    actualizarSpanUsuario()
  }
})

actualizarSpanUsuario()

//Función para actualizar el reloj
function actualizarReloj() {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  const segundos = String(ahora.getSeconds()).padStart(2, '0')
  const tiempo = `${horas}:${minutos}:${segundos}`

  const spanReloj = document.getElementById('clock')
  spanReloj.textContent = tiempo
}

setInterval(actualizarReloj, 1000)

actualizarReloj()

//Función para mostrar el botón de volver arriba
let divContainer = document.createElement('div')
let buttonUp = document.createElement('button')
buttonUp.id = 'scroll-to-top'
buttonUp.setAttribute('aria-label', 'Volver al inicio de la página')
buttonUp.innerHTML = `
  <svg strokeWidth='2' stroke='#235e3d' viewBox='0 0 24 24' fill='none' class='size-10 -rotate-45 group-hover:-rotate-90 motion-safe:transition' width='20px'>
    <path d='M14 5l7 7m0 0l-7 7m7-7H3' strokeLinejoin='round' strokeLinecap='round'></path>
  </svg>
`

divContainer.style.position = 'fixed'
divContainer.style.bottom = '2rem'
divContainer.style.right = '2rem'
divContainer.style.transition = 'opacity 0.5s'
buttonUp.style.border = '2px solid #235e3d'
buttonUp.style.background = 'rgba(0, 0, 0, 0.1)'
buttonUp.style.color = '#1D4ED8'
buttonUp.style.backdropFilter = 'blur(20px)'
buttonUp.style.borderRadius = '0.375rem'

divContainer.appendChild(buttonUp)
document.body.appendChild(divContainer)

function toggleVisibility() {
  const scrollTop = document.documentElement.scrollTop
  divContainer.style.opacity = scrollTop > 400 ? '1' : '0'
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

window.addEventListener('scroll', function () {
  setTimeout(toggleVisibility, 100)
})
buttonUp.addEventListener('click', scrollToTop)

toggleVisibility()
