/* ============================================
   DAUR.IN — Petugas Map Page
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { getStatusLabel, getTypeIcon, formatRelative, svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

let mapInstance = null;

export function renderPetugasMap() {
  const reports = store.getReports();

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Peta Penjemputan', showBack: true, backRoute: '/petugas/dashboard' })}
    
    <div style="padding:16px;display:flex;flex-direction:column;gap:16px;">
      <!-- Legend -->
      <div class="card" style="padding:12px 16px;">
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#FFA726;display:inline-block;"></span>
            Menunggu
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#42A5F5;display:inline-block;"></span>
            Diproses
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#66BB6A;display:inline-block;"></span>
            Selesai
          </div>
        </div>
      </div>

      <!-- Map Container -->
      <div class="map-container" id="petugas-map" style="height:350px;"></div>

      <!-- Nearby Reports -->
      <div>
        <h3 style="font-size:16px;margin-bottom:12px;">📍 Titik Penjemputan</h3>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${reports.map((report, i) => `
            <div class="card card-interactive" style="padding:12px;display:flex;align-items:center;gap:12px;" data-report-idx="${i}">
              <span style="font-size:20px;">${getTypeIcon(report.type)}</span>
              <div style="flex:1;">
                <div style="font-weight:600;font-size:13px;">${report.userName} — ${report.typeLabel}</div>
                <div style="font-size:11px;color:var(--color-text-secondary);">${report.location.split(',')[0]}</div>
              </div>
              <span class="badge badge-${report.status === 'menunggu' ? 'pending' : report.status === 'diambil' ? 'progress' : 'done'}" style="font-size:10px;">
                ${getStatusLabel(report.status)}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="height:80px;"></div>
    </div>

    ${renderBottomNav('petugas-map')}
  `;

  // Initialize Leaflet map
  initMap(reports);
}

function initMap(reports) {
  const mapEl = document.getElementById('petugas-map');
  if (!mapEl || typeof L === 'undefined') return;

  // Destroy previous instance
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  mapInstance = L.map('petugas-map', {
    zoomControl: false,
    attributionControl: false,
  }).setView([-7.7796, 110.4151], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance);

  // Add zoom control to top-right
  L.control.zoom({ position: 'topright' }).addTo(mapInstance);

  // Add markers
  const statusColors = {
    menunggu: '#FFA726',
    diambil: '#42A5F5',
    selesai: '#66BB6A',
  };

  reports.forEach(report => {
    if (report.lat && report.lng) {
      const color = statusColors[report.status] || '#FFA726';
      
      const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width:32px;height:32px;border-radius:50%;
          background:${color};border:3px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.2);
          display:flex;align-items:center;justify-content:center;
          font-size:14px;
        ">${getTypeIcon(report.type)}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([report.lat, report.lng], { icon: markerIcon })
        .addTo(mapInstance)
        .bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:160px;">
            <strong>${report.userName}</strong><br>
            <span style="font-size:12px;color:#666;">${report.typeLabel} · ${getStatusLabel(report.status)}</span><br>
            <span style="font-size:11px;color:#999;">${report.location.split(',')[0]}</span>
          </div>
        `);
    }
  });

  // Fit bounds
  if (reports.length > 0) {
    const validReports = reports.filter(r => r.lat && r.lng);
    if (validReports.length > 0) {
      const bounds = L.latLngBounds(validReports.map(r => [r.lat, r.lng]));
      mapInstance.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  // Force map resize after render
  setTimeout(() => {
    mapInstance.invalidateSize();
  }, 100);
}
