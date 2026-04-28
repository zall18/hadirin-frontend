"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, X, CheckCircle, AlertCircle, Loader2, Camera, ShieldCheck } from "lucide-react";
import { authApi } from "@/api/auth";

export default function ProfileModal({ isOpen, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchProfile();
    } else {
      document.body.style.overflow = "unset";
      // Reset state when closed
      setSuccess(false);
      setError("");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await authApi.getProfile();
      if (response?.success) {
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          password: ""
        });
      }
    } catch (err) {
      setError("Gagal memuat profil.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      // Hanya kirim field yang ada isinya
      const payload = {
        name: formData.name,
        phone: formData.phone,
      };
      if (formData.password) {
        payload.password = formData.password;
      }
      
      const response = await authApi.updateProfile(payload);
      if (response?.success) {
        setSuccess(true);
        // Update local profile
        setProfile(prev => ({ ...prev, name: formData.name, phone: formData.phone }));
        setFormData(prev => ({ ...prev, password: "" })); // Clear password
        
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan profil.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  // Cek apakah role SUPER_ADMIN atau SUPERADMIN
  const isSuperAdmin = profile?.role === "SUPER_ADMIN" || profile?.role === "SUPERADMIN";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Profil Saya</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Kelola informasi personal akun Anda.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full bg-slate-100/50 hover:shadow-sm transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-48 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                <p className="text-sm font-medium text-slate-500">Memuat profil...</p>
             </div>
          ) : !profile ? (
             <div className="text-center py-10 text-slate-500">Data profil tidak ditemukan.</div>
          ) : (
             <>
               {/* Avatar Section */}
               <div className="flex flex-col items-center mb-8">
                 <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 border-4 border-white shadow-lg flex items-center justify-center text-rose-600 font-black text-3xl overflow-hidden">
                       {profile.avatarUrl ? (
                         <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                         profile.name.substring(0, 1).toUpperCase()
                       )}
                    </div>
                    {/* Placeholder for camera icon, currently static */}
                    {!isSuperAdmin && (
                      <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-rose-500 transition-colors border-2 border-white">
                         <Camera className="w-3 h-3" />
                      </button>
                    )}
                 </div>
                 <h3 className="mt-4 font-bold text-lg text-slate-800">{profile.name}</h3>
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-slate-100 text-slate-600 mt-2 uppercase">
                   {profile.role.replace("_", " ")}
                 </span>
               </div>

               <form id="profileForm" onSubmit={handleSubmit}>
                 {error && (
                   <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in slide-in-from-top-2">
                     <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-red-700">Gagal</p>
                        <p className="text-sm text-red-600 mt-0.5">{error}</p>
                     </div>
                   </div>
                 )}

                 {success && (
                   <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 animate-in slide-in-from-top-2">
                     <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-emerald-700">Berhasil</p>
                        <p className="text-sm text-emerald-600 mt-0.5">Profil berhasil diperbarui!</p>
                     </div>
                   </div>
                 )}

                 {isSuperAdmin && (
                    <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3 text-indigo-700 text-sm">
                       <ShieldCheck className="w-5 h-5 shrink-0" />
                       <p className="font-medium">Akun Super Admin bersifat terpusat dan tidak dapat diubah dari dashboard.</p>
                    </div>
                 )}

                 <div className="space-y-5">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Nama Lengkap
                     </label>
                     <div className="relative">
                       <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                       <input
                         type="text"
                         name="name"
                         required
                         disabled={isSuperAdmin}
                         value={formData.name}
                         onChange={handleInputChange}
                         className={`w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl transition-all text-sm outline-none font-semibold text-slate-800 ${isSuperAdmin ? "opacity-60 cursor-not-allowed bg-slate-50" : "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"}`}
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Email Akun
                     </label>
                     <div className="relative">
                       <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                       <input
                         type="email"
                         disabled
                         value={profile.email}
                         className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-500 opacity-80 cursor-not-allowed"
                       />
                     </div>
                     <p className="text-[11px] font-medium text-slate-400 mt-2">Email tidak dapat diubah karena terikat pada sistem utama.</p>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        No Handphone
                     </label>
                     <div className="relative">
                       <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                       <input
                         type="tel"
                         name="phone"
                         disabled={isSuperAdmin}
                         value={formData.phone}
                         onChange={handleInputChange}
                         className={`w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl transition-all text-sm outline-none font-semibold text-slate-800 ${isSuperAdmin ? "opacity-60 cursor-not-allowed bg-slate-50" : "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"}`}
                         placeholder="Belum diatur"
                       />
                     </div>
                   </div>

                   {!isSuperAdmin && (
                     <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Ganti Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="password"
                            name="password"
                            minLength="6"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-semibold text-slate-800"
                            placeholder="Biarkan kosong jika tidak ingin mengubah"
                          />
                        </div>
                     </div>
                   )}
                 </div>
               </form>
             </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="flex gap-3">
             <button
               type="button"
               onClick={onClose}
               className={`px-4 py-3.5 rounded-2xl text-slate-600 font-bold bg-slate-100 hover:bg-slate-200 transition-colors ${isSuperAdmin ? "w-full" : "flex-1"}`}
             >
               {isSuperAdmin ? "Tutup" : "Batal"}
             </button>
             {!isSuperAdmin && (
               <button
                 type="submit"
                 form="profileForm"
                 disabled={saving || loading || isSuperAdmin}
                 className="flex-[2] py-3.5 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgb(244,63,94,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
               >
                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Profil"}
               </button>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
