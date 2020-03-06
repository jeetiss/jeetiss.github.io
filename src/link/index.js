import { html } from '../html'
import './style.css'

export default () => {
  const node = html`
    <div class="example">
      <p>Ховер</p>

      <div class="cred">
        Icon made by
        <a
          target="_blank"
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>
      </div>

      <div class="cursor">
        <div class="animateY">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
          >
            <path
              d="M424 323L104 3a11 11 0 00-19 8v469a11 11 0 0019 7l85-104 57 123a11 11 0 0014 5l75-32a11 11 0 005-14l-57-124h133a11 11 0 008-18z"
            />
          </svg>
        </div>
      </div>
    </div>
  `

  const animatedElements = [
    node.querySelector('div.cursor'),
    node.querySelector('div.cursor > .animateY'),
    node.querySelector('p')
  ]

  node.addEventListener('mouseenter', () => {
    animatedElements.forEach(element => {
      element.style.animationName = 'none'
    })

    animatedElements[0].style.display = 'none'
  })

  node.addEventListener('mouseleave', () => {
    animatedElements.forEach(element => {
      element.style.animationName = ''
    })

    animatedElements[0].style.display = 'block'
  })

  return node
}
