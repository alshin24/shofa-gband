"use client";

import { useState, useRef } from "react";
import {
  Home,
  Heart,
  Music,
  Users,
  Star,
  Menu,
  X,
  Mic2,
  Calendar,
  Image,
  ShoppingBag,
  Ticket,
  MessageCircle,
  Crown,
  Camera,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

type MenuItem = {
  name: string;
  icon: React.ElementType;
  href: string;
};

type Category = {
  name: string;
  items: MenuItem[];
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("/api/placeholder/150/150");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [username, setUsername] = useState("K-pop Fan");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePic(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const menuCategories: Category[] = [
    {
      name: "Utama",
      items: [
        { name: "Beranda", icon: Home, href: "/dashboard" },
        { name: "Biodata", icon: Heart, href: "/dashboard/biodata" },
      ],
    },
    {
      name: "Musik",
      items: [
        { name: "Playlist", icon: Music, href: "/dashboard/playlist" },
        { name: "Artis", icon: Users, href: "/dashboard/artis" },
        { name: "Populer", icon: Star, href: "/dashboard/populer" },
      ],
    },
    {
      name: "Event & Media",
      items: [
        { name: "Konser", icon: Ticket, href: "/dashboard/konser" },
        {
          name: "Merchandise",
          icon: ShoppingBag,
          href: "/dashboard/merchandise",
        },
        { name: "Galeri", icon: Image, href: "/dashboard/galeri" },
        { name: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
        { name: "Forum", icon: MessageCircle, href: "/dashboard/forum" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-pink-600 text-white rounded-full md:hidden shadow-lg hover:bg-pink-700 transition-all"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed md:static  h-full z-40 bg-gradient-to-b from-pink-50 via-purple-50 to-pink-50 shadow-xl transition-all duration-300 ease-in-out
                  w-72 ${
                    isOpen ? "left-0" : "-left-72"
                  } md:left-0 overflow-y-auto overflow-x-hidden rounded-r-xl md:rounded-xl my-2 md:ml-2 pb-6`}
      >
        {/* Logo and profile section */}
        <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden rounded-b-3xl">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute right-12 bottom-0 w-16 h-16 rounded-full bg-white opacity-10"></div>
          <div className="absolute left-0 bottom-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="flex items-center mb-6">
            <Crown size={24} className="text-yellow-300 mr-2" />
            <h2 className="text-2xl font-bold">K-pop Fanzone</h2>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-3">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/50 mx-auto">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-pink-400 hover:bg-pink-500 transition-colors p-2 rounded-full shadow-lg"
                >
                  <Camera size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="font-medium text-lg flex items-center justify-center mx-auto"
                >
                  {username}
                  <ChevronDown size={18} className="ml-1" />
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full mt-2 mb-12 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg py-2 text-gray-800 w-40 z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center">
                      <Settings size={16} className="mr-2 text-gray-500" />
                      <span>Settings</span>
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm opacity-90 flex items-center justify-center mt-1">
                <Mic2 size={12} className="mr-1" /> Penggemar K-pop
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="mb-4">
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex items-center justify-between w-full p-2 text-left text-gray-600 font-medium"
              >
                <span>{category.name}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    expandedCategory === category.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`space-y-1 overflow-hidden transition-all duration-200 ${
                  expandedCategory === category.name
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {category.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <div className="flex items-center p-3 rounded-xl hover:bg-pink-100 text-gray-700 hover:text-pink-600 cursor-pointer transition-all group">
                        <span className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-all">
                          <item.icon size={18} />
                        </span>
                        <span className="ml-3 font-medium">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

