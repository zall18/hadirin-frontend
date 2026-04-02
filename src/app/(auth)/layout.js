export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left side: Branding / Image */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between overflow-hidden">
        {/* Soft pink gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 opacity-90 z-10"></div>
        
        {/* Abstract decorative circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 z-0"></div>

        <div className="relative z-20 p-12 text-white mt-12">
          <div className="inline-flex items-center gap-2 mb-8">
             <div className="bg-rose-500 p-2 rounded-xl">
               {/* Simulating a heart icon since lucide might not be loaded in layout without client directive */}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
               </svg>
             </div>
             <span className="font-bold text-2xl tracking-tight text-white">Hadirin</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Momen bahagia,<br />
            tersusun rapi.
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            Kelola tamu undangan, check-in QR code, dan laporan kehadiran dalam satu dashboard terpusat.
          </p>
        </div>

        <div className="relative z-20 p-12">
          <blockquote className="space-y-4">
            <p className="text-lg font-medium text-slate-300">
              "Platform ini mengubah antrean panjang buku tamu menjadi check-in dalam hitungan detik. Sangat direkomendasikan untuk Wedding Organizer."
            </p>
            <footer className="text-sm">
              <span className="text-white font-semibold">Sarah & Budi</span>
              <span className="text-slate-400"> — Klien Hadirin</span>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right side: Form (children) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
