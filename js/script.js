
const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const prevButton = document.querySelector('.carousel__button--left')
const nextButton = document.querySelector(".carousel__button--right");
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);


const slideWidth = slides[0].getBoundingClientRect().width;

//arrange slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition)

//when I click left, move slides to the left


//when i click right, move slides to the right



const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

const hideShowArrows = (targetIndex, prevButton, nextButton, slides) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}


prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  console.log(currentSlide)
  const prevSlide = currentSlide.previousElementSibling;
  console.log(prevSlide)
  moveToSlide(track, currentSlide, prevSlide);
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  hideShowArrows(prevIndex, prevButton, nextButton, slides); 
})

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide")
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(nextIndex, prevButton, nextButton, slides); 
})


dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  console.log(targetDot)
  if (!targetDot) return;
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide')
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  hideShowArrows(targetIndex, prevButton, nextButton, slides); 
})
