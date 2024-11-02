import { formatBytes } from "./utils";

function isGoodType(type) {
  if (type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg') {
    return true
  }
  else {
    return false
  }
}

function isGoodSize(size) {
  if (Number(size) <= 10485760) {
    return true
  }
  else {
    return false
  }
}

function checkFile(array) {
  return array.filter((element) => {
    if (!isGoodSize(element.size)) {
      alert(`${element.name} тяжеловат`)
    }
    if (!isGoodType(element.type)) {
      alert(`${element.name} не с нашего района`)
    }
    return (isGoodType(element.type) && isGoodSize(element.size))
  });
}

export function deleteCard(cardElement) {  
  cardElement.remove();
}; 

export function createCard(file, handlerDelete) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';
  
  const name = document.createElement('h1');
  name.textContent = file.name;
  name.className = 'card__name';
  cardElement.append(name);
  
  const format = document.createElement('h2');
  format.textContent = file.format;
  format.className = 'card__format';
  cardElement.append(format);
  
  const size = document.createElement('h2');
  size.textContent = file.size;
  size.className = 'card__size';
  cardElement.append(size);

  const image = document.createElement('img');
  image.className = 'card__img';
  cardElement.append(image);

  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'card__delete';
  buttonDelete.addEventListener('click', () => {
    handlerDelete(cardElement);
  }); 
  cardElement.append(buttonDelete);

  return cardElement
}

export function createCardList(array) {
  array.forEach(element => {
    const file = {
      name: element.name,
      format: element.type.split('/')[1],
      size: formatBytes(element.size)
    }
    const reader = new FileReader();
    reader.onload = () => {
        const card = createCard(file, deleteCard);
        const img = card.querySelector('.card__img');
        img.src = reader.result;
        img.style.display = 'block';
        const previewBlock = document.querySelector('.preview');
        previewBlock.appendChild(card);
    };
    reader.readAsDataURL(element);
  });
}

export function changeHandler(e) {
  const array = checkFile(Array.from(e.target.files));
  createCardList(array);
}

export function uploadDragnDrop(e) {
  const array = checkFile(Array.from(e.dataTransfer.files));
  createCardList(array);
}
