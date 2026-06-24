/* ============================================
   DAUR.IN — App Header Component
   ============================================ */

import { store } from '../store.js';
import { svgIcon } from '../utils.js';

export function renderHeader(options = {}) {
  const { title = 'DAUR.IN', showBack = false, backRoute = '', showBell = false, showRoleSwitcher = false } = options;

  const pendingCount = store.getReportsByStatus('menunggu').length;

  return `
    <div class="app-header">
      <div style="display:flex;align-items:center;gap:8px;">
        ${showBack ? `
          <button class="btn btn-icon-sm btn-ghost header-back-btn" onclick="window.location.hash='${backRoute}'">
            ${svgIcon('chevronLeft', 20)}
          </button>
        ` : `
          <div style="display:flex;align-items:center;gap:6px;">
            <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#4CAF50,#2E7D32);display:flex;align-items:center;justify-content:center;">
              <span style="color:#fff;font-size:10px;font-weight:800;">D</span>
            </div>
          </div>
        `}
        <span class="app-header-title">${title}</span>
      </div>
      <div class="app-header-actions">
        ${showBell ? `
          <button class="btn btn-icon-sm btn-ghost" style="position:relative;" id="header-bell">
            ${svgIcon('bell', 20)}
            ${pendingCount > 0 ? `<span class="badge-count" style="position:absolute;top:2px;right:2px;min-width:16px;height:16px;font-size:9px;">${pendingCount}</span>` : ''}
          </button>
        ` : ''}
        ${showRoleSwitcher ? `
          <button class="btn btn-icon-sm btn-ghost" id="header-role-switch" title="Ganti Peran">
            ${svgIcon('switchIcon', 18)}
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

// Initialize header event listeners (call after rendering)
export function initHeaderEvents() {
  const roleBtn = document.getElementById('header-role-switch');
  if (roleBtn) {
    roleBtn.addEventListener('click', () => {
      toggleRoleMenu();
    });
  }
}

let roleMenuOpen = false;

function toggleRoleMenu() {
  if (roleMenuOpen) {
    closeRoleMenu();
    return;
  }

  const currentRole = store.getRole();
  
  const menu = document.createElement('div');
  menu.id = 'role-menu-dropdown';
  menu.className = 'role-menu';
  menu.style.cssText = 'position:fixed;top:52px;right:12px;z-index:9500;';
  menu.innerHTML = `
    <button class="role-menu-item ${currentRole === 'warga' ? 'active' : ''}" data-role="warga">
      <div class="role-menu-icon" style="background:#E8F5E9;color:#4CAF50;">👤</div>
      <div>
        <div style="font-weight:600;">Warga</div>
        <div style="font-size:10px;color:var(--color-text-secondary);">Mak Susi</div>
      </div>
    </button>
    <button class="role-menu-item ${currentRole === 'petugas' ? 'active' : ''}" data-role="petugas">
      <div class="role-menu-icon" style="background:#E3F2FD;color:#42A5F5;">🚛</div>
      <div>
        <div style="font-weight:600;">Petugas</div>
        <div style="font-size:10px;color:var(--color-text-secondary);">Pak Budi</div>
      </div>
    </button>
    <button class="role-menu-item ${currentRole === 'admin' ? 'active' : ''}" data-role="admin">
      <div class="role-menu-icon" style="background:#F3E5F5;color:#9C27B0;">🏛️</div>
      <div>
        <div style="font-weight:600;">Admin</div>
        <div style="font-size:10px;color:var(--color-text-secondary);">Admin Panel</div>
      </div>
    </button>
  `;

  document.body.appendChild(menu);
  roleMenuOpen = true;

  // Close on outside click
  const closeHandler = (e) => {
    if (!menu.contains(e.target) && e.target.id !== 'header-role-switch') {
      closeRoleMenu();
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 10);

  // Role selection
  menu.querySelectorAll('.role-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const role = item.dataset.role;
      store.setRole(role);
      closeRoleMenu();
      
      const routes = {
        warga: '/warga/home',
        petugas: '/petugas/dashboard',
        admin: '/admin/dashboard',
      };
      window.location.hash = routes[role];
    });
  });
}

function closeRoleMenu() {
  const menu = document.getElementById('role-menu-dropdown');
  if (menu) {
    menu.style.animation = 'fade-in 0.2s ease reverse forwards';
    setTimeout(() => menu.remove(), 200);
  }
  roleMenuOpen = false;
}
