"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShieldCheck, Plus, Mail, Lock, Phone, User, X, CheckCircle, AlertCircle, Loader2, Edit, Trash2, ArrowLeft, Calendar } from "lucide-react";
import { staffApi } from "@/api/staff";

const AVAILABLE_PERMISSIONS = [
  { id: "CHECK_IN", label: "Manual Check-In" },
  { id: "SCAN_QR", label: "Scan QR Barcode" },
  { id: "VIEW_GUEST", label: "View Guest List" },
  { id: "MANAGE_GUEST", label: "Manage Guest Data" }
];

export default function EventStaffManagementPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.eventId;

  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" | "EDIT"
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    permissions: ["CHECK_IN", "SCAN_QR"],
    isTemporary: true,
    expiresAt: ""
  });

  const fetchStaffs = async () => {
    setIsLoading(true);
    try {
      const responseData = await staffApi.getStaffList(eventId);
      if (responseData?.success) {
        setStaffs(responseData.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data staff event:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchStaffs();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "isTemporary") {
       setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "checkbox") {
       // Permissions array handling
       setFormData(prev => {
         const currentPerms = new Set(prev.permissions);
         if (checked) currentPerms.add(value);
         else currentPerms.delete(value);
         return { ...prev, permissions: Array.from(currentPerms) };
       });
    } else {
       setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openModal = (mode, staffItem = null) => {
    setModalMode(mode);
    setSuccess(false);
    setError("");
    if (mode === "EDIT" && staffItem) {
      setSelectedId(staffItem.id);
      setFormData({
        name: staffItem.user?.name || "",
        email: staffItem.user?.email || "",
        phone: staffItem.user?.phone || "",
        password: "", // Kosongkan password saat edit
        permissions: staffItem.permissions || [],
        isTemporary: staffItem.isTemporary || false,
        expiresAt: staffItem.expiresAt ? new Date(staffItem.expiresAt).toISOString().split('T')[0] : ""
      });
    } else {
      setSelectedId(null);
      
      // Default expiry is +1 week from now
      const defaultExpiryDate = new Date();
      defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 7);
      
      setFormData({ 
        name: "", email: "", phone: "", password: "", 
        permissions: ["CHECK_IN", "SCAN_QR"], 
        isTemporary: true, 
        expiresAt: defaultExpiryDate.toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Format payload (ensure expiresAt is a full ISO if necessary, backend might handle date strings)
      const payload = { ...formData };
      if (!payload.password) delete payload.password;
      if (payload.isTemporary && payload.expiresAt) {
         payload.expiresAt = new Date(payload.expiresAt).toISOString();
      }

      if (modalMode === "CREATE") {
        await staffApi.createStaff(eventId, payload);
      } else {
        await staffApi.updateStaff(eventId, selectedId, payload);
      }
      
      setSuccess(true);
      fetchStaffs(); // Refresh data
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 1000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
         setError(`Gagal ${modalMode === "CREATE" ? "menambahkan" : "memperbarui"} staff.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Cabut akses sistem untuk Staff "${name}" pada event ini?`)) return;
    
    try {
      await staffApi.deleteStaff(eventId, id);
      setStaffs(staffs.filter(s => s.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus akses staff");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <button 
             onClick={() => router.push('/organizer')}
             className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-3"
          >
             <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Event Saya
          </button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-rose-500" /> Event Staff Team
          </h1>
          <p className="text-slate-500 text-sm">
            Kelola panitia, penjaga buku tamu, dan kru bertugas untuk event ID: {eventId}.
          </p>
        </div>
        <button 
          onClick={() => openModal("CREATE")}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Staff Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
                <tr>
                   <th className="px-6 py-4">Nama & Kontak</th>
                   <th className="px-6 py-4">Role & Hak Akses</th>
                   <th className="px-6 py-4">Masa Berlaku</th>
                   <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-rose-500 mx-auto" />
                    </td>
                  </tr>
                ) : staffs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                      Anda belum menambahkan anggota staff di acara ini.
                    </td>
                  </tr>
                ) : staffs.map((staff) => (
                   <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                         <p className="font-bold text-slate-900 text-base">{staff.user?.name}</p>
                         <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400"/> {staff.user?.email}</p>
                         {staff.user?.phone && (
                            <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400"/> {staff.user?.phone}</p>
                         )}
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 mb-2">
                             {staff.role}
                         </span>
                         <div className="flex flex-wrap gap-1.5">
                            {staff.permissions?.map(p => (
                               <span key={p} className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded text-[10px] font-medium">
                                  {p.replace("_", " ")}
                               </span>
                            ))}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         {staff.isTemporary && staff.expiresAt ? (
                            <div>
                               <p className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block mb-1 border border-amber-100">TEMPORARY</p>
                               <p className="text-xs text-slate-500">Berakhir: {new Date(staff.expiresAt).toLocaleDateString("id-ID")}</p>
                            </div>
                         ) : (
                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">PERMANENT</span>
                         )}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button 
                             onClick={() => openModal("EDIT", staff)}
                             title="Edit Izin"
                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                           >
                             <Edit className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => handleDelete(staff.id, staff.user?.name)}
                             title="Cabut Akses Staff"
                             className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* Modal Add/Edit Staff */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 pt-10 pb-10 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-[scale-up_0.2s_ease-out] my-auto">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">
                {modalMode === "CREATE" ? "Tambahkan Staff Event" : "Edit Hak Akses Staff"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
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
                  <CheckCircle className="w-5 h-5 shrink-0" /> <p>Data Staff berhasil disimpan!</p>
                </div>
              )}

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* User Identitas */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2">
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                     <div className="relative">
                       <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                       <input 
                         type="text" name="name" required
                         value={formData.name} onChange={handleInputChange}
                         className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                         placeholder="Misal: Rizky Pratama"
                       />
                     </div>
                   </div>
                   
                   <div className="col-span-2 sm:col-span-1">
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Akses</label>
                     <div className="relative">
                       <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                       <input 
                         type="email" name="email" required
                         value={formData.email} onChange={handleInputChange}
                         className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                         placeholder="staff@contoh.com"
                       />
                     </div>
                   </div>

                   <div className="col-span-2 sm:col-span-1">
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">No Handphone</label>
                     <div className="relative">
                       <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                       <input 
                         type="tel" name="phone" required
                         value={formData.phone} onChange={handleInputChange}
                         className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900"
                         placeholder="0812..."
                       />
                     </div>
                   </div>
                </div>

                {/* Password Box */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                     Password {modalMode === "EDIT" && <span className="font-normal text-slate-400 text-xs ml-1">(Kosongkan jika tidak ubah)</span>}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" name="password" 
                      required={modalMode === "CREATE"} 
                      minLength="6"
                      value={formData.password} onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none placeholder:text-slate-400 font-medium text-slate-900 bg-white"
                      placeholder={modalMode === "CREATE" ? "Sandi untuk staff login" : "Abaikan jika sama"}
                    />
                  </div>
                </div>

                {/* Permissions */}
                <div>
                   <label className="block text-sm font-bold text-slate-900 mb-2">Hak Akses Fitur (Permissions)</label>
                   <div className="grid grid-cols-2 gap-3">
                      {AVAILABLE_PERMISSIONS.map(perm => (
                         <label key={perm.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                            <input 
                               type="checkbox" 
                               value={perm.id}
                               checked={formData.permissions.includes(perm.id)}
                               onChange={handleInputChange}
                               className="w-4 h-4 text-rose-500 rounded border-slate-300 focus:ring-rose-500"
                            />
                            <span className="text-sm font-medium text-slate-700">{perm.label}</span>
                         </label>
                      ))}
                   </div>
                </div>

                {/* Expiration Settings */}
                <div className="border-t border-slate-100 pt-4 mt-2">
                   <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                         type="checkbox" 
                         name="isTemporary"
                         checked={formData.isTemporary}
                         onChange={handleInputChange}
                         className="w-4 h-4 text-rose-500 rounded border-slate-300 focus:ring-rose-500"
                      />
                      <span className="text-sm font-bold text-slate-900">Akses Terbatas Waktu (Temporary)</span>
                   </label>
                   
                   {formData.isTemporary && (
                     <div className="mt-3 relative ml-7">
                        <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                          type="date" name="expiresAt" required={formData.isTemporary}
                          value={formData.expiresAt} onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm outline-none font-medium text-slate-900"
                        />
                        <p className="text-[11px] text-slate-500 mt-1.5 ml-1">Setelah tanggal ini, Staff otomatis tidak bisa login.</p>
                     </div>
                   )}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="w-full py-4 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-rose-200 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (modalMode === "CREATE" ? "Buat Akses Staff" : "Simpan Pembaruan")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
