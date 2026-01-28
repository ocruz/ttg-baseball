/**
 * TTG Baseball Academy - Gallery
 * Contact Sheet with Explosive Expand Lightbox
 */

(function() {
  'use strict';

  var grid = document.getElementById('galleryGrid');
  if (!grid) return;

  var cells = grid.querySelectorAll('.gallery-cell');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxFlash = document.getElementById('lightboxFlash');
  var lightboxBackdrop = document.getElementById('lightboxBackdrop');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var lightboxCurrent = document.getElementById('lightboxCurrent');
  var currentIndex = 0;
  var totalPhotos = cells.length;
  var isOpen = false;
  var isAnimating = false;

  // Staggered reveal for grid cells
  var cellObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var cell = entry.target;
        var row = Math.floor(Array.prototype.indexOf.call(cells, cell) % 6);
        cell.style.transitionDelay = (row * 0.04) + 's';
        cell.classList.add('gallery-cell--visible');
        cellObserver.unobserve(cell);
      }
    });
  }, { rootMargin: '50px', threshold: 0.1 });

  cells.forEach(function(cell) {
    cellObserver.observe(cell);
  });

  // Open lightbox
  function openLightbox(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;

    var cell = cells[index];
    var img = cell.querySelector('img');
    var rect = cell.getBoundingClientRect();

    // Set image source
    lightboxImage.src = img.src;
    updateCounter();

    // Position the image at the cell's location for the expand animation
    lightboxImage.style.transition = 'none';
    lightboxImage.style.position = 'fixed';
    lightboxImage.style.top = rect.top + 'px';
    lightboxImage.style.left = rect.left + 'px';
    lightboxImage.style.width = rect.width + 'px';
    lightboxImage.style.height = rect.height + 'px';
    lightboxImage.style.objectFit = 'cover';
    lightboxImage.style.opacity = '1';

    // Show lightbox container
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';

    // Red flash
    lightboxFlash.classList.add('lightbox__flash--active');

    // Animate expand after a frame
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        // Calculate centered position
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var imgAspect = img.naturalWidth / img.naturalHeight || 0.667;
        var maxW = vw * 0.85;
        var maxH = vh * 0.85;
        var finalW, finalH;

        if (maxW / maxH > imgAspect) {
          finalH = maxH;
          finalW = finalH * imgAspect;
        } else {
          finalW = maxW;
          finalH = finalW / imgAspect;
        }

        var finalTop = (vh - finalH) / 2;
        var finalLeft = (vw - finalW) / 2;

        lightboxImage.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        lightboxImage.style.top = finalTop + 'px';
        lightboxImage.style.left = finalLeft + 'px';
        lightboxImage.style.width = finalW + 'px';
        lightboxImage.style.height = finalH + 'px';
        lightboxImage.style.objectFit = 'contain';

        // Fade in backdrop
        lightboxBackdrop.classList.add('lightbox__backdrop--active');

        setTimeout(function() {
          // Remove flash
          lightboxFlash.classList.remove('lightbox__flash--active');

          // Switch to responsive positioning
          lightboxImage.style.transition = 'none';
          lightboxImage.style.position = '';
          lightboxImage.style.top = '';
          lightboxImage.style.left = '';
          lightboxImage.style.width = '';
          lightboxImage.style.height = '';
          lightboxImage.style.objectFit = '';
          lightboxImage.style.opacity = '';

          isOpen = true;
          isAnimating = false;
        }, 550);
      });
    });
  }

  // Close lightbox
  function closeLightbox() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;
    isOpen = false;

    lightboxBackdrop.classList.remove('lightbox__backdrop--active');
    lightbox.classList.add('lightbox--closing');

    setTimeout(function() {
      lightbox.classList.remove('lightbox--active');
      lightbox.classList.remove('lightbox--closing');
      document.body.style.overflow = '';
      isAnimating = false;
    }, 350);
  }

  // Navigate
  function navigate(direction) {
    if (isAnimating || !isOpen) return;

    currentIndex = currentIndex + direction;
    if (currentIndex < 0) currentIndex = totalPhotos - 1;
    if (currentIndex >= totalPhotos) currentIndex = 0;

    var img = cells[currentIndex].querySelector('img');

    // Slide transition
    lightboxImage.classList.add('lightbox__image--transitioning');
    lightboxImage.style.transform = direction > 0 ? 'translateX(-40px)' : 'translateX(40px)';
    lightboxImage.style.opacity = '0';

    setTimeout(function() {
      lightboxImage.src = img.src;
      lightboxImage.style.transform = direction > 0 ? 'translateX(40px)' : 'translateX(-40px)';

      requestAnimationFrame(function() {
        lightboxImage.style.transform = 'translateX(0)';
        lightboxImage.style.opacity = '1';
        updateCounter();

        setTimeout(function() {
          lightboxImage.classList.remove('lightbox__image--transitioning');
        }, 300);
      });
    }, 200);
  }

  function updateCounter() {
    lightboxCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
  }

  // Event listeners - grid cells
  cells.forEach(function(cell, i) {
    cell.addEventListener('click', function() {
      openLightbox(i);
    });
  });

  // Close
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  // Navigation
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    navigate(-1);
  });

  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    navigate(1);
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (!isOpen) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch/swipe support
  var touchStartX = 0;
  var touchEndX = 0;

  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

})();
