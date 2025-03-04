import { Heart, Music, Star, Sparkles, Users, Disc, Calendar, Zap, Ticket, ShoppingBag } from "lucide-react";
import Layout from "@/component/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 flex items-center justify-center relative overflow-hidden p-4">
        {/* Floating decorative elements with improved animation */}
        <div className="absolute top-10 left-10 text-pink-500 animate-bounce">
          <Heart size={32} />
        </div>
        <div className="absolute top-20 right-20 text-purple-400 animate-pulse hidden sm:block">
          <Star size={28} />
        </div>
        <div className="absolute bottom-10 left-20 text-pink-400 animate-spin">
          <Music size={24} />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-500 animate-bounce hidden sm:block">
          <Sparkles size={30} />
        </div>
        <div className="absolute top-1/3 left-1/4 text-pink-500 animate-pulse hidden md:block">
          <Star size={20} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-purple-400 animate-bounce hidden md:block">
          <Music size={24} />
        </div>
        
        {/* Additional floating elements for more cuteness */}
        <div className="absolute top-1/2 right-1/3 text-pink-600 animate-ping hidden sm:block">
          <Heart size={18} />
        </div>
        <div className="absolute bottom-1/2 left-1/3 text-purple-500 animate-pulse">
          <Sparkles size={22} />
        </div>
        
        {/* Background decoration bubbles with improved opacity and blur */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-pink-300 opacity-20 blur-sm hidden md:block"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-sm hidden md:block"></div>
        <div className="absolute top-2/3 left-10 w-16 h-16 rounded-full bg-pink-300 opacity-20 blur-sm"></div>
        <div className="absolute top-10 right-1/4 w-20 h-20 rounded-full bg-purple-300 opacity-20 blur-sm hidden md:block"></div>
        
        {/* Additional background elements */}
        <div className="absolute bottom-1/3 left-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-purple-300 to-pink-200 opacity-20 blur-sm hidden lg:block"></div>
        <div className="absolute top-1/2 right-1/2 w-16 h-16 rounded-full bg-gradient-to-tl from-pink-400 to-purple-300 opacity-20 blur-sm hidden sm:block"></div>
        
        {/* Main card with enhanced styling */}
        <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full border border-pink-200 relative z-10 transform transition-all hover:scale-102">
          {/* Header with cute badge */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                H2H Fanzone
              </h1>
              <div className="ml-2 px-2 py-1 bg-pink-100 rounded-full text-pink-600 text-xs font-semibold hidden sm:block">
                Cute!
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full">
              <Sparkles className="text-white" size={20} />
            </div>
          </div>
          
          {/* Welcome message with enhanced typography */}
          <div className="space-y-6">
            <p className="text-sm md:text-base text-purple-800 leading-relaxed border-l-4 border-pink-300 pl-3 py-1">
              Selamat datang di pengalaman K-pop terbaik! Bagikan kecintaan Anda
              untuk grup favorit di sini.
            </p>
            
            {/* Featured card with improved styling */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 md:p-5 border border-pink-200 shadow-sm">
              <div className="flex items-center mb-3">
                <Star className="text-pink-500 mr-2" size={18} />
                <h2 className="text-md md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
                  Artis Unggulan
                </h2>
              </div>
              <p className="text-sm md:text-base text-purple-700">
                Lihat rilisan terbaru dan pembaruan dari idol favorit Anda!
              </p>
            </div>
            
            {/* Navigation grid with cute icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <Link href="/dashboard/biodata">
                <button className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl flex flex-col items-center justify-center gap-2 hover:from-pink-600 hover:to-pink-700 transition-all shadow-sm hover:shadow w-full">
                  <Heart size={18} />
                  <span className="text-xs md:text-sm font-medium">Biodata</span>
                </button>
              </Link>
              <Link href="/dashboard/playlist">
                <button className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl flex flex-col items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm hover:shadow w-full">
                  <Music size={18} />
                  <span className="text-xs md:text-sm font-medium">Playlist</span>
                </button>
              </Link>
              <Link href="/dashboard/konser">
                <button className="p-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl flex flex-col items-center justify-center gap-2 hover:from-pink-500 hover:to-purple-500 transition-all shadow-sm hover:shadow w-full">
                  <Ticket size={18} />
                  <span className="text-xs md:text-sm font-medium">Konser</span>
                </button>
              </Link>
              <Link href="/dashboard/merchandise">
                <button className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl flex flex-col items-center justify-center gap-2 hover:from-purple-500 hover:to-pink-500 transition-all shadow-sm hover:shadow w-full">
                  <ShoppingBag size={18} />
                  <span className="text-xs md:text-xs font-medium">Merchandise</span>
                </button>
              </Link>
            </div>
            
            {/* New section: Popular content */}
            <div className="mt-4 bg-white bg-opacity-70 rounded-lg p-4 border border-pink-100">
              <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
                <Zap className="text-pink-500 mr-1" size={16} /> Popular Now
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-purple-600 p-2 bg-pink-50 rounded-md">
                  <Disc size={14} className="mr-2 text-pink-400" />
                  <span>New album releases this week!</span>
                </div>
                <div className="flex items-center text-xs text-purple-600 p-2 bg-pink-50 rounded-md">
                  <Calendar size={14} className="mr-2 text-pink-400" />
                  <span>Upcoming fan meetings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

