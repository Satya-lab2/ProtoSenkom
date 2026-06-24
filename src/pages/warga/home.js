/* ============================================
   DAUR.IN — Warga Home Page
   ============================================ */

import { store } from '../../store.js';
import { router } from '../../router.js';
import { getGreeting, formatRelative, getStatusBadgeClass, getStatusLabel, getTypeIcon, svgIcon, animateCounter, showToast } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderWargaHome() {
  const user = store.get('user');
  const stats = store.getStats();
  const recentReports = store.getUserReports().slice(0, 3);
  const schedules = store.get('schedules');
  const today = new Date();
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todaySchedule = schedules.find(s => s.day === dayNames[today.getDay()]);

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'DAUR.IN', showBell: true, showRoleSwitcher: true })}
    
    <div class="page-warga-home">
      <!-- Greeting -->
      <div class="home-greeting fade-in-up">
        <div class="home-greeting-row">
          <div>
            <h2>${getGreeting()}, ${user.name.split(' ')[0]}! 👋</h2>
            <p>Ayo jaga lingkungan hari ini</p>
          </div>
          <div class="avatar avatar-lg">${user.avatar}</div>
        </div>
      </div>

      <div class="home-content stagger-children">
        <!-- Today's Schedule -->
        ${todaySchedule ? `
          <div class="card card-gradient home-schedule-card" id="schedule-card">
            <div class="home-schedule-icon">🚛</div>
            <div class="home-schedule-info">
              <h4>Jadwal Hari Ini — ${todaySchedule.day}</h4>
              <p>${todaySchedule.time} · ${todaySchedule.types.join(', ')} · ${todaySchedule.zones.join(', ')}</p>
            </div>
          </div>
        ` : `
          <div class="card card-green home-schedule-card">
            <div class="home-schedule-icon">📅</div>
            <div class="home-schedule-info">
              <h4>Tidak Ada Jadwal Hari Ini</h4>
              <p>Jadwal pengambilan berikutnya: Senin</p>
            </div>
          </div>
        `}

        <!-- CTA Button -->
        <button class="btn-cta-mega" id="btn-report">
          <span style="display:flex;align-items:center;gap:12px;position:relative;z-index:1;">
            <span style="font-size:28px;">🗑️</span>
            <span>
              <span style="display:block;font-size:18px;">Laporkan Sampah</span>
              <span style="display:block;font-size:12px;opacity:0.85;font-weight:400;">Ketuk sekali, sampah dijemput!</span>
            </span>
          </span>
        </button>

        <!-- Notification Preview -->
        <div class="notification-card" id="notif-preview" style="cursor:pointer;">
          <div class="notification-card-header">
            <div class="notification-card-app-icon">
              <span style="color:#fff;font-size:10px;font-weight:bold;">D</span>
            </div>
            <span class="notification-card-app-name">DAUR.IN</span>
            <span class="notification-card-time">Baru saja</span>
          </div>
          <div class="notification-card-title">Sampah Siap? Laporkan Sekarang! 🚛</div>
          <div class="notification-card-body">Truk sampah akan melewati area Anda dalam 30 menit. Ketuk untuk melaporkan.</div>
          <div class="notification-card-actions">
            <button class="btn btn-primary btn-sm" id="notif-action">Laporkan Sekarang</button>
            <button class="btn btn-ghost btn-sm" id="notif-dismiss">Nanti</button>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="home-stats-row">
          <div class="stat-card">
            <div class="stat-card-icon" style="background:#E8F5E9;color:#4CAF50;">📊</div>
            <div class="stat-card-value" data-counter="${user.totalReports}">${user.totalReports}</div>
            <div class="stat-card-label">Total Laporan</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon" style="background:#FFF3E0;color:#FF9800;">${svgIcon('flame', 18)}</div>
            <div class="stat-card-value">${user.streak}</div>
            <div class="stat-card-label">Hari Streak 🔥</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon" style="background:#E3F2FD;color:#42A5F5;">⭐</div>
            <div class="stat-card-value" data-counter="${user.points}">${user.points}</div>
            <div class="stat-card-label">Poin</div>
          </div>
        </div>

        <!-- Recent Reports -->
        <div>
          <div class="home-section-header">
            <h3>Laporan Terbaru</h3>
            <a href="#/warga/history">Lihat Semua</a>
          </div>
          
          ${recentReports.length > 0 ? `
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              ${recentReports.map(report => `
                <div class="history-item" data-report-id="${report.id}">
                  <div class="history-item-icon" style="background:${getTypeIconBg(report.type)}">
                    ${getTypeIcon(report.type)}
                  </div>
                  <div class="history-item-content">
                    <div class="history-item-title">${report.typeLabel}</div>
                    <div class="history-item-meta">${formatRelative(report.createdAt)}</div>
                  </div>
                  <span class="badge ${getStatusBadgeClass(report.status)}">${getStatusLabel(report.status)}</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state" style="padding:24px;">
              <div class="empty-state-icon">📋</div>
              <p>Belum ada laporan. Ketuk tombol di atas untuk mulai!</p>
            </div>
          `}
        </div>

        <!-- Spacer for bottom nav -->
        <div style="height:16px;"></div>
      </div>
    </div>
    
    ${renderBottomNav('home')}
  `;

  // Event bindings
  const btnReport = document.getElementById('btn-report');
  btnReport?.addEventListener('click', () => router.navigate('/warga/report'));

  const notifAction = document.getElementById('notif-action');
  notifAction?.addEventListener('click', (e) => {
    e.stopPropagation();
    router.navigate('/warga/report');
  });

  const notifDismiss = document.getElementById('notif-dismiss');
  notifDismiss?.addEventListener('click', (e) => {
    e.stopPropagation();
    const notif = document.getElementById('notif-preview');
    notif.style.transition = 'all 0.3s ease';
    notif.style.opacity = '0';
    notif.style.transform = 'translateX(100%)';
    setTimeout(() => notif.style.display = 'none', 300);
    showToast('Pengingat Ditunda', 'Kami akan mengingatkan Anda nanti', 'info');
  });

  const scheduleCard = document.getElementById('schedule-card');
  scheduleCard?.addEventListener('click', () => router.navigate('/warga/schedule'));

  // Animate counters
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    animateCounter(el, target, 800);
  });
}

function getTypeIconBg(type) {
  const map = {
    organik: '#E8F5E9',
    anorganik: '#E3F2FD',
    campuran: '#FFF3E0',
  };
  return map[type] || '#F5F5F5';
}
