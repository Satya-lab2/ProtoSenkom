/* ============================================
   DAUR.IN — Main Application Entry Point
   ============================================ */

import './styles/base.css';
import { router } from './router.js';
import { store } from './store.js';
import { initHeaderEvents } from './components/header.js';

// ── Page Imports ──
import { renderOnboarding } from './pages/onboarding.js';
import { renderLogin } from './pages/login.js';
import { renderWargaHome } from './pages/warga/home.js';
import { renderWargaReport } from './pages/warga/report.js';
import { renderWargaHistory } from './pages/warga/history.js';
import { renderWargaSchedule } from './pages/warga/schedule.js';
import { renderWargaProfile } from './pages/warga/profile.js';
import { renderPetugasDashboard } from './pages/petugas/dashboard.js';
import { renderPetugasMap } from './pages/petugas/map.js';
import { renderReportDetail } from './pages/petugas/report-detail.js';
import { renderAdminDashboard } from './pages/admin/dashboard.js';
import { renderAdminHeatmap } from './pages/admin/heatmap.js';
import { renderAdminUsers } from './pages/admin/users.js';
import { renderAdminSettings } from './pages/admin/settings.js';

// ── Initialize App ──
function initApp() {
  const pageContent = document.getElementById('page-content');
  router.init(pageContent);

  // ── Register Routes ──
  
  // Onboarding
  router.register('/onboarding', () => { renderOnboarding(); });

  // Login
  router.register('/login', () => { renderLogin(); });

  // Warga Routes
  router.register('/warga/home', () => { renderWargaHome(); initHeaderEvents(); });
  router.register('/warga/report', () => { renderWargaReport(); });
  router.register('/warga/history', () => { renderWargaHistory(); initHeaderEvents(); });
  router.register('/warga/schedule', () => { renderWargaSchedule(); initHeaderEvents(); });
  router.register('/warga/profile', () => { renderWargaProfile(); initHeaderEvents(); });

  // Petugas Routes
  router.register('/petugas/dashboard', () => { renderPetugasDashboard(); initHeaderEvents(); });
  router.register('/petugas/map', () => { renderPetugasMap(); initHeaderEvents(); });
  router.register('/petugas/report/:id', (params) => { renderReportDetail(params); });

  // Admin Routes
  router.register('/admin/dashboard', () => { renderAdminDashboard(); initHeaderEvents(); });
  router.register('/admin/heatmap', () => { renderAdminHeatmap(); initHeaderEvents(); });
  router.register('/admin/users', () => { renderAdminUsers(); initHeaderEvents(); });
  router.register('/admin/settings', () => { renderAdminSettings(); initHeaderEvents(); });

  // ── Splash Screen → First Route ──
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        
        // Determine first route: onboarding → login → app
        if (!store.isOnboardingDone()) {
          router.navigate('/onboarding');
        } else if (!store.isLoginDone()) {
          router.navigate('/login');
        } else {
          const role = store.getRole();
          const defaultRoutes = {
            warga: '/warga/home',
            petugas: '/petugas/dashboard',
            admin: '/admin/dashboard',
          };
          router.navigate(defaultRoutes[role] || '/warga/home');
        }
      }, 600);
    }
  }, 2000);
}

// ── Boot ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
