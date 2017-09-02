/**
 * infinite scroll
 * navigation breadcrumbs
 * swipe detection
 */
import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'al-carousel',
  templateUrl: './al-carousel.component.html',
  styleUrls: ['./al-carousel.component.scss']
})
export class AlCarouselComponent implements OnInit, AfterViewInit {
  private carouselContainer: any;
  private slideIndex: number = 0;
  private lengthOfSlides: number = 1;
  private currentSlideObject: any;
  private slideChangeInterval: any;
  private animationEnd;
  private hasArrows: boolean = false;
  private isPlaying: boolean = false;
  private dots: any[];
  public _carouselHeight: number = 250; // Minimum carousel height + 34px for carousel controls height
  public _uuid: string;

  @Input() carouselDataItems: any[];
  @Input() autoPlayInterval: number = 3000;
  @Input() carouselBrandClass: string;
  @Input()
  get carouselHeight() {
    return this._carouselHeight;
  }
  set carouselHeight(value: number) {
    this._carouselHeight = value;
  }
  // GET/SET unique ids for accessibility purpose
  @Input()
  get uuid() {
    return this._uuid;
  }
  set uuid(value) {
    if (value) {
      this._uuid = value + "_" + Math.random().toString(36).substring(2);
    } else {
      this._uuid = "carousel_" + Math.random().toString(36).substring(2);
    }
  }

  constructor(private _el: ElementRef) { }

  ngOnInit() {
    this.carouselContainer = this._el.nativeElement.firstElementChild;
  }

  ngAfterViewInit() {
    this.initCarousel();
  }

  public initCarousel() {
    // start at [data-slide-index]
    this.slideIndex = this.carouselContainer.getAttribute("data-slide-index") ? parseInt(this.carouselContainer.getAttribute("data-slide-index")) : 0;
    // store length of total slides
    this.lengthOfSlides = this.carouselContainer.querySelectorAll(".carousel__slide").length;
    // Get all dot navigation elements
    this.dots = this.carouselContainer.querySelectorAll(".carousel__dot");
    // starting obj
    this._updateCurrentSlideObj();
    this.currentSlideObject.classList.add('active');
    this.currentSlideObject.setAttribute('aria-hidden', false);
    // animation end event to use
    this.animationEnd = this.whichAnimationEvent();
    // add swipe detection
    if(this.lengthOfSlides > 1) {
      this._swipeSetup();
    }
  }

  _updateCurrentSlideObj() {
    // get current slide from DOM
    this.currentSlideObject = this.carouselContainer.querySelector(".carousel__slide[data-slide-index='" + this.slideIndex + "']");
    // keep dots concurrent with slides
    this._updateCurrentSlideDot();
  }

  _updateCurrentSlideDot() {
    // update dots
    for (var i = 0; i < this.dots.length; i++) {
      //dots[i].setAttribute('aria-selected', false);
      if (i == this.slideIndex) {
        this.dots[this.slideIndex].classList.add('active');
        this.dots[this.slideIndex].setAttribute('aria-selected', true);
      } else {
        this.dots[i].classList.remove('active');
        this.dots[i].setAttribute('aria-selected', false);
      }
    }
  }

  // slide Carousel one item to _L
  slideLeft() {
    // if index == 0, set to length, else index--
    if (this.slideIndex == 0) {
      this.slideIndex = this.lengthOfSlides - 1;
    } else {
      this.slideIndex -= 1;
    }
    this._slide("_L");
  }

  // slide Carousel one item to _R
  slideRight() {
    // if index == max, set to 0, else index++
    if (this.slideIndex == this.lengthOfSlides - 1) {
      this.slideIndex = 0;
    } else {
      this.slideIndex += 1;
    }
    this._slide("_R");
  }

  // Play Slideshow
  pauseSlideShow() {
    this.isPlaying = false;
    clearInterval(this.slideChangeInterval);
  }

  // Pause slideshow
  playSlideShow() {
    var self = this;
    this.isPlaying = true;
    this.slideChangeInterval = setInterval(function () {
      self.slideRight.call(self);
    }, this.autoPlayInterval);
  }

  // Go to specific slide
  goToSlide(event) {
    if (event && event.target && event.target.nodeName === "BUTTON") {
      this.pauseSlideShow();
      let jumpTo = parseInt(event.target.getAttribute("data-slide-index"));
      if (jumpTo == this.slideIndex || jumpTo > this.lengthOfSlides || jumpTo < 0) {
        return false;
      } else if (jumpTo > this.slideIndex) {
        this.slideIndex = jumpTo;
        this._slide("_R");
      } else {
        this.slideIndex = jumpTo;
        this._slide("_L");
      }
    }
  }

  // Accessiility : Navigate between slides using Left and right arrow keys
  onKeyDownGoToSlide(event) {
    this.pauseSlideShow();
    if (event && event.target && event.target.nodeName === "BUTTON") {
      if (event.keyCode === 37) {
        // Left Arrow Key
        this.slideLeft();
      } else if (event.keyCode === 39) {
        // Right Arrow Key
        this.slideRight();
      }
    }
  }

  /**
   * Sliding Controls
   * Main movement/animation fn. Applies next/prev & active classes to correct .carousel__slide's.
   * @param dir animation direction : To left or To right
   */
  _slide(dir) {
    // add preventDoubleTap to prevent double press
    let carousel = this.carouselContainer;
    carousel.className += " preventDoubleTap";

    // set diretion-based vars. these classes apply left/right css animations
    let class_for_current = dir == "_R" ? 'prev' : 'next';
    let class_for_target = dir == "_R" ? 'next' : 'prev';

    // anim out current
    let current_slide = this.currentSlideObject;

    current_slide.classList.add(class_for_current);
    current_slide.classList.remove('active');
    current_slide.setAttribute('aria-hidden', true);

    // remove
    current_slide.addEventListener(this.animationEnd, function (event) {
      current_slide.classList.remove(class_for_current);
      current_slide.removeEventListener(this.animationEnd, function () { });
    });

    // anim in next
    let target_slide = this.carouselContainer.querySelector(".carousel__slide[data-slide-index='" + this.slideIndex + "']");
    target_slide.classList.add(class_for_target, "active");
    target_slide.setAttribute('aria-hidden', false);

    // remove
    current_slide.addEventListener(this.animationEnd, function (event) {
      target_slide.classList.remove(class_for_target);
      // remove top level class
      carousel.classList.remove('preventDoubleTap');
      target_slide.removeEventListener(this.animationEnd, function () { });
    });

    // update current slide
    this._updateCurrentSlideObj();

  }

  /**
   * Swipe Detection
   */
  _swipeSetup() {
    let carousel = this,
      touchsurface = this.carouselContainer,
      startX,
      startY,
      dist,
      threshold = 150, //required min distance traveled to be considered swipe
      allowedTime = 400, // maximum time allowed to travel that distance
      elapsedTime,
      startTime;

    touchsurface.addEventListener('touchstart', function (e) {
      let touchobj = e.changedTouches[0];
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    });

    touchsurface.addEventListener('touchend', function (e) {
      let touchobj = e.changedTouches[0];
      dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
      let swipeBool = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)

      if (swipeBool)
        carousel._handleSwipe(dist);

    }, false)
  }

  _handleSwipe(dist) {
    if (dist <= 0)
      this.slideRight();
    else {
      this.slideLeft();
    }
  }

  /**
   * Utilities
   */
  whichAnimationEvent() {
    let el = document.createElement('fakeelement');
    let animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (let t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

}

/*
// Source : https://github.com/swieder227/POJS-carousel ( POJS-carousel ) + https://www.sitepoint.com/make-a-simple-javascript-slideshow-without-jquery/
// DEMO & Example : http://www.cssscript.com/responsive-carousel-slider-in-vanilla-javascript/

<!-- Usage -->
<!-- START : Ah-Carousel 
<!-- Ah-Carousel : Single Slide -->
<ah-carousel uuid [carouselDataItems]="carouselItems" [autoPlayInterval]="4000" [carouselHeight]="200" [carouselBrandClass]="'ah-tile brand-tile5-a'">

</ah-carousel>

<!-- al-Carousel : Multiple slides -->
<al-carousel uuid [carouselDataItems]="carouselItems2" [autoPlayInterval]="2000" [carouselHeight]="400" [carouselBrandClass]="'al-tile brand-tile1-a'">
	<!-- START : Carousel slides -->
	<figure *ngFor="let slide of carouselItems2; let i = index" class="al-carousel__slide" attr.data-slide-index="{{i}}" aria-hidden="true"
		role="tabpanel">
		<a class="al-carousel__link" href="{{slide.slideURL}}">
			<div class="al-carousel__image">
				<img src="{{slide.slideImage}}" alt="{{slide.slideImageAltText}}" />
			</div>
			<figcaption class="al-carousel__slide__content" *ngIf="slide.slideCaption">{{slide.slideCaption}}</figcaption>
		</a>
	</figure>
	<!-- END : Carousel slides -->
</al-carousel>


<pre><code ngNonBindable>
&lt;!-- al-Carousel : Single Slide --&gt;
&lt;al-carousel uuid [carouselDataItems]=&quot;carouselItems&quot; [autoPlayInterval]=&quot;4000&quot; [carouselHeight]=&quot;200&quot; [carouselBrandClass]=&quot;'al-tile brand-tile5-a'&quot;&gt;
	&lt;!-- START : Carousel Slides --&gt;
	&lt;figure *ngFor=&quot;let slide of carouselItems; let i = index&quot; class=&quot;al-carousel__slide&quot; attr.data-slide-index=&quot;{{i}}&quot; aria-hidden=&quot;true&quot;
    role=&quot;tabpanel&quot;&gt;

        &lt;!-- Put your custom HTML code here eg. Tile -->

	&lt;/figure&gt;
	&lt;!-- END : Carousel Slides --&gt;
&lt;/al-carousel&gt;


&lt;!-- al-Carousel : Multiple slides --&gt;
&lt;al-carousel uuid [carouselDataItems]=&quot;carouselItems2&quot; [autoPlayInterval]=&quot;2000&quot; [carouselHeight]=&quot;400&quot; [carouselBrandClass]=&quot;'al-tile brand-tile1-a'&quot;&gt;
	&lt;!-- START : Carousel slides --&gt;
    &lt;figure *ngFor=&quot;let slide of carouselItems2; let i = index&quot; class=&quot;al-carousel__slide&quot; attr.data-slide-index=&quot;{{i}}&quot; aria-hidden=&quot;true&quot; role=&quot;tabpanel&quot;&gt;

        &lt;a class=&quot;al-carousel__link&quot; href=&quot;{{slide.slideURL}}&quot;&gt;
            &lt;div class=&quot;al-carousel__image&quot;&gt;
                &lt;img src=&quot;{{slide.slideImage}}&quot; alt=&quot;{{slide.slideImageAltText}}&quot; /&gt;
            &lt;/div&gt;
            &lt;figcaption class=&quot;al-carousel__slide__content&quot; *ngIf=&quot;slide.slideCaption&quot;&gt;{{slide.slideCaption}}&lt;/figcaption&gt;
        &lt;/a&gt;

    &lt;/figure&gt;
	&lt;!-- END : Carousel slides --&gt;
&lt;/al-carousel&gt;
</code></pre>


carouselItems: any[];
carouselItems2: any[];

constructor() {
this.carouselItems = [
{ slideCaption: 'Slide_1', slideURL: "#", slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-20.jpg', slideImageAltText: "Image Alternative text" },
{ slideCaption: 'Slide_2', slideURL: "#", slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-24.jpg' },
{ slideCaption: 'Slide_3', slideURL: "#", slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-21.jpg' },
{ slideCaption: 'Slide_4', slideURL: "#", slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-22.jpg' }
];
this.carouselItems2 = [
{ slideCaption: 'Slide_1', slideURL: "#", slideImage: 'https://cdn.pixabay.com/photo/2013/10/23/02/50/iguazu-199567_960_720.jpg', slideImageAltText: "Image Alternative text" },
{ slideCaption: 'Slide_2', slideURL: "#", slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/8c/48/bb/8c48bb4fa5ad569b553a783d9a502670--autumn-love-autumn-fall.jpg' },
{ slideCaption: 'Slide_3', slideURL: "#", slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/e9/74/57/e974572fb8a4f600d2a98e0cf3c12c4e--tree-swings-cool-swings.jpg' },
{ slideCaption: 'Slide_4', slideURL: "#", slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/37/54/ec/3754ecb4d5399c27248938361d3d45f6--lakeside-cottage-autumn-leaves.jpg' }
];
}												
-->
				
				<!-- END : Ah-Carousel -->
												*/