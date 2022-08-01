class Slider {
  constructor(option){
    this.slider = option.slider;
    this.sliderList = this.slider.querySelector('.slider__list');
    this.sliderItems = this.slider.querySelectorAll('.slider__item');
    this.btnNext = this.slider.querySelector('.next');
    this.btnPrev = this.slider.querySelector('.prev');
    this.activeSlide = 0;
    this.moveSlide = 100;
    this.timeMove = 1000;
    this.dir = 'X';
    this.interval = this.timeMove + 5000;
    this.auto = option.autoPlay;
    this.notDots = option.dotsDisabled;
    
    if(this.notDots == 'false'){
      this.active = true;
      this.ul = document.createElement('ul');
      this.ul.classList.add('slider__dots');
      this.sliderItems.forEach(()=>{
        this.li = document.createElement('li');
        this.ul.appendChild(this.li);
      })
      this.slider.appendChild(this.ul);
      this.sliderDotsLi = this.slider.querySelectorAll('.slider__dots li');
      this.sliderDotsLi[this.activeSlide].classList.add('active');
      this.sliderDotsLi.forEach((dot, key) => {
        dot.addEventListener('click', () => {this.controllersDots(key)})
      })
    }
    
    if(this.auto == 'true'){
      let autoPlayInterval = setInterval(() => {
        this.move(this.btnNext);
      }, this.interval)
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval)
      })
      this.slider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
          this.move(this.btnNext);
        }, this.interval)
      })
    }
    
    this.sliderItems.forEach((slide, num) => {
      if(num != this.activeSlide){
        slide.style = `transform: translate${this.dir}(${this.moveSlide}%)`;
      }
      if(num == this.sliderItems.length - 1){
        slide.style = `transform: translate${this.dir}(${-this.moveSlide}%)`;
      }
    })
    
    this.btnNext.addEventListener('click', () => {this.move(this.btnNext)})
    this.btnPrev.addEventListener('click', () => {this.move(this.btnPrev)})
  }
  move(btn){
    this.btnNext.disabled = true;
    this.btnPrev.disabled = true;
    setTimeout(() => {
      this.btnNext.disabled = false;
      this.btnPrev.disabled = false;
    }, this.timeMove + 200);
    let btnPrevOrNext = btn == this.btnNext ? -this.moveSlide : this.moveSlide;
    this.sliderItems.forEach((slide, num) => {
      if(num != this.activeSlide){
        slide.style = `transform: translate${this.dir}(${-btnPrevOrNext}%)`;
      }
    })
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style = `transform: translate${this.dir}(${btnPrevOrNext}%); transition: ${this.timeMove}ms`;
      this.sliderDotsLi[this.activeSlide].classList.remove('active');
      if(btn == this.btnNext){
        this.activeSlide++;
        if(this.activeSlide >= this.sliderItems.length){
          this.activeSlide = 0;
        }
      }else if(btn == this.btnPrev){
        this.activeSlide--;
        if(this.activeSlide < 0){
          this.activeSlide = this.sliderItems.length - 1;
        }
      }
      this.sliderItems[this.activeSlide].style = `transform: translate${this.dir}(${0}%); transition: ${this.timeMove}ms`;
      this.sliderDotsLi[this.activeSlide].classList.add('active');
    }, 100);
  }
  controllersDots(dotKey){
    if(this.active && dotKey != this.activeSlide){
      this.sliderItems.forEach((slide, num) => {
        slide.style.transition = `0ms`;
      })
      this.active = false;
      this.sliderDotsLi.forEach((dot) => {dot.classList.remove('active')})
      let dotLeftOrRight = dotKey > this.activeSlide ? this.moveSlide : -this.moveSlide;
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${dotLeftOrRight}%)`;
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-dotLeftOrRight}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.sliderDotsLi[this.activeSlide].classList.remove('active');
        this.activeSlide = dotKey
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.sliderDotsLi[this.activeSlide].classList.add('active');
      }, 100);
      setTimeout(() => {
        this.active = true;
      }, this.timeMove + 200);
    }
  }
}

const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => {
  new Slider({
    slider: slider,
    direction: 'X',
    intervalSlide: 2000,
    autoPlay: 'true',
    dotsDisabled: 'false',
  })
})
