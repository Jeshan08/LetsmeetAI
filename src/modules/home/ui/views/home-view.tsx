"use client"
import  Link  from "next/link";

export const HomeView = () => {

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-0 -z-10 h-full w-full overflow-hidden">
           <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#10b981] opacity-[0.08] blur-[120px]"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#064e3b] mb-6">
          Intelligence for <br /> Every Interaction.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Automate your meetings with custom AI agents. Real-time transcription, 
          intelligent summaries, and seamless collaboration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/meetings" 
            className="px-10 py-4 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-200"
          >
            Get Started
          </Link>
          
          <Link 
            href="/agents" 
            className="px-10 py-4 bg-white border border-gray-200 text-[#064e3b] font-semibold rounded-lg hover:bg-gray-50 transition-all"
          >
            View Agents
          </Link>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100">
        © 2026 LetsMeet.AI • Created By Jeshan Chhabra
      </footer>
    </div>
  );
}