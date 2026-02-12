import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileSparkles } from "@/components/FileSparklesIcon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero with video background */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-hidden bg-muted">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          >
            <source src="/hero-bg.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60" aria-hidden />
          <div className="relative z-10 max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-block p-5 bg-atlassian-blue-light/90 dark:bg-atlassian-blue-dark/90 rounded-full mb-6 backdrop-blur-sm">
              <FileSparkles className="h-14 w-14 text-atlassian-blue dark:text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
              ResuMatch
            </h1>
            <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto drop-shadow-sm">
              See how well your resume matches any job. Upload your resume, paste the job description, and get instant feedback and suggestions to strengthen your application.
            </p>

            <Link to="/analyze">
              <Button size="lg" className="cute-button text-lg px-8 py-6 flex items-center gap-2 mx-auto shadow-lg">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
