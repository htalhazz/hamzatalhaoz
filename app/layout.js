import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Hamza Talha | Software Developer",
  description: "Modern web ve mobil uygulamalar geliştiren yazılım geliştirici portfolyo sitesi",
  openGraph: {
    title: "Hamza Talha | Software Developer",
    description: "Modern web ve mobil uygulamalar geliştiren yazılım geliştirici portfolyo sitesi",
    url: "https://hamzatalhaoz.com",
    siteName: "Hamza Talha Portfolio",
    images: [
      {
        url: "/profil.png", // Ana profil resmi veya genel bir kapak fotoğrafı olabilir.
        width: 800,
        height: 600,
        alt: "Hamza Talha Portfolio Kapak Görseli",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Talha | Software Developer",
    description: "Modern web ve mobil uygulamalar geliştiren yazılım geliştirici portfolyo sitesi",
    images: ["/profil.png"], // Twitter için büyük kapak fotoğrafı
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
