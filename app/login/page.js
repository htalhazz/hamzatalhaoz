"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn("credentials", {
            password: pass,
            redirect: false,
        });

        if (res?.error) {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className={`w-full max-w-md transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
                <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
                    <div className="bg-red-600 p-6 border-b-2 border-black">
                        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold uppercase tracking-tight text-white">
                            Admin Panel
                        </h1>
                        <p className="text-white/70 text-sm mt-1">Devam etmek için giriş yapın</p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                                Şifre
                            </label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => { setPass(e.target.value); setError(false); }}
                                className={`w-full px-4 py-3.5 bg-white border-2 text-black font-medium focus:outline-none transition-colors ${error ? "border-red-500" : "border-black/20 focus:border-red-600"
                                    }`}
                                placeholder="••••••••"
                                autoFocus
                                disabled={loading}
                            />
                            {error && (
                                <span className="text-red-500 text-xs font-bold uppercase tracking-wide">
                                    Yanlış şifre
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white font-bold text-sm uppercase tracking-widest px-6 py-3.5 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                        </button>
                    </form>
                </div>
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 mt-6 text-black/30 hover:text-black/60 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                    </svg>
                    Siteye Dön
                </Link>
            </div>
        </div>
    );
}
