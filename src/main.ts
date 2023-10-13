import './style.css'
import { createTree } from './lib'

const JSON_TYPE = 'application/json'
const ERROR_MESSAGE = 'Invalid file. Please load a valid JSON file.'
const fileInput = document.querySelector<HTMLInputElement>('#fileInput')!

async function onFileUpload() {
  if (!fileInput.files) return

  const uploadedFile = fileInput.files[0]
  if (uploadedFile.type !== JSON_TYPE) {
    console.error(ERROR_MESSAGE)
    return
  }

  const fileContent = await uploadedFile.text()
  if (fileContent.length < 2) {
    console.error(ERROR_MESSAGE)
    return
  }

  try {
    const resultObj = JSON.parse(fileContent) as unknown
    createTree(resultObj)
  } catch (error) {
    console.error(error)
    console.error(ERROR_MESSAGE)
  }
}

// function teste(key: string, value: unknown) {
//   console.log({ key, value })
//   debugger
// }

fileInput.addEventListener('change', onFileUpload)
