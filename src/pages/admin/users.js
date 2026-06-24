/* ============================================
   DAUR.IN — Admin Users Management
   ============================================ */

import { store } from '../../store.js';
import { svgIcon, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderAdminUsers() {
  const users = store.get('allUsers');
  const wargaUsers = users.filter(u => u.role === 'warga');
  const petugasUsers = users.filter(u => u.role === 'petugas');

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Kelola Pengguna', showBack: true, backRoute: '/admin/dashboard' })}
    
    <div style="padding:16px;display:flex;flex-direction:column;gap:16px;" class="fade-in-up">
      <!-- Summary -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="stat-card" style="text-align:center;align-items:center;">
          <div class="stat-card-value" style="color:var(--color-primary);">${wargaUsers.length}</div>
          <div class="stat-card-label">Warga Terdaftar</div>
        </div>
        <div class="stat-card" style="text-align:center;align-items:center;">
          <div class="stat-card-value" style="color:var(--color-info);">${petugasUsers.length}</div>
          <div class="stat-card-label">Petugas Aktif</div>
        </div>
      </div>

      <!-- Search -->
      <div class="input-group">
        <div style="position:relative;">
          <input type="text" class="input-field" id="user-search" placeholder="🔍 Cari pengguna..." style="padding-left:16px;" />
        </div>
      </div>

      <!-- Tabs -->
      <div class="tab-bar" id="user-tabs">
        <button class="tab-item active" data-tab="semua">Semua (${users.length})</button>
        <button class="tab-item" data-tab="warga">Warga (${wargaUsers.length})</button>
        <button class="tab-item" data-tab="petugas">Petugas (${petugasUsers.length})</button>
      </div>

      <!-- User List -->
      <div id="user-list" class="stagger-children">
        ${renderUserList(users)}
      </div>

      <div style="height:80px;"></div>
    </div>

    ${renderBottomNav('admin-users')}
  `;

  // Tab switching
  document.querySelectorAll('#user-tabs .tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#user-tabs .tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filter = tab.dataset.tab;
      let filtered = users;
      if (filter !== 'semua') {
        filtered = users.filter(u => u.role === filter);
      }
      
      // Apply search filter too
      const search = document.getElementById('user-search').value.toLowerCase();
      if (search) {
        filtered = filtered.filter(u => u.name.toLowerCase().includes(search) || u.phone.includes(search));
      }
      
      document.getElementById('user-list').innerHTML = renderUserList(filtered);
    });
  });

  // Search
  document.getElementById('user-search')?.addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const activeTab = document.querySelector('#user-tabs .tab-item.active').dataset.tab;
    let filtered = users;
    if (activeTab !== 'semua') {
      filtered = filtered.filter(u => u.role === activeTab);
    }
    if (search) {
      filtered = filtered.filter(u => u.name.toLowerCase().includes(search) || u.phone.includes(search));
    }
    document.getElementById('user-list').innerHTML = renderUserList(filtered);
  });
}

function renderUserList(users) {
  if (users.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <h3>Tidak Ada Pengguna</h3>
        <p>Tidak ditemukan pengguna yang sesuai</p>
      </div>
    `;
  }

  return users.map(user => {
    const isWarga = user.role === 'warga';
    const roleColor = isWarga ? '#4CAF50' : '#42A5F5';
    const roleBg = isWarga ? '#E8F5E9' : '#E3F2FD';
    const roleLabel = isWarga ? 'Warga' : 'Petugas';
    const initials = user.name.split(' ').map(w => w[0]).join('').substring(0, 2);

    return `
      <div class="card" style="padding:12px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="avatar" style="background:linear-gradient(135deg, ${roleColor}, ${roleColor}dd);font-size:14px;">
            ${initials}
          </div>
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-weight:600;font-size:14px;">${user.name}</span>
              <span class="badge" style="background:${roleBg};color:${roleColor};font-size:9px;">${roleLabel}</span>
            </div>
            <div style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">
              ${user.phone}
            </div>
            ${isWarga ? `
              <div style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">
                ${user.reports} laporan
              </div>
            ` : ''}
          </div>
          <span class="badge badge-done" style="font-size:9px;">${user.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
        </div>
      </div>
    `;
  }).join('');
}
