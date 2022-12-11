const modal = document.querySelector('.modal');
const activeImage = document.querySelector('#active-image');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('#close');
// Переменные элементов смены изображений
const next = document.querySelector('#right');
const prev = document.querySelector('#left');

let activeImageId = 0;

// Изменение функции вывода изображений
function displayResult(apiData) {
    const resultNode = document.querySelector('.images');
    let cards = '';
    apiData.forEach((item, index) => {
        const cardBlock = `
            <div class="image">
            <img id="img-${index+1}" src="${item.download_url}"/>
            </div>
            `
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

function displayImage(e) { 
    activeImage.src = e.target.src;
    modal.style.display = 'block';
    overlay.style.display = 'block';
    // Запись if текущего изображения
    activeImageId = Number(e.target.id.slice(-1));
}

function closeImage() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    // Добавить обнуление id текущего изображения
    activeImageId = 0;
}

// Смена текущего изображения направо
function nextImage() {
    activeImageId += 1
    let countImgs = document.querySelectorAll('.images img').length
    if (activeImageId > countImgs) {
        activeImageId = 1;
    }
    activeImage.src = document.getElementById(`img-${activeImageId}`).src; 
}

// Смена текущего изображения налево
function prevImage() {
    activeImageId -= 1
    let countImgs = document.querySelectorAll('.images img').length
    if (activeImageId < 1) {
        activeImageId = countImgs;
    }
    activeImage.src = document.getElementById(`img-${activeImageId}`).src;
}

closeIcon.addEventListener('click', closeImage);
// overlay.addEventListener('click', closeImage);

// Событие при нажатии на кнопку следующего и предыдущего изображения
next.addEventListener('click', nextImage);
prev.addEventListener('click', prevImage);


// При загрузке страницы должен быть запрос на получение изображений
document.addEventListener('DOMContentLoaded', async function() {
    result = await fetch('https://picsum.photos/v2/list/?page=3&limit=13').then((response) => {
        return response.json();
      })
      .catch(() => {
        console.log('error')
      });
    // Вывод полученного массива изображений на экран
    displayResult(result);
    // Повесить клик на полученные изображения
    let imgs = document.querySelectorAll('.images img');
    imgs.forEach(img => img.addEventListener('click', displayImage)); 
}, false);

document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft":
            prevImage();
            break;
        case "ArrowRight":
            nextImage();
            break;
        case "Escape":
            closeImage();
            break;
    }
};