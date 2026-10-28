document.documentElement.classList.add('has-js');

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

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
const navigationSections = [...document.querySelectorAll('#identity, #programs, #results, #franchise, #impact, #gallery')];
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

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
