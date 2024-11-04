import './style.css'
import { changeHandler, uploadDragnDrop } from './scripts/parceFiles.js'

const header = document.querySelector('.header');
const main = document.querySelector('.main');

/*header*/
const headerTitle = document.createElement("h1");
headerTitle.textContent = 'Загрузчик';
header.appendChild(headerTitle);

/*форма с инпутом*/
const form = document.createElement("form");
form.classList.add("main__form");
form.type = 'input';
form.enctype = "multipart/form-data";
form.method = "post";

const label = document.createElement("label");
label.classList.add("form-upload-zone");
label.textContent = "";

const input = document.createElement("input");
input.classList.add("form-input");
input.type = "file";
input.multiple = "multiple";
input.name = "files[]";

const inputTitle = document.createElement("h2");
inputTitle.textContent = "НАЖМИ или ПЕРЕТАЩИ";

const errorBlock = document.createElement("span");
errorBlock.classList.add("error-message");
errorBlock.textContent = "Ошибка!"

const preview = document.createElement("div");
preview.classList.add("preview")

label.append(inputTitle);
label.append(input);
form.append(label);
form.append(errorBlock);
form.append(preview);
main.appendChild(form);


/*слушатели*/
label.addEventListener("change", (e) => {changeHandler(e, preview)});

["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

label.addEventListener("dragenter", function() {
  label.classList.add("_active")
})

label.addEventListener("dragleave", function() {
  label.classList.remove("_active")
})

label.addEventListener("drop", (e) => {
  label.classList.remove("_active");
  const file = e.dataTransfer?.files;
  if (file) {
    uploadDragnDrop(file, preview);
  }
})
