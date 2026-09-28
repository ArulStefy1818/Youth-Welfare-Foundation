/* ============================================================
   STACKLY YOUTH WELFARE FOUNDATION
   COMPLETE JAVASCRIPT
   HEADER + MOBILE MENU + VIDEO HERO
   DONOR MARQUEE + CAUSES SLIDER
============================================================ */


/* ============================================================
   MAIN DOM READY
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ========================================================
       AOS INITIALIZATION
    ======================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            once: true,
            offset: 80,
            easing: "ease-out-cubic",
            mirror: false,
            anchorPlacement: "top-bottom"
        });

    }


    /* ========================================================
       HEADER SCROLL EFFECT
    ======================================================== */

    const youthHeader =
        document.getElementById("stacklyYouthHeader");


    function stacklyYouthHeaderScroll() {

        if (!youthHeader) return;


        if (window.scrollY > 40) {

            youthHeader.classList.add("scrolled");

        } else {

            youthHeader.classList.remove("scrolled");

        }

    }


    stacklyYouthHeaderScroll();


    window.addEventListener(
        "scroll",
        stacklyYouthHeaderScroll,
        {
            passive: true
        }
    );


    /* ========================================================
       MOBILE MENU ELEMENTS
    ======================================================== */

    const youthMenuToggle =
        document.getElementById(
            "stacklyYouthMenuToggle"
        );


    const youthMenuClose =
        document.getElementById(
            "stacklyYouthMenuClose"
        );


    const youthMobileMenu =
        document.getElementById(
            "stacklyYouthMobileMenu"
        );


    const youthOverlay =
        document.getElementById(
            "stacklyYouthOverlay"
        );


    const youthMobileLinks =
        document.querySelectorAll(
            ".stackly-youth-mobile-link"
        );


    /* ========================================================
       OPEN MOBILE MENU
    ======================================================== */

    function stacklyYouthOpenMenu() {

        if (!youthMobileMenu) return;


        youthMobileMenu.classList.add(
            "active"
        );


        if (youthOverlay) {

            youthOverlay.classList.add(
                "active"
            );

        }


        document.body.classList.add(
            "stackly-youth-menu-open"
        );


        if (youthMenuToggle) {

            youthMenuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        youthMobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* ========================================================
       CLOSE MOBILE MENU
    ======================================================== */

    function stacklyYouthCloseMenu() {

        if (!youthMobileMenu) return;


        youthMobileMenu.classList.remove(
            "active"
        );


        if (youthOverlay) {

            youthOverlay.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "stackly-youth-menu-open"
        );


        if (youthMenuToggle) {

            youthMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        youthMobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* ========================================================
       MOBILE MENU OPEN BUTTON
    ======================================================== */

    if (youthMenuToggle) {

        youthMenuToggle.addEventListener(
            "click",
            stacklyYouthOpenMenu
        );

    }


    /* ========================================================
       MOBILE MENU CLOSE BUTTON
    ======================================================== */

    if (youthMenuClose) {

        youthMenuClose.addEventListener(
            "click",
            stacklyYouthCloseMenu
        );

    }


    /* ========================================================
       OVERLAY CLOSE
    ======================================================== */

    if (youthOverlay) {

        youthOverlay.addEventListener(
            "click",
            stacklyYouthCloseMenu
        );

    }


    /* ========================================================
       MOBILE NAV LINK CLOSE
    ======================================================== */

    youthMobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                stacklyYouthCloseMenu
            );

        }
    );


    /* ========================================================
       ESCAPE KEY CLOSE
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                youthMobileMenu &&
                youthMobileMenu.classList.contains("active")
            ) {

                stacklyYouthCloseMenu();

            }

        }
    );


    /* ============================================================
       HERO VIDEO SLIDER
    ============================================================ */

    const youthVideos =
        document.querySelectorAll(
            ".stackly-youth-video"
        );


    const youthNext =
        document.getElementById(
            "stacklyYouthNext"
        );


    const youthPrev =
        document.getElementById(
            "stacklyYouthPrev"
        );


    const youthCurrent =
        document.getElementById(
            "stacklyYouthCurrent"
        );


    const youthProgress =
        document.getElementById(
            "stacklyYouthProgress"
        );


    const youthHero =
        document.getElementById(
            "stacklyYouthHero"
        );


    let youthCurrentSlide = 0;

    let youthSliderTimer = null;

    const youthSlideDuration = 7000;


    /* ========================================================
       FORMAT SLIDE NUMBER
    ======================================================== */

    function stacklyYouthFormatNumber(number) {

        return String(
            number + 1
        ).padStart(2, "0");

    }


    /* ========================================================
       RESET HERO PROGRESS
    ======================================================== */

    function stacklyYouthResetProgress() {

        if (!youthProgress) return;


        youthProgress.style.transition =
            "none";


        youthProgress.style.width =
            "0%";


        requestAnimationFrame(
            function () {

                requestAnimationFrame(
                    function () {

                        youthProgress.style.transition =
                            `width ${youthSlideDuration}ms linear`;


                        youthProgress.style.width =
                            "100%";

                    }
                );

            }
        );

    }


    /* ========================================================
       PLAY ACTIVE HERO VIDEO
    ======================================================== */

    function stacklyYouthPlayVideo(index) {

        if (!youthVideos.length) return;


        youthVideos.forEach(
            function (video, videoIndex) {


                const isActive =
                    videoIndex === index;


                video.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    try {

                        video.currentTime = 0;

                    } catch (error) {
                        // Ignore currentTime errors
                    }


                    const playPromise =
                        video.play();


                    if (
                        playPromise !== undefined
                    ) {

                        playPromise.catch(
                            function () {
                                // Browser autoplay restriction
                            }
                        );

                    }

                } else {

                    video.pause();

                }

            }
        );


        if (youthCurrent) {

            youthCurrent.textContent =
                stacklyYouthFormatNumber(
                    index
                );

        }


        stacklyYouthResetProgress();

    }


    /* ========================================================
       GO TO HERO SLIDE
    ======================================================== */

    function stacklyYouthGoToSlide(index) {

        if (!youthVideos.length) return;


        youthCurrentSlide =
            (
                index +
                youthVideos.length
            ) %
            youthVideos.length;


        stacklyYouthPlayVideo(
            youthCurrentSlide
        );


        stacklyYouthStartTimer();

    }


    /* ========================================================
       NEXT HERO SLIDE
    ======================================================== */

    function stacklyYouthNextSlide() {

        stacklyYouthGoToSlide(
            youthCurrentSlide + 1
        );

    }


    /* ========================================================
       PREVIOUS HERO SLIDE
    ======================================================== */

    function stacklyYouthPreviousSlide() {

        stacklyYouthGoToSlide(
            youthCurrentSlide - 1
        );

    }


    /* ========================================================
       START HERO TIMER
    ======================================================== */

    function stacklyYouthStartTimer() {

        clearInterval(
            youthSliderTimer
        );


        youthSliderTimer =
            setInterval(
                stacklyYouthNextSlide,
                youthSlideDuration
            );

    }


    /* ========================================================
       HERO NEXT BUTTON
    ======================================================== */

    if (youthNext) {

        youthNext.addEventListener(
            "click",
            function () {

                stacklyYouthNextSlide();

            }
        );

    }


    /* ========================================================
       HERO PREVIOUS BUTTON
    ======================================================== */

    if (youthPrev) {

        youthPrev.addEventListener(
            "click",
            function () {

                stacklyYouthPreviousSlide();

            }
        );

    }


    /* ========================================================
       INITIAL HERO SLIDE
    ======================================================== */

    if (youthVideos.length) {

        stacklyYouthPlayVideo(0);

        stacklyYouthStartTimer();

    }


    /* ========================================================
       PAUSE HERO WHEN MENU OPENS
    ======================================================== */

    function stacklyYouthPauseSlider() {

        clearInterval(
            youthSliderTimer
        );


        youthVideos.forEach(
            function (video) {

                video.pause();

            }
        );

    }


    /* ========================================================
       RESUME HERO AFTER MENU CLOSE
    ======================================================== */

    function stacklyYouthResumeSlider() {

        const activeVideo =
            youthVideos[
                youthCurrentSlide
            ];


        if (activeVideo) {

            const playPromise =
                activeVideo.play();


            if (
                playPromise !== undefined
            ) {

                playPromise.catch(
                    function () {}
                );

            }

        }


        stacklyYouthStartTimer();

        stacklyYouthResetProgress();

    }


    if (youthMenuToggle) {

        youthMenuToggle.addEventListener(
            "click",
            stacklyYouthPauseSlider
        );

    }


    if (youthMenuClose) {

        youthMenuClose.addEventListener(
            "click",
            stacklyYouthResumeSlider
        );

    }


    if (youthOverlay) {

        youthOverlay.addEventListener(
            "click",
            stacklyYouthResumeSlider
        );

    }


    /* ========================================================
       HERO TOUCH / SWIPE SUPPORT
    ======================================================== */

    let youthTouchStartX = 0;

    let youthTouchEndX = 0;


    if (youthHero) {


        youthHero.addEventListener(
            "touchstart",
            function (event) {

                youthTouchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        youthHero.addEventListener(
            "touchend",
            function (event) {

                youthTouchEndX =
                    event.changedTouches[0].screenX;


                const distance =
                    youthTouchEndX -
                    youthTouchStartX;


                if (
                    Math.abs(distance) < 55
                ) {

                    return;

                }


                if (distance < 0) {

                    stacklyYouthNextSlide();

                } else {

                    stacklyYouthPreviousSlide();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ========================================================
       REDUCED MOTION
    ======================================================== */

    const youthReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (youthReducedMotion.matches) {

        clearInterval(
            youthSliderTimer
        );


        youthVideos.forEach(
            function (video) {

                video.pause();

            }
        );


        if (youthProgress) {

            youthProgress.style.width =
                "100%";

        }

    }


    /* ============================================================
       DONOR MARQUEE
    ============================================================ */

    const donorWindow =
        document.querySelector(
            ".donor-marquee-window"
        );


    const donorTrack =
        document.querySelector(
            ".donor-marquee-track"
        );


    if (donorWindow && donorTrack) {


        /* ====================================================
           MOUSE ENTER
        ==================================================== */

        donorWindow.addEventListener(
            "mouseenter",
            function () {

                donorTrack.style.animationPlayState =
                    "paused";

            }
        );


        /* ====================================================
           MOUSE LEAVE
        ==================================================== */

        donorWindow.addEventListener(
            "mouseleave",
            function () {

                donorTrack.style.animationPlayState =
                    "running";

            }
        );


        /* ====================================================
           TOUCH START
        ==================================================== */

        let donorTouchTimer;


        donorWindow.addEventListener(
            "touchstart",
            function () {

                donorTrack.style.animationPlayState =
                    "paused";


                clearTimeout(
                    donorTouchTimer
                );

            },
            {
                passive: true
            }
        );


        /* ====================================================
           TOUCH END
        ==================================================== */

        donorWindow.addEventListener(
            "touchend",
            function () {

                donorTouchTimer =
                    setTimeout(
                        function () {

                            donorTrack.style.animationPlayState =
                                "running";

                        },
                        800
                    );

            },
            {
                passive: true
            }
        );

    }


    /* ============================================================
       YWF CAUSES SLIDER
       NATIVE HORIZONTAL SCROLL VERSION
    ============================================================ */

    const causesSlider =
        document.querySelector(
            ".ywf-causes-slider"
        );


    const causesTrack =
        document.querySelector(
            ".ywf-causes-track"
        );


    const causeCards =
        Array.from(
            document.querySelectorAll(
                ".ywf-cause-card"
            )
        );


    const causesPrev =
        document.querySelector(
            ".ywf-cause-prev"
        );


    const causesNext =
        document.querySelector(
            ".ywf-cause-next"
        );


    /* ========================================================
       CHECK CAUSES ELEMENTS
    ======================================================== */

    if (
        !causesSlider ||
        !causesTrack ||
        !causeCards.length ||
        !causesPrev ||
        !causesNext
    ) {

        return;

    }


    /* ========================================================
       CURRENT CAUSE INDEX
    ======================================================== */

    let causesCurrentIndex = 0;


    /* ========================================================
       GET CARDS PER VIEW

       Matches your CSS breakpoints:

       Desktop  : 3 cards
       Tablet   : 2 cards
       Mobile   : 1 card
    ======================================================== */

    function getCausesCardsPerView() {

        if (
            window.innerWidth <= 700
        ) {

            return 1;

        }


        if (
            window.innerWidth <= 1200
        ) {

            return 2;

        }


        return 3;

    }


    /* ========================================================
       GET MAXIMUM INDEX
    ======================================================== */

    function getCausesMaxIndex() {

        const cardsPerView =
            getCausesCardsPerView();


        return Math.max(
            0,
            causeCards.length -
            cardsPerView
        );

    }


    /* ========================================================
       GET CARD GAP
    ======================================================== */

    function getCausesGap() {

        const styles =
            window.getComputedStyle(
                causesTrack
            );


        return (
            parseFloat(styles.gap) ||
            0
        );

    }


    /* ========================================================
       GET CARD POSITION
    ======================================================== */

    function getCauseScrollPosition(index) {

        if (!causeCards[index]) {

            return 0;

        }


        /*
         * Use the actual card position instead
         * of transform calculations.
         *
         * This works with:
         * - desktop
         * - tablet
         * - mobile
         * - different card widths
         * - responsive gaps
         */

        return (
            causeCards[index].offsetLeft -
            causesTrack.offsetLeft -
            5
        );

    }


    /* ========================================================
       MOVE CAUSES SLIDER
    ======================================================== */

    function moveCausesSlider(
        behavior = "smooth"
    ) {

        const maxIndex =
            getCausesMaxIndex();


        if (
            causesCurrentIndex >
            maxIndex
        ) {

            causesCurrentIndex =
                maxIndex;

        }


        const targetPosition =
            getCauseScrollPosition(
                causesCurrentIndex
            );


        causesTrack.scrollTo({

            left:
                Math.max(
                    0,
                    targetPosition
                ),

            behavior:
                behavior

        });

    }


    /* ========================================================
       NEXT CAUSE
    ======================================================== */

    function nextCause() {

        const maxIndex =
            getCausesMaxIndex();


        if (
            causesCurrentIndex <
            maxIndex
        ) {

            causesCurrentIndex++;

        } else {

            /*
             * After the last group,
             * return to the first card.
             */

            causesCurrentIndex = 0;

        }


        moveCausesSlider(
            "smooth"
        );

    }


    /* ========================================================
       PREVIOUS CAUSE
    ======================================================== */

    function previousCause() {

        const maxIndex =
            getCausesMaxIndex();


        if (
            causesCurrentIndex > 0
        ) {

            causesCurrentIndex--;

        } else {

            /*
             * From the first card,
             * jump to the last available position.
             */

            causesCurrentIndex =
                maxIndex;

        }


        moveCausesSlider(
            "smooth"
        );

    }


    /* ========================================================
       NEXT BUTTON
    ======================================================== */

    causesNext.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            nextCause();

        }
    );


    /* ========================================================
       PREVIOUS BUTTON
    ======================================================== */

    causesPrev.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            previousCause();

        }
    );


    /* ========================================================
       UPDATE CURRENT INDEX AFTER MANUAL SCROLL
    ======================================================== */

    let causesScrollTimer;


    causesTrack.addEventListener(
        "scroll",
        function () {

            clearTimeout(
                causesScrollTimer
            );


            causesScrollTimer =
                setTimeout(
                    function () {

                        let closestIndex = 0;

                        let smallestDistance =
                            Infinity;


                        const currentScroll =
                            causesTrack.scrollLeft;


                        causeCards.forEach(
                            function (
                                card,
                                index
                            ) {

                                const distance =
                                    Math.abs(
                                        card.offsetLeft -
                                        causesTrack.offsetLeft -
                                        currentScroll -
                                        5
                                    );


                                if (
                                    distance <
                                    smallestDistance
                                ) {

                                    smallestDistance =
                                        distance;

                                    closestIndex =
                                        index;

                                }

                            }
                        );


                        const maxIndex =
                            getCausesMaxIndex();


                        causesCurrentIndex =
                            Math.min(
                                closestIndex,
                                maxIndex
                            );

                    },
                    100
                );

        },
        {
            passive: true
        }
    );


    /* ========================================================
       CAUSES KEYBOARD SUPPORT
    ======================================================== */

    causesTrack.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                nextCause();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                previousCause();

            }

        }
    );


    /* ========================================================
       CAUSES TOUCH SUPPORT

       Native horizontal scrolling already handles
       touch/swipe on mobile.

       This prevents the page from being affected
       unnecessarily.
    ======================================================== */

    causesTrack.style.touchAction =
        "pan-x";


    /* ========================================================
       RESIZE SUPPORT
    ======================================================== */

    let causesResizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                causesResizeTimer
            );


            causesResizeTimer =
                setTimeout(
                    function () {

                        const maxIndex =
                            getCausesMaxIndex();


                        if (
                            causesCurrentIndex >
                            maxIndex
                        ) {

                            causesCurrentIndex =
                                maxIndex;

                        }


                        moveCausesSlider(
                            "auto"
                        );

                    },
                    180
                );

        }
    );


    /* ========================================================
       INITIAL CAUSES POSITION
    ======================================================== */

    causesCurrentIndex = 0;


    moveCausesSlider(
        "auto"
    );


    /* ========================================================
       REFRESH AOS AFTER EVERYTHING LOADS
    ======================================================== */

    window.addEventListener(
        "load",
        function () {

            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }


            /*
             * Recalculate the causes
             * position after images load.
             */

            setTimeout(
                function () {

                    moveCausesSlider(
                        "auto"
                    );

                },
                150
            );

        }
    );

});

/* =========================================================
   YOUTH WELFARE FOUNDATION
   PROFESSIONAL TESTIMONIAL SLIDER
   ---------------------------------------------------------
   Features:
   - Next / Previous navigation
   - Dot navigation
   - Auto-play
   - Pause on hover
   - Pause when tab is inactive
   - Keyboard navigation
   - Touch/swipe support
   - Smooth transitions
   - AOS animation refresh
   - Prevents multiple intervals
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const slider = document.querySelector(".ywf-testimonial-slider");
  const items = document.querySelectorAll(".ywf-testimonial-item");
  const prevButton = document.querySelector(".ywf-prev");
  const nextButton = document.querySelector(".ywf-next");
  const dots = document.querySelectorAll(".ywf-testimonial-dot");

  if (
    !slider ||
    !items.length ||
    !prevButton ||
    !nextButton ||
    !dots.length
  ) {
    return;
  }


  /* =======================================================
     SETTINGS
  ======================================================= */

  const AUTOPLAY_DELAY = 5000;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isAnimating = false;
  let touchStartX = 0;
  let touchEndX = 0;


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
    item.setAttribute(
      "aria-hidden",
      index === currentIndex ? "false" : "true"
    );
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
    dot.setAttribute(
      "aria-current",
      index === currentIndex ? "true" : "false"
    );
  });


  /* =======================================================
     SHOW TESTIMONIAL
  ======================================================= */

  function showTestimonial(index, direction = "next") {

    if (isAnimating || index === currentIndex) {
      return;
    }

    if (index < 0) {
      index = items.length - 1;
    }

    if (index >= items.length) {
      index = 0;
    }

    isAnimating = true;

    const currentItem = items[currentIndex];
    const nextItem = items[index];

    /* Remove active state */
    currentItem.classList.remove("active");
    currentItem.setAttribute("aria-hidden", "true");

    /* Update new item */
    nextItem.classList.add("active");
    nextItem.setAttribute("aria-hidden", "false");

    /* Update dots */
    dots.forEach((dot, dotIndex) => {

      const isActive = dotIndex === index;

      dot.classList.toggle("active", isActive);

      dot.setAttribute(
        "aria-current",
        isActive ? "true" : "false"
      );

    });

    currentIndex = index;


    /* =====================================================
       RESTART AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

      /* Reset AOS elements inside the new testimonial */
      nextItem
        .querySelectorAll("[data-aos]")
        .forEach((element) => {

          element.classList.remove("aos-animate");

        });

      /*
       * Allow browser to render the new slide first,
       * then trigger AOS again.
       */
      requestAnimationFrame(() => {

        nextItem
          .querySelectorAll("[data-aos]")
          .forEach((element) => {

            element.classList.add("aos-animate");

          });

      });
    }


    /* =====================================================
       PREVENT RAPID CLICK ANIMATION
    ===================================================== */

    setTimeout(() => {

      isAnimating = false;

    }, 500);

  }


  /* =======================================================
     NEXT TESTIMONIAL
  ======================================================= */

  function nextTestimonial() {

    const nextIndex =
      (currentIndex + 1) % items.length;

    showTestimonial(nextIndex, "next");
  }


  /* =======================================================
     PREVIOUS TESTIMONIAL
  ======================================================= */

  function previousTestimonial() {

    const previousIndex =
      (currentIndex - 1 + items.length) % items.length;

    showTestimonial(previousIndex, "previous");
  }


  /* =======================================================
     NEXT BUTTON
  ======================================================= */

  nextButton.addEventListener("click", () => {

    nextTestimonial();

    restartAutoplay();

  });


  /* =======================================================
     PREVIOUS BUTTON
  ======================================================= */

  prevButton.addEventListener("click", () => {

    previousTestimonial();

    restartAutoplay();

  });


  /* =======================================================
     DOT NAVIGATION
  ======================================================= */

  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      if (index === currentIndex) {
        return;
      }

      showTestimonial(index);

      restartAutoplay();

    });

  });


  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    /*
     * Only respond when the testimonial section
     * is visible/focused.
     */

    const rect = slider.getBoundingClientRect();

    const isVisible =
      rect.top < window.innerHeight &&
      rect.bottom > 0;

    if (!isVisible) {
      return;
    }

    if (event.key === "ArrowRight") {

      nextTestimonial();

      restartAutoplay();

    }

    if (event.key === "ArrowLeft") {

      previousTestimonial();

      restartAutoplay();

    }

  });


  /* =======================================================
     AUTOPLAY
  ======================================================= */

  function startAutoplay() {

    if (autoplayTimer !== null) {
      return;
    }

    autoplayTimer = setInterval(() => {

      nextTestimonial();

    }, AUTOPLAY_DELAY);

  }


  /* =======================================================
     STOP AUTOPLAY
  ======================================================= */

  function stopAutoplay() {

    if (autoplayTimer === null) {
      return;
    }

    clearInterval(autoplayTimer);

    autoplayTimer = null;

  }


  /* =======================================================
     RESTART AUTOPLAY
  ======================================================= */

  function restartAutoplay() {

    stopAutoplay();

    startAutoplay();

  }


  /* =======================================================
     PAUSE WHEN MOUSE IS OVER SLIDER
  ======================================================= */

  slider.addEventListener("mouseenter", () => {

    stopAutoplay();

  });


  /* =======================================================
     RESUME WHEN MOUSE LEAVES SLIDER
  ======================================================= */

  slider.addEventListener("mouseleave", () => {

    startAutoplay();

  });


  /* =======================================================
     TOUCH / SWIPE SUPPORT
  ======================================================= */

  slider.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

      stopAutoplay();

    },
    {
      passive: true
    }
  );


  slider.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleSwipe();

      startAutoplay();

    },
    {
      passive: true
    }
  );


  function handleSwipe() {

    const swipeDistance =
      touchEndX - touchStartX;

    const minimumSwipeDistance = 50;

    /* Swipe left */
    if (swipeDistance < -minimumSwipeDistance) {

      nextTestimonial();

    }

    /* Swipe right */
    if (swipeDistance > minimumSwipeDistance) {

      previousTestimonial();

    }

  }


  /* =======================================================
     PAUSE WHEN BROWSER TAB IS HIDDEN
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        stopAutoplay();

      } else {

        startAutoplay();

      }

    }
  );


  /* =======================================================
     INTERSECTION OBSERVER
     Only autoplay when section is visible
  ======================================================= */

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              startAutoplay();

            } else {

              stopAutoplay();

            }

          });

        },
        {
          threshold: 0.35
        }
      );

    observer.observe(slider);

  } else {

    /* Fallback for older browsers */

    startAutoplay();

  }


  /* =======================================================
     ACCESSIBILITY
  ======================================================= */

  slider.setAttribute(
    "role",
    "region"
  );

  slider.setAttribute(
    "aria-roledescription",
    "carousel"
  );

  slider.setAttribute(
    "aria-label",
    "Youth Welfare Foundation testimonials"
  );


  /* =======================================================
     AOS INITIALIZATION
  ======================================================= */

  if (typeof AOS !== "undefined") {

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
      mirror: false
    });

  }


  /* =======================================================
     INITIAL AUTOPLAY
  ======================================================= */

  /*
   * IntersectionObserver will start autoplay when the
   * section enters the viewport. For browsers without
   * IntersectionObserver, the fallback above starts it.
   */

});


    document.addEventListener("DOMContentLoaded", function () {

        const footerYear = document.getElementById("ywfFooterYear");

        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }

    });




/* =========================================================
   YOUTH WELFARE FOUNDATION
   FOOTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       FOOTER YEAR
    ====================================================== */

    const footerYear = document.getElementById("ywfFooterYear");

    if (footerYear) {

        footerYear.textContent = new Date().getFullYear();

    }



    /* =====================================================
       NEWSLETTER FORM
    ====================================================== */

    const newsletterForm =
        document.querySelector(".ywf-newsletter-form");

    if (!newsletterForm) {
        return;
    }


    const emailInput =
        newsletterForm.querySelector('input[type="email"]');

    const submitButton =
        newsletterForm.querySelector(".ywf-newsletter-btn");


    if (!emailInput || !submitButton) {
        return;
    }



    /* =====================================================
       CREATE MESSAGE ELEMENT
    ====================================================== */

    const message = document.createElement("div");

    message.className =
        "ywf-newsletter-message";

    message.setAttribute("role", "alert");

    message.setAttribute("aria-live", "polite");

    newsletterForm.appendChild(message);



    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        return emailPattern.test(email);

    }



    /* =====================================================
       SHOW MESSAGE
    ====================================================== */

    function showMessage(text, type) {

        message.textContent = text;

        message.className =
            "ywf-newsletter-message " +
            "ywf-newsletter-message-" +
            type;

    }



    /* =====================================================
       CLEAR MESSAGE
    ====================================================== */

    function clearMessage() {

        message.textContent = "";

        message.className =
            "ywf-newsletter-message";

    }



    /* =====================================================
       FORM SUBMIT
    ====================================================== */

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            /* Prevent page reload */
            event.preventDefault();


            /* Get email value */
            const email =
                emailInput.value.trim();



            /* ==============================================
               EMPTY EMAIL
            ============================================== */

            if (email === "") {

                showMessage(
                    "Please enter your email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }



            /* ==============================================
               INVALID EMAIL
            ============================================== */

            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }



            /* ==============================================
               DISABLE BUTTON
            ============================================== */

            submitButton.disabled = true;

            submitButton.style.opacity = "0.7";

            submitButton.style.cursor = "not-allowed";



            /* ==============================================
               SAVE ORIGINAL BUTTON
            ============================================== */

            const originalButtonHTML =
                submitButton.innerHTML;



            /* ==============================================
               SUBSCRIBING STATE
            ============================================== */

            submitButton.innerHTML =
                'SUBSCRIBING <i class="fa-solid fa-spinner fa-spin"></i>';



            /* ==============================================
               SUCCESS SIMULATION

               Replace this section with your real
               API/AJAX request later.
            ============================================== */

            setTimeout(function () {


                /* ==========================================
                   SHOW SUCCESS MESSAGE
                =========================================== */

                showMessage(
                    "Thank you for subscribing! You are now connected with us.",
                    "success"
                );



                /* ==========================================
                   CLEAR FORM
                =========================================== */

                newsletterForm.reset();



                /* ==========================================
                   RESTORE BUTTON
                =========================================== */

                submitButton.disabled = false;

                submitButton.style.opacity = "";

                submitButton.style.cursor = "";

                submitButton.innerHTML =
                    originalButtonHTML;



                /* ==========================================
                   HIDE SUCCESS MESSAGE AFTER 4 SECONDS
                =========================================== */

                setTimeout(function () {


                    /* --------------------------------------
                       FADE OUT MESSAGE
                    --------------------------------------- */

                    message.classList.add(
                        "ywf-newsletter-message-hide"
                    );


                    /* --------------------------------------
                       REMOVE MESSAGE COMPLETELY
                       AFTER ANIMATION
                    --------------------------------------- */

                    setTimeout(function () {

                        clearMessage();

                    }, 400);


                }, 4000);


            }, 800);

        }
    );



    /* =====================================================
       REMOVE ERROR WHEN USER STARTS TYPING
    ====================================================== */

    emailInput.addEventListener(
        "input",
        function () {

            if (
                message.classList.contains(
                    "ywf-newsletter-message-error"
                )
            ) {

                clearMessage();

            }

        }
    );



    /* =====================================================
       REAL-TIME EMAIL CHECK
    ====================================================== */

    emailInput.addEventListener(
        "blur",
        function () {

            const email =
                emailInput.value.trim();


            if (email === "") {

                return;

            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

            } else {

                clearMessage();

            }

        }
    );



    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const backToTop =
        document.querySelector(".ywf-footer-top");


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   ACTIVE NAVIGATION LINK
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET CURRENT PAGE
    ====================================================== */

    let currentPage = window.location.pathname.split("/").pop();

    /*
     * If the URL is empty, root, or ends with /
     * treat it as index.html
     */
    if (
        currentPage === "" ||
        currentPage === "/"
    ) {
        currentPage = "index.html";
    }


    /* =====================================================
       DESKTOP NAVIGATION
    ====================================================== */

    const desktopNavLinks =
        document.querySelectorAll(
            ".stackly-youth-desktop-nav .stackly-youth-nav-link"
        );


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const mobileNavLinks =
        document.querySelectorAll(
            ".stackly-youth-mobile-nav .stackly-youth-mobile-link"
        );


    /* =====================================================
       SET ACTIVE LINK
    ====================================================== */

    function setActiveNavigation(links) {

        links.forEach(function (link) {

            /*
             * Remove active from every link first
             */
            link.classList.remove("active");


            /*
             * Get link page
             */
            const linkPage =
                link.getAttribute("href");


            /*
             * Ignore empty links and #
             */
            if (
                !linkPage ||
                linkPage === "#"
            ) {
                return;
            }


            /*
             * Get only filename from href
             */
            const cleanLinkPage =
                linkPage.split("/").pop().split("?")[0];


            /*
             * Highlight only current page
             */
            if (cleanLinkPage === currentPage) {

                link.classList.add("active");

            }

        });

    }


    /* =====================================================
       APPLY TO DESKTOP
    ====================================================== */

    setActiveNavigation(desktopNavLinks);


    /* =====================================================
       APPLY TO MOBILE
    ====================================================== */

    setActiveNavigation(mobileNavLinks);


});



/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   CONTACT FORM VALIDATION + CUSTOM DROPDOWN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const contactForm =
        document.getElementById("stacklyYouthContactForm");

    const nameInput =
        document.getElementById("youthName");

    const emailInput =
        document.getElementById("youthEmail");

    const phoneInput =
        document.getElementById("youthPhone");

    const messageInput =
        document.getElementById("youthMessage");

    const customSelect =
        document.getElementById("youthCustomSelect");

    const selectTrigger =
        document.getElementById("youthSelectTrigger");

    const selectOptions =
        document.getElementById("youthSelectOptions");

    const selectValue =
        document.getElementById("youthSelectValue");

    const hiddenSubject =
        document.getElementById("youthSubject");

    const options =
        document.querySelectorAll(
            ".stackly-youth-select-option"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!contactForm) {
        return;
    }


    /* =====================================================
       CREATE MESSAGE CONTAINER
    ===================================================== */

    let formMessage =
        document.getElementById("stacklyYouthFormMessage");

    if (!formMessage) {

        formMessage =
            document.createElement("div");

        formMessage.id =
            "stacklyYouthFormMessage";

        formMessage.className =
            "stackly-youth-form-message-box";

        contactForm.insertBefore(
            formMessage,
            contactForm.firstChild
        );
    }


    /* =====================================================
       SHOW FORM MESSAGE
    ===================================================== */

    function showFormMessage(message, type) {

        clearTimeout(
            window.stacklyYouthMessageTimer
        );

        formMessage.textContent = message;

        formMessage.className =
            "stackly-youth-form-message-box " + type;

        formMessage.style.display = "flex";

        /* Smooth scroll to message */

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        /* Automatically hide */

        window.stacklyYouthMessageTimer =
            setTimeout(function () {

                formMessage.classList.add(
                    "is-hidden"
                );

                setTimeout(function () {

                    formMessage.style.display =
                        "none";

                    formMessage.classList.remove(
                        "is-hidden"
                    );

                }, 400);

            }, 4000);
    }


    /* =====================================================
       CLEAR FIELD ERROR
    ===================================================== */

    function clearFieldError(field) {

        if (!field) {
            return;
        }

        field.classList.remove(
            "stackly-youth-input-error"
        );
    }


    /* =====================================================
       SHOW FIELD ERROR
    ===================================================== */

    function showFieldError(field) {

        if (!field) {
            return;
        }

        field.classList.add(
            "stackly-youth-input-error"
        );

        field.focus();
    }


    /* =====================================================
       CUSTOM DROPDOWN
    ===================================================== */

    if (
        customSelect &&
        selectTrigger &&
        selectOptions &&
        selectValue &&
        hiddenSubject
    ) {

        /* -----------------------------------------------
           OPEN / CLOSE DROPDOWN
        ------------------------------------------------ */

        selectTrigger.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    customSelect.classList.contains(
                        "is-open"
                    );

                if (isOpen) {

                    closeDropdown();

                } else {

                    openDropdown();

                }
            }
        );


        /* -----------------------------------------------
           OPEN
        ------------------------------------------------ */

        function openDropdown() {

            customSelect.classList.add(
                "is-open"
            );

            selectTrigger.setAttribute(
                "aria-expanded",
                "true"
            );
        }


        /* -----------------------------------------------
           CLOSE
        ------------------------------------------------ */

        function closeDropdown() {

            customSelect.classList.remove(
                "is-open"
            );

            selectTrigger.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        /* -----------------------------------------------
           SELECT OPTION
        ------------------------------------------------ */

        options.forEach(function (option) {

            option.addEventListener(
                "click",
                function () {

                    const selectedValue =
                        option.getAttribute(
                            "data-value"
                        );

                    const selectedText =
                        option.querySelector(
                            "span"
                        ).textContent.trim();


                    /* Set selected text */

                    selectValue.textContent =
                        selectedText;


                    /* Set hidden input */

                    hiddenSubject.value =
                        selectedValue;


                    /* Remove selected class */

                    options.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );
                        }
                    );


                    /* Add selected class */

                    option.classList.add(
                        "selected"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* Remove dropdown error */

                    customSelect.classList.remove(
                        "stackly-youth-select-error"
                    );


                    /* Close */

                    closeDropdown();
                }
            );
        });


        /* -----------------------------------------------
           CLICK OUTSIDE
        ------------------------------------------------ */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !customSelect.contains(
                        event.target
                    )
                ) {

                    closeDropdown();

                }
            }
        );


        /* -----------------------------------------------
           ESC KEY
        ------------------------------------------------ */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeDropdown();

                    selectTrigger.focus();
                }
            }
        );
    }


    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    function validateName() {

        const name =
            nameInput.value.trim();

        /*
         * Allows:
         * John
         * John Doe
         * Mary-Jane
         * O'Connor
         */

        const namePattern =
            /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/;


        if (name === "") {

            showFieldError(nameInput);

            return false;
        }


        if (!namePattern.test(name)) {

            showFieldError(nameInput);

            showFormMessage(
                "Please enter a valid name using alphabetic characters only.",
                "error"
            );

            return false;
        }


        clearFieldError(nameInput);

        return true;
    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function validateEmail() {

        const email =
            emailInput.value.trim();


        if (email === "") {

            showFieldError(emailInput);

            return false;
        }


        /*
         * Standard email format
         */

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        if (!emailPattern.test(email)) {

            showFieldError(emailInput);

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            return false;
        }


        clearFieldError(emailInput);

        return true;
    }


    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    function validatePhone() {

        const phone =
            phoneInput.value.trim();


        /*
         * Phone is required by validation.
         * Exactly 10 digits.
         */

        if (phone === "") {

            showFieldError(phoneInput);

            return false;
        }


        const phonePattern =
            /^[0-9]{10}$/;


        if (!phonePattern.test(phone)) {

            showFieldError(phoneInput);

            showFormMessage(
                "Please enter a valid 10-digit phone number.",
                "error"
            );

            return false;
        }


        clearFieldError(phoneInput);

        return true;
    }


    /* =====================================================
       MESSAGE VALIDATION
    ===================================================== */

    function validateMessage() {

        const message =
            messageInput.value.trim();


        if (message === "") {

            showFieldError(messageInput);

            return false;
        }


        clearFieldError(messageInput);

        return true;
    }


    /* =====================================================
       DROPDOWN VALIDATION
    ===================================================== */

    function validateSubject() {

        if (
            !hiddenSubject ||
            hiddenSubject.value.trim() === ""
        ) {

            if (customSelect) {

                customSelect.classList.add(
                    "stackly-youth-select-error"
                );
            }

            showFormMessage(
                "Please select what you are interested in.",
                "error"
            );

            if (selectTrigger) {
                selectTrigger.focus();
            }

            return false;
        }


        if (customSelect) {

            customSelect.classList.remove(
                "stackly-youth-select-error"
            );
        }

        return true;
    }


    /* =====================================================
       CONSENT VALIDATION
    ===================================================== */

    const consentInput =
        contactForm.querySelector(
            'input[name="consent"]'
        );


    function validateConsent() {

        if (
            consentInput &&
            !consentInput.checked
        ) {

            showFormMessage(
                "Please agree to be contacted before sending your message.",
                "error"
            );

            consentInput.focus();

            return false;
        }

        return true;
    }


    /* =====================================================
       NAME LIVE CLEANUP
    ===================================================== */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                /*
                 * Allows letters, spaces,
                 * apostrophes and hyphens.
                 */

                this.value =
                    this.value.replace(
                        /[^A-Za-z\s'-]/g,
                        ""
                    );

                clearFieldError(this);
            }
        );
    }


    /* =====================================================
       PHONE LIVE CLEANUP
    ===================================================== */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                /*
                 * Allow digits only.
                 */

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );

                /*
                 * Maximum 10 digits.
                 */

                if (this.value.length > 10) {

                    this.value =
                        this.value.substring(
                            0,
                            10
                        );
                }

                clearFieldError(this);
            }
        );
    }


    /* =====================================================
       EMAIL LIVE CLEANUP
    ===================================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

                clearFieldError(this);
            }
        );
    }


    /* =====================================================
       MESSAGE LIVE CLEANUP
    ===================================================== */

    if (messageInput) {

        messageInput.addEventListener(
            "input",
            function () {

                clearFieldError(this);
            }
        );
    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    contactForm.addEventListener(
        "submit",
        function (event) {

            /*
             * Prevent actual page submission.
             */

            event.preventDefault();


            /* ---------------------------------------------
               CLEAR OLD ERROR STATES
            --------------------------------------------- */

            if (nameInput) {
                clearFieldError(nameInput);
            }

            if (emailInput) {
                clearFieldError(emailInput);
            }

            if (phoneInput) {
                clearFieldError(phoneInput);
            }

            if (messageInput) {
                clearFieldError(messageInput);
            }


            /* ---------------------------------------------
               VALIDATE ALL FIELDS
            --------------------------------------------- */

            const nameValid =
                validateName();

            if (!nameValid) {
                return;
            }


            const emailValid =
                validateEmail();

            if (!emailValid) {
                return;
            }


            const phoneValid =
                validatePhone();

            if (!phoneValid) {
                return;
            }


            const subjectValid =
                validateSubject();

            if (!subjectValid) {
                return;
            }


            const messageValid =
                validateMessage();

            if (!messageValid) {
                return;
            }


            const consentValid =
                validateConsent();

            if (!consentValid) {
                return;
            }


            /* ---------------------------------------------
               SUCCESS
            --------------------------------------------- */

            showFormMessage(
                "Thank you! Your message has been sent successfully.",
                "success"
            );


            /* ---------------------------------------------
               CLEAR FORM
            --------------------------------------------- */

            contactForm.reset();


            /* ---------------------------------------------
               RESET CUSTOM DROPDOWN
            --------------------------------------------- */

            if (hiddenSubject) {

                hiddenSubject.value = "";
            }

            if (selectValue) {

                selectValue.textContent =
                    "Select an option";
            }

            options.forEach(
                function (option) {

                    option.classList.remove(
                        "selected"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "false"
                    );
                }
            );


            if (customSelect) {

                customSelect.classList.remove(
                    "is-open",
                    "stackly-youth-select-error"
                );
            }


            if (selectTrigger) {

                selectTrigger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }


            /* ---------------------------------------------
               REMOVE INPUT ERROR STATES
            --------------------------------------------- */

            [
                nameInput,
                emailInput,
                phoneInput,
                messageInput
            ].forEach(function (field) {

                if (field) {

                    field.classList.remove(
                        "stackly-youth-input-error"
                    );
                }
            });


            /* ---------------------------------------------
               OPTIONAL: RETURN TO TOP OF FORM
            --------------------------------------------- */

            setTimeout(function () {

                if (nameInput) {

                    nameInput.focus();
                }

            }, 300);
        }
    );

});


/* =========================================================
   STACKLY YOUTH WELFARE FOUNDATION
   PROFESSIONAL PAGE LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById(
        "stacklyYouthPageLoader"
    );

    const progressBar = document.getElementById(
        "stacklyYouthLoaderProgress"
    );

    const progressPercent = document.getElementById(
        "stacklyYouthLoaderPercent"
    );

    if (!loader) {
        return;
    }


    /* =====================================================
       PROGRESS ANIMATION
    ====================================================== */

    let progress = 0;

    const progressTimer = setInterval(function () {

        const step =
            progress < 45 ? 4 :
            progress < 75 ? 2 :
            progress < 92 ? 1 :
            0;

        progress += step;

        if (progress > 92) {
            progress = 92;
        }

        if (progressBar) {
            progressBar.style.width =
                progress + "%";
        }

        if (progressPercent) {
            progressPercent.textContent =
                progress + "%";
        }

    }, 55);


    /* =====================================================
       HIDE LOADER WHEN PAGE IS READY
    ====================================================== */

    function hideStacklyYouthLoader() {

        clearInterval(progressTimer);

        progress = 100;

        if (progressBar) {
            progressBar.style.width = "100%";
        }

        if (progressPercent) {
            progressPercent.textContent = "100%";
        }

        setTimeout(function () {

            loader.classList.add(
                "is-hidden"
            );

            setTimeout(function () {

                loader.remove();

            }, 850);

        }, 1500);

    }


    /* =====================================================
       PAGE LOAD
    ====================================================== */

    if (document.readyState === "complete") {

        hideStacklyYouthLoader();

    } else {

        window.addEventListener(
            "load",
            hideStacklyYouthLoader,
            {
                once: true
            }
        );

    }

});