"use client";


import Layout from "@/component/layout";
import Image from "next/image";
import { Heart, Music, Calendar, Clock, MoreHorizontal } from "lucide-react";

export default function Biodata() {
  const members = [
    {
      id: 1,
      name: "Carmen",
      fullName: "Nyoman Ayu Carmenita",
      position: "Vocalist",
      birthdate: "28 Maret 2006",
      zodiac: "Aries",
      nationality: "Indonesia",
      hobbies: "Bermain piano",
      funFact: "Idol pertama asal Indonesia yang debut di bawah SM Entertainment.",
      imageUrl: "/images/carmen.png",
      color: "bg-blue-100"
    },
    {
      id: 2,
      name: "Jiwoo",
      fullName: "Choi Ji Woo",
      position: "Leader",
      birthdate: "7 September 2006",
      zodiac: "Virgo",
      nationality: "Korea Selatan",
      hobbies: "Balet",
      funFact: "Memiliki tinggi badan 170 cm dan latar belakang sebagai penari balet.",
      imageUrl: "/images/choi-jiwo.png",
      color: "bg-pink-100"
    },
    {
      id: 3,
      name: "Yuha",
      fullName: "Yu Ha Ram",
      position: "Vocalist",
      birthdate: "12 April 2007",
      zodiac: "Aries",
      nationality: "Korea Selatan",
      hobbies: "Menonton film Disney",
      funFact: "Dikenal memiliki visual yang menawan dan diprediksi menjadi face of the group.",
      imageUrl: "/images/yuha.png",
      color: "bg-purple-100"
    },
    {
      id: 4,
      name: "Stella",
      fullName: "Im Ha Yoon",
      position: "Main Dancer",
      birthdate: "18 Juni 2007",
      zodiac: "Gemini",
      nationality: "Korea Selatan",
      hobbies: "Menari freestyle",
      funFact: "Pernah menjadi model iklan sebelum debut.",
      imageUrl: "/images/stella.png",
      color: "bg-green-100"
    },
    {
      id: 5,
      name: "Juun",
      fullName: "Kim Joo Eun",
      position: "All-rounder",
      birthdate: "3 Desember 2008",
      zodiac: "Sagitarius",
      nationality: "Korea Selatan",
      hobbies: "Menulis lirik lagu",
      funFact: "Dikenal sebagai ace grup dengan kemampuan menyanyi, menari, dan rap.",
      imageUrl: "/images/juun.png",
      color: "bg-yellow-100"
    },
    {
      id: 6,
      name: "Ana",
      fullName: "Noh Yu Na",
      position: "Rapper",
      birthdate: "20 Desember 2008",
      zodiac: "Sagitarius",
      nationality: "Korea Selatan",
      hobbies: "Skateboarding",
      funFact: "Menjalani masa trainee selama sekitar 3-4 tahun sebelum debut.",
      imageUrl: "/images/ana.png",
      color: "bg-red-100"
    },
    {
      id: 7,
      name: "Ian",
      fullName: "Kang Ha Eun",
      position: "Vocalist",
      birthdate: "1 Desember 2009",
      zodiac: "Sagitarius",
      nationality: "Korea Selatan",
      hobbies: "Fotografi",
      funFact: "Membuat lagu pertamanya saat berusia 12 tahun.",
      imageUrl: "/images/ian.png",
      color: "bg-orange-100"
    },
    {
      id: 8,
      name: "Yeon",
      fullName: "Kim Na Yeon",
      position: "Maknae",
      birthdate: "19 April 2010",
      zodiac: "Aries",
      nationality: "Korea Selatan",
      hobbies: "Menari balet",
      funFact: "Minat terhadap menyanyi sudah muncul sejak usia 5-6 tahun.",
      imageUrl: "/images/yeon.png",
      color: "bg-teal-100"
    }
  ];

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">H2H Members</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div 
              key={member.id} 
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${member.color} border-2 border-gray-200`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="contain"
                />
                <div className="absolute bottom-3 right-3 z-20">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold mb-1">{member.name}</h2>
                <p className="text-sm text-gray-600 italic mb-2">{member.fullName}</p>
                <div className="flex items-center mb-3">
                  <Music className="w-4 h-4 mr-1 text-gray-600" />
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-1 text-gray-600" />
                  <p className="text-sm text-gray-600">{member.birthdate} - {member.zodiac}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">{member.nationality}</p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium mb-1">Hobbies:</p>
                  <p className="text-sm text-gray-600">{member.hobbies}</p>
                </div>
                <div className="pt-3 mt-2">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm font-medium flex items-center">
                      <span className="text-yellow-500 mr-1">✨</span> Fun Fact:
                    </p>
                    <p className="text-sm text-gray-700">{member.funFact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
