class Slider {
  constructor(args) {
    this.buttons = document.querySelectorAll('.slider__button');  
    this.items = [...document.querySelectorAll('.slider__item')]; 
    this.slider = document.querySelector('.slider__list'); 
    this.currentIndex = 0; 
  }

  updateSlideValue() {
    const previousSlideValue = this.slider.classList[1].slice(0,15);
    const currentSlideValue = previousSlideValue + this.currentIndex;

    this.slider.classList.remove(previousSlideValue);
    this.slider.classList.add(currentSlideValue);
  }

  // Move to a specific index in the slider
  moveTo(updatedIndex) {
    this.currentIndex = updatedIndex;
    if (this.currentIndex >= this.items.length) this.currentIndex = 0; // Wrap around to the first item
    if (this.currentIndex < 0) this.currentIndex = this.items.length - 1; // Wrap around to the last item

    this.showCurrentImage()
    this.updateSlideValue();
  }

  // Navigate to the next slider item
  next() {
     this.moveTo(this.currentIndex + 1) 
    };

  // Navigate to the previous slider item
  previous() { 
    this.moveTo(this.currentIndex - 1) 
  };


  // Bind slider events for navigation and lightbox opening
  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (event.currentTarget.classList.contains('slider__button--forward')) {
          this.next(); 
        } else if (event.currentTarget.classList.contains('slider__button--backward')) {
          this.previous(); 
        }
      });
    });

    this.items.forEach((item, index) => {
      const img = item.querySelector('img');
      img.addEventListener('click', () => this.openLightbox(index)); // Open lightbox on image click
    });
  }

  // Highlight the current slider item
  showCurrentImage() {
    this.items.forEach((item, itemIndex) => {
      item.classList.toggle('is-shown', itemIndex === this.currentIndex);
    });
  }

  // Initialize the slider
  init() {
    if (this.items.length > 0) {
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
