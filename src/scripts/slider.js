
const listSlider = document.querySelector('.carousel__slider');
const inputs = document.querySelectorAll('.carousel__controls input');
const buttons = document.querySelectorAll('.carousel__button');
const buttonForward = document.querySelector('.carousel__button--forward');
const buttonBackward = document.querySelector('.carousel__button--backward');

let counter = null;
let slideValue = null;

inputs[0].setAttribute('disabled', '');
inputs[0].click();

buttonForward.addEventListener('click', (event) => {
    getSlideValue(listSlider,counter,event);
});

buttonBackward.addEventListener('click', (event) => {
    getSlideValue(listSlider,counter,event);
});

/////////////////////////////////

const getSlideValue = (listSlider,counter,event) => {
  
  slideValue = listSlider.classList[1];
  const lastValue = slideValue[slideValue.length - 1];
  counter = parseInt(lastValue);
  
  const button = event.currentTarget;
  const isbuttonForward = button.classList.contains('carousel__button--forward');
  
  isbuttonForward ? updateCounterForward(counter,button) : updateCounterBackward(counter,button);
}

const updateCounterForward = (counter,button) => {
  if (counter < 4 && counter !== 3) {
    counter +=1;
  } else if (counter === 3) {
    counter +=1;
    button.setAttribute('disabled', '');
  };
  enableButtonBackward(counter);
  handlePagination(counter, inputs,button);
  replaceSlideValue(slideValue, counter); 
};

const updateCounterBackward = (counter, button) => {
  if (counter !== 1) {
    counter -= 1;
  } else {
    counter -= 1;
    button.setAttribute('disabled', '');
  }
  disableButtonForward(buttonForward, counter);
  handlePagination(counter, inputs,button);
  replaceSlideValue(slideValue, counter); 
};
 
const enableButtonBackward = (counter) => {
   counter > 0 ? buttonBackward.removeAttribute('disabled') : '';
  }
 
const disableButtonForward = (buttonForward, counter) => {
  counter !== 4 ? buttonForward.removeAttribute('disabled') : '';
};

const replaceSlideValue = (slideValue, counter) => {
    const copySlideValue = slideValue.slice(0,15);
    const newCurrentSlideValue = copySlideValue + counter;
    listSlider.classList.remove(slideValue); 
    listSlider.classList.add(newCurrentSlideValue); 
}

const handlePagination = (counter, inputs,button) => {
  inputs[counter].removeAttribute('disabled');
  inputs[counter].click();
  
  const isButtonForward = button.classList.contains('carousel__button--forward');
  if (isButtonForward) {
    inputs[counter - 1].setAttribute('disabled', '');
  } else {
    inputs[counter + 1].setAttribute('disabled', '');
  }
}
