"use client";
import React, { useState, useRef, useEffect } from "react";
import Layout from "@/component/layout";
import {
  Play,
  Pause,
  Share2,
  Plus,
  Trash2,
  X,
  Music,
  Calendar,
  Clock,
  Save,
  UploadCloud,
} from "lucide-react";

export default function PlaylistPage() {
  const [songs, setSongs] = useState([
    {
      title: "The Chase",
      release: "24 Februari 2025",
      image: "/images/album.jpg",
      duration: "3:45",
      audio: "/audio/the-chase.mp3",
    },
    {
      title: "Butterflies",
      release: "24 Februari 2025",
      image: "/images/album.jpg",
      duration: "4:12",
      audio: "/audio/butterflies.mp3",
    },
  ]);

  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    release: "",
    image: "",
    duration: "",
    audio: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play individual song
  const togglePlay = (songTitle: string, audioSrc: string, index: number) => {
    if (!audioSrc) return; // Skip if no audio

    if (currentSong === songTitle && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      }
      setCurrentSong(songTitle);
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  // Play all songs feature
  const playAll = () => {
    // Find first song with audio
    const firstPlayableSongIndex = songs.findIndex((song) => song.audio);
    if (firstPlayableSongIndex !== -1) {
      togglePlay(
        songs[firstPlayableSongIndex].title,
        songs[firstPlayableSongIndex].audio,
        firstPlayableSongIndex
      );
    }
  };

  // Update current playback time
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateTime);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("loadedmetadata", updateTime);
      }
    };
  }, [currentSong]);

  // Handle song ended - play next song
  useEffect(() => {
    const handleSongEnd = () => {
      if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
        // Find next playable song
        let nextIndex = currentSongIndex + 1;
        while (nextIndex < songs.length) {
          if (songs[nextIndex].audio) {
            togglePlay(
              songs[nextIndex].title,
              songs[nextIndex].audio,
              nextIndex
            );
            break;
          }
          nextIndex++;
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSongIndex, songs]);

  // Add song function with better validation
  const addSong = () => {
    // Validate required fields
    if (!newSong.title) {
      alert("Please enter a song title");
      return;
    }

    if (!newSong.release) {
      alert("Please enter a release date");
      return;
    }

    if (!newSong.duration) {
      alert("Please enter song duration");
      return;
    }

    if (!audioFile) {
      alert("Please upload an audio file");
      return;
    }

    // Create audio URL and add song
    const audioUrl = URL.createObjectURL(audioFile);
    setSongs([
      ...songs,
      {
        ...newSong,
        audio: audioUrl,
        image: newSong.image || "/images/album.jpg", // Default image if none provided
      },
    ]);

    // Reset form
    setNewSong({ title: "", release: "", image: "", duration: "", audio: "" });
    setAudioFile(null);
    setShowForm(false);
  };

  // Delete song functionality
  const deleteSong = (index: number) => {
    const newSongs = [...songs];

    // If deleting currently playing song, stop playback
    if (currentSongIndex === index) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setCurrentSong(null);
      setCurrentSongIndex(null);
    }

    newSongs.splice(index, 1);
    setSongs(newSongs);
  };

  // Share playlist function
  const sharePlaylist = () => {
    setShareModalOpen(true);
  };

  // Copy link function for sharing
  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Format time for display (mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4">
        {/* Audio Element - Hidden */}
        <audio ref={audioRef} className="hidden" />

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6 md:mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:p-6 rounded-2xl shadow">
          <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 relative rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/album.jpg"
              alt="H2H Album Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 inline-block">
              Featured Playlist
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-gray-800">
              H2H Official Playlist
            </h1>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
              Latest releases from your favorite Korean band
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              <button
                onClick={playAll}
                className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <Play size={18} /> Play All
              </button>
              <button
                onClick={sharePlaylist}
                className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* CURRENTLY PLAYING BAR */}
        {currentSong && (
          <div className="bg-purple-900 text-white p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 flex flex-col sm:flex-row items-center gap-3 sm:justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => {
                  if (isPlaying) {
                    audioRef.current?.pause();
                    setIsPlaying(false);
                  } else {
                    audioRef.current?.play();
                    setIsPlaying(true);
                  }
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-purple-900 hover:bg-gray-100"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div>
                <p className="font-medium text-sm">Now Playing</p>
                <h3 className="text-lg sm:text-xl font-bold">{currentSong}</h3>
              </div>
            </div>

            {/* Playback Timer */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              <div className="text-xs sm:text-sm font-medium">
                {formatTime(currentTime)}
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-32 md:w-64 bg-purple-800 h-2 rounded-full overflow-hidden flex-grow">
                <div
                  className="h-full bg-white"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
              </div>

              <div className="text-xs sm:text-sm font-medium">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        )}

        {/* ADD SONG BUTTON (Always visible) */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <Plus size={18} /> Add Song
          </button>
        )}

        {/* ADD SONG FORM */}
        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Add New Song
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    Song Title
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Music size={16} />
                    </span>
                    <input
                      className="border border-gray-300 p-2 sm:p-3 pl-9 sm:pl-10 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm sm:text-base"
                      placeholder="Enter song title"
                      value={newSong.title}
                      onChange={(e) =>
                        setNewSong({ ...newSong, title: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    Release Date
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      className="border border-gray-300 p-2 sm:p-3 pl-9 sm:pl-10 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm sm:text-base"
                      placeholder="e.g., 24 February 2025"
                      value={newSong.release}
                      onChange={(e) =>
                        setNewSong({ ...newSong, release: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    Duration
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Clock size={16} />
                    </span>
                    <input
                      className="border border-gray-300 p-2 sm:p-3 pl-9 sm:pl-10 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm sm:text-base"
                      placeholder="e.g., 3:45"
                      value={newSong.duration}
                      onChange={(e) =>
                        setNewSong({ ...newSong, duration: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    Audio File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center hover:border-purple-500 transition-colors relative h-24 sm:h-32">
                    {!audioFile ? (
                      <div className="space-y-1 sm:space-y-2 absolute inset-0 flex flex-col items-center justify-center">
                        <UploadCloud
                          size={28}
                          className="mx-auto text-gray-400"
                        />
                        <p className="text-gray-500 text-xs sm:text-sm">
                          Drag & drop or click to upload
                        </p>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) =>
                            setAudioFile(e.target.files?.[0] || null)
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
                        <Music
                          size={24}
                          className="mx-auto text-purple-600 mb-1 sm:mb-2"
                        />
                        <p className="text-gray-800 font-medium truncate text-xs sm:text-sm">
                          {audioFile.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button
                          onClick={() => setAudioFile(null)}
                          className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1 sm:mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={addSong}
                    className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow hover:shadow-md text-sm sm:text-base"
                  >
                    <Save size={18} /> Add to Playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLAYLIST */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gray-50 py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-200">
            <div className="grid grid-cols-12 items-center text-gray-500 text-xs sm:text-sm font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-7 md:col-span-5 pl-2">TITLE</div>
              <div className="hidden md:block md:col-span-4">RELEASE DATE</div>
              <div className="col-span-4 md:col-span-2 text-center">
                DURATION
              </div>
            </div>
          </div>

          {songs.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              <Music size={40} className="mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-base sm:text-lg">
                No songs in this playlist yet
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="text-purple-600 hover:text-purple-800 mt-2"
              >
                Add your first song
              </button>
            </div>
          ) : (
            songs.map((song, index) => (
              <div
                key={`${song.title}-${index}`}
                className={`grid grid-cols-12 p-3 sm:p-4 items-center hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  currentSong === song.title ? "bg-purple-50" : ""
                }`}
              >
                <div className="col-span-1 text-center">
                  <button
                    onClick={() => togglePlay(song.title, song.audio, index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${
                      song.audio
                        ? "bg-purple-100 hover:bg-purple-200"
                        : "bg-gray-100 cursor-not-allowed"
                    } transition-colors`}
                    disabled={!song.audio}
                  >
                    {currentSong === song.title && isPlaying ? (
                      <Pause size={16} className="text-purple-700" />
                    ) : (
                      <Play
                        size={16}
                        className={
                          song.audio ? "text-purple-700" : "text-gray-400"
                        }
                      />
                    )}
                  </button>
                </div>

                <div className="col-span-7 md:col-span-5 pl-1 sm:pl-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      {" "}
                      {/* Prevent text overflow */}
                      <h3
                        className={`font-medium text-sm sm:text-base truncate ${
                          currentSong === song.title
                            ? "text-purple-700"
                            : "text-gray-800"
                        }`}
                      >
                        {song.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        H2H
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:col-span-4 text-gray-600 text-sm">
                  {song.release}
                </div>

                <div className="col-span-4 md:col-span-2 flex justify-between items-center">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    {song.duration}
                  </span>
                  <button
                    onClick={() => deleteSong(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1 sm:p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SHARE MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full m-3">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold">Share Playlist</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Share this playlist with your friends and family
            </p>

            <div className="flex gap-2 mb-3 sm:mb-4">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm sm:text-base bg-gray-50"
              />
              <button
                onClick={copyLink}
                className={`px-3 sm:px-4 py-2 rounded-lg ${
                  copySuccess ? "bg-green-500" : "bg-purple-600"
                } text-white text-sm sm:text-base`}
              >
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-3 sm:mt-4">
              <button className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
