// ─────────────────────────────────────────────────────────────
//  QRFlex — Configuración del Frontend
//  CAMBIA ESTA URL por la que te da Railway cuando despliegues
// ─────────────────────────────────────────────────────────────

const QRFLEX_CONFIG = {
  // 👇 CAMBIA ESTO por tu URL de Railway después de desplegar
  API_URL: 'http://qrmatrix-production.up.railway.app/',

  // Esta función construye el link completo del QR dinámico
  getQRLink: (shortCode) => `${QRFLEX_CONFIG.API_URL}/r/${shortCode}`,
};

// ─────────────────────────────────────────────────────────────
//  API — Todas las llamadas al backend
// ─────────────────────────────────────────────────────────────

const API = {
  // Obtener token guardado
  getToken: () => localStorage.getItem('qrflex_token'),

  // Headers con autenticación
  headers: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API.getToken()}`
  }),

  // ── Auth ──────────────────────────────────────
  async register(name, email, password) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return r.json();
  },

  async login(email, password) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await r.json();
    if (data.token) localStorage.setItem('qrflex_token', data.token);
    return data;
  },

  // ── QR Codes ──────────────────────────────────
  async getQRCodes() {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/qrcodes`, { headers: API.headers() });
    return r.json();
  },

  async createQR(payload) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/qrcodes`, {
      method: 'POST',
      headers: API.headers(),
      body: JSON.stringify(payload)
    });
    return r.json();
  },

  async updateQR(id, payload) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/qrcodes/${id}`, {
      method: 'PATCH',
      headers: API.headers(),
      body: JSON.stringify(payload)
    });
    return r.json();
  },

  async deleteQR(id) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/qrcodes/${id}`, {
      method: 'DELETE',
      headers: API.headers()
    });
    return r.json();
  },

  // ── Analytics ─────────────────────────────────
  async getOverview() {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/analytics/overview`, { headers: API.headers() });
    return r.json();
  },

  async getScans() {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/scans`, { headers: API.headers() });
    return r.json();
  },

  // ── Carpetas ──────────────────────────────────
  async getFolders() {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/folders`, { headers: API.headers() });
    return r.json();
  },

  async createFolder(name) {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/folders`, {
      method: 'POST',
      headers: API.headers(),
      body: JSON.stringify({ name })
    });
    return r.json();
  },

  // ── Perfil ────────────────────────────────────
  async getProfile() {
    const r = await fetch(`${QRFLEX_CONFIG.API_URL}/api/profile`, { headers: API.headers() });
    return r.json();
  },
};
