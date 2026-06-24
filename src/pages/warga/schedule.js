/* ============================================
   DAUR.IN — Warga Schedule Page
   ============================================ */

import { store } from '../../store.js';
import { getDayShort, svgIcon } from '../../utils.js';
import { renderBottomNav } from '../../components/bottom-nav.js';
import { renderHeader } from '../../components/header.js';

export function renderWargaSchedule() {
  const schedules = store.get('schedules');
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday

  // Generate week days
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    const dayName = getDayShort(i);
    const hasPickup = schedules.some(s => {
      const dayMap = { 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6, 'Minggu': 0 };
      return dayMap[s.day] === i;
    });
    weekDays.push({
      index: i,
      name: dayName,
      date: d.getDate(),
      isToday: i === dayOfWeek,
      hasPickup,
    });
  }

  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    ${renderHeader({ title: 'Jadwal Pengambilan', showBack: true, backRoute: '/warga/home' })}
    
    <div class="schedule-page fade-in-up">
      <!-- Week Calendar -->
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h4 style="font-size:14px;">📅 Minggu Ini</h4>
          <span class="badge badge-primary">${today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="schedule-week">
          ${weekDays.map(day => `
            <div class="schedule-day ${day.isToday ? 'active' : ''} ${day.hasPickup ? 'has-pickup' : ''}">
              <span class="schedule-day-name">${day.name}</span>
              <span class="schedule-day-num">${day.date}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Schedule Details -->
      <div>
        <h3 style="font-size:16px;margin-bottom:12px;">📋 Jadwal Lengkap</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${schedules.map(schedule => {
            const dayMap = { 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6, 'Minggu': 0 };
            const isToday = dayMap[schedule.day] === dayOfWeek;
            
            return `
              <div class="card schedule-detail-card ${isToday ? 'card-green' : ''}">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <h4 style="font-size:15px;${isToday ? 'color:#fff;' : ''}">${schedule.day}</h4>
                  ${isToday ? '<span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;">Hari Ini</span>' : ''}
                </div>
                <div class="schedule-time-slot" style="${isToday ? 'background:rgba(255,255,255,0.15);' : ''}">
                  <span class="schedule-time-badge" style="${isToday ? 'background:rgba(255,255,255,0.2);color:#fff;' : ''}">${svgIcon('clock', 14)} ${schedule.time}</span>
                  <span style="font-size:13px;${isToday ? 'color:rgba(255,255,255,0.9);' : 'color:var(--color-text-secondary);'}">
                    ${schedule.types.join(', ')}
                  </span>
                </div>
                <div style="font-size:12px;${isToday ? 'color:rgba(255,255,255,0.7);' : 'color:var(--color-text-tertiary);'}">
                  Zona: ${schedule.zones.join(', ')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Info Card -->
      <div class="card" style="background:var(--color-info-bg);border:1px solid #BBDEFB;">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="font-size:20px;">💡</span>
          <div>
            <h4 style="font-size:14px;color:#1565C0;margin-bottom:4px;">Tips Pemilahan</h4>
            <p style="font-size:12px;color:#1976D2;line-height:1.6;">
              <strong>Organik:</strong> Sisa makanan, sayur, buah<br>
              <strong>Anorganik:</strong> Plastik, kertas, kaleng<br>
              <strong>Campuran:</strong> Jika belum sempat memilah
            </p>
          </div>
        </div>
      </div>

      <div style="height:16px;"></div>
    </div>

    ${renderBottomNav('schedule')}
  `;
}
