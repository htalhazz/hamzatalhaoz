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
