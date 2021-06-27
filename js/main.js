// Carousel
const carouselList = document.querySelector('.carousel-inner');
const carouselItems = Array.from(carouselList.children);

const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');

const carouselIndicatorList = document.querySelector('.carousel-indicators');
const carouselIndicators = Array.from(carouselIndicatorList.children);

// get carousel item width
const carouselItemWidth = carouselItems[0].getBoundingClientRect().width;

carouselItems.forEach((carouselItem, index) => {
  carouselItem.style.left = carouselItemWidth * index + 'px';
});

const moveToCarouselItem = (
  carouselList,
  currentCarouselItem,
  targetCarouselItem
) => {
  carouselList.style.transform = `translateX(-${targetCarouselItem.style.left})`;

  currentCarouselItem.classList.remove('active');
  targetCarouselItem.classList.add('active');
};

const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove('active');
  targetIndicator.classList.add('active');
};

const hideShowCarouselControl = (
  carouselItems,
  prevButton,
  nextButton,
  targetIndex
) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === carouselItems.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

// When i click right, move carousel to the right
nextButton.addEventListener('click', () => {
  const currentCarouselItem = document.querySelector('.carousel-item.active');
  const nextCarouselItem = currentCarouselItem.nextElementSibling;
  const currentCarouselIndicator = document.querySelector(
    '.carousel-indicator.active'
  );
  const targetCarouselIndicator = currentCarouselIndicator.nextElementSibling;
  const nextIndex = carouselItems.findIndex(
    (carouselItem) => carouselItem === nextCarouselItem
  );

  moveToCarouselItem(carouselList, currentCarouselItem, nextCarouselItem);
  updateIndicators(currentCarouselIndicator, targetCarouselIndicator);
  hideShowCarouselControl(carouselItems, prevButton, nextButton, nextIndex);
});

// When i click left, move carousel to the left
prevButton.addEventListener('click', () => {
  const currentCarouselItem = document.querySelector('.carousel-item.active');
  const prevCarouselItem = currentCarouselItem.previousElementSibling;
  const currentCarouselIndicator = document.querySelector(
    '.carousel-indicator.active'
  );
  const targetCarouselIndicator =
    currentCarouselIndicator.previousElementSibling;
  const prevIndex = carouselItems.findIndex(
    (carouselItem) => carouselItem === prevCarouselItem
  );

  moveToCarouselItem(carouselList, currentCarouselItem, prevCarouselItem);
  updateIndicators(currentCarouselIndicator, targetCarouselIndicator);
  hideShowCarouselControl(carouselItems, prevButton, nextButton, prevIndex);
});

// When i click the carousel indicators, move to that carousel item
carouselIndicatorList.addEventListener('click', (e) => {
  const targetCarouselIndicator = e.target;
  if (!targetCarouselIndicator) return;

  const currentCarouselItem = document.querySelector('.carousel-item.active');
  const currentCarouselIndicator = document.querySelector(
    '.carousel-indicator.active'
  );

  const targetIndex = carouselIndicators.findIndex(
    (item) => item === targetCarouselIndicator
  );

  moveToCarouselItem(
    carouselList,
    currentCarouselItem,
    carouselItems[targetIndex]
  );
  updateIndicators(currentCarouselIndicator, targetCarouselIndicator);

  hideShowCarouselControl(carouselItems, prevButton, nextButton, targetIndex);
});
