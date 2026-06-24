/* ============================================
   DAUR.IN — One-Tap Report Flow
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { getSimulatedLocation, getLocationAddress, showToast, svgIcon } from '../../utils.js';

let selectedType = null;
let location = null;

export function renderWargaReport() {
  selectedType = null;
  location = getSimulatedLocation();
  const address = store.get('user').address;

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    <div class="report-flow">
      <!-- Header -->
      <div class="app-header">
        <button class="btn btn-icon-sm btn-ghost" id="report-back">
          ${svgIcon('chevronLeft', 20)}
        </button>
        <span class="app-header-title">Laporkan Sampah</span>
        <div style="width:36px;"></div>
      </div>

      <div class="report-step fade-in-up" id="report-step-1">
        <!-- Location -->
        <div>
          <h3 style="margin-bottom:12px;font-size:16px;">📍 Lokasi Anda</h3>
          <div class="report-location-card">
            <div class="report-location-icon">
              ${svgIcon('mapPin', 20)}
            </div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:14px;color:var(--color-text);">${address}</div>
              <div style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">
                Terdeteksi otomatis via GPS
              </div>
            </div>
          </div>
        </div>

        <!-- Waste Type Selection -->
        <div>
          <h3 style="margin-bottom:12px;font-size:16px;">🗑️ Jenis Sampah</h3>
          <div class="report-type-grid">
            <div class="report-type-item" data-type="organik">
              <div class="report-type-icon">🥬</div>
              <span class="report-type-label">Organik</span>
            </div>
            <div class="report-type-item" data-type="anorganik">
              <div class="report-type-icon">♻️</div>
              <span class="report-type-label">Anorganik</span>
            </div>
            <div class="report-type-item" data-type="campuran">
              <div class="report-type-icon">🗑️</div>
              <span class="report-type-label">Campuran</span>
            </div>
          </div>
        </div>

        <!-- Notes (optional) -->
        <div class="input-group">
          <label class="input-label">📝 Catatan (opsional)</label>
          <input type="text" class="input-field" id="report-notes" placeholder="Contoh: 2 kantong besar" maxlength="100" />
        </div>

        <!-- Submit -->
        <div style="margin-top:auto;padding-bottom:16px;">
          <button class="btn btn-primary btn-lg btn-full" id="btn-submit" disabled>
            ✅ Konfirmasi & Kirim Laporan
          </button>
          <p style="text-align:center;font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">
            Satu laporan = satu penjemputan terjadwal
          </p>
        </div>
      </div>

      <!-- Success Screen -->
      <div class="report-success" id="report-step-2" style="display:none;">
        <div class="success-check-circle" style="position:relative;">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle class="circle-bg" cx="60" cy="60" r="54"/>
            <circle class="circle-progress" cx="60" cy="60" r="54" transform="rotate(-90 60 60)"/>
            <path class="checkmark" d="M38 62 L52 76 L82 46"/>
          </svg>
          <div class="success-confetti" id="confetti-container"></div>
        </div>
        <h2>Laporan Terkirim! 🎉</h2>
        <p>Petugas kebersihan akan segera menjemput sampah Anda. Terima kasih telah menjaga lingkungan!</p>
        <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:280px;margin-top:16px;">
          <button class="btn btn-primary btn-lg btn-full" id="btn-back-home">
            🏠 Kembali ke Beranda
          </button>
          <button class="btn btn-secondary btn-full" id="btn-report-again">
            📋 Laporkan Lagi
          </button>
        </div>
      </div>
    </div>
  `;

  // Event: Back button
  document.getElementById('report-back').addEventListener('click', () => {
    router.navigate('/warga/home');
  });

  // Event: Type selection
  document.querySelectorAll('.report-type-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.report-type-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedType = item.dataset.type;
      document.getElementById('btn-submit').disabled = false;
    });
  });

  // Event: Submit
  document.getElementById('btn-submit').addEventListener('click', () => {
    if (!selectedType) return;

    const typeLabels = { organik: 'Organik', anorganik: 'Anorganik', campuran: 'Campuran' };
    const notes = document.getElementById('report-notes').value;

    // Create report
    store.addReport({
      type: selectedType,
      typeLabel: typeLabels[selectedType],
      location: address,
      lat: location.lat,
      lng: location.lng,
      notes: notes || null,
    });

    // Show success
    document.getElementById('report-step-1').style.display = 'none';
    document.getElementById('report-step-2').style.display = 'flex';

    // Spawn confetti
    spawnConfetti();

    // Toast
    setTimeout(() => {
      showToast('Laporan Terkirim ✓', 'Petugas akan segera menjemput sampah Anda', 'success');
    }, 800);
  });

  // Event: Back home
  document.getElementById('btn-back-home').addEventListener('click', () => {
    router.navigate('/warga/home');
  });

  // Event: Report again
  document.getElementById('btn-report-again').addEventListener('click', () => {
    renderWargaReport();
  });
}

function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const colors = ['#4CAF50', '#FFC107', '#2196F3', '#FF5722', '#9C27B0', '#00BCD4'];
  
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 40}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${1 + Math.random() * 1}s`;
    piece.style.opacity = '1';
    piece.style.width = `${4 + Math.random() * 6}px`;
    piece.style.height = `${4 + Math.random() * 6}px`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
}
