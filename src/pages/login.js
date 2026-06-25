/* ============================================
   DAUR.IN — Login Page
   ============================================ */

import { store } from '../store.js';
import { router } from '../router.js';

export function renderLogin() {
  const pageContent = document.getElementById('page-content');
  pageContent.innerHTML = `
    <div class="login-page">
      <div class="login-bg-decor">
        <div class="login-bg-circle login-bg-circle-1"></div>
        <div class="login-bg-circle login-bg-circle-2"></div>
        <div class="login-bg-circle login-bg-circle-3"></div>
      </div>

      <div class="login-header">
        <div class="login-logo">
          <div class="login-logo-icon">
            <svg width="56" height="56" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="36" fill="url(#login-grad)"/>
              <path d="M24 44c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
              <path d="M30 38l6-6 6 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="36" cy="26" r="4" fill="#fff"/>
              <path d="M20 48h32" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="login-grad" x1="0" y1="0" x2="72" y2="72">
                  <stop stop-color="#4CAF50"/>
                  <stop offset="1" stop-color="#2E7D32"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="login-brand">DAUR<span>.IN</span></h1>
          <p class="login-tagline">Lingkungan Bersih, Hidup Bahagia</p>
        </div>
      </div>

      <div class="login-card">
        <div class="login-card-header">
          <h2>Masuk ke Akun</h2>
          <p>Silakan masuk untuk melanjutkan</p>
        </div>

        <form id="login-form" class="login-form" autocomplete="off">
          <div class="login-input-group">
            <label class="login-input-label" for="login-phone">
              <i class="icon-phone"></i>
              Nomor Telepon
            </label>
            <div class="login-input-wrapper">
              <span class="login-input-prefix">+62</span>
              <input
                type="tel"
                id="login-phone"
                class="login-input"
                placeholder="812-3456-7890"
                maxlength="15"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="login-input-group">
            <label class="login-input-label" for="login-password">
              <i class="icon-lock"></i>
              Kata Sandi
            </label>
            <div class="login-input-wrapper">
              <input
                type="password"
                id="login-password"
                class="login-input login-input-password"
                placeholder="Masukkan kata sandi"
                autocomplete="off"
              />
              <button type="button" class="login-toggle-password" id="toggle-password" aria-label="Tampilkan kata sandi">
                <i class="icon-eye" id="eye-icon"></i>
              </button>
            </div>
          </div>

          <div class="login-options">
            <label class="login-remember">
              <input type="checkbox" id="login-remember" />
              <span class="login-checkbox-custom"></span>
              Ingat saya
            </label>
            <a href="#" class="login-forgot" id="login-forgot">Lupa kata sandi?</a>
          </div>

          <div id="login-error" class="login-error" style="display: none;">
            <i class="icon-alert-circle"></i>
            <span id="login-error-text">Nomor telepon atau kata sandi salah</span>
          </div>

          <button type="submit" class="btn btn-primary btn-full login-submit" id="login-submit">
            <span class="login-submit-text">Masuk</span>
            <div class="login-submit-loader" style="display: none;">
              <div class="login-spinner"></div>
            </div>
          </button>
        </form>

        <div class="login-divider">
          <span>atau</span>
        </div>

        <div class="login-social">
          <button class="login-social-btn" id="login-google">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <div class="login-footer">
          <p>Belum punya akun? <a href="#" id="login-register">Daftar sekarang</a></p>
        </div>
      </div>

      <div class="login-leaf login-leaf-1">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C10 2 4 8 4 16c0 6 4 12 12 14C20 28 28 22 28 16 28 8 22 2 16 2z" fill="#4CAF50" opacity="0.15"/>
          <path d="M16 6c-4 0-8 4-8 10s4 10 8 10" stroke="#4CAF50" stroke-width="1.5" opacity="0.3" fill="none"/>
        </svg>
      </div>
      <div class="login-leaf login-leaf-2">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C10 2 4 8 4 16c0 6 4 12 12 14C20 28 28 22 28 16 28 8 22 2 16 2z" fill="#81C784" opacity="0.12"/>
        </svg>
      </div>
      <div class="login-leaf login-leaf-3">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C10 2 4 8 4 16c0 6 4 12 12 14C20 28 28 22 28 16 28 8 22 2 16 2z" fill="#2E7D32" opacity="0.1"/>
        </svg>
      </div>
    </div>
  `;

  initLoginEvents();
}

function initLoginEvents() {
  const form = document.getElementById('login-form');
  const phoneInput = document.getElementById('login-phone');
  const passwordInput = document.getElementById('login-password');
  const togglePassword = document.getElementById('toggle-password');
  const eyeIcon = document.getElementById('eye-icon');
  const errorBox = document.getElementById('login-error');
  const submitBtn = document.getElementById('login-submit');
  const forgotLink = document.getElementById('login-forgot');
  const registerLink = document.getElementById('login-register');
  const googleBtn = document.getElementById('login-google');

  // Format phone input
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    // Auto-format: 812-3456-7890
    if (val.length > 3 && val.length <= 7) {
      val = val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length > 7) {
      val = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7, 11);
    }
    e.target.value = val;
    hideError();
  });

  passwordInput.addEventListener('input', () => hideError());

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeIcon.className = isPassword ? 'icon-eye-off' : 'icon-eye';
  });

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (!phone) {
      showError('Masukkan nomor telepon Anda');
      phoneInput.focus();
      return;
    }

    if (phone.replace(/[^0-9]/g, '').length < 10) {
      showError('Nomor telepon minimal 10 digit');
      phoneInput.focus();
      return;
    }

    if (!password) {
      showError('Masukkan kata sandi Anda');
      passwordInput.focus();
      return;
    }

    if (password.length < 4) {
      showError('Kata sandi minimal 4 karakter');
      passwordInput.focus();
      return;
    }

    // Show loading
    submitBtn.disabled = true;
    submitBtn.querySelector('.login-submit-text').style.display = 'none';
    submitBtn.querySelector('.login-submit-loader').style.display = 'flex';

    // Simulate login delay
    await new Promise(r => setTimeout(r, 1200));

    // Accept any valid-looking input (this is a prototype)
    store.completeLogin();

    // Navigate based on role
    const role = store.getRole();
    const defaultRoutes = {
      warga: '/warga/home',
      petugas: '/petugas/dashboard',
      admin: '/admin/dashboard',
    };
    router.navigate(defaultRoutes[role] || '/warga/home');
  });

  // Forgot password (prototype — just show a toast-like message)
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    showError('Fitur reset kata sandi akan segera tersedia');
    errorBox.classList.add('login-error-info');
  });

  // Register link (prototype — go through as login)
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showError('Fitur pendaftaran akan segera tersedia');
    errorBox.classList.add('login-error-info');
  });

  // Google login (prototype)
  googleBtn.addEventListener('click', () => {
    submitBtn.disabled = true;
    submitBtn.querySelector('.login-submit-text').style.display = 'none';
    submitBtn.querySelector('.login-submit-loader').style.display = 'flex';

    setTimeout(() => {
      store.completeLogin();
      const role = store.getRole();
      const defaultRoutes = {
        warga: '/warga/home',
        petugas: '/petugas/dashboard',
        admin: '/admin/dashboard',
      };
      router.navigate(defaultRoutes[role] || '/warga/home');
    }, 1000);
  });

  // Focus animation
  const inputs = document.querySelectorAll('.login-input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.login-input-wrapper').classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.closest('.login-input-wrapper').classList.remove('focused');
    });
  });

  function showError(msg) {
    const errorText = document.getElementById('login-error-text');
    errorText.textContent = msg;
    errorBox.style.display = 'flex';
    errorBox.classList.remove('login-error-info');
    errorBox.classList.add('login-error-shake');
    setTimeout(() => errorBox.classList.remove('login-error-shake'), 500);
  }

  function hideError() {
    errorBox.style.display = 'none';
    errorBox.classList.remove('login-error-info');
  }
}
