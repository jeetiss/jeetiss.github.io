function r(){try{return String((new Error).stack).replace(/^Error.*\n/,"").split("\n")[1].match(/http.*\.js/)[0]}catch(r){return}}export{r as g};
