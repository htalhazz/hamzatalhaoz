"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const fetchQuotes = async () => {
        try {
            const res = await fetch("/api/quotes");
            const data = await res.json();
            setQuotes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Teklifler alınamadı:", error);
            setQuotes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await fetch(`/api/quotes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchQuotes();
            if (selectedQuote && selectedQuote._id === id) {
                setSelectedQuote({ ...selectedQuote, status: newStatus });
            }
        } catch (error) {
            console.error("Durum güncellenemedi:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Bu teklifi silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(`/api/quotes/${id}`, { method: "DELETE" });
            setSelectedQuote(null);
            fetchQuotes();
        } catch (error) {
            console.error("Teklif silinemedi:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Yeni": return "bg-red-600 text-white";
            case "Okundu": return "bg-blue-600 text-white";
            case "Yanıtlandı": return "bg-green-600 text-white";
            default: return "bg-gray-200 text-black";
        }
    };

    return (
        <div className="p-6 md:p-10">
            <div className="mb-10">
                <h1 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
                    Gelen Teklifler
                </h1>
                <p className="text-black/40 text-sm mt-2">Müşterilerden gelen proje taleplerini görüntüleyin ve yönetin.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sol Taraf - Liste */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold uppercase tracking-tight text-black/50 mb-2">
                        Tüm Teklifler ({quotes.length})
                    </h2>

                    {loading ? (
                        <div className="p-10 text-center text-sm font-bold uppercase tracking-wide text-black/30 bg-white border-2 border-black/10">Yükleniyor...</div>
                    ) : quotes.length === 0 ? (
                        <div className="p-10 text-center text-sm font-bold uppercase tracking-wide text-black/30 bg-white border-2 border-black/10">
                            Henüz teklif bulunmuyor.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {quotes.map((quote) => (
                                <button
                                    key={quote._id}
                                    onClick={() => {
                                        setSelectedQuote(quote);
                                        if (quote.status === "Yeni") handleUpdateStatus(quote._id, "Okundu");
                                    }}
                                    className={`text-left p-5 border-2 transition-all cursor-pointer ${selectedQuote?._id === quote._id
                                        ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                                        : "bg-white text-black border-black/20 hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-[family-name:var(--font-sora)] font-bold text-lg leading-tight">
                                            {quote.name}
                                        </h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${getStatusColor(quote.status)}`}>
                                            {quote.status}
                                        </span>
                                    </div>
                                    <div className={`text-sm ${selectedQuote?._id === quote._id ? "text-white/70" : "text-black/60"} line-clamp-1`}>
                                        {quote.service} - {quote.package}
                                    </div>
                                    <div className={`text-xs mt-3 font-semibold ${selectedQuote?._id === quote._id ? "text-white/50" : "text-black/40"}`}>
                                        {new Date(quote.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sağ Taraf - Detay */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-10">
                    <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold uppercase tracking-tight text-black/50 mb-2">
                        Teklif Detayı
                    </h2>

                    {selectedQuote ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={selectedQuote._id}
                            className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-black/10">
                                <div>
                                    <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold uppercase text-black">
                                        {selectedQuote.name}
                                    </h3>
                                    {selectedQuote.company && (
                                        <p className="text-black/50 font-medium">{selectedQuote.company}</p>
                                    )}
                                </div>

                                <select
                                    value={selectedQuote.status}
                                    onChange={(e) => handleUpdateStatus(selectedQuote._id, e.target.value)}
                                    className={`text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 border-transparent focus:outline-none cursor-pointer ${getStatusColor(selectedQuote.status)}`}
                                >
                                    <option value="Yeni" className="bg-white text-black">Yeni</option>
                                    <option value="Okundu" className="bg-white text-black">Okundu</option>
                                    <option value="Yanıtlandı" className="bg-white text-black">Yanıtlandı</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="flex flex-col gap-1 border-b-2 border-black/5 pb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">Hizmet Alanı</span>
                                    <span className="text-sm font-bold text-black">{selectedQuote.service}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b-2 border-black/5 pb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">Seçilen Paket</span>
                                    <span className="text-sm font-bold text-black">{selectedQuote.package}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b-2 border-black/5 pb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">Bütçe</span>
                                    <span className="text-sm font-bold text-black">{selectedQuote.budget}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b-2 border-black/5 pb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">Zaman Planı</span>
                                    <span className="text-sm font-bold text-black">{selectedQuote.timeline}</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-2">Proje Özeti</span>
                                <p className="text-sm leading-relaxed bg-black/5 p-4 border border-black/10">
                                    {selectedQuote.projectDescription}
                                </p>
                            </div>

                            <div className="mb-8 pb-8 border-b-2 border-black/10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-2">İletişim Bilgileri</span>
                                <div className="flex flex-col gap-2">
                                    <a href={`mailto:${selectedQuote.email}`} className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        {selectedQuote.email}
                                    </a>
                                    {selectedQuote.phone && (
                                        <a href={`tel:${selectedQuote.phone}`} className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            {selectedQuote.phone}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(selectedQuote._id)}
                                className="w-full flex items-center justify-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest py-3 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                Teklifi Sil
                            </button>
                        </motion.div>
                    ) : (
                        <div className="bg-white border-2 border-black/10 p-10 flex flex-col items-center justify-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-black/10 mb-4">
                                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                            </svg>
                            <p className="text-sm font-bold uppercase tracking-wide text-black/30">
                                Detayları görmek için listeden<br />bir teklif seçin
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
