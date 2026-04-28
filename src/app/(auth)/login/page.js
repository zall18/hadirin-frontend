"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { authApi } from "@/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const responseData = await authApi.login({
        email,
        password,
      });

      if (responseData?.success) {
        const { user, tokens } = responseData.data;
        
        // Since backend sets HTTP-only cookies in production, we might not need to manually set it.
        // But if we need client-side JS to know the token temporarily, we can do:
        if (tokens.accessToken) {
          Cookies.set("token", tokens.accessToken, { expires: 7 }); // 7 days
          Cookies.set("refreshToken", tokens.refreshToken, { expires: 7 });
          Cookies.set("userRole", user.role); // Useful for client-side quick checks
        }

        // Role-based redirection
        switch (user.role) {
          case "SUPERADMIN":
          case "SUPER_ADMIN":
            router.push("/super-admin");
            break;
          case "ADMIN":
            // Assuming Admin maps to organizer or client dashboard based on specific need
            // PRD structure mentions super-admin, organizer, client, staff
            router.push("/organizer"); 
            break;
          case "STAFF":
            router.push("/staff");
            break;
          default:
            router.push("/dashboard");
        }
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
         setError("Gagal masuk. Silakan periksa koneksi atau kredensial Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-rose-500 focus:border-rose-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                placeholder="admin@email.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-rose-500 hover:text-rose-600">
                Lupa password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-rose-500 focus:border-rose-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-rose-200 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </button>

        <div className="text-center text-sm text-slate-600 mt-6">
          Belum punya akun?{" "}
          <Link href="/" className="font-semibold text-rose-500 hover:text-rose-600">
            Hubungi kami untuk mendaftar
          </Link>
        </div>
      </form>
    </>
  );
}
