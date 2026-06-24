/* ============================================
   DAUR.IN — Warga History Page
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { formatRelative, formatDateTime, getStatusBadgeClass, getStatusLabel, getTypeIcon, svgIcon } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderWargaHistory() {
  const reports = store.getUserReports();

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Riwayat Laporan', showBack: true, backRoute: '/warga/home' })}
    
    <!-- Filter tabs -->
    <div style="padding:12px 16px 0;">
      <div class="tab-bar" id="history-tabs">
        <button class="tab-item active" data-filter="semua">Semua</button>
        <button class="tab-item" data-filter="menunggu">Menunggu</button>
        <button class="tab-item" data-filter="diambil">Diproses</button>
        <button class="tab-item" data-filter="selesai">Selesai</button>
      </div>
    </div>

    <div class="history-list stagger-children" id="history-list">
      ${renderReportList(reports)}
    </div>

    ${renderBottomNav('history')}
  `;

  // Filter tabs
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filter = tab.dataset.filter;
      let filtered = reports;
      if (filter !== 'semua') {
        filtered = reports.filter(r => r.status === filter);
      }
      
      document.getElementById('history-list').innerHTML = renderReportList(filtered);
    });
  });
}

function renderReportList(reports) {
  if (reports.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>Belum Ada Laporan</h3>
        <p>Laporan Anda akan muncul di sini setelah Anda melaporkan sampah.</p>
      </div>
    `;
  }

  return reports.map(report => {
    const typeColors = {
      organik: '#E8F5E9',
      anorganik: '#E3F2FD',
      campuran: '#FFF3E0',
    };

    return `
      <div class="history-item">
        <div class="history-item-icon" style="background:${typeColors[report.type] || '#F5F5F5'}">
          ${getTypeIcon(report.type)}
        </div>
        <div class="history-item-content">
          <div class="history-item-title">${report.typeLabel}</div>
          <div class="history-item-meta">
            ${formatRelative(report.createdAt)} · ${report.location.split(',')[0]}
          </div>
          ${report.petugasName ? `
            <div class="history-item-meta" style="color:var(--color-primary);">
              Diambil oleh ${report.petugasName}
            </div>
          ` : ''}
        </div>
        <span class="badge ${getStatusBadgeClass(report.status)}">${getStatusLabel(report.status)}</span>
      </div>
    `;
  }).join('');
}
