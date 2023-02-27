import { html } from "./html.js";
import { css } from "astroturf";

const example = css`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  overflow: hidden;
`;

const paragraph = css`
  font-size: 48px;

  --base-hover: rgb(233, 235, 255);
  color: inherit;

  border-radius: 1px;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: center bottom 1%;
  background-origin: initial;
  background-size: 100% 1px;
  outline: none;

  transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

  animation: simulate 4s ease infinite;

  @keyframes simulate {
    from,
    30% {
      background-color: transparent;
      box-shadow: none;
    }

    35%,
    70% {
      background-color: var(--base-hover);
      box-shadow: 0 0 0 4px var(--base-hover);
    }

    75%,
    to {
      background-color: transparent;
      box-shadow: none;
    }
  }

  &:hover {
    color: black;
    background-color: var(--base-hover);
    box-shadow: 0 0 0 4px var(--base-hover);
    cursor: default;
  }
`;

const credits = css`
  position: absolute;

  bottom: 10px;
  right: 10px;

  text-align: right;

  color: #aaa;
`;

const cursor = css`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  animation: moveX 4s ease-in-out infinite;

  @keyframes moveX {
    from {
      transform: translateX(-50%);
    }

    35%,
    65% {
      transform: translateX(0);
    }

    to {
      transform: translateX(50%);
    }
  }
`;

const animateY = css`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: moveY 4s ease infinite;

  @keyframes moveY {
    from {
      transform: translateY(90%);
    }

    35%,
    65% {
      transform: translateY(25px);
    }

    to {
      transform: translateY(-90%);
    }
  }
`;

const svg = css`
  stroke: white;
  stroke-width: 25px;
`;

export default () => {
  const node = html`
    <div class="${example}">
      <p class="${paragraph}">Hover</p>

      <div class="${credits}">
        Icon made by
        <a
          target="_blank"
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>
      </div>

      <div class="${cursor}">
        <div class="${animateY}">
          <svg
            class="${svg}"
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
  `;

  const classToSelector = (className) =>
    className
      .split(" ")
      .map((name) => `.${name}`)
      .join("");

  const animatedElements = [
    node.querySelector(`div${classToSelector(cursor)}`),
    node.querySelector(
      `div${classToSelector(cursor)} > ${classToSelector(animateY)}`
    ),
    node.querySelector(`${classToSelector(paragraph)}`),
  ];

  node.addEventListener("mouseenter", () => {
    animatedElements.forEach((element) => {
      element.style.animationName = "none";
    });

    animatedElements[0].style.display = "none";
  });

  node.addEventListener("mouseleave", () => {
    animatedElements.forEach((element) => {
      element.style.animationName = "";
    });

    animatedElements[0].style.display = "block";
  });

  return node;
};
