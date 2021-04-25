import{h as e}from"./79ba4c64.js";export default()=>{const r=function(){const e=document.createElement("canvas"),r=function(e){const r=e.getExtension("WEBGL_debug_renderer_info");return{renderer:e.getParameter(e.RENDERER),vendor:e.getParameter(e.VENDOR),unmasked:{vendor:null!=r?e.getParameter(r.UNMASKED_VENDOR_WEBGL):"",renderer:null!=r?e.getParameter(r.UNMASKED_RENDERER_WEBGL):""}}}(e.getContext("webgl")||e.getContext("webgl2"));return e.remove(),r.unmasked.renderer||r.renderer}();return e`
    <div>
      Videocard: ${r}
    </div>
  `};
