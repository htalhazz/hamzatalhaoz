"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
        ),
    },
    {
        label: "Projeler",
        href: "/admin/projects",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            </svg>
        ),
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        // Çıkış yaparken NextAuth signOut çağrılır
        signOut({ callbackUrl: "/" });
    };

    return (
        <>
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white text-black w-10 h-10 flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {mobileOpen ? <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
                </svg>
            </button>

            {mobileOpen && (
                <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r-2 border-black z-40 flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}>
                <div className="p-6 border-b-2 border-black">
                    <Link href="/" className="font-[family-name:var(--font-sora)] text-black font-bold text-lg uppercase tracking-tight">
                        HAMZA<span className="text-red-600">DEV</span>
                    </Link>
                    <p className="text-black/30 text-xs uppercase tracking-widest mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all ${isActive
                                        ? "bg-red-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                        : "text-black/50 hover:text-black hover:bg-black/5"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t-2 border-black/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-black/30 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Çıkış
                    </button>
                </div>
            </aside>
        </>
    );
}
