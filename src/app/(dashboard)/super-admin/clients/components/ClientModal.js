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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-[scale-up_0.2s_ease-out]">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">
            {mode === "CREATE" ? "Registrasi Klien Baru" : "Edit Klien / Admin"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" /> <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-sm flex items-start gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" /> <p>Akun klien berhasil disimpan!</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Organizer</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                  placeholder="Misal: Budi Wedding Organizer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Klien</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                  placeholder="admin3@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">No Handphone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                  placeholder="087831344214"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password{" "}
                {mode === "EDIT" && (
                  <span className="font-normal text-slate-400 text-xs ml-1">
                    (Kosongkan jika tidak ingin mengubah)
                  </span>
                )}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required={mode === "CREATE"}
                  minLength="6"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                  placeholder={mode === "CREATE" ? "Minimal 6 karakter" : "Biarkan kosong jika tidak diubah"}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full py-3.5 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-rose-200 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Data Klien"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
