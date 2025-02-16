class CarouselWithLightbox {
  constructor(args) {
    this.buttons = document.querySelectorAll('.carousel__button');  
    this.items = [...document.querySelectorAll('.carousel__item')]; 
    this.slider = document.querySelector('.carousel__slider'); 
    this.template = args.template; 
    this.currentIndex = 0; 
    this.lightbox = null; 
    this.lightboxImage = null; 
    this.buttonForward = null; 
    this.buttonBackward = null;
    this.lightboxButtonClose = null;
  }

  // Set the image in the lightbox based on the current carousel item
  setLightboxImage() {
    console.log("----  setLightboxImage:", setLightboxImage)
    if (!this.lightbox || !this.lightboxImage) return;
    const currentItem = this.items[this.currentIndex];
    const img = currentItem.querySelector('img');
    this.lightboxImage.src = img.src;
  }

  // Highlight the current carousel item
  showCurrentImage(index) {
    this.items.forEach((item, itemIndex) => {
      item.classList.toggle('is-shown', itemIndex === index);
    });
  }

  // Update lightbox content and carousel active item
  updateLightboxContent() {
    this.setLightboxImage();
    this.showCurrentImage(this.currentIndex);
  }

  // Move to a specific index in the carousel
  moveTo(index) {
    this.currentIndex = index;
    console.log('move to');
    if (this.currentIndex < 0) this.currentIndex = this.items.length - 1; // Wrap around to the last item
    if (this.currentIndex >= this.items.length) this.currentIndex = 0; // Wrap around to the first item
    this.updateLightboxContent();
  }

  // Navigate to the next carousel item
  next() {
     this.moveTo(this.currentIndex + 1) 
    };

  // Navigate to the previous carousel item
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

  // Bind carousel events for navigation and lightbox opening
  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        if (button.classList.contains('carousel__button--forward')) {
          this.next(); // Handle forward navigation
        } else if (button.classList.contains('carousel__button--backward')) {
          this.previous(); // Handle backward navigation
        }
      });
    });

    this.items.forEach((item, index) => {
      const img = item.querySelector('img');
      img.addEventListener('click', () => this.openLightbox(index)); // Open lightbox on image click
    });
  }

  // Initialize the carousel
  init() {
    if (this.items.length > 0) {
      this.showCurrentImage(this.currentIndex); 
      this.bindEvents(); 
    }
  }
}

// start reading from here: 

const template = `<div class="lightbox">
  <div class="lightbox__button">
    <button type="button" class="lightbox__button--close">
      <span class="sr-only">Close lightbox</span>
      <svg class="svg-close" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <polygon fill="currentColor" points="0 0 24 24 24 0 0 24"></polygon>
      </svg>
    </button>
  </div>
  <figure class="lightbox__figure">
    <img src="" alt="lightbox image" />
    <div class="lightbox__controls">
      <button class="lightbox__controls-arrow lightbox__controls-arrow--prev">◀</button>
      <button class="lightbox__controls-arrow lightbox__controls-arrow--next">▶</button>
    </div>
  </figure>
</div>`;

const carousel = new CarouselWithLightbox({ template });
carousel.init();
