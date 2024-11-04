import { formatBytes } from "./utils";

function isGoodType(type) {
  if (type == "image/png" || type == "image/jpg" || type == "image/jpeg") {
    return true;
  } else {
    return false;
  }
}

function isGoodSize(size) {
  if (Number(size) <= 10485760) {
    return true;
  } else {
    return false;
  }
}

function findGoodLength(files, block) {
  const filesLen = files.length;
  const blockLen = block.children.length;
  const sum = filesLen + blockLen;
  if (sum <= 5) return filesLen;
  else {
    return filesLen - (sum - 5);
  }
}

function hasThisFile(name, block) {
  const namesList = block.querySelectorAll(".card__name");
  const has = Array.from(namesList).find((element) => element.innerText === name)
  if (has) {
    return true
  }
  return false
}

export function check(array, block) {
  const errorBlock = document.querySelector(".error-message");
  /* Проверка на 5 файлов */
  const goodLen = findGoodLength(array, block);
  if (array.length > goodLen) {
    errorBlock.textContent = "Превышено допустимое количество файлов: 5";
    errorBlock.classList.add("_active");
  }
  else {
    errorBlock.classList.remove("_active");
  }
  array = array.slice(0, goodLen);

  return array.filter((element) => {
    /* Проверка есть ли такой файл */
    if (hasThisFile(element.name, block)) {
      errorBlock.textContent = `Файл "${element.name}" уже добавлен`;
      errorBlock.classList.add("_active");
    }
    /* Проверка на размер < 10мб */
    if (!isGoodSize(element.size)) {
      errorBlock.textContent = `Превышен максимальный размер файла`;
      errorBlock.classList.add("_active");
    }
    /* Проверка на формат png jpg jpeg*/
    if (!isGoodType(element.type)) {
      errorBlock.textContent = `Неверный формат файла`;
      errorBlock.classList.add("_active");
    }

    return !hasThisFile(element.name, block) && isGoodType(element.type) && isGoodSize(element.size);
  });
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(file, handlerDelete) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const name = document.createElement("h1");
  name.textContent = file.name;
  name.className = "card__name";
  cardElement.append(name);

  const format = document.createElement("h2");
  format.textContent = file.format;
  format.className = "card__format";
  cardElement.append(format);

  const size = document.createElement("h2");
  size.textContent = file.size;
  size.className = "card__size";
  cardElement.append(size);

  const image = document.createElement("img");
  image.className = "card__img";
  cardElement.append(image);

  const buttonDelete = document.createElement("button");
  buttonDelete.className = "card__delete";
  buttonDelete.addEventListener("click", () => {
    if (cardElement.parentElement.children.length == 1) {
      document.querySelector(".form-submit").disabled = true;
    };
    handlerDelete(cardElement);
  });
  cardElement.append(buttonDelete);

  return cardElement;
}

export function createCardList(array, block) {
  array.forEach((element) => {
    const file = {
      name: element.name,
      format: element.type.split("/")[1],
      size: formatBytes(element.size),
    };
    const reader = new FileReader();
    reader.onload = () => {
      const card = createCard(file, deleteCard);
      const img = card.querySelector(".card__img");
      img.src = reader.result;
      img.style.display = "block";

      block.appendChild(card);
    };
    reader.readAsDataURL(element);
  });
}

export function changeHandler(array, block) {
  createCardList(array, block);
}
