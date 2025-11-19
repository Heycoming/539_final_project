// Update footer year dynamically
document.querySelector("#year").innerHTML = new Date().getFullYear();


// Hero Image Slider 
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.image-slider .slide');
  const textContents = document.querySelectorAll('.slider-content');
  const prevBtn = document.querySelector('.image-slider .prev');
  const nextBtn = document.querySelector('.image-slider .next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    textContents.forEach(content => content.classList.remove('active'));
    slides[index].classList.add('active');
    textContents[index].classList.add('active');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
});


// Mobile Menu Module
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const closeMenu = document.querySelector('.close-menu');
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

  // Burger Menu Toggle
  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    burger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        burger.click();
      }
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener('click', function () {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });

    closeMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        closeMenu.click();
      }
    });
  }

  // Dropdown Toggle
  if (mobileDropdownToggle) {
    mobileDropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      mobileDropdown.classList.toggle('active');
    });

    mobileDropdownToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        mobileDropdown.classList.toggle('active');
      }
    });

    mobileDropdownToggle.addEventListener('blur', function (e) {
      setTimeout(() => {
        if (!mobileDropdown.contains(document.activeElement)) {
          mobileDropdown.classList.remove('active');
        }
      }, 0);
    });
  }

  // Submenu Toggle
  const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  mobileSubmenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const submenu = this.closest('.mobile-submenu');
      submenu.classList.toggle('active');
    });

    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        const submenu = this.closest('.mobile-submenu');
        submenu.classList.toggle('active');
      }
    });

    toggle.addEventListener('blur', function (e) {
      const submenu = this.closest('.mobile-submenu');
      setTimeout(() => {
        if (submenu && !submenu.contains(document.activeElement)) {
          submenu.classList.remove('active');
        }
      }, 0);
    });
  });

  // Close menu on link click
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-dropdown-toggle):not(.mobile-submenu-toggle)');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Submenu Link Blur Handling
  const mobileSubmenuLinks = document.querySelectorAll('.mobile-submenu .submenu-content a');
  mobileSubmenuLinks.forEach(link => {
    link.addEventListener('blur', function (e) {
      const submenu = this.closest('.mobile-submenu');
      setTimeout(() => {
        if (submenu && !submenu.contains(document.activeElement)) {
          submenu.classList.remove('active');
        }
      }, 0);
    });
  });

  // Dropdown Blur Handling
  if (mobileDropdown) {
    const dropdownItems = mobileDropdown.querySelectorAll('a, .mobile-submenu-toggle');
    dropdownItems.forEach(item => {
      item.addEventListener('blur', function (e) {
        setTimeout(() => {
          if (!mobileDropdown.contains(document.activeElement)) {
            mobileDropdown.classList.remove('active');
            document.querySelectorAll('.mobile-submenu.active').forEach(sub => {
              sub.classList.remove('active');
            });
          }
        }, 0);
      });
    });
  }
});


// Desktop Dropdown Keyboard Navigation Module
document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.querySelector('.nav-dropdown .dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-dropdown .dropdown-menu');
  const navDropdown = document.querySelector('.nav-dropdown');
  const submenuToggles = document.querySelectorAll('.dropdown-submenu .submenu-toggle');

  // Dropdown toggle Keyboard Support
  if (dropdownToggle) {
    dropdownToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        navDropdown.classList.toggle('keyboard-active');

        if (navDropdown.classList.contains('keyboard-active')) {
          const firstItem = dropdownMenu.querySelector('a, .submenu-toggle');
          if (firstItem) {
            setTimeout(() => firstItem.focus(), 100);
          }
        } else {
          document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
            sub.classList.remove('keyboard-active');
          });
        }
      }
    });

    dropdownToggle.addEventListener('blur', function (e) {
      setTimeout(() => {
        if (!navDropdown.contains(document.activeElement)) {
          navDropdown.classList.remove('keyboard-active');
          document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
            sub.classList.remove('keyboard-active');
          });
        }
      }, 0);
    });
  }

  // Submenu Keyboard Navigation
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('keydown', function (e) {
      const submenu = this.closest('.dropdown-submenu');
      const submenuContent = submenu.querySelector('.submenu-content');

      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
          if (sub !== submenu) {
            sub.classList.remove('keyboard-active');
          }
        });
        submenu.classList.toggle('keyboard-active');
        if (submenu.classList.contains('keyboard-active') && submenuContent) {
          const firstLink = submenuContent.querySelector('a');
          if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
          }
        }
      }

      if (e.key === 'ArrowRight' || e.keyCode === 39) {
        e.preventDefault();
        document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
          if (sub !== submenu) {
            sub.classList.remove('keyboard-active');
          }
        });
        submenu.classList.add('keyboard-active');
        if (submenuContent) {
          const firstLink = submenuContent.querySelector('a');
          if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
          }
        }
      }

      if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        e.preventDefault();
        submenu.classList.remove('keyboard-active');
        this.focus();
      }
    });

    toggle.addEventListener('blur', function (e) {
      const submenu = this.closest('.dropdown-submenu');
      setTimeout(() => {
        if (!submenu.contains(document.activeElement)) {
          submenu.classList.remove('keyboard-active');
        }
      }, 0);
    });
  });

  // Dropdown Arrow Key Navigation
  const dropdownItems = dropdownMenu ? dropdownMenu.querySelectorAll('a, .submenu-toggle') : [];
  dropdownItems.forEach((item, index) => {
    item.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.keyCode === 40) {
        e.preventDefault();
        const currentSubmenu = this.closest('.dropdown-submenu');
        if (currentSubmenu && this.classList.contains('submenu-toggle')) {
          currentSubmenu.classList.remove('keyboard-active');
        }
        const nextIndex = (index + 1) % dropdownItems.length;
        dropdownItems[nextIndex].focus();
      }

      if (e.key === 'ArrowUp' || e.keyCode === 38) {
        e.preventDefault();
        const currentSubmenu = this.closest('.dropdown-submenu');
        if (currentSubmenu && this.classList.contains('submenu-toggle')) {
          currentSubmenu.classList.remove('keyboard-active');
        }
        const prevIndex = (index - 1 + dropdownItems.length) % dropdownItems.length;
        dropdownItems[prevIndex].focus();
      }

      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        navDropdown.classList.remove('keyboard-active');
        document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
          sub.classList.remove('keyboard-active');
        });
        dropdownToggle.focus();
      }
    });

    item.addEventListener('blur', function (e) {
      setTimeout(() => {
        if (!navDropdown.contains(document.activeElement)) {
          navDropdown.classList.remove('keyboard-active');
          document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
            sub.classList.remove('keyboard-active');
          });
        }
      }, 0);
    });
  });

  // Submenu Link Blur Handling
  const submenuLinks = document.querySelectorAll('.submenu-content a');
  submenuLinks.forEach(link => {
    link.addEventListener('blur', function (e) {
      const submenu = this.closest('.dropdown-submenu');
      setTimeout(() => {
        if (submenu && !submenu.contains(document.activeElement)) {
          submenu.classList.remove('keyboard-active');
        }
        if (!navDropdown.contains(document.activeElement)) {
          navDropdown.classList.remove('keyboard-active');
          document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
            sub.classList.remove('keyboard-active');
          });
        }
      }, 0);
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navDropdown && !navDropdown.contains(e.target)) {
      navDropdown.classList.remove('keyboard-active');
      document.querySelectorAll('.dropdown-submenu.keyboard-active').forEach(sub => {
        sub.classList.remove('keyboard-active');
      });
    }
  });
});