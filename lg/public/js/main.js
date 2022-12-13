const navOption = {
  nextEl: "#main-visual .btn-next",
  prevEl: "#main-visual .btn-prev",
};

const mainSlider = new Swiper("#main-visual", {
  effect: "fade",
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  navigation: navOption,
  pagination: {
    el: ".pagination",
    type: "bullets",
    clickable: true,
  },
});

const introduceSlider = new Swiper("#introduce .banner", {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  navigation: {
    nextEl: "#introduce .btn-next",
    prevEl: "#introduce .btn-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    640: {
      slidesPerView: 2,
    },
  },
});
const activitySlider = new Swiper("#activity  .banner", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 20,

  //centeredSlides: true,
  navigation: {
    nextEl: "#activity .btn-next",
    prevEl: "#activity .btn-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1400: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
});
const noticeSlider = new Swiper("#notice  .banner", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 20,

  //centeredSlides: true,
  navigation: {
    nextEl: "#notice .btn-next",
    prevEl: "#notice .btn-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
const familySlider = new Swiper("footer #family-site .container", {
  spaceBetween: 30,
  slidesPerView: "auto",
  freeMode: true,
});
