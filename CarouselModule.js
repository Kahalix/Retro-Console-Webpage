class Carousel {
    constructor(element) {
        this.carouselElement = element;
        this.carouselWrapper = element.querySelector('.carousel__wrapper');
        this.slides = Array.from(this.carouselWrapper.children);
        this.totalSlides = this.slides.length;
        this.currentIndex = 0;
        this.isPlaying = true;
        this.intervalTime = 3000; // Interval time in milliseconds
        this.init();
    }

    init() {
        this.createIndicators();
        this.updateIndicators();
        this.attachEventListeners();
    }

    createIndicators() {
        const indicatorsContainer = this.carouselElement.querySelector('.carousel__indicators');
        this.slides.forEach((slide, index) => {
            let indicator = document.createElement('button');
            indicator.classList.add('carousel__indicator');
            indicator.dataset.slideTo = index;
        });

        this.indicators = Array.from(indicatorsContainer.children);
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    attachEventListeners() {
        this.carouselElement.querySelector('.carousel__control--prev').addEventListener('click', () => this.prev());
        this.carouselElement.querySelector('.carousel__control--next').addEventListener('click', () => this.next());

        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', (event) => this.goToSlide(event.target.dataset.slideTo));
        });
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = parseInt(index);
        this.updateCarousel();
    }

    updateCarousel() {
        const newTransformValue = -(100 * this.currentIndex);
        this.carouselWrapper.style.transform = `translateX(${newTransformValue}%)`;
        this.updateIndicators();

        document.querySelectorAll('.retro-console-table tbody').forEach(tbody => {
            tbody.style.display = 'none';
        });

        const targetTable = document.querySelector(`.retro-console-table tbody[data-slide-index="${this.currentIndex}"]`);
        if (targetTable) {
            targetTable.style.display = 'table-row-group';
        }
    }
}

export { Carousel };
