const resultContainer = document.querySelector<HTMLDivElement>('#app')!

export function createTree(parsedObj: unknown) {
  if (!parsedObj) return
  const parent = document.createElement('ul')
  parent.role = 'tree'

  if (Array.isArray(parsedObj)) {
    //handle array
    const ol = document.createElement('ol')
    for (let i = 0; i < parsedObj.length; i++) {
      const item = parsedObj[i] as unknown
      renderObject(ol, String(i), item)
    }
    resultContainer.appendChild(ol)
    return
  }

  const ul = document.createElement('ul')
  const entries = Object.entries(parsedObj as object)
  for (const [key, value] of entries) {
    renderObject(ul, key, value)
  }
  resultContainer.appendChild(ul)
  return

  console.log(parsedObj)
  // renderObject(container, parsedObj)

  // resultContainer.appendChild(container)
}

function renderObject(container: HTMLElement, key: string, obj: unknown) {
  let parentTag = 'li'
  if (typeof obj === 'object' && obj !== null) {
    parentTag = 'ul'
    if (Array.isArray(obj)) {
      parentTag = 'ol'
    }
  }

  const parent = document.createElement(parentTag)
  const label = document.createElement('span')
  label.textContent = `${key}:`
  container.appendChild(label)

  const entries = Object.entries(obj as object)

  for (const [key, value] of entries) {
    if (typeof value === 'object' && value !== null) {
      let parentTag = 'ul'
      if (Array.isArray(value)) {
        parentTag = 'ol'
      }

      const objParent = document.createElement(parentTag)
      renderObject(objParent, key, value)
      parent.appendChild(objParent)
    } else {
      renderSimpleProperty(parent, key, value)
    }
    container.appendChild(parent)
  }
}

function renderSimpleProperty(
  container: HTMLElement,
  key: string,
  value: unknown
) {
  const li = document.createElement('li')
  const label = document.createElement('span')
  const result = document.createElement('span')

  label.textContent = `${key}:`

  switch (typeof value) {
    case 'string':
      result.textContent = `\"${value}\"`
      break

    default:
      result.textContent = String(value)
      break
  }

  li.appendChild(label)
  li.appendChild(result)

  container.appendChild(li)
}
