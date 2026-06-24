/* ============================================
   DAUR.IN — Admin Heatmap Page
   ============================================ */

import { store } from '../../store.js';
import { svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

let mapInstance = null;

export function renderAdminHeatmap() {
  const reports = store.getReports();

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Peta Intensitas', showBack: true, backRoute: '/admin/dashboard' })}
    
    <div style="padding:16px;display:flex;flex-direction:column;gap:16px;">
      <!-- Filter -->
      <div class="card" style="padding:12px 16px;">
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-size:13px;font-weight:600;">Filter:</span>
          <div class="chip-group">
            <button class="chip active" data-period="week">7 Hari</button>
            <button class="chip" data-period="month">30 Hari</button>
            <button class="chip" data-period="all">Semua</button>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="map-container" id="heatmap" style="height:380px;"></div>

      <!-- Stats Summary -->
      <div class="card">
        <h4 style="font-size:14px;margin-bottom:12px;">📊 Ringkasan Area</h4>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${generateAreaStats(reports)}
        </div>
      </div>

      <div style="height:80px;"></div>
    </div>

    ${renderBottomNav('admin-heatmap')}
  `;

  // Init map
  initHeatmap(reports);

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      showToast('Filter Diterapkan', `Menampilkan data ${chip.textContent}`, 'info');
    });
  });
}

function initHeatmap(reports) {
  const mapEl = document.getElementById('heatmap');
  if (!mapEl || typeof L === 'undefined') return;

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  mapInstance = L.map('heatmap', {
    zoomControl: false,
    attributionControl: false,
  }).setView([-7.7796, 110.4151], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance);

  L.control.zoom({ position: 'topright' }).addTo(mapInstance);

  // Simulate heatmap with circles of varying intensity
  const heatPoints = [
    { lat: -7.7796, lng: 110.4151, intensity: 0.9, label: 'RT 05' },
    { lat: -7.7752, lng: 110.4102, intensity: 0.75, label: 'RT 03' },
    { lat: -7.7683, lng: 110.3887, intensity: 0.6, label: 'RT 07' },
    { lat: -7.7831, lng: 110.4185, intensity: 0.5, label: 'RT 10' },
    { lat: -7.7724, lng: 110.4055, intensity: 0.4, label: 'RT 02' },
    { lat: -7.7760, lng: 110.4200, intensity: 0.35, label: 'RT 08' },
    { lat: -7.7810, lng: 110.4100, intensity: 0.65, label: 'RT 12' },
  ];

  heatPoints.forEach(point => {
    const color = getHeatColor(point.intensity);
    
    L.circle([point.lat, point.lng], {
      radius: 200,
      color: 'transparent',
      fillColor: color,
      fillOpacity: 0.45,
    }).addTo(mapInstance);

    // Label
    L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        className: 'heat-label',
        html: `<div style="
          background:${color};color:#fff;
          padding:4px 10px;border-radius:12px;
          font-size:11px;font-weight:700;
          font-family:'Plus Jakarta Sans',sans-serif;
          white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.2);
          border:2px solid #fff;
        ">${point.label} (${Math.round(point.intensity * 100)}%)</div>`,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      }),
    }).addTo(mapInstance);
  });

  // Add report markers
  reports.forEach(report => {
    if (report.lat && report.lng) {
      L.circleMarker([report.lat, report.lng], {
        radius: 5,
        color: '#fff',
        fillColor: '#EF5350',
        fillOpacity: 0.8,
        weight: 2,
      }).addTo(mapInstance);
    }
  });

  setTimeout(() => mapInstance?.invalidateSize(), 100);
}

function getHeatColor(intensity) {
  if (intensity > 0.8) return '#D32F2F';
  if (intensity > 0.6) return '#FF5722';
  if (intensity > 0.4) return '#FF9800';
  if (intensity > 0.2) return '#FFC107';
  return '#FFEB3B';
}

function generateAreaStats(reports) {
  const areas = [
    { name: 'RT 05/RW 12', count: 45, trend: '+12%' },
    { name: 'RT 03/RW 08', count: 38, trend: '+8%' },
    { name: 'RT 07/RW 15', count: 32, trend: '+5%' },
    { name: 'RT 10/RW 20', count: 28, trend: '-2%' },
    { name: 'RT 02/RW 06', count: 24, trend: '+15%' },
  ];

  return areas.map((area, i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:8px 0;${i < areas.length - 1 ? 'border-bottom:1px solid var(--color-border-light);' : ''}">
      <span style="font-size:14px;font-weight:700;color:var(--color-primary);width:24px;">#${i + 1}</span>
      <div style="flex:1;">
        <span style="font-size:13px;font-weight:600;">${area.name}</span>
      </div>
      <span style="font-size:13px;font-weight:600;">${area.count}</span>
      <span style="font-size:11px;color:${area.trend.startsWith('+') ? '#4CAF50' : '#EF5350'};font-weight:600;">${area.trend}</span>
    </div>
  `).join('');
}
