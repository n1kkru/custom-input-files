import './style.css'
import { changeHandler, uploadDragnDrop } from './scripts/parceFiles.js'

const header = document.querySelector('.header');
const main = document.querySelector('.main');

const headerTitle = document.createElement("h1");
headerTitle.textContent = 'Загрузчик';
header.appendChild(headerTitle);

const input = document.querySelector('.main__input');
input.addEventListener("change", changeHandler)


const dropFileZone = document.querySelector(".upload-zone");
const uploadInput = document.querySelector(".form-input");

["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener("dragenter", function() {
  dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
  dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", (e) => {
  dropFileZone.classList.remove("_active")
  const file = event.dataTransfer?.files[0]
  if (!file) {
    return
  }

  if (file) {
    uploadDragnDrop(e)
  } else {
    console.log("Можно загружать только изображения")
    return false
  }
})


uploadInput.addEventListener("change", (e) => {
  const file = uploadInput.files?.[0]
  if (file) {
    uploadDragnDrop(e)
  } else {
    console.log("Можно загружать только изображения");
    return false
  }
})

