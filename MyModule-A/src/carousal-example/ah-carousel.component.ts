// DEMO & Example : http://www.cssscript.com/responsive-carousel-slider-in-vanilla-javascript/

/**
 * Features:
 *========================
 * infinite scroll
 * navigation breadcrumbs
 * swipe detection
 */
import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, Renderer2, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'ah-carousel',
  template: `
    <!-- Carousel -->
            <div class="carousel-main carousel-main--1" data-slide-index="2">
                <!-- Slides -->
         <div *ngFor="let item of value; let i = index" class="carousel-item" attr.data-slide-index="{{i}}" style="background-image: url({{item.image}});" attr.data-src="{{item.image}}">Slide {{item.vin}}</div>

               <!-- <div class="carousel-item" data-slide-index="0" data-src="http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-22.jpg"></div>
                <div class="carousel-item" data-slide-index="1" data-src="http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-20.jpg"></div>
                <div class="carousel-item" data-slide-index="2" data-src="img/rooms_pres.jpg"></div>
                <div class="carousel-item" data-slide-index="3" data-src="img/rooms_serenity.jpg"></div>-->

                <!-- Controls -->
                <button class="carousel-btn" data-dir="_L"></button>
                <button class="carousel-btn" data-dir="_R"></button>

								<div class="play-pause">
									<!-- Controls -->
                <button class="carousel-play" data-dir="_L">Play</button>
                <button class="carousel-pause" data-dir="_R">Pause</button>
									</div>

                <!-- Dots -->
                <div class="carousel-dots">
                    <div class="carousel-dot" data-slide-index="0"></div>
                    <div class="carousel-dot" data-slide-index="1"></div>
                    <div class="carousel-dot" data-slide-index="2"></div>
                    <div class="carousel-dot" data-slide-index="3"></div>
                </div>
            </div>
  `,
  styleUrls: ['./ah-carousel.component.scss']
})
export class AhCarouselComponent implements OnInit, AfterViewInit {

  @Input() value: any[];
  obj;
  slide_index;
  slide_length;
  slide_current_obj;
  playing = false;
  slideInterval;

  constructor(private _el: ElementRef) {

  }

  ngOnInit() {
    this.obj = this._el.nativeElement.querySelector('.carousel-main--1');
  }

  ngAfterViewInit() {
    this._init();
  }
  _init() {
    // start at [data-slide-index]
    this.slide_index = this.obj.getAttribute("data-slide-index") ? parseInt(this.obj.getAttribute("data-slide-index")) : 0;
    // starting obj
    this._updateCurrentSlideObj();
    this.slide_current_obj.className += ' active';
    // store length
    this.slide_length = this.obj.querySelectorAll(".carousel-item").length;
    // animation end event to use
    this.animationEnd = this.whichAnimationEvent();
    // go-go-gadget-eventHandlers!
    this._setupHandlers();
    // add swipe detection
    this._swipeSetup();
  }

  _setupHandlers() {

    var self = this;

    var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
    btn_L.addEventListener("mousedown", function () { self._slideLeft() });

    var btn_R = this.obj.querySelector(".carousel-btn[data-dir='_R']");
    btn_R.addEventListener("mousedown", function () { self._slideRight() });

    var btn_play = this.obj.querySelector(".carousel-play[data-dir='_L']");
    btn_play.addEventListener("click", function () { self._playSlideshow() });

    var btn_pause = this.obj.querySelector(".carousel-pause[data-dir='_R']");
    btn_pause.addEventListener("click", function () { self._pauseSlideshow() });

    var dots = this.obj.querySelectorAll(".carousel-dot");
    for (var i = 0; i < dots.length; i++) {
      dots[i].addEventListener("mousedown", function () { self._slideJump(this.getAttribute("data-slide-index")) });
    }

  }

  _updateCurrentSlideDot() {
    // update dots
    var dots = this.obj.querySelectorAll(".carousel-dot");
    for (var i = 0; i < dots.length; i++) {
      if (i == this.slide_index) {
        dots[this.slide_index].className += " active";
      } else {
        dots[i].className = dots[i].className.replace(/(^| )active/, "");
      }
    }

  }

  _updateCurrentSlideObj() {
    // get current slide from DOM
    this.slide_current_obj = this.obj.querySelector(".carousel-item[data-slide-index='" + this.slide_index + "']");

    // keep dots concurrent with slides
    this._updateCurrentSlideDot();
  }

  /*

    Sliding Controls

  */

  // Main movement/animation fn. Applies next/prev & active classes to correct .carousel-item's.
  _slide(dir) {

    // add preventDoubleTap to prevent double press
    var carousel = this.obj;
    carousel.className += " preventDoubleTap";

    // set diretion-based vars. these classes apply left/right css animations
    var class_for_current = dir == "_R" ? 'prev' : 'next';
    var class_for_target = dir == "_R" ? 'next' : 'prev';

    // anim out current
    var current_slide = this.slide_current_obj;
    // add
    current_slide.className += ' ' + class_for_current;
    current_slide.className = current_slide.className.replace(/(^| )active/, "");
    // remove
    current_slide.addEventListener(this.animationEnd, function () {
      current_slide.className = current_slide.className.replace(new RegExp('(^| )' + class_for_current, 'g'), "");
      current_slide.removeEventListener(this.animationEnd, function () { });
    });

    // anim in next
    var target_slide = this.obj.querySelector(".carousel-item[data-slide-index='" + this.slide_index + "']");
    // add
    target_slide.className += ' ' + class_for_target;
    target_slide.className += ' active';
    // remove
    current_slide.addEventListener(this.animationEnd, function () {
      target_slide.className = target_slide.className.replace(new RegExp('(^| )' + class_for_target, 'g'), "");
      // remove top level class
      carousel.className = carousel.className.replace(new RegExp('(^| )' + 'preventDoubleTap', 'g'), "");
      target_slide.removeEventListener(this.animationEnd, function () { });
    });

    // update current slide
    this._updateCurrentSlideObj();

  }

  // slide Carousel one item to _L
  _slideLeft() {
    // if index == 0, set to length, else index--
    if (this.slide_index == 0) {
      this.slide_index = this.slide_length - 1;
    } else {
      this.slide_index -= 1;
    }
    this._slide("_L");
  }

  // slide Carousel one item to _R
  _slideRight() {
    // if index == max, set to 0, else index++
    if (this.slide_index == this.slide_length - 1) {
      this.slide_index = 0;
    } else {
      this.slide_index += 1;
    }
    this._slide("_R");
  }

  _pauseSlideshow() {
    //pauseButton.innerHTML = '&#9658;'; // play character
    this.playing = false;
    clearInterval(this.slideInterval);
  }

  _playSlideshow() {
    var self = this;
    console.log(self);
    //pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
    this.playing = true;
    this.slideInterval = setInterval(function () {
      self._slideRight.call(self);
    }, 2000);
  }

  // Go directly to slide param:'jumpTo'. Animating in correct direction.
  _slideJump(jumpTo) {
    jumpTo = parseInt(jumpTo);
    if (jumpTo == this.slide_index || jumpTo > this.slide_length || jumpTo < 0) {
      console.error("invalid slide index. wtf m8?");
      return false;
    } else if (jumpTo > this.slide_index) {
      this.slide_index = jumpTo;
      this._slide("_R");
    } else {
      this.slide_index = jumpTo;
      this._slide("_L");
    }
  }

  /*

    Swipe Detection

  */
  _swipeSetup() {

    var carousel = this,
      touchsurface = this.obj,
      startX,
      startY,
      dist,
      threshold = 150, //required min distance traveled to be considered swipe
      allowedTime = 400, // maximum time allowed to travel that distance
      elapsedTime,
      startTime;

    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0];
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      // e.preventDefault();
    });

    // touchsurface.addEventListener('touchmove', function(e){
    //     e.preventDefault(); // prevent scrolling when inside DIV
    // });

    touchsurface.addEventListener('touchend', function (e) {
      console.log("touchend");
      var touchobj = e.changedTouches[0];
      dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
      var swipeBool = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)

      if (swipeBool)
        carousel._handleSwipe(dist);

      // e.preventDefault()
    }, false)
  }

  _handleSwipe(dist) {
    if (dist <= 0)
      this._slideRight();
    else {
      this._slideLeft();
    }
  }


  /*

    Utilities

  */

  /* From Modernizr. Get supported event for CSS animation animationEnd */
  whichAnimationEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    }

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

}
