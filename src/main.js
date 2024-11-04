import './style.css'
import { changeHandler, check } from './scripts/parceFiles.js'
import { trueAPI } from './scripts/api.js';

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
input.accept = "image/jpeg,image/png,image/jpg";

const inputTitle = document.createElement("h2");
inputTitle.textContent = "НАЖМИ или ПЕРЕТАЩИ";

const errorBlock = document.createElement("span");
errorBlock.classList.add("error-message");
errorBlock.textContent = "Ошибка!"

const preview = document.createElement("div");
preview.classList.add("preview");

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.disabled = true;
submitButton.classList.add("form-submit");
submitButton.textContent = "Отправить";

label.append(inputTitle);
label.append(input);
form.append(label);
form.append(errorBlock);
form.append(preview);
form.append(submitButton);
main.appendChild(form);


/*слушатели*/
label.addEventListener("change", (e) => {
  preview.textContent = "";
  const array = check(Array.from(e.target.files), preview);
  changeHandler(array, preview);
});

["dragover", "drop"].forEach((e) => {
  document.addEventListener(e, (evt) => {
    evt.preventDefault()
    return false
  })
})

label.addEventListener("dragenter", () => {
  label.classList.add("_active")
})

label.addEventListener("dragleave", () => {
  label.classList.remove("_active")
})

label.addEventListener("drop", (e) => {
  label.classList.remove("_active");
  const files = e.dataTransfer?.files;
  const array = check(Array.from(files), preview);
  changeHandler(array, preview);
  submitButton.disabled = false;
})

input.addEventListener("input", (e) => {
  if (e.target.files) {
    submitButton.disabled = false;
  }
})

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  preview.textContent = "";
  const preloader = document.querySelector(".preloader");
  preloader.style.visibility = "visible";
  await trueAPI(preloader);
})
