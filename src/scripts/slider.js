class Slider {
  constructor() {
    this.buttons = document.querySelectorAll('.slider__button');  
    this.slides = [...document.querySelectorAll('.slider__item')]; 
    this.slider = document.querySelector('.slider__list'); 
    this.currentIndex = 0; 
  }

  updateSlideValue() {
    const previousSlideValue = this.slider.classList[1];
    const currentSlideValue = previousSlideValue.slice(0, 15) + this.currentIndex;
    this.slider.classList.replace(previousSlideValue, currentSlideValue);
  }

  // Move to a specific index in the slider
  moveTo(updatedIndex) {
    this.currentIndex = updatedIndex;

    // constraint the value of currentIndex
    if (this.currentIndex >= this.slides.length) this.currentIndex = 0; // Wrap around to the first item
    if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1; // Wrap around to the last item

    this.showCurrentImage();
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

  // Bind slider events for navigation and lightbox opening
  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
       const isForward = event.currentTarget.classList.contains('slider__button--forward');
        isForward ? this.next() : this.previous();
      });
    });
  }

  // Highlight the current slider item
  showCurrentImage() {
    this.slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-shown', slideIndex === this.currentIndex);
    });
  }

  // Initialize the slider
  init() {
    if (this.slides.length > 0) {
      this.showCurrentImage(); 
      this.bindEvents(); 
    }
  }
}

// persistent transfer of img sizes
const sliderImgs = document.querySelectorAll('.slider img');

sliderImgs && sliderImgs.forEach( image => {
  setTimeout(() => {
    const setCurrentSlideWidth = () => {
      const currentImgWidth = image.clientWidth;
      const root = document.documentElement;
      root.style.setProperty('--current-slide-width', `${currentImgWidth}px`);
    }
   
  setCurrentSlideWidth();
  window.addEventListener('resize', setCurrentSlideWidth)
  }, 1000);
})


const slider = new Slider();
slider.init();
