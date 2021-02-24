import data from './gallery-items.js';

// Разбей задание на несколько подзадач:

// ++ Создание и рендер разметки по массиву данных и предоставленному шаблону.
// ++ Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// ++ Открытие модального окна по клику на элементе галереи.
// ++ Подмена значения атрибута src элемента img.lightbox__image.
// ++ Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// ++ Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// ++ Закрытие модального окна по клику на div.lightbox__overlay.
// ++ Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const galery = document.querySelector('.gallery');
const lightbox = document.querySelector('div.lightbox');
const lightboxOverlay = document.querySelector('div.lightbox__overlay');
const lightboxBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxImg = document.querySelector('img.lightbox__image');

const galeryLists = data
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg" alt="${description}" />
  </a>
</li>`;
  })
  .join('');

galery.insertAdjacentHTML('afterbegin', galeryLists);

galery.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  openLightbox(event);
  const parent = event.target.closest('.gallery__link');
  lightboxImg.src = parent.getAttribute('href');
}

function openLightbox(event) {
  lightbox.classList.add('is-open');
  window.addEventListener('keydown', onPress);
}

lightboxBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

function closeLightbox(event) {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  window.removeEventListener('keydown', onPress);
}

function onPress(event, href) {
  if (event.code === 'Escape') {
    closeLightbox(event);
  }
  if (event.code === 'ArrowRight') {
    closeLightbox(event);
  }
  if (event.code === 'ArrowLeft') {
    closeLightbox(event);
  }
}
