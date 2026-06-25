/* ============================================
   DAUR.IN — Onboarding Page (3 Screens)
   ============================================ */

import { store } from '../store.js';
import { router } from '../router.js';

const slides = [
  {
    title: 'Sampah Siap? Ketuk Sekali!',
    description: 'Laporkan sampah Anda hanya dengan satu sentuhan. Tanpa ribet, tanpa banyak langkah.',
    illustration: getIllustration1(),
  },
  {
    title: 'Jadwal Otomatis, Tanpa Ribet',
    description: 'Dapatkan pengingat tepat waktu sebelum truk sampah tiba. Tidak perlu mengingat jadwal lagi.',
    illustration: getIllustration2(),
  },
  {
    title: 'Lingkungan Bersih, Hidup Bahagia',
    description: 'Setiap laporan Anda membantu menjaga kebersihan lingkungan dan kesehatan keluarga.',
    illustration: getIllustration3(),
  },
];

let currentSlide = 0;

function getIllustration1() {
  return `
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="100" fill="#E8F5E9"/>
      <circle cx="110" cy="110" r="75" fill="#C8E6C9"/>
      <!-- Phone -->
      <rect x="75" y="50" width="70" height="120" rx="12" fill="#fff" stroke="#2E7D32" stroke-width="3"/>
      <rect x="82" y="62" width="56" height="90" rx="4" fill="#F5F7FA"/>
      <!-- Button -->
      <rect x="88" y="100" width="44" height="20" rx="10" fill="#4CAF50"/>
      <text x="110" y="114" text-anchor="middle" fill="white" font-size="8" font-weight="bold" font-family="sans-serif">LAPORKAN</text>
      <!-- Finger tap -->
      <circle cx="110" cy="110" r="12" fill="#4CAF50" opacity="0.2">
        <animate attributeName="r" values="12;20;12" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="110" cy="110" r="8" fill="#4CAF50" opacity="0.3"/>
      <!-- Checkmark -->
      <circle cx="155" cy="65" r="16" fill="#4CAF50"/>
      <path d="M148 65l5 5 9-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Stars -->
      <circle cx="60" cy="75" r="3" fill="#FFD700" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="165" cy="130" r="2.5" fill="#FFD700" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="55" cy="145" r="2" fill="#4CAF50" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

function getIllustration2() {
  return `
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="100" fill="#E8F5E9"/>
      <circle cx="110" cy="110" r="75" fill="#C8E6C9"/>
      <!-- Bell -->
      <path d="M110 55c-18 0-32 14-32 32 0 20-8 28-8 28h80s-8-8-8-28c0-18-14-32-32-32z" fill="#FFC107" stroke="#F57F17" stroke-width="2"/>
      <circle cx="110" cy="50" r="4" fill="#F57F17"/>
      <path d="M100 117a10 10 0 0 0 20 0" stroke="#F57F17" stroke-width="2" fill="none"/>
      <!-- Sound waves -->
      <path d="M145 80c4 4 6 10 6 16s-2 12-6 16" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <path d="M155 72c6 6 10 16 10 24s-4 18-10 24" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
      </path>
      <path d="M75 80c-4 4-6 10-6 16s2 12 6 16" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <!-- Clock -->
      <circle cx="110" cy="160" r="20" fill="white" stroke="#2E7D32" stroke-width="2"/>
      <line x1="110" y1="160" x2="110" y2="148" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
      <line x1="110" y1="160" x2="120" y2="163" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
      <circle cx="110" cy="160" r="2" fill="#2E7D32"/>
    </svg>
  `;
}

function getIllustration3() {
  return `
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="110" r="100" fill="#E8F5E9"/>
      <circle cx="110" cy="110" r="75" fill="#C8E6C9"/>
      <!-- Houses -->
      <rect x="50" y="115" width="35" height="35" rx="3" fill="white" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="50,117 67,95 85,117" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
      <rect x="60" y="130" width="12" height="20" rx="2" fill="#81C784"/>
      
      <rect x="95" y="105" width="35" height="45" rx="3" fill="white" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="95,107 112,85 130,107" fill="#66BB6A" stroke="#2E7D32" stroke-width="2"/>
      <rect x="105" y="125" width="12" height="25" rx="2" fill="#81C784"/>
      
      <rect x="140" y="120" width="30" height="30" rx="3" fill="white" stroke="#2E7D32" stroke-width="2"/>
      <polygon points="140,122 155,102 170,122" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
      <rect x="148" y="133" width="10" height="17" rx="2" fill="#81C784"/>
      
      <!-- Trees -->
      <circle cx="42" cy="105" r="12" fill="#66BB6A"/>
      <rect x="40" y="115" width="4" height="15" rx="1" fill="#795548"/>
      <circle cx="180" cy="110" r="10" fill="#81C784"/>
      <rect x="178" y="118" width="4" height="12" rx="1" fill="#795548"/>
      
      <!-- Heart -->
      <g transform="translate(95, 55)">
        <path d="M15 28 C15 28 0 18 0 9 C0 4 3.5 0 8 0 C11 0 13.5 2 15 4 C16.5 2 19 0 22 0 C26.5 0 30 4 30 9 C30 18 15 28 15 28Z" fill="#EF5350">
          <animate attributeName="d" values="M15 28 C15 28 0 18 0 9 C0 4 3.5 0 8 0 C11 0 13.5 2 15 4 C16.5 2 19 0 22 0 C26.5 0 30 4 30 9 C30 18 15 28 15 28Z;M15 26 C15 26 2 17 2 10 C2 5 5 2 9 2 C12 2 13.5 3 15 5 C16.5 3 18 2 21 2 C25 2 28 5 28 10 C28 17 15 26 15 26Z;M15 28 C15 28 0 18 0 9 C0 4 3.5 0 8 0 C11 0 13.5 2 15 4 C16.5 2 19 0 22 0 C26.5 0 30 4 30 9 C30 18 15 28 15 28Z" dur="2s" repeatCount="indefinite"/>
        </path>
      </g>
      
      <!-- Sparkles -->
      <circle cx="70" cy="65" r="3" fill="#FFD700" opacity="0.7">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="155" cy="70" r="2.5" fill="#FFD700" opacity="0.5">
        <animate attributeName="r" values="2.5;4;2.5" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

export function renderOnboarding() {
  currentSlide = 0;
  
  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    <div class="onboarding">
      <div class="onboarding-slides">
        ${slides.map((slide, i) => `
          <div class="onboarding-slide ${i === 0 ? 'active' : ''}" data-slide="${i}">
            <div class="onboarding-illustration">
              ${slide.illustration}
            </div>
            <div class="onboarding-text">
              <h2>${slide.title}</h2>
              <p>${slide.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="onboarding-footer">
        <div class="onboarding-dots">
          ${slides.map((_, i) => `
            <div class="onboarding-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>
          `).join('')}
        </div>
        <div class="onboarding-actions">
          <button class="btn btn-ghost" id="onboarding-skip">Lewati</button>
          <button class="btn btn-primary" id="onboarding-next">Lanjut</button>
        </div>
      </div>
    </div>
  `;

  // Event handlers
  document.getElementById('onboarding-next').addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      finishOnboarding();
    }
  });

  document.getElementById('onboarding-skip').addEventListener('click', finishOnboarding);

  // Touch swipe support
  let touchStartX = 0;
  const slidesContainer = pageContent.querySelector('.onboarding-slides');
  
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  slidesContainer.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    }
  }, { passive: true });
}

function goToSlide(index) {
  const slideElements = document.querySelectorAll('.onboarding-slide');
  const dotElements = document.querySelectorAll('.onboarding-dot');
  const nextBtn = document.getElementById('onboarding-next');

  // Update slides
  slideElements.forEach((el, i) => {
    el.classList.remove('active', 'exit');
    if (i < index) el.classList.add('exit');
    if (i === index) el.classList.add('active');
  });

  // Update dots
  dotElements.forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // Update button text
  if (index === slides.length - 1) {
    nextBtn.textContent = 'Mulai Sekarang';
  } else {
    nextBtn.textContent = 'Lanjut';
  }

  currentSlide = index;
}

function finishOnboarding() {
  store.completeOnboarding();
  router.navigate('/login');
}
