/* ============================================
   DAUR.IN — Admin Dashboard
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { svgIcon, animateCounter, drawLineChart, drawDonutChart } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderAdminDashboard() {
  const stats = store.getStats();
  const analytics = store.get('analytics');

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Admin Panel', showBell: true, showRoleSwitcher: true })}
    
    <div class="admin-dashboard stagger-children">
      <!-- Welcome Card -->
      <div class="card card-gradient" style="padding:20px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="avatar avatar-lg" style="background:rgba(255,255,255,0.2);font-size:24px;">🏛️</div>
          <div>
            <h3 style="color:#fff;font-size:18px;">Panel Admin</h3>
            <p style="color:rgba(255,255,255,0.8);font-size:13px;">Kelurahan Caturtunggal, Depok</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="admin-stats-row">
        <div class="stat-card" style="border-left:4px solid var(--color-primary);">
          <div class="stat-card-icon" style="background:#E8F5E9;color:#4CAF50;">📊</div>
          <div class="stat-card-value" data-counter="${stats.totalAll}">${stats.totalAll}</div>
          <div class="stat-card-label">Total Laporan</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--color-info);">
          <div class="stat-card-icon" style="background:#E3F2FD;color:#42A5F5;">📈</div>
          <div class="stat-card-value" data-counter="${stats.todayTotal}">${stats.todayTotal}</div>
          <div class="stat-card-label">Hari Ini</div>
        </div>
        <div class="stat-card" style="border-left:4px solid var(--color-success);">
          <div class="stat-card-icon" style="background:#E8F5E9;color:#66BB6A;">✅</div>
          <div class="stat-card-value" data-counter="${stats.completionRate}">${stats.completionRate}<span style="font-size:12px;">%</span></div>
          <div class="stat-card-label">Tingkat Selesai</div>
        </div>
        <div class="stat-card" style="border-left:4px solid #FF9800;">
          <div class="stat-card-icon" style="background:#FFF3E0;color:#FF9800;">${svgIcon('clock', 18)}</div>
          <div class="stat-card-value">${analytics.avgResponseTime}<span style="font-size:12px;">m</span></div>
          <div class="stat-card-label">Respon Rata-rata</div>
        </div>
      </div>

      <!-- Line Chart: Trend -->
      <div class="admin-chart-card">
        <div class="admin-chart-header">
          <h4>📈 Tren Laporan (14 Hari)</h4>
          <span class="badge badge-primary" style="font-size:10px;">+23%</span>
        </div>
        <canvas id="chart-trend" class="chart-canvas"></canvas>
      </div>

      <!-- Donut Chart: Completion Rate -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="admin-chart-card" style="display:flex;flex-direction:column;align-items:center;">
          <h4 style="font-size:13px;margin-bottom:8px;">Tingkat Selesai</h4>
          <canvas id="chart-donut" style="width:120px;height:120px;"></canvas>
        </div>
        <div class="admin-chart-card" style="display:flex;flex-direction:column;align-items:center;">
          <h4 style="font-size:13px;margin-bottom:8px;">Respon Waktu</h4>
          <canvas id="chart-response" style="width:120px;height:120px;"></canvas>
        </div>
      </div>

      <!-- Top Zones Table -->
      <div class="admin-chart-card">
        <div class="admin-chart-header">
          <h4>🏆 Zona Paling Aktif</h4>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${analytics.topZones.map((zone, i) => `
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="width:24px;height:24px;border-radius:50%;background:${i < 3 ? '#4CAF50' : '#E2E8F0'};color:${i < 3 ? '#fff' : '#64748B'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">
                ${i + 1}
              </span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="font-size:13px;font-weight:600;">${zone.zone}</span>
                  <span style="font-size:12px;color:var(--color-text-secondary);">${zone.reports} laporan</span>
                </div>
                <div class="progress-bar" style="height:6px;">
                  <div class="progress-bar-fill" style="width:${zone.pct}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h4 style="font-size:14px;margin-bottom:12px;">⚡ Aksi Cepat</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="window.location.hash='/admin/users'" style="justify-content:flex-start;gap:8px;">
            ${svgIcon('users', 16)} Kelola Pengguna
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.hash='/admin/heatmap'" style="justify-content:flex-start;gap:8px;">
            ${svgIcon('map', 16)} Heat Map
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.hash='/admin/settings'" style="justify-content:flex-start;gap:8px;">
            ${svgIcon('settings', 16)} Pengaturan
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-export" style="justify-content:flex-start;gap:8px;">
            ${svgIcon('download', 16)} Ekspor CSV
          </button>
        </div>
      </div>

      <div style="height:80px;"></div>
    </div>

    ${renderBottomNav('admin-dashboard')}
  `;

  // Animate counters
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    animateCounter(el, target, 800);
  });

  // Draw charts after DOM is ready
  requestAnimationFrame(() => {
    const trendCanvas = document.getElementById('chart-trend');
    if (trendCanvas) drawLineChart(trendCanvas, analytics.dailyReports);

    const donutCanvas = document.getElementById('chart-donut');
    if (donutCanvas) drawDonutChart(donutCanvas, stats.completionRate, { label: 'Selesai', fontSize: 20 });

    const responseCanvas = document.getElementById('chart-response');
    if (responseCanvas) drawDonutChart(responseCanvas, Math.min(100, Math.round((60 - analytics.avgResponseTime) / 60 * 100) + 50), { 
      label: `${analytics.avgResponseTime}m`, 
      color: '#42A5F5', 
      fontSize: 20 
    });
  });

  // Export CSV
  document.getElementById('btn-export')?.addEventListener('click', () => {
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
    
    import('../../utils.js').then(({ showToast }) => {
      showToast('File Diunduh ✅', 'Data laporan berhasil diekspor ke CSV', 'success');
    });
  });
}
