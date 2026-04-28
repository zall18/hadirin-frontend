"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ClientModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
  isSubmitting,
  error,
  success
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isActive: true
  });

  useEffect(() => {
    if (initialData && mode === "EDIT") {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "", // Kosongkan password saat edit, diubah jika diketik
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
    } else {
      setFormData({ name: "", email: "", phone: "", password: "", isActive: true });
    }
    
    // Prevent body scroll when modal is open
    if (isOpen) {
       document.body.style.overflow = "hidden";
    } else {
       document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [initialData, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Dimmed Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Centered Modal Content */}
      <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {mode === "CREATE" ? "Registrasi Klien Baru" : "Edit Klien / Admin"}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {mode === "CREATE" ? "Tambahkan akun Organizer baru ke platform." : "Perbarui informasi akun Organizer."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full bg-white border border-transparent hover:border-slate-200 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar max-h-[calc(100vh-200px)]">
          <form id="clientForm" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                   <p className="text-sm font-bold text-red-700">Terjadi Kesalahan</p>
                   <p className="text-sm text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                   <p className="text-sm font-bold text-emerald-700">Berhasil</p>
                   <p className="text-sm text-emerald-600 mt-0.5">Data klien telah sukses disimpan!</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                   Nama Organizer <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 focus:bg-white transition-all text-sm outline-none placeholder:text-slate-400 font-semibold text-slate-800"
                    placeholder="Contoh: Budi Wedding Organizer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Email Klien <span className="text-rose-500">*</span>
                   </label>
                   <div className="relative">
                     <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                     <input
                       type="email"
                       name="email"
                       required
                       value={formData.email}
                       onChange={handleInputChange}
                       className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 focus:bg-white transition-all text-sm outline-none placeholder:text-slate-400 font-semibold text-slate-800"
                       placeholder="admin@wo.com"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      No Handphone <span className="text-rose-500">*</span>
                   </label>
                   <div className="relative">
                     <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                     <input
                       type="tel"
                       name="phone"
                       required
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 focus:bg-white transition-all text-sm outline-none placeholder:text-slate-400 font-semibold text-slate-800"
                       placeholder="Contoh: 08123456789"
                     />
                   </div>
                 </div>
              </div>

              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                   Kata Sandi {mode === "CREATE" && <span className="text-rose-500">*</span>}
                 </label>
                 <div className="relative">
                   <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                   <input
                     type="password"
                     name="password"
                     required={mode === "CREATE"}
                     minLength="6"
                     value={formData.password}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-semibold text-slate-800"
                     placeholder={mode === "CREATE" ? "Minimal 6 karakter" : "Biarkan kosong jika tidak diubah"}
                   />
                 </div>
                 {mode === "EDIT" && (
                    <p className="text-[11px] font-medium text-slate-500 mt-2">
                       Abaikan kolom ini jika Anda tidak ingin mereset password akun klien.
                    </p>
                 )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-slate-600 font-bold bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            form="clientForm"
            disabled={isSubmitting || success}
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Klien"}
          </button>
        </div>

      </div>
    </div>
  );
}
