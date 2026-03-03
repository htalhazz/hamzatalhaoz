"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Geliştirme",
    description:
      "Next.js ve React ile hızlı, SEO uyumlu ve responsive web uygulamaları geliştiriyorum.",
    features: ["Responsive Tasarım", "SEO Optimizasyonu", "Yüksek Performans"],
  },
  {
    number: "02",
    title: "Mobil Uygulama",
    description:
      "React Native ile iOS ve Android için tek kod tabanından native mobil uygulamalar oluşturuyorum.",
    features: ["Cross-Platform", "Native Performans", "App Store Yayını"],
  },
  {
    number: "03",
    title: "Backend & API",
    description:
      "Node.js, Express ve veritabanı teknolojileriyle güvenli ve ölçeklenebilir backend sistemleri kuruyorum.",
    features: ["REST & GraphQL", "Veritabanı Tasarımı", "Authentication"],
  },
  {
    number: "04",
    title: "UI/UX Tasarım",
    description:
      "Figma ile kullanıcı odaklı, modern ve estetik arayüz tasarımları oluşturuyorum.",
    features: ["Wireframe", "Prototip", "Kullanıcı Testi"],
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="relative bg-white py-24 md:py-32 overflow-hidden border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-red-600" />
            <span className="font-[family-name:var(--font-sora)] text-red-600 font-bold text-sm uppercase tracking-widest">
              Neler Yapıyorum
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black">
            Hizmetler
          </h2>
          <p className="text-black/50 max-w-xl text-lg">
            Projenizin ihtiyacına göre uçtan uca çözümler sunuyorum.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black"
        >
          {services.map((service, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              className={`group p-8 md:p-10 flex flex-col gap-5 hover:bg-red-600 transition-colors duration-200
                ${index < 2 ? "border-b-2 border-black" : ""}
                ${index % 2 === 0 ? "md:border-r-2 md:border-black" : ""}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-sora)] text-5xl font-bold text-black/10 group-hover:text-white/20 transition-colors">
                  {service.number}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-sora)] text-2xl md:text-3xl font-bold uppercase tracking-tight text-black group-hover:text-white transition-colors">
                {service.title}
              </h3>

              <p className="text-black/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs font-bold uppercase tracking-wide border-2 border-black/15 text-black/50 px-3 py-1 group-hover:border-white/30 group-hover:text-white/80 transition-colors"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
