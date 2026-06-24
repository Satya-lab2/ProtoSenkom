/* ============================================
   DAUR.IN — Report Detail Page
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { formatDateTime, getStatusBadgeClass, getStatusLabel, getTypeIcon, svgIcon, showToast } from '../../utils.js';
import { renderHeader } from '../../components/header.js';

export function renderReportDetail(params) {
  const reportId = params.id;
  const report = store.getReports().find(r => r.id === reportId);
  
  if (!report) {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
      ${renderHeader({ title: 'Detail Laporan', showBack: true, backRoute: '/petugas/dashboard' })}
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <h3>Laporan Tidak Ditemukan</h3>
        <p>Laporan dengan ID ${reportId} tidak ada</p>
      </div>
    `;
    return;
  }

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Detail Laporan', showBack: true, backRoute: '/petugas/dashboard' })}
    
    <div class="report-detail fade-in-up">
      <!-- Status Banner -->
      <div class="card" style="background:${getStatusBg(report.status)};border:none;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:32px;">${getTypeIcon(report.type)}</span>
          <div style="flex:1;">
            <h3 style="font-size:18px;color:${getStatusTextColor(report.status)};">${report.typeLabel}</h3>
            <span class="badge ${getStatusBadgeClass(report.status)}" style="margin-top:4px;">
              ${getStatusLabel(report.status)}
            </span>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="card" style="padding:0;overflow:hidden;">
        <div id="detail-map" class="report-detail-map"></div>
      </div>

      <!-- Info -->
      <div class="card report-detail-info">
        <div class="report-detail-row">
          <span class="report-detail-label">📍 Lokasi</span>
          <span class="report-detail-value" style="text-align:right;max-width:200px;font-size:13px;">${report.location}</span>
        </div>
        <div class="divider"></div>
        <div class="report-detail-row">
          <span class="report-detail-label">👤 Pelapor</span>
          <span class="report-detail-value">${report.userName}</span>
        </div>
        <div class="divider"></div>
        <div class="report-detail-row">
          <span class="report-detail-label">🕐 Dilaporkan</span>
          <span class="report-detail-value" style="font-size:13px;">${formatDateTime(report.createdAt)}</span>
        </div>
        ${report.updatedAt ? `
          <div class="divider"></div>
          <div class="report-detail-row">
            <span class="report-detail-label">✅ Diperbarui</span>
            <span class="report-detail-value" style="font-size:13px;">${formatDateTime(report.updatedAt)}</span>
          </div>
        ` : ''}
        ${report.petugasName ? `
          <div class="divider"></div>
          <div class="report-detail-row">
            <span class="report-detail-label">🧑‍🔧 Petugas</span>
            <span class="report-detail-value">${report.petugasName}</span>
          </div>
        ` : ''}
      </div>

      <!-- Actions -->
      ${report.status !== 'selesai' ? `
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${report.status === 'menunggu' ? `
            <button class="btn btn-primary btn-lg btn-full" id="btn-pickup">
              🚛 Konfirmasi Pengambilan
            </button>
          ` : `
            <button class="btn btn-primary btn-lg btn-full" id="btn-complete">
              ✅ Tandai Selesai
            </button>
          `}
        </div>
      ` : ''}
    </div>
  `;

  // Init map
  if (typeof L !== 'undefined' && report.lat && report.lng) {
    setTimeout(() => {
      const map = L.map('detail-map', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
      }).setView([report.lat, report.lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      L.marker([report.lat, report.lng]).addTo(map);
    }, 100);
  }

  // Action buttons
  document.getElementById('btn-pickup')?.addEventListener('click', () => {
    store.updateReportStatus(reportId, 'diambil', 'PTG001');
    showToast('Pengambilan Dikonfirmasi', 'Sampah sedang dalam proses pengambilan', 'success');
    renderReportDetail(params);
  });

  document.getElementById('btn-complete')?.addEventListener('click', () => {
    store.updateReportStatus(reportId, 'selesai', 'PTG001');
    showToast('Laporan Selesai ✅', 'Pengambilan sampah telah selesai', 'success');
    renderReportDetail(params);
  });
}

function getStatusBg(status) {
  return { menunggu: '#FFF3E0', diambil: '#E3F2FD', selesai: '#E8F5E9' }[status] || '#F5F5F5';
}

function getStatusTextColor(status) {
  return { menunggu: '#E65100', diambil: '#1565C0', selesai: '#2E7D32' }[status] || '#333';
}
