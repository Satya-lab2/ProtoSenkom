/* ============================================
   DAUR.IN — Bottom Navigation Component
   ============================================ */

import { store } from '../store.js';
import { svgIcon } from '../utils.js';

const navConfigs = {
  warga: [
    { id: 'home', label: 'Beranda', icon: 'home', route: '/warga/home' },
    { id: 'history', label: 'Riwayat', icon: 'clipboard', route: '/warga/history' },
    { id: 'schedule', label: 'Jadwal', icon: 'calendar', route: '/warga/schedule' },
    { id: 'profile', label: 'Profil', icon: 'user', route: '/warga/profile' },
  ],
  petugas: [
    { id: 'petugas-dashboard', label: 'Dashboard', icon: 'home', route: '/petugas/dashboard' },
    { id: 'petugas-map', label: 'Peta', icon: 'map', route: '/petugas/map' },
    { id: 'profile', label: 'Profil', icon: 'user', route: '/warga/profile' },
  ],
  admin: [
    { id: 'admin-dashboard', label: 'Dashboard', icon: 'barChart', route: '/admin/dashboard' },
    { id: 'admin-heatmap', label: 'Heat Map', icon: 'map', route: '/admin/heatmap' },
    { id: 'admin-users', label: 'Pengguna', icon: 'users', route: '/admin/users' },
    { id: 'admin-settings', label: 'Pengaturan', icon: 'settings', route: '/admin/settings' },
  ],
};

export function renderBottomNav(activeId = 'home') {
  const role = store.getRole();
  const items = navConfigs[role] || navConfigs.warga;

  return `
    <nav class="bottom-nav">
      ${items.map(item => `
        <button class="bottom-nav-item ${item.id === activeId ? 'active' : ''}" 
                onclick="window.location.hash='${item.route}'" 
                id="nav-${item.id}">
          ${svgIcon(item.icon, 22)}
          <span>${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}
