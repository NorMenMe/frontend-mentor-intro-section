class Slider {
  constructor() {
    this.slider = document.querySelector('.slider__list'); 
    this.slides = [...this.slider.querySelectorAll('.slider__item')]; 
    this.buttonsControl = document.querySelectorAll('.slider__button');  
    this.currentIndex = 0; 
  }

  // update the class responsible for the CSS slide effect
  updateSlideValue() {
    const previousSlideValue = this.slider.classList[1];
    const currentSlideValue = previousSlideValue.slice(0, 15) + this.currentIndex;
    this.slider.classList.replace(previousSlideValue, currentSlideValue);
  }

  // update the current index and the shown slide
  moveTo(updatedIndex) {
    this.currentIndex = updatedIndex;

    // constraint the value of currentIndex
    if (this.currentIndex >= this.slides.length) this.currentIndex = 0; // Wrap around to the first item
    if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1; // Wrap around to the last item

    this.showCurrentSlide();
    this.updateSlideValue();
  }

  // Navigate to the previous slider item
  previous() { 
    this.moveTo(this.currentIndex - 1);
  };

  // Navigate to the next slider item
  next() {
    this.moveTo(this.currentIndex + 1);
   };

  // according to the clicked button, call next() or previous()
  handleOnClick(event) {
    const isForward = event.currentTarget.classList.contains('slider__button--forward');
    isForward ? this.next() : this.previous();
  }

  // Register events
  bindEvents() {
    if (!this.buttonsControl.length) return;
    this.buttonsControl.forEach((button) => {
      button.addEventListener('click', this.handleOnClick.bind(this));
    });
  }

  // Highlight the current slider item, applying the utility class according to the current index
  showCurrentSlide() {
    this.slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-shown', this.currentIndex === slideIndex );
    });
  }

  // Initialize the slider
  init() {
    if (!this.slides.length) return;
    this.showCurrentSlide(); 
    this.bindEvents(); 
  }
}

// init slider
const slider = new Slider();
slider.init();

// persistent shipment of the image size for the CSS slide effect
const sliderImages = document.querySelectorAll('.slider img');

const setCurrentSlideWidth = () => {
  sliderImages.length && sliderImages.forEach( image => {
    const currentImageWidth = image.clientWidth;
    const root = document.documentElement;
    root.style.setProperty('--current-slide-width', `${currentImageWidth}px`);
})
}

const handleOnContentLoaded = () => {
  setTimeout(() => {
    setCurrentSlideWidth();
  }, 400);
}

document.addEventListener("DOMContentLoaded", handleOnContentLoaded);
window.addEventListener('resize', setCurrentSlideWidth);
