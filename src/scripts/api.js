export function trueAPI(preloader) {
  return new Promise((resolve) => {
    setTimeout(() => {
      preloader.style.visibility = "hidden";
      alert('Данные отправлены на сервер, честно')
    }, 2000);
  });
}