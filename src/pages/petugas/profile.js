/* ============================================
   DAUR.IN — Petugas Profile Page (Pak Budi)
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderPetugasProfile() {
  // Get Pak Budi from store
  const petugasList = store.get('petugas');
  const petugas = petugasList.find(p => p.id === 'PTG001') || {
    id: 'PTG001',
    name: 'Pak Budi',
    phone: '0813-1111-2222',
    zone: 'RT 01-10',
    avatar: 'PB',
    status: 'active'
  };

  const reports = store.getReports();
  const completedCount = reports.filter(r => r.status === 'selesai' && r.petugasId === 'PTG001').length || 15;
  const progressCount = reports.filter(r => r.status === 'diambil' && r.petugasId === 'PTG001').length || 3;

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Profil Petugas', showBack: true, backRoute: '/petugas/dashboard' })}
    
    <div class="profile-page fade-in-up">
      <!-- Profile Header -->
      <div class="card profile-header">
        <div class="avatar avatar-xl" style="font-size:28px; background: linear-gradient(135deg, #42A5F5, #1E88E5);">${petugas.avatar}</div>
        <h3 style="font-size:20px;">${petugas.name}</h3>
        <p style="font-size:13px;color:var(--color-text-secondary);">${petugas.phone} · ID: ${petugas.id}</p>
        
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:#42A5F5;">${petugas.zone}</div>
            <div class="profile-stat-label">Wilayah Kerja</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:var(--color-status-progress);">${progressCount}</div>
            <div class="profile-stat-label">Dalam Proses</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:var(--color-status-done);">${completedCount}</div>
            <div class="profile-stat-label">Selesai</div>
          </div>
        </div>
      </div>

      <!-- Zone Information Card -->
      <div class="card card-gradient" style="padding:20px; background: linear-gradient(135deg, #1E88E5 0%, #1565C0 100%);">
        <div style="display:flex;align-items:center;gap:16px;">
          <span style="font-size:40px;">🚛</span>
          <div>
            <h4 style="color:#fff;font-size:18px;">Status: Aktif Bertugas</h4>
            <p style="color:rgba(255,255,255,0.8);font-size:13px;">Jadwal hari ini: Pengambilan Sampah Organik & Anorganik</p>
          </div>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div class="profile-menu">
          <div class="profile-menu-item" id="menu-notif-petugas">
            <div class="profile-menu-icon" style="background:#FFF3E0;color:#FF9800;">
              ${svgIcon('bell', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Notifikasi Tugas</h4>
              <p>Pengingat laporan baru di wilayah Anda</p>
            </div>
            <label class="toggle">
              <input type="checkbox" id="toggle-notif-petugas" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="profile-menu-item" onclick="window.location.hash='/petugas/map'">
            <div class="profile-menu-icon" style="background:#E3F2FD;color:#42A5F5;">
              ${svgIcon('map', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Peta Wilayah Kerja</h4>
              <p>Lihat lokasi penjemputan aktif</p>
            </div>
            ${svgIcon('chevronRight', 16)}
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <button class="btn-logout" id="menu-logout-petugas">
        <div class="btn-logout-icon">
          ${svgIcon('logOut', 20)}
        </div>
        <span>Keluar dari Akun</span>
      </button>

      <!-- App Info -->
      <div style="text-align:center;padding:16px 0;">
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          DAUR.IN Petugas Panel v1.0.0 · Prototype<br>
          Lingkungan Bersih, Hidup Bahagia 🌱
        </p>
      </div>

      <div style="height:16px;"></div>
    </div>

    ${renderBottomNav('profile')}

    <!-- Logout Confirmation Modal -->
    <div class="logout-modal-overlay" id="logout-modal-petugas" style="display:none;">
      <div class="logout-modal">
        <div class="logout-modal-icon">
          ${svgIcon('logOut', 32)}
        </div>
        <h3>Keluar dari Akun?</h3>
        <p>Anda akan keluar dari sesi Petugas dan perlu login kembali untuk mengakses aplikasi.</p>
        <div class="logout-modal-actions">
          <button class="btn btn-ghost" id="logout-cancel-petugas">Batal</button>
          <button class="btn btn-danger" id="logout-confirm-petugas">
            ${svgIcon('logOut', 16)}
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  `;

  // Toggle notification
  document.getElementById('toggle-notif-petugas')?.addEventListener('change', (e) => {
    showToast(
      e.target.checked ? 'Notifikasi Tugas Aktif' : 'Notifikasi Tugas Nonaktif',
      e.target.checked ? 'Anda akan menerima notifikasi laporan baru' : 'Notifikasi laporan baru dimatikan',
      'info'
    );
  });

  // Logout — show confirmation modal
  const logoutModal = document.getElementById('logout-modal-petugas');

  document.getElementById('menu-logout-petugas')?.addEventListener('click', () => {
    logoutModal.style.display = 'flex';
    requestAnimationFrame(() => logoutModal.classList.add('active'));
  });

  document.getElementById('logout-cancel-petugas')?.addEventListener('click', () => {
    closeLogoutModal();
  });

  // Close on overlay click
  logoutModal.addEventListener('click', (e) => {
    if (e.target === logoutModal) closeLogoutModal();
  });

  document.getElementById('logout-confirm-petugas')?.addEventListener('click', () => {
    // Animate out
    const modal = logoutModal.querySelector('.logout-modal');
    modal.style.animation = 'logout-modal-out 0.3s var(--ease-out) forwards';
    logoutModal.style.animation = 'fade-in 0.2s var(--ease-out) reverse forwards';

    setTimeout(() => {
      store.logout();
      router.navigate('/login');
      showToast('Berhasil Keluar', 'Anda telah keluar dari akun Petugas', 'info');
    }, 250);
  });

  function closeLogoutModal() {
    const modal = logoutModal.querySelector('.logout-modal');
    modal.style.animation = 'logout-modal-out 0.3s var(--ease-out) forwards';
    logoutModal.style.animation = 'fade-in 0.2s var(--ease-out) reverse forwards';
    setTimeout(() => {
      logoutModal.style.display = 'none';
      logoutModal.classList.remove('active');
      modal.style.animation = '';
      logoutModal.style.animation = '';
    }, 300);
  }
}
