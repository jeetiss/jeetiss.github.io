const html = (parts, ...values) => {
  const tmp = document.implementation.createHTMLDocument()
  tmp.body.innerHTML = parts.reduce((str, next, i) => str + values[i - 1] + next)

  if (tmp.body.childElementCount <= 1) {
    return tmp.body.children[0]
  } else {
    return Array.from(tmp.body.children).reduce((fragment, node) => {
      fragment.appendChild(node)
      return fragment
    }, document.createDocumentFragment())
  }
}

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function removeNode (node) {
  node.parentNode.removeChild(node)
}

function replaceNode (node, newNode) {
  node.parentNode.replaceChild(newNode, node)
}

export { html, insertAfter, removeNode, replaceNode }
