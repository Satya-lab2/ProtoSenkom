/* ============================================
   DAUR.IN — Warga Profile Page
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderWargaProfile() {
  const user = store.get('user');

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Profil Saya', showBack: true, backRoute: '/warga/home' })}
    
    <div class="profile-page fade-in-up">
      <!-- Profile Header -->
      <div class="card profile-header">
        <div class="avatar avatar-xl" style="font-size:28px;">${user.avatar}</div>
        <h3 style="font-size:20px;">${user.name}</h3>
        <p style="font-size:13px;color:var(--color-text-secondary);">${user.address}</p>
        
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value">${user.totalReports}</div>
            <div class="profile-stat-label">Laporan</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${user.streak}🔥</div>
            <div class="profile-stat-label">Streak</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${user.points}</div>
            <div class="profile-stat-label">Poin</div>
          </div>
        </div>
      </div>

      <!-- Streak Card -->
      <div class="card card-gradient" style="padding:20px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <span style="font-size:40px;">🔥</span>
          <div>
            <h4 style="color:#fff;font-size:18px;">${user.streak} Hari Berturut-turut!</h4>
            <p style="color:rgba(255,255,255,0.8);font-size:13px;">Terus laporkan untuk menjaga streak Anda</p>
          </div>
        </div>
        <div class="progress-bar" style="margin-top:16px;background:rgba(255,255,255,0.2);">
          <div class="progress-bar-fill" style="width:${(user.streak / 30) * 100}%;background:#fff;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;">
          <span style="font-size:11px;color:rgba(255,255,255,0.6);">${user.streak}/30 hari</span>
          <span style="font-size:11px;color:rgba(255,255,255,0.6);">🎯 Target: 30 hari</span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div class="profile-menu">
          <div class="profile-menu-item" id="menu-notif">
            <div class="profile-menu-icon" style="background:#FFF3E0;color:#FF9800;">
              ${svgIcon('bell', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Notifikasi</h4>
              <p>Atur pengingat harian</p>
            </div>
            <label class="toggle">
              <input type="checkbox" id="toggle-notif" ${user.notificationEnabled ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="profile-menu-item" onclick="window.location.hash='/warga/schedule'">
            <div class="profile-menu-icon" style="background:#E3F2FD;color:#42A5F5;">
              ${svgIcon('calendar', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Jadwal Pengambilan</h4>
              <p>Lihat jadwal mingguan</p>
            </div>
            ${svgIcon('chevronRight', 16)}
          </div>

          <div class="profile-menu-item" onclick="window.location.hash='/warga/history'">
            <div class="profile-menu-icon" style="background:#E8F5E9;color:#4CAF50;">
              ${svgIcon('clipboard', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Riwayat Laporan</h4>
              <p>${user.totalReports} laporan total</p>
            </div>
            ${svgIcon('chevronRight', 16)}
          </div>

          <div class="profile-menu-item" id="menu-reset">
            <div class="profile-menu-icon" style="background:#FFEBEE;color:#EF5350;">
              ${svgIcon('trash', 18)}
            </div>
            <div class="profile-menu-text">
              <h4>Reset Data</h4>
              <p>Hapus semua data lokal</p>
            </div>
            ${svgIcon('chevronRight', 16)}
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <button class="btn-logout" id="menu-logout">
        <div class="btn-logout-icon">
          ${svgIcon('logOut', 20)}
        </div>
        <span>Keluar dari Akun</span>
      </button>

      <!-- App Info -->
      <div style="text-align:center;padding:16px 0;">
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          DAUR.IN v1.0.0 · Prototype<br>
          Lingkungan Bersih, Hidup Bahagia 🌱
        </p>
      </div>

      <div style="height:16px;"></div>
    </div>

    ${renderBottomNav('profile')}

    <!-- Logout Confirmation Modal -->
    <div class="logout-modal-overlay" id="logout-modal" style="display:none;">
      <div class="logout-modal">
        <div class="logout-modal-icon">
          ${svgIcon('logOut', 32)}
        </div>
        <h3>Keluar dari Akun?</h3>
        <p>Anda akan keluar dari akun dan perlu login kembali untuk mengakses aplikasi.</p>
        <div class="logout-modal-actions">
          <button class="btn btn-ghost" id="logout-cancel">Batal</button>
          <button class="btn btn-danger" id="logout-confirm">
            ${svgIcon('logOut', 16)}
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  `;

  // Toggle notification
  document.getElementById('toggle-notif')?.addEventListener('change', (e) => {
    const user = store.get('user');
    user.notificationEnabled = e.target.checked;
    store.set('user', user);
    showToast(
      e.target.checked ? 'Notifikasi Aktif' : 'Notifikasi Nonaktif',
      e.target.checked ? 'Anda akan menerima pengingat harian' : 'Pengingat harian dimatikan',
      'info'
    );
  });

  // Reset data
  document.getElementById('menu-reset')?.addEventListener('click', () => {
    if (confirm('Yakin ingin menghapus semua data? Aplikasi akan kembali ke awal.')) {
      store.reset();
      router.navigate('/onboarding');
      showToast('Data Direset', 'Semua data telah dihapus', 'info');
    }
  });

  // Logout — show confirmation modal
  const logoutModal = document.getElementById('logout-modal');

  document.getElementById('menu-logout')?.addEventListener('click', () => {
    logoutModal.style.display = 'flex';
    requestAnimationFrame(() => logoutModal.classList.add('active'));
  });

  document.getElementById('logout-cancel')?.addEventListener('click', () => {
    closeLogoutModal();
  });

  // Close on overlay click
  logoutModal.addEventListener('click', (e) => {
    if (e.target === logoutModal) closeLogoutModal();
  });

  document.getElementById('logout-confirm')?.addEventListener('click', () => {
    // Animate out
    const modal = logoutModal.querySelector('.logout-modal');
    modal.style.animation = 'logout-modal-out 0.3s var(--ease-out) forwards';
    logoutModal.style.animation = 'fade-in 0.2s var(--ease-out) reverse forwards';

    setTimeout(() => {
      store.logout();
      router.navigate('/login');
      showToast('Berhasil Keluar', 'Anda telah keluar dari akun', 'info');
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
