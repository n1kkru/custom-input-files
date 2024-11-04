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

function check(array, block) {
  const errorBlock = document.querySelector(".error-message");
  const goodLen = findGoodLength(array, block);
  console.log('good len => ', goodLen, array);
  if (array.length > goodLen) {
    // alert(`Максимум 5 файлов!`);
    errorBlock.textContent = "Максимум 5 файлов!";
    errorBlock.classList.add("_active");
  }
  else {
    errorBlock.classList.remove("_active");
  }
  array = array.slice(0, goodLen);
  

  return array.filter((element) => {
    if (!isGoodSize(element.size)) {
      alert(`${element.name} тяжеловат`);
    }
    if (!isGoodType(element.type)) {
      alert(`${element.name} не с нашего района`);
    }
    return isGoodType(element.type) && isGoodSize(element.size);
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

export function changeHandler(e, block) {
  const array = check(Array.from(e.target.files), block);
  createCardList(array, block);
}

export function uploadDragnDrop(files, block) {
  const array = check(Array.from(files), block);
  createCardList(array, block);
}
