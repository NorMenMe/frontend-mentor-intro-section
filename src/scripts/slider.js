class Slider {
  constructor(args) {
    this.buttons = document.querySelectorAll('.slider__button');  
    this.items = [...document.querySelectorAll('.slider__item')]; 
    this.slider = document.querySelector('.slider__slider'); 
    this.currentIndex = 0; 
  }

  // updateSlideValue
    // pass the nex index to the string slot of slideValue

  // updateShowItem
    // updateSlideValue

  // Move to a specific index in the slider
  moveTo(index) {
    this.currentIndex = index;
    if (this.currentIndex < 0) this.currentIndex = this.items.length - 1; // Wrap around to the last item
    if (this.currentIndex >= this.items.length) this.currentIndex = 0; // Wrap around to the first item
    // updateShowItem
  }

  // Navigate to the next slider item
  next() {
     this.moveTo(this.currentIndex + 1) 
    };

  // Navigate to the previous slider item
  previous() { 
    this.moveTo(this.currentIndex - 1) 
  };

  // Close the lightbox
  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.remove();
      this.lightbox = null;
    }
  }

  // Initialize the lightbox and bind lightbox controls
  initLightbox() {
    if (!document.querySelector('.lightbox')) {
      document.body.insertAdjacentHTML('beforeend', this.template);
    }
    this.lightbox = document.querySelector('.lightbox'); // Lightbox element
    this.lightboxImage = this.lightbox.querySelector('img'); // Image inside the lightbox
    this.buttonForward = this.lightbox.querySelector('.lightbox__controls-arrow--next'); // Forward button
    this.buttonBackward = this.lightbox.querySelector('.lightbox__controls-arrow--prev'); // Backward button
    this.lightboxButtonClose = this.lightbox.querySelector('.lightbox__button--close'); // Close button

    // Bind events for lightbox navigation and close
    this.buttonForward.addEventListener('click', this.next);
    this.buttonBackward.addEventListener('click', this.previous);
    this.lightboxButtonClose.addEventListener('click', () => this.closeLightbox());
  }

  // Open the lightbox and set it to the current index
  openLightbox(index) {
    this.currentIndex = index;
    this.initLightbox();
    this.updateLightboxContent();
  }

  // Bind slider events for navigation and lightbox opening
  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (button.classList.contains('slider__button--forward')) {
          this.next(); // Handle forward navigation
        } else if (button.classList.contains('slider__button--backward')) {
          this.previous(); // Handle backward navigation
        }
      });
    });

    this.items.forEach((item, index) => {
      const img = item.querySelector('img');
      img.addEventListener('click', () => this.openLightbox(index)); // Open lightbox on image click
    });
  }

  // Highlight the current slider item
  showCurrentImage(index) {
    this.items.forEach((item, itemIndex) => {
      item.classList.toggle('is-shown', itemIndex === index);
    });
  }

  // Initialize the slider
  init() {
    if (this.items.length > 0) {
      this.showCurrentImage(this.currentIndex); 
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
