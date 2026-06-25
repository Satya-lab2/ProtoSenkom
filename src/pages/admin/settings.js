/* ============================================
   DAUR.IN — Admin Settings Page
   ============================================ */

import { store } from '../../store.js';
import { svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderAdminSettings() {
  const schedules = store.get('schedules');

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Pengaturan', showBack: true, backRoute: '/admin/dashboard' })}
    
    <div style="padding-bottom:80px;" class="fade-in-up">
      <!-- Schedule Management -->
      <div class="settings-section">
        <div class="settings-section-title">📅 Jadwal Pengambilan</div>
        ${schedules.map((schedule, i) => `
          <div class="settings-item">
            <div class="settings-item-info">
              <h4>${schedule.day}</h4>
              <p>${schedule.time} · ${schedule.types.join(', ')} · ${schedule.zones.join(', ')}</p>
            </div>
            <button class="btn btn-ghost btn-icon-sm" style="color:var(--color-text-secondary);">
              ${svgIcon('chevronRight', 16)}
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Notification Settings -->
      <div class="settings-section">
        <div class="settings-section-title">🔔 Notifikasi</div>
        <div class="settings-item">
          <div class="settings-item-info">
            <h4>Notifikasi Otomatis</h4>
            <p>Kirim pengingat ke warga sesuai jadwal</p>
          </div>
          <label class="toggle">
            <input type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-item">
          <div class="settings-item-info">
            <h4>Waktu Pengiriman Default</h4>
            <p>06:00 WIB — 30 menit sebelum jadwal</p>
          </div>
          <button class="btn btn-ghost btn-icon-sm" style="color:var(--color-text-secondary);">
            ${svgIcon('chevronRight', 16)}
          </button>
        </div>
        <div class="settings-item">
          <div class="settings-item-info">
            <h4>Batas Frekuensi</h4>
            <p>Maksimal 1 notifikasi per hari</p>
          </div>
          <label class="toggle">
            <input type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <!-- Zone Management -->
      <div class="settings-section">
        <div class="settings-section-title">📍 Zona & Wilayah</div>
        <div class="settings-item">
          <div class="settings-item-info">
            <h4>Kelurahan</h4>
            <p>Caturtunggal, Kec. Depok, Sleman</p>
          </div>
          <button class="btn btn-ghost btn-icon-sm" style="color:var(--color-text-secondary);">
            ${svgIcon('chevronRight', 16)}
          </button>
        </div>
        <div class="settings-item">
          <div class="settings-item-info">
            <h4>Cakupan RT</h4>
            <p>RT 01 - RT 20, RW 01 - RW 25</p>
          </div>
          <button class="btn btn-ghost btn-icon-sm" style="color:var(--color-text-secondary);">
            ${svgIcon('chevronRight', 16)}
          </button>
        </div>
      </div>

      <!-- Data Management -->
      <div class="settings-section">
        <div class="settings-section-title">💾 Data & Ekspor</div>
        <div class="settings-item" id="btn-export-csv" style="cursor:pointer;">
          <div class="settings-item-info">
            <h4>Ekspor Laporan (CSV)</h4>
            <p>Unduh seluruh data laporan</p>
          </div>
          <span style="color:var(--color-primary);">${svgIcon('download', 18)}</span>
        </div>
        <div class="settings-item" id="btn-reset-data" style="cursor:pointer;">
          <div class="settings-item-info">
            <h4 style="color:var(--color-error);">Reset Semua Data</h4>
            <p>Hapus semua data dan mulai dari awal</p>
          </div>
          <span style="color:var(--color-error);">${svgIcon('trash', 18)}</span>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="settings-section" style="padding: 0 16px;">
        <button class="btn-logout" id="menu-logout-admin">
          <div class="btn-logout-icon">
            ${svgIcon('logOut', 20)}
          </div>
          <span>Keluar dari Akun Admin</span>
        </button>
      </div>

      <!-- App Info -->
      <div style="text-align:center;padding:24px 16px;">
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          DAUR.IN Admin Panel v1.0.0<br>
          © 2026 Kelompok ProtoSenkom — UAJY<br>
          Lingkungan Bersih, Hidup Bahagia 🌱
        </p>
      </div>
    </div>

    ${renderBottomNav('admin-settings')}

    <!-- Logout Confirmation Modal -->
    <div class="logout-modal-overlay" id="logout-modal-admin" style="display:none;">
      <div class="logout-modal">
        <div class="logout-modal-icon">
          ${svgIcon('logOut', 32)}
        </div>
        <h3>Keluar dari Akun?</h3>
        <p>Anda akan keluar dari sesi Admin dan perlu login kembali untuk mengakses panel kontrol.</p>
        <div class="logout-modal-actions">
          <button class="btn btn-ghost" id="logout-cancel-admin">Batal</button>
          <button class="btn btn-danger" id="logout-confirm-admin">
            ${svgIcon('logOut', 16)}
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  `;

  // Export CSV
  document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    const reports = store.getReports();
    const csv = [
      'ID,Pelapor,Jenis,Lokasi,Status,Tanggal',
      ...reports.map(r => `${r.id},${r.userName},${r.typeLabel},"${r.location}",${r.status},${r.createdAt}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daurin_laporan_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('File Diunduh ✅', 'Data berhasil diekspor', 'success');
  });

  // Reset
  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    if (confirm('⚠️ Yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan.')) {
      store.reset();
      showToast('Data Direset', 'Semua data telah dihapus', 'info');
      window.location.hash = '/onboarding';
    }
  });

  // Logout — show confirmation modal
  const logoutModal = document.getElementById('logout-modal-admin');

  document.getElementById('menu-logout-admin')?.addEventListener('click', () => {
    logoutModal.style.display = 'flex';
    requestAnimationFrame(() => logoutModal.classList.add('active'));
  });

  document.getElementById('logout-cancel-admin')?.addEventListener('click', () => {
    closeLogoutModal();
  });

  // Close on overlay click
  logoutModal.addEventListener('click', (e) => {
    if (e.target === logoutModal) closeLogoutModal();
  });

  document.getElementById('logout-confirm-admin')?.addEventListener('click', () => {
    // Animate out
    const modal = logoutModal.querySelector('.logout-modal');
    modal.style.animation = 'logout-modal-out 0.3s var(--ease-out) forwards';
    logoutModal.style.animation = 'fade-in 0.2s var(--ease-out) reverse forwards';

    setTimeout(() => {
      store.logout();
      router.navigate('/login');
      showToast('Berhasil Keluar', 'Anda telah keluar dari akun Admin', 'info');
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
