import{h as e}from"./79ba4c64.js";export default()=>{const a=e`
    <div class=${"e1801rki"}>
      <p class=${"p10y168f"}>Hover</p>

      <div class=${"ccm36wc"}>
        Icon made by
        <a
          target="_blank"
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>
      </div>

      <div class=${"ctmjoye"}>
        <div class=${"aaph00"}>
          <svg
            class=${"s19xiefz"}
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
  `,t=[a.querySelector("div.ctmjoye"),a.querySelector("div.ctmjoye > .aaph00"),a.querySelector(".p10y168f")];return a.addEventListener("mouseenter",()=>{t.forEach(e=>{e.style.animationName="none"}),t[0].style.display="none"}),a.addEventListener("mouseleave",()=>{t.forEach(e=>{e.style.animationName=""}),t[0].style.display="block"}),a};
