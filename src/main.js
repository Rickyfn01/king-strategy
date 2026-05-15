import './style.css'

// Initialize Feather Icons
if (typeof feather !== 'undefined') {
  feather.replace()
}

// Sticky Header behavior
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shadow-lg', 'bg-king-black/95')
    header.classList.remove('bg-king-black/80')
  } else {
    header.classList.remove('shadow-lg', 'bg-king-black/95')
    header.classList.add('bg-king-black/80')
  }
})

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in-section')
  fadeElements.forEach(el => {
    observer.observe(el)
  })
})
