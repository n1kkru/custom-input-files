import './style.css'
import { changeHandler, uploadDragnDrop } from './scripts/parceFiles.js'

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const dropFileZone = document.querySelector(".upload-zone");
const previewBlock = document.querySelector('.preview');

const headerTitle = document.createElement("h1");
headerTitle.textContent = 'Загрузчик';
header.appendChild(headerTitle);

dropFileZone.addEventListener("change", (e) => {changeHandler(e, previewBlock)});

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
  dropFileZone.classList.remove("_active");
  const file = e.dataTransfer?.files;
  if (file) {
    uploadDragnDrop(file, previewBlock);
  }
})

uploadInput.addEventListener("change", (e) => {
  const file = uploadInput.files?.[0];
  if (file) {
    uploadDragnDrop(file, previewBlock);
  }
})

