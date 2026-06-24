/* ============================================
   DAUR.IN — Data Store (LocalStorage-backed)
   ============================================ */

const STORE_KEY = 'daurin_data';

// Default seed data
function getDefaultData() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  return {
    currentRole: 'warga',
    onboardingDone: false,
    
    user: {
      id: 'USR001',
      name: 'Mak Susi',
      phone: '0812-3456-7890',
      address: 'Jl. Babarsari No. 44, RT 05/RW 12',
      kelurahan: 'Caturtunggal',
      kecamatan: 'Depok',
      avatar: 'MS',
      streak: 7,
      totalReports: 24,
      points: 480,
      joinedDate: '2026-01-15',
      notificationEnabled: true,
      notificationTime: '06:00',
    },

    reports: [
      {
        id: 'RPT001',
        userId: 'USR001',
        userName: 'Mak Susi',
        type: 'campuran',
        typeLabel: 'Campuran',
        location: 'Jl. Babarsari No. 44, RT 05/RW 12',
        lat: -7.7796,
        lng: 110.4151,
        status: 'selesai',
        createdAt: getDateOffset(-2, 6, 15),
        updatedAt: getDateOffset(-2, 7, 30),
        petugasId: 'PTG001',
        petugasName: 'Pak Budi',
      },
      {
        id: 'RPT002',
        userId: 'USR001',
        userName: 'Mak Susi',
        type: 'organik',
        typeLabel: 'Organik',
        location: 'Jl. Babarsari No. 44, RT 05/RW 12',
        lat: -7.7796,
        lng: 110.4151,
        status: 'selesai',
        createdAt: getDateOffset(-1, 6, 30),
        updatedAt: getDateOffset(-1, 8, 0),
        petugasId: 'PTG001',
        petugasName: 'Pak Budi',
      },
      {
        id: 'RPT003',
        userId: 'USR002',
        userName: 'Bu Rina',
        type: 'anorganik',
        typeLabel: 'Anorganik',
        location: 'Jl. Seturan Raya No. 12, RT 03/RW 08',
        lat: -7.7752,
        lng: 110.4102,
        status: 'diambil',
        createdAt: getDateOffset(0, 5, 45),
        updatedAt: getDateOffset(0, 7, 15),
        petugasId: 'PTG001',
        petugasName: 'Pak Budi',
      },
      {
        id: 'RPT004',
        userId: 'USR003',
        userName: 'Pak Joko',
        type: 'organik',
        typeLabel: 'Organik',
        location: 'Jl. Kaliurang Km 6.5, RT 07/RW 15',
        lat: -7.7683,
        lng: 110.3887,
        status: 'menunggu',
        createdAt: getDateOffset(0, 6, 0),
        updatedAt: null,
        petugasId: null,
        petugasName: null,
      },
      {
        id: 'RPT005',
        userId: 'USR004',
        userName: 'Mbak Dewi',
        type: 'campuran',
        typeLabel: 'Campuran',
        location: 'Perumahan Griya Indah Blok C-7, RT 10/RW 20',
        lat: -7.7831,
        lng: 110.4185,
        status: 'menunggu',
        createdAt: getDateOffset(0, 6, 20),
        updatedAt: null,
        petugasId: null,
        petugasName: null,
      },
      {
        id: 'RPT006',
        userId: 'USR005',
        userName: 'Bu Wati',
        type: 'organik',
        typeLabel: 'Organik',
        location: 'Jl. Perumnas No. 8, RT 02/RW 06',
        lat: -7.7724,
        lng: 110.4055,
        status: 'menunggu',
        createdAt: getDateOffset(0, 6, 35),
        updatedAt: null,
        petugasId: null,
        petugasName: null,
      },
    ],

    schedules: [
      { day: 'Senin', time: '06:00 - 08:00', zones: ['RT 01-05'], types: ['Organik'] },
      { day: 'Selasa', time: '06:00 - 08:00', zones: ['RT 06-10'], types: ['Anorganik'] },
      { day: 'Rabu', time: '06:00 - 08:00', zones: ['RT 01-05'], types: ['Campuran'] },
      { day: 'Kamis', time: '06:00 - 08:00', zones: ['RT 06-10'], types: ['Organik'] },
      { day: 'Jumat', time: '06:00 - 08:00', zones: ['RT 01-05'], types: ['Anorganik'] },
      { day: 'Sabtu', time: '07:00 - 09:00', zones: ['Semua RT'], types: ['Campuran'] },
    ],

    petugas: [
      { id: 'PTG001', name: 'Pak Budi', phone: '0813-1111-2222', zone: 'RT 01-10', avatar: 'PB', status: 'active' },
      { id: 'PTG002', name: 'Mas Anto', phone: '0813-3333-4444', zone: 'RT 11-20', avatar: 'MA', status: 'active' },
    ],

    allUsers: [
      { id: 'USR001', name: 'Mak Susi', phone: '0812-3456-7890', role: 'warga', status: 'active', reports: 24 },
      { id: 'USR002', name: 'Bu Rina', phone: '0812-9876-5432', role: 'warga', status: 'active', reports: 18 },
      { id: 'USR003', name: 'Pak Joko', phone: '0813-5555-6666', role: 'warga', status: 'active', reports: 12 },
      { id: 'USR004', name: 'Mbak Dewi', phone: '0857-7777-8888', role: 'warga', status: 'active', reports: 9 },
      { id: 'USR005', name: 'Bu Wati', phone: '0821-9999-0000', role: 'warga', status: 'active', reports: 15 },
      { id: 'PTG001', name: 'Pak Budi', phone: '0813-1111-2222', role: 'petugas', status: 'active', reports: 0 },
      { id: 'PTG002', name: 'Mas Anto', phone: '0813-3333-4444', role: 'petugas', status: 'active', reports: 0 },
    ],

    // Analytics seed data for charts
    analytics: {
      dailyReports: [12, 18, 15, 22, 19, 25, 20, 28, 24, 30, 27, 32, 29, 35],
      weeklyReports: [85, 102, 95, 118, 130, 142, 155],
      completionRate: 82,
      avgResponseTime: 45, // minutes
      topZones: [
        { zone: 'RT 05', reports: 45, pct: 92 },
        { zone: 'RT 03', reports: 38, pct: 85 },
        { zone: 'RT 08', reports: 32, pct: 78 },
        { zone: 'RT 12', reports: 28, pct: 71 },
        { zone: 'RT 01', reports: 24, pct: 65 },
      ],
    },
  };
}

function getDateOffset(dayOffset, hours, minutes) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

// ── Store Class ──
class Store {
  constructor() {
    this.data = this.load();
    this.listeners = new Map();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Store: Failed to load from localStorage', e);
    }
    return getDefaultData();
  }

  save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Store: Failed to save to localStorage', e);
    }
  }

  reset() {
    this.data = getDefaultData();
    this.save();
    this.emit('reset');
  }

  get(key) {
    return key ? this.data[key] : this.data;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
    this.emit(key, value);
  }

  // ── Role Management ──
  getRole() {
    return this.data.currentRole;
  }

  setRole(role) {
    this.data.currentRole = role;
    this.save();
    this.emit('roleChange', role);
  }

  // ── Onboarding ──
  isOnboardingDone() {
    return this.data.onboardingDone;
  }

  completeOnboarding() {
    this.data.onboardingDone = true;
    this.save();
  }

  // ── Reports ──
  getReports() {
    return this.data.reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getReportsByStatus(status) {
    return this.getReports().filter(r => r.status === status);
  }

  getUserReports() {
    return this.getReports().filter(r => r.userId === this.data.user.id);
  }

  getTodayReports() {
    const today = new Date().toISOString().split('T')[0];
    return this.getReports().filter(r => r.createdAt.startsWith(today));
  }

  addReport(report) {
    const newReport = {
      id: 'RPT' + String(this.data.reports.length + 1).padStart(3, '0'),
      userId: this.data.user.id,
      userName: this.data.user.name,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      status: 'menunggu',
      petugasId: null,
      petugasName: null,
      ...report,
    };
    this.data.reports.unshift(newReport);
    this.data.user.totalReports++;
    this.data.user.points += 20;
    this.save();
    this.emit('reportAdded', newReport);
    return newReport;
  }

  updateReportStatus(reportId, status, petugasId = null) {
    const report = this.data.reports.find(r => r.id === reportId);
    if (report) {
      report.status = status;
      report.updatedAt = new Date().toISOString();
      if (petugasId) {
        const petugas = this.data.petugas.find(p => p.id === petugasId);
        report.petugasId = petugasId;
        report.petugasName = petugas ? petugas.name : 'Petugas';
      }
      this.save();
      this.emit('reportUpdated', report);
    }
    return report;
  }

  // ── Stats ──
  getStats() {
    const today = this.getTodayReports();
    const all = this.getReports();
    return {
      todayTotal: today.length,
      todayPending: today.filter(r => r.status === 'menunggu').length,
      todayDone: today.filter(r => r.status === 'selesai').length,
      todayProgress: today.filter(r => r.status === 'diambil').length,
      totalAll: all.length,
      completionRate: all.length > 0 ? Math.round((all.filter(r => r.status === 'selesai').length / all.length) * 100) : 0,
    };
  }

  // ── Event System ──
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const cbs = this.listeners.get(event);
      const idx = cbs.indexOf(callback);
      if (idx > -1) cbs.splice(idx, 1);
    };
  }

  emit(event, data) {
    const cbs = this.listeners.get(event) || [];
    cbs.forEach(cb => cb(data));
  }
}

// Singleton
export const store = new Store();
