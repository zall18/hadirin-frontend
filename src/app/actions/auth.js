"use server";

import { cookies } from "next/headers";

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    
    // Pastikan untuk menghapus cookie dengan parameter yang sesuai dengan saat cookie itu diatur
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
    cookieStore.delete("userRole");
}
