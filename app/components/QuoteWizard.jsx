"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serviceOptions = [
  {
    id: "web",
    label: "Web Geliştirme",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8" /><path d="M12 17v4" />
      </svg>
    ),
    packages: ["Starter (₺8.000'den)", "Profesyonel (₺20.000'den)", "Kurumsal (Özel Teklif)"],
  },
  {
    id: "mobile",
    label: "Mobil Uygulama",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    packages: ["Starter (₺15.000'den)", "Profesyonel (₺35.000'den)", "Kurumsal (Özel Teklif)"],
  },
  {
    id: "uiux",
    label: "UI/UX Tasarım",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" /><path d="M12 22v-2" /><path d="m17 20.66-1-1.73" />
        <path d="M11 10.27 7 3.34" /><path d="m20.66 17-1.73-1" /><path d="m3.34 7 1.73 1" />
        <path d="M14 12h8" /><path d="M2 12h2" /><path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" /><path d="m17 3.34-1 1.73" /><path d="m11 13.73-4 6.93" />
      </svg>
    ),
    packages: ["Starter (₺5.000'den)", "Profesyonel (₺12.000'den)", "Kurumsal (Özel Teklif)"],
  },
];

const budgetRanges = [
  "₺5.000 - ₺10.000",
  "₺10.000 - ₺25.000",
  "₺25.000 - ₺50.000",
  "₺50.000+",
  "Bütçem Esnek",
];

const timelineOptions = [
  "1 Hafta İçinde",
  "2-4 Hafta",
  "1-2 Ay",
  "3+ Ay",
  "Acil Değil",
];

const initialFormData = {
  service: "",
  package: "",
  projectDescription: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

export default function QuoteWizard({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const selectedService = serviceOptions.find((s) => s.id === formData.service);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setFormData(initialFormData);
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canProceedStep0 = formData.service && formData.package;
  const canProceedStep1 = formData.projectDescription && formData.budget && formData.timeline;
  const canProceedStep2 = formData.name && formData.email;

  const stepVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-xl md:text-2xl font-bold uppercase tracking-tight text-black">
              {submitted ? "Teşekkürler!" : "Teklif Al"}
            </h2>
            {!submitted && (
              <p className="text-black/40 text-sm mt-1">
                Adım {step + 1} / 3
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 border-2 border-black bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {!submitted && (
          <div className="h-1.5 bg-black/10">
            <motion.div
              className="h-full bg-red-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 bg-red-600 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold uppercase text-black">
                Talebiniz Alındı!
              </h3>
              <p className="text-black/50 max-w-md">
                En kısa sürede size dönüş yapacağız. Genellikle 24 saat içinde yanıt veriyoruz.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-black text-white font-bold text-sm uppercase tracking-wide px-8 py-3 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer"
              >
                Kapat
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {/* ADIM 1: Hizmet & Paket Seçimi */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] font-bold text-sm uppercase tracking-widest text-black/50 mb-4">
                      Hizmet Alanı
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {serviceOptions.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setFormData({ ...formData, service: s.id, package: "" })}
                          className={`flex flex-col items-center gap-3 p-5 border-2 transition-all cursor-pointer ${
                            formData.service === s.id
                              ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                              : "bg-white text-black border-black/20 hover:border-black"
                          }`}
                        >
                          {s.icon}
                          <span className="font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-wide">
                            {s.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedService && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="font-[family-name:var(--font-sora)] font-bold text-sm uppercase tracking-widest text-black/50 mb-4">
                        Paket
                      </h3>
                      <div className="flex flex-col gap-2">
                        {selectedService.packages.map((pkg) => (
                          <button
                            key={pkg}
                            onClick={() => setFormData({ ...formData, package: pkg })}
                            className={`text-left px-5 py-4 border-2 font-semibold text-sm transition-all cursor-pointer ${
                              formData.package === pkg
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-black border-black/20 hover:border-black"
                            }`}
                          >
                            {pkg}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ADIM 2: Proje Detayları */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      Projenizi Kısaca Anlatın *
                    </label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors resize-none"
                      placeholder="Ne tür bir proje düşünüyorsunuz? Temel özellikler neler olmalı?"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      Bütçe Aralığı *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-4 py-3 border-2 text-sm font-semibold transition-all cursor-pointer ${
                            formData.budget === b
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-black/20 hover:border-black"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      Zaman Planı *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          key={t}
                          onClick={() => setFormData({ ...formData, timeline: t })}
                          className={`px-4 py-3 border-2 text-sm font-semibold transition-all cursor-pointer ${
                            formData.timeline === t
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-black/20 hover:border-black"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ADIM 3: İletişim Bilgileri */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                        Şirket
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/30 bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="Opsiyonel"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-black/30 bg-white text-black font-medium focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  {/* Özet */}
                  <div className="bg-black/[0.03] border-2 border-black/10 p-5 flex flex-col gap-2">
                    <h4 className="font-[family-name:var(--font-sora)] font-bold text-xs uppercase tracking-widest text-black/50">
                      Teklif Özeti
                    </h4>
                    <div className="text-sm text-black/70 flex flex-col gap-1">
                      <p><span className="font-semibold text-black">Hizmet:</span> {selectedService?.label}</p>
                      <p><span className="font-semibold text-black">Paket:</span> {formData.package}</p>
                      <p><span className="font-semibold text-black">Bütçe:</span> {formData.budget}</p>
                      <p><span className="font-semibold text-black">Süre:</span> {formData.timeline}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Footer Actions */}
        {!submitted && (
          <div className="flex items-center justify-between p-6 border-t-2 border-black">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              className={`font-bold text-sm uppercase tracking-wide px-6 py-3 border-3 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all cursor-pointer ${
                step === 0
                  ? "opacity-40 pointer-events-none"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              Geri
            </button>

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
                className="bg-black text-white font-bold text-sm uppercase tracking-wide px-8 py-3 border-2 border-black hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              >
                İleri
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceedStep2}
                className="bg-red-600 text-white font-bold text-sm uppercase tracking-wide px-8 py-3 border-2 border-red-600 hover:bg-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              >
                Teklif Gönder
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
