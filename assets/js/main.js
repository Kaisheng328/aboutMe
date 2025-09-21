/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  
  document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('#portfolio-grid');
    if (portfolioGrid) {
      const portfolioData = [
        {
          "title": "Automatic License Plate Recognition (ANPR)",
          "description": "An application for Automatic License Plate Recognition (ANPR) built with Python, Tkinter, YOLOv8, EasyOCR, and NAFNet. It identifies and extracts license plate information from images.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-scan\"><path d=\"M4 7v-1a2 2 0 0 1 2 -2h2\"></path><path d=\"M4 17v1a2 2 0 0 0 2 2h2\"></path><path d=\"M16 4h2a2 2 0 0 1 2 2v1\"></path><path d=\"M16 20h2a2 2 0 0 0 2 -2v-1\"></path><path d=\"M8 12h8\"></path><path d=\"M8 8h8\"></path><path d=\"M8 16h8\"></path></svg>",
          "link": "https://github.com/Kaisheng328/Automatic-License-Plate-Recognition-using-YOLOv8",
          "tags": ["Python", "YOLOv8", "EasyOCR"]
        },
        {
          "title": "AI-Powered Agriculture Monitoring System",
          "description": "My final year project (Grade A) for soil moisture monitoring using AI for sensor substitution. This full-stack application features a Go backend, a Python AI server, and a React frontend. It includes multi-user support, JWT authentication, CRUD operations, and a CI/CD pipeline.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-device-desktop\"><path d=\"M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\"></path><path d=\"M7 20h10\"></path><path d=\"M9 16v4\"></path><path d=\"M15 16v4\"></path></svg>",
          "link": "https://github.com/Kaisheng328/go-agriculture-monitoring-backend",
          "tags": ["Go", "Python", "React", "AI"]
        },
        {
          "title": "Malaysian Travel Website",
          "description": "A travel website showcasing tourist destinations in Malaysia. Built with HTML, CSS, and JavaScript, it helps users discover places, plan trips, and read travel blogs and reviews.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-movie\"><circle cx=\"7\" cy=\"7\" r=\"3\"></circle><circle cx=\"17\" cy=\"7\" r=\"3\"></circle><circle cx=\"7\" cy=\"17\" r=\"3\"></circle><circle cx=\"17\" cy=\"17\" r=\"3\"></circle><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect><path d=\"M7 10v4\"></path><path d=\"M17 10v4\"></path></svg>",
          "link": "https://github.com/Kaisheng328/travel-website",
          "tags": ["HTML", "CSS", "JavaScript"]
        },
        {
          "title": "Smart Home Monitoring System",
          "description": "A Raspberry Pi-based smart home monitoring system that connects to a Telegram bot for remote control and monitoring. It tracks room temperature and light intensity, allowing users to interact with sensors via the bot.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-device-desktop\"><path d=\"M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\"></path><path d=\"M7 20h10\"></path><path d=\"M9 16v4\"></path><path d=\"M15 16v4\"></path></svg>",
          "link": "https://github.com/Kaisheng328/raspberrypi-control-system",
          "tags": ["Raspberry Pi", "Python", "Telegram Bot"]
        },
        {
          "title": "AI-Powered OCR and Data Extraction",
          "description": "An intern project that significantly reduces manual data entry for security guards. It uses OCR (Google, AWS, Space OCR) to extract text from ID cards and passports, then leverages OpenAI's GPT to parse and structure the information into JSON format.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-scan\"><path d=\"M4 7v-1a2 2 0 0 1 2 -2h2\"></path><path d=\"M4 17v1a2 2 0 0 0 2 2h2\"></path><path d=\"M16 4h2a2 2 0 0 1 2 2v1\"></path><path d=\"M16 20h2a2 2 0 0 0 2 -2v-1\"></path><path d=\"M8 12h8\"></path><path d=\"M8 8h8\"></path><path d=\"M8 16h8\"></path></svg>",
          "link": "https://github.com/Kaisheng328/ocr-chatgpt",
          "tags": ["OCR", "AI", "OpenAI", "Go"]
        },
        {
          "title": "CCTV Live Stream Application",
          "description": "An intern project to build a desktop application for viewing live CCTV feeds from the office. Built with Wails (Go & Vue), it connects to Dahua and Hikvision cameras, supports H.264/H.265 streaming via go2rtc and FFmpeg, and includes a snapshot feature.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-device-desktop\"><path d=\"M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\"></path><path d=\"M7 20h10\"></path><path d=\"M9 16v4\"></path><path d=\"M15 16v4\"></path></svg>",
          "link": "https://github.com/Kaisheng328/cctv-live-stream-app",
          "tags": ["Go", "Vue", "Wails", "CCTV"]
        },
        {
          "title": "Image Handling Service",
          "description": "A cloud-native image handling service that allows users to resize and watermark images. It integrates with Firebase Storage for image persistence and is deployed as a Google Cloud Function.",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-scan\"><path d=\"M4 7v-1a2 2 0 0 1 2 -2h2\"></path><path d=\"M4 17v1a2 2 0 0 0 2 2h2\"></path><path d=\"M16 4h2a2 2 0 0 1 2 2v1\"></path><path d=\"M16 20h2a2 2 0 0 0 2 -2v-1\"></path><path d=\"M8 12h8\"></path><path d=\"M8 8h8\"></path><path d=\"M8 16h8\"></path></svg>",
          "link": "https://github.com/Kaisheng328/image-handling-service",
          "tags": ["Go", "Firebase", "Google Cloud"]
        }
      ];

      portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'inline-block rounded-2xl hover:bg-neutral-content hover:scale-105 transition-all duration-300';
        portfolioItem.innerHTML = `
          <div class="card bg-base-100 shadow-md w-full h-full" style="opacity: 1; transform: none;">
            <div class="card-body">
              <div>
                ${item.icon}
              </div>
              <p class="card-title font-bold text-1xl">${item.title}</p>
              <p>${item.description}</p>
              <div class="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                <div class="flex space-x-2">
                  ${item.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">${tag}</span>`).join('')}
                </div>
                <a href="${item.link}" target="_blank" class="btn btn-circle btn-sm bg-gray-100 hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
                    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
      });
    }
  });

})();