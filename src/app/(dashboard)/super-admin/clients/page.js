"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import ClientHeader from "./components/ClientHeader";
import ClientTable from "./components/ClientTable";
import ClientModal from "./components/ClientModal";

export default function ClientsManagementPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" | "EDIT"
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/admin/");
      if (response.data?.success) {
        setClients(response.data.data.admins);
      }
    } catch (err) {
      console.error("Gagal mengambil data admin:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openModal = (mode, client = null) => {
    setModalMode(mode);
    setSelectedClient(client);
    setSuccess(false);
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      if (modalMode === "CREATE") {
        await axiosInstance.post("/api/admin/", formData);
      } else {
        // Buat payload untuk edit (jangan kirim password jika kosong)
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await axiosInstance.put(`/api/admin/${selectedClient.id}`, payload);
      }
      
      setSuccess(true);
      fetchClients(); // Refresh data
      
      setTimeout(() => {
        closeModal();
        setSuccess(false);
      }, 1000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
         setError(`Gagal ${modalMode === "CREATE" ? "menambahkan" : "memperbarui"} admin.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus sistem untuk admin "${name}"?`)) return;
    
    try {
      await axiosInstance.delete(`/api/admin/${id}`);
      setClients(clients.filter(c => c.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus admin");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
       // Optimistic UI update
       setClients(clients.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
       await axiosInstance.patch(`/api/admin/${id}/toggle-status`);
    } catch (err) {
       // Revert UI Update on failure
       setClients(clients.map(c => c.id === id ? { ...c, isActive: currentStatus } : c));
       alert(err.response?.data?.message || "Gagal mengubah status admin");
    }
  };

  return (
    <>
      <ClientHeader onAddClick={() => openModal("CREATE")} />

      <ClientTable 
        clients={clients} 
        isLoading={isLoading} 
        onToggleStatus={handleToggleStatus}
        onEdit={(client) => openModal("EDIT", client)}
        onDelete={handleDelete}
      />

      <ClientModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedClient}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
      />
    </>
  );
}
