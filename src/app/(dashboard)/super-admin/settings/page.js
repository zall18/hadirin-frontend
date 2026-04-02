"use client";

import { useState } from "react";
import { Settings, Globe, Shield, MessageSquare, Save, Loader2 } from "lucide-react";

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState("umum");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    general: {
      appName: "Hadirin SaaS",
      contactEmail: "support@hadirin.com",
      maintenanceMode: false
    },
    weddingFeatures: {
      maxGuestsPerEvent: 1000,
      maxUploadSizeMB: 5,
      enablePublicRegistration: false
    },
    integrations: {
      whatsappGatewayUrl: "https://api.whatsapp-gateway.com/send",
      whatsappApiKey: "123456789ABCDEF"
    }
  });

  // Handle generic nested changes
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    // Mock API call `PUT /api/settings/platform`
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Settings className="w-8 h-8 text-rose-500" /> Pengaturan Platform
          </h1>
          <p className="text-slate-500 text-sm">
            Konfigurasi utama yang mengendalikan seluruh sistem aplikasi
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 text-sm disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Tersimpan!" : "Simpan Perubahan"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav Settings */}
        <aside className="md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab("umum")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "umum" 
                ? "bg-white text-rose-500 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]" 
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800 border border-transparent"
              }`}
            >
              <Globe className="w-5 h-5" />
              General (Umum)
            </button>

            <button 
              onClick={() => setActiveTab("fitur")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "fitur" 
                ? "bg-white text-rose-500 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]" 
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800 border border-transparent"
              }`}
            >
              <Shield className="w-5 h-5" />
              Batasan Fitur
            </button>

            <button 
              onClick={() => setActiveTab("integrasi")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "integrasi" 
                ? "bg-white text-rose-500 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]" 
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-800 border border-transparent"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Integrasi WA Gateway
            </button>
          </nav>
        </aside>

        {/* Content Form */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          
          {/* TAB UMUM */}
          {activeTab === "umum" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">Pengaturan Umum</h3>
              </div>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Aplikasi</label>
                  <input 
                    type="text" 
                    value={formData.general.appName} 
                    onChange={(e) => handleChange("general", "appName", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-2">Nama platform ini, ditampilkan di halaman depan dan meta data.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Dukungan</label>
                  <input 
                    type="email" 
                    value={formData.general.contactEmail} 
                    onChange={(e) => handleChange("general", "contactEmail", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-semibold text-slate-800">Mode Maintenance</h4>
                    <p className="text-xs text-slate-500">Kunci aplikasi sementara untuk pengguna luar jika ada perbaikan server.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.general.maintenanceMode}
                      onChange={(e) => handleChange("general", "maintenanceMode", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB FITUR */}
          {activeTab === "fitur" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">Batas Kuota Fitur</h3>
              </div>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Maksimal Tamu per Event</label>
                  <input 
                    type="number" 
                    value={formData.weddingFeatures.maxGuestsPerEvent} 
                    onChange={(e) => handleChange("weddingFeatures", "maxGuestsPerEvent", Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors"
                  />
                  <p className="text-xs text-slate-400 mt-2">Batas jumlah tamu yang bisa diimpor atau ditambahkan oleh Client per acara.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Maksimal Ukuran Upload (MB)</label>
                  <div className="relative">
                     <input 
                       type="number" 
                       value={formData.weddingFeatures.maxUploadSizeMB} 
                       onChange={(e) => handleChange("weddingFeatures", "maxUploadSizeMB", Number(e.target.value))}
                       className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors pr-12"
                     />
                     <span className="absolute right-4 top-3.5 text-slate-400 font-semibold text-sm">MB</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-semibold text-slate-800">Registrasi Klien Secara Publik</h4>
                    <p className="text-xs text-slate-500">Izinkan orang luar mandaftar sendiri sebagai Klien (Admin) via Landing Page.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.weddingFeatures.enablePublicRegistration}
                      onChange={(e) => handleChange("weddingFeatures", "enablePublicRegistration", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB INTEGRASI */}
          {activeTab === "integrasi" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">Integrasi Sender WhatsApp</h3>
              </div>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp Gateway API URL</label>
                  <input 
                    type="url" 
                    value={formData.integrations.whatsappGatewayUrl} 
                    onChange={(e) => handleChange("integrations", "whatsappGatewayUrl", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors font-mono text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-2">Dapatkan layanan pihak ketiga seperti Fonnte, Wablas, atau server local baileys Anda.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">API KEY Token</label>
                  <input 
                    type="password" 
                    value={formData.integrations.whatsappApiKey} 
                    onChange={(e) => handleChange("integrations", "whatsappApiKey", e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 bg-slate-50 transition-colors font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
