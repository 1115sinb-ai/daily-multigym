document.documentElement.classList.add('has-js');

// Remove only the unwanted referral label; preserve other parameters and anchors.
const cleanUrl = new URL(window.location.href);
if (cleanUrl.searchParams.get('utm_source') === 'chatgpt.com') {
  cleanUrl.searchParams.delete('utm_source');
  window.history.replaceState(window.history.state, '', cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
}

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

// Keep the one-line brand heading inside the viewport, including while web fonts load.
function fitHeroTitle() {
  const title = document.querySelector('.hero-venture-title');
  if (!title) return;
  title.style.fontSize = '';
  if (title.clientWidth && title.scrollWidth > title.clientWidth) {
    const size = parseFloat(getComputedStyle(title).fontSize);
    title.style.fontSize = `${size * title.clientWidth / title.scrollWidth * .98}px`;
  }
}
fitHeroTitle();
window.addEventListener('resize', fitHeroTitle);
document.fonts?.ready.then(fitHeroTitle);

function setMenuOpen(isOpen) {
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  if (mobileNav) mobileNav.hidden = !isOpen;
}

menuToggle?.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('click', event => {
  if (mobileNav && !mobileNav.hidden && !header.contains(event.target)) setMenuOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) setMenuOpen(false);
});

// Content should remain visible in browsers without IntersectionObserver.
const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
  revealItems.forEach(el => revealObserver.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('in-view'));
}

const desktopLinks = [...document.querySelectorAll('.desktop-nav a')];
const navigationSections = [...document.querySelectorAll('#alliance, #programs, #locations, #events, #franchise, #careers')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const id = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0].target.id;
    desktopLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, .2, .4] });
  navigationSections.forEach(section => sectionObserver.observe(section));
}

const archive = [
  { src: 'assets/brand-identity.jpg', title: '01 · BRAND IDENTITY / 브랜드 아이덴티티' },
  { src: 'assets/store-case.jpg', title: '02 · REAL STORE CASE / 실제 매장 사례' },
  { src: 'assets/investment-model.jpg', title: '03 · INVESTMENT MODEL / 가맹 투자 모델' },
  { src: 'assets/why-punch.jpg', title: '04 · WHY PUNCH DAILY? / 브랜드 차별성' },
  { src: 'assets/expansion.jpg', title: '05 · EXPANSION PLAN / 확장 계획' },
  { src: 'assets/process.jpg', title: '06 · FRANCHISE & EXIT / 가맹 절차와 회수 전략' },
  { src: 'assets/vision.jpg', title: '07 · OUR VISION / 브랜드 비전' },
  { src: 'assets/impact.jpg', title: '08 · SOCIAL IMPACT / 청년 창업과 사회적 가치' },
  { src: 'assets/brand-overview.jpg', title: '펀치데일리 브랜드 메인 비주얼' },
  { src: 'assets/launch-support.jpg', title: '5천만원 창업 지원 프로모션 자료' },
  { src: 'assets/franchise-exit.jpg', title: '창업·엑시트 플랜 소개' },
  { src: 'assets/ingye-three-month-report.png', title: '인계본점 오픈 3개월 실적 집계 자료' },
  { src: 'assets/hospital-launch-01.webp', title: '2026.11 · 수병원 합작법인 출범 / 건강한 일상' },
  { src: 'assets/hospital-launch-02.webp', title: '2026.11 · 수병원 합작법인 출범 / 새로운 시작' },
  { src: 'assets/programs-2026.webp', title: 'PUNCH × FITNESS × STRENGTH / 프로그램 안내' },
];

const galleryDialog = document.getElementById('gallery-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogTitle = document.getElementById('dialog-title');
const dialogCounter = document.getElementById('dialog-counter');
const dialogCaption = document.getElementById('dialog-caption');
let galleryIndex = 0;
let lastFocusedElement = null;

function showArchiveImage(index) {
  galleryIndex = (index + archive.length) % archive.length;
  const item = archive[galleryIndex];
  dialogImage.src = item.src;
  dialogImage.alt = item.title;
  dialogTitle.textContent = item.title;
  dialogCaption.textContent = item.title;
  dialogCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(archive.length).padStart(2, '0')}`;
}

document.querySelectorAll('[data-gallery-open]').forEach(button => {
  button.addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    showArchiveImage(Number(button.dataset.galleryOpen));
    galleryDialog.showModal();
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => galleryDialog.close());
document.querySelector('.gallery-prev')?.addEventListener('click', () => showArchiveImage(galleryIndex - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showArchiveImage(galleryIndex + 1));

galleryDialog?.addEventListener('click', event => {
  if (event.target === galleryDialog) galleryDialog.close();
});
galleryDialog?.addEventListener('close', () => lastFocusedElement?.focus());

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) setMenuOpen(false);
  if (!galleryDialog?.open) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); showArchiveImage(galleryIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showArchiveImage(galleryIndex + 1); }
});

let touchStartX = null;
dialogImage?.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0]?.screenX ?? null; }, { passive: true });
dialogImage?.addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const distance = (event.changedTouches[0]?.screenX ?? touchStartX) - touchStartX;
  if (Math.abs(distance) > 45) showArchiveImage(galleryIndex + (distance < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

// Horizontal brand archive: advance to the right, with arrows and native touch swiping.
const galleryCarousel = document.querySelector('.gallery-carousel');
const galleryTrack = document.getElementById('gallery-track');
const galleryCards = [...(galleryTrack?.querySelectorAll('.gallery-card') ?? [])];
const galleryActiveNumber = document.getElementById('gallery-active-number');
const galleryProgressThumb = document.querySelector('.gallery-carousel-progress-thumb');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (galleryCarousel && galleryTrack && galleryCards.length > 1) {
  let isCarouselVisible = !('IntersectionObserver' in window);
  let isCarouselHovered = false;
  let isCarouselFocused = false;
  let pauseUntil = 0;

  function updateGalleryCarousel() {
    const maxScroll = Math.max(0, galleryTrack.scrollWidth - galleryTrack.clientWidth);
    const cardStep = galleryCards[1].offsetLeft - galleryCards[0].offsetLeft;
    const activeIndex = cardStep > 0 ? Math.round(galleryTrack.scrollLeft / cardStep) : 0;
    if (galleryActiveNumber) galleryActiveNumber.textContent = String(Math.min(activeIndex + 1, galleryCards.length)).padStart(2, '0');
    if (galleryProgressThumb) {
      const thumbWidth = Math.min(100, galleryTrack.clientWidth / galleryTrack.scrollWidth * 100);
      galleryProgressThumb.style.width = `${thumbWidth}%`;
      galleryProgressThumb.style.left = `${maxScroll ? galleryTrack.scrollLeft / maxScroll * (100 - thumbWidth) : 0}%`;
    }
  }

  function moveGallery(direction, manual = false) {
    const step = galleryCards[1].offsetLeft - galleryCards[0].offsetLeft;
    const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    if (manual) pauseUntil = Date.now() + 6500;
    if (step <= 0 || maxScroll <= 0) return;

    if ((direction > 0 && galleryTrack.scrollLeft >= maxScroll - 3) || (direction < 0 && galleryTrack.scrollLeft <= 3)) {
      galleryTrack.style.scrollBehavior = 'auto';
      galleryTrack.scrollLeft = direction > 0 ? 0 : maxScroll;
      requestAnimationFrame(() => { galleryTrack.style.scrollBehavior = ''; updateGalleryCarousel(); });
    } else {
      galleryTrack.scrollBy({ left: step * direction, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    }
  }

  galleryCarousel.querySelector('.gallery-scroll-prev')?.addEventListener('click', () => moveGallery(-1, true));
  galleryCarousel.querySelector('.gallery-scroll-next')?.addEventListener('click', () => moveGallery(1, true));
  galleryTrack.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveGallery(event.key === 'ArrowRight' ? 1 : -1, true);
    }
  });
  galleryTrack.addEventListener('scroll', updateGalleryCarousel, { passive: true });
  galleryTrack.addEventListener('touchstart', () => { pauseUntil = Date.now() + 6500; }, { passive: true });
  galleryCarousel.addEventListener('focusin', () => { isCarouselFocused = true; });
  galleryCarousel.addEventListener('focusout', event => {
    if (!galleryCarousel.contains(event.relatedTarget)) isCarouselFocused = false;
  });
  if (window.matchMedia('(hover: hover)').matches) {
    galleryCarousel.addEventListener('mouseenter', () => { isCarouselHovered = true; });
    galleryCarousel.addEventListener('mouseleave', () => { isCarouselHovered = false; });
  }

  if ('IntersectionObserver' in window) {
    const carouselObserver = new IntersectionObserver(([entry]) => {
      isCarouselVisible = entry.isIntersecting;
    }, { threshold: 0.2 });
    carouselObserver.observe(galleryCarousel);
  }

  window.addEventListener('resize', updateGalleryCarousel);
  updateGalleryCarousel();
  setInterval(() => {
    if (isCarouselVisible && !isCarouselHovered && !isCarouselFocused && !document.hidden && !galleryDialog?.open && !prefersReducedMotion.matches && Date.now() >= pauseUntil) {
      moveGallery(1);
    }
  }, 4700);
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
