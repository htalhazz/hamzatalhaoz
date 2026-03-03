"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Packages from "./components/Packages";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuoteWizard from "./components/QuoteWizard";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteOpen={() => setQuoteOpen(true)} />
        <Packages onQuoteOpen={() => setQuoteOpen(true)} />
        <Projects />
        <Skills />
        <About />
        <Testimonials />
        <Contact onQuoteOpen={() => setQuoteOpen(true)} />
      </main>
      <Footer />
      <QuoteWizard isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
