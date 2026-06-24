/* ============================================
   DAUR.IN — Petugas Dashboard
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { formatRelative, getStatusBadgeClass, getStatusLabel, getTypeIcon, svgIcon, showToast, animateCounter } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderPetugasDashboard() {
  const stats = store.getStats();
  const todayReports = store.getTodayReports();
  const pendingReports = store.getReportsByStatus('menunggu');
  const allReports = store.getReports();

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Dashboard Petugas', showBell: true, showRoleSwitcher: true })}
    
    <div class="petugas-dashboard">
      <!-- Summary Stats -->
      <div class="petugas-stats stagger-children">
        <div class="stat-card" style="border-left:4px solid var(--color-warning);">
          <div class="stat-card-icon" style="background:var(--color-warning-bg);color:var(--color-warning);">📥</div>
          <div class="stat-card-value" data-counter="${pendingReports.length}">${pendingReports.length}</div>
          <div class="stat-card-label">Menunggu</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--color-info);">
          <div class="stat-card-icon" style="background:var(--color-info-bg);color:var(--color-info);">🚛</div>
          <div class="stat-card-value" data-counter="${stats.todayProgress}">${stats.todayProgress}</div>
          <div class="stat-card-label">Diproses</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--color-success);">
          <div class="stat-card-icon" style="background:var(--color-status-done-bg);color:var(--color-success);">✅</div>
          <div class="stat-card-value" data-counter="${stats.todayDone}">${stats.todayDone}</div>
          <div class="stat-card-label">Selesai</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #9C27B0;">
          <div class="stat-card-icon" style="background:#F3E5F5;color:#9C27B0;">${svgIcon('clock', 18)}</div>
          <div class="stat-card-value">45<span style="font-size:12px;font-weight:400;">m</span></div>
          <div class="stat-card-label">Rata-rata</div>
        </div>
      </div>

      <!-- Pending Reports Header -->
      <div style="padding:0 16px;">
        <div class="home-section-header" style="margin-bottom:0;">
          <h3 style="display:flex;align-items:center;gap:8px;">
            Laporan Masuk
            ${pendingReports.length > 0 ? `<span class="badge-count">${pendingReports.length}</span>` : ''}
          </h3>
          <button class="btn btn-ghost btn-sm" onclick="window.location.hash='/petugas/map'">
            ${svgIcon('map', 16)} Peta
          </button>
        </div>
      </div>

      <!-- Report List -->
      <div class="petugas-report-list stagger-children">
        ${allReports.length > 0 ? allReports.map(report => `
          <div class="petugas-report-card" data-report-id="${report.id}">
            <div style="font-size:28px;flex-shrink:0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:${getTypeBg(report.type)};border-radius:12px;">
              ${getTypeIcon(report.type)}
            </div>
            <div class="petugas-report-info">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-weight:600;font-size:14px;">${report.userName}</span>
                <span class="badge ${getStatusBadgeClass(report.status)}">${getStatusLabel(report.status)}</span>
              </div>
              <div style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">
                ${report.typeLabel} · ${report.location.split(',')[0]}
              </div>
              <div style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">
                ${formatRelative(report.createdAt)}
              </div>
            </div>
            <div class="petugas-report-actions">
              ${report.status === 'menunggu' ? `
                <button class="btn btn-primary btn-sm btn-pickup" data-id="${report.id}" title="Ambil Sampah">
                  ${svgIcon('check', 16)} Ambil
                </button>
              ` : report.status === 'diambil' ? `
                <button class="btn btn-secondary btn-sm btn-complete" data-id="${report.id}" title="Selesai">
                  ✅ Selesai
                </button>
              ` : `
                <span style="color:var(--color-success);font-size:12px;font-weight:600;">✅</span>
              `}
            </div>
          </div>
        `).join('') : `
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <h3>Belum Ada Laporan</h3>
            <p>Laporan masuk dari warga akan muncul di sini secara real-time</p>
          </div>
        `}
      </div>

      <div style="height:80px;"></div>
    </div>

    ${renderBottomNav('petugas-dashboard')}
  `;

  // Animate counters
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    animateCounter(el, target, 600);
  });

  // Pickup buttons
  document.querySelectorAll('.btn-pickup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const reportId = btn.dataset.id;
      store.updateReportStatus(reportId, 'diambil', 'PTG001');
      showToast('Sampah Diambil', 'Status laporan diperbarui', 'success');
      renderPetugasDashboard(); // Re-render
    });
  });

  // Complete buttons
  document.querySelectorAll('.btn-complete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const reportId = btn.dataset.id;
      store.updateReportStatus(reportId, 'selesai', 'PTG001');
      showToast('Laporan Selesai ✅', 'Pengambilan telah dikonfirmasi', 'success');
      renderPetugasDashboard(); // Re-render
    });
  });
}

function getTypeBg(type) {
  return { organik: '#E8F5E9', anorganik: '#E3F2FD', campuran: '#FFF3E0' }[type] || '#F5F5F5';
}
