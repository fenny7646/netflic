'use client'
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaBell, FaRegUser, FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ImEnlarge } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";

import 'video.js/dist/video-js.css';
import { fetchMovies } from '../components/datafetch';

function VideoPlayer({ videoUrl }) {
    const videoRef = useRef(null);
    const hideBackTimeout = useRef(null);
    const [isFullMove, setIsFullMove] = useState(false);
    const [isFullScreen, setIsFullscreen] = useState(false);
  
    const handleFullscreen = () => {
      setIsFullscreen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    };
    
    const handleFullMove = () => {
      setIsFullMove(true);
      if (hideBackTimeout.current) clearTimeout(hideBackTimeout.current);
      hideBackTimeout.current = setTimeout(() => setIsFullMove(false), 2000);
    };

    useEffect(() => {
      return () => {
        if (hideBackTimeout.current) clearTimeout(hideBackTimeout.current);
      };
    }, []);
  
    return (
      <div>
        <ImEnlarge onClick={handleFullscreen} className='fill-white text-xl cursor-pointer hover:fill-red'/>
        {isFullScreen && (
          <div 
            className="fixed inset-0 w-screen h-screen bg-black z-[999] flex justify-center items-center"
            onMouseMove={handleFullMove}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {isFullMove && (
              <IoMdArrowRoundBack 
                className="absolute top-4 left-4 h-10 w-10 bg-black/50 rounded-md text-white z-[1000] cursor-pointer p-2 hover:fill-red" 
                onClick={() => setIsFullscreen(false)}
              />
            )}
          </div>
        )}
      </div>
    );
}
  
const ImageVid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hideFullTimeout = useRef(null);
  const [showBack, setShowBack] = useState(false);
  const [movies, setMovies] = useState([]);
  let video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadMovies();
  }, []);

  const handleCardMove = () => {
    setShowBack(true);
    if (hideFullTimeout.current) clearTimeout(hideFullTimeout.current);
    hideFullTimeout.current = setTimeout(() => setShowBack(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (hideFullTimeout.current) clearTimeout(hideFullTimeout.current);
    };
  }, []);

  return (
    <>
  {movies.map((movie, idx) => (
    <div
      key={idx}
      className={`rounded-md overflow-hidden transition-all duration-300 card-con-1 ${
        isHovered !== idx ? 'min-w-60 h-50 shadow-lg' : 'min-w-60 h-50'
      }`}>
      {isHovered !== idx ? (
        <img
          className={`object-fit w-200 h-100 transition-transform duration-300 ${
            isHovered !== idx ? 'scale-110' : 'scale-100'
          }`}
          src={movie.logo}
          alt={`${movie.name}-photo`}
          onMouseEnter={() => setIsHovered(idx)}
        />
      ) : (
        <div
          className="w-full h-full bg-black z-50"
          style={{ pointerEvents: 'auto' }}
          onMouseMove={handleCardMove}
          onMouseLeave={() => setIsHovered(null)}
        >
                  <div className="relative flex w-full h-full">
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    >
                    <source src={video_url} type="video/mp4" />
                  </video>
                   <div className='absolute left-0 bottom-0 flex flex-col gap-3 p-4 h-auto w-full'>
                    {showBack && <div className="flex flex-col gap-1">
                      <h2 className="text-xl text-white leading-none">{movie.name}</h2>
                      <h4 className="text-md italic text-white">{movie.status}</h4>
                    </div>}
                    <div className="flex flex-row gap-3 justify-between items-center">
                      <div className="flex flex-row gap-3">
                        <AiOutlineLike className='fill-white text-xl cursor-pointer hover:fill-red'/>
                        <AiOutlineDislike className='fill-white text-xl cursor-pointer hover:fill-red'/>
                      </div>
                      <VideoPlayer videoUrl={video_url}/>
                    </div>
                  </div>
                </div>
            </div>
          )}
    </div>
        )
    )}
    </>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
        <div className={`fixed top-0 left-0 flex flex-row justify-between w-full h-[50px] p-3 transition-colors duration-300 navbar z-50 ${scrolled ? "bg-black bg-opacity-90" : "bg-transparent"}`}>
        <div className='flex flex-row gap-2 justify-evenly w-[40%] navbar-con-1'>
          <div className='flex justify-center items-center'>
              <img 
              className='w-30 h-7 navbar-logo' 
              src='/assets/logo.png'
              alt='Netflix-logo'
              width={100} 
              height={40}
              />
          </div>
          <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none navbar-text'>Home</Link>
          <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none navbar-text'>TV Shows</Link>
          <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none navbar-text'>Movies</Link>
          <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none navbar-text'>News & Popular</Link>
          <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none navbar-text'>My List</Link>
        </div>
        <div className='flex flex-row gap-5 justify-end w-[60%] p-1 navbar-con-2'>
          <Link href="/search"><IoMdSearch className='fill-white w-auto h-full aspect-square'/></Link>
          <Link href="/notifications"><FaBell className='fill-white w-auto h-full aspect-square'/></Link>
          <Link href="/profile"><FaRegUser className='fill-white w-auto h-full aspect-square'/></Link>
        </div>
      </div>
  );
}

function Main() {

    return (
        <>
            <div className='absolute flex flex-col gap-5 w-full left-5 top-130 w-30 h-auto'>
                <div className='flex flex-col gap-2 min-h-100'>
                    <div className="flex justify-start text-white text-xl font-bold topicer">
                        Popular on Netflix
                    </div>
                    <div className="flex flex-row gap-1 overflow-x-auto [scrollbar-width:none]">
                        <ImageVid/>
                    </div>
                </div>
            </div>
        </>
    )
}

function Header() {
  return (
   <>
    <img className='fixed w-full h-full base-img' src='/assets/netflicb.avif'/>
    <Navbar/>
    <div className="absolute flex flex-col gap-3 top-70 left-7 w-100 h-60 detail-con">
        <h1 className='flex text-5xl font-bold text-white detail-con-1'>Ask me what you want</h1>
        <p className='flex text-sm text-white detail-con-2'>After his father's death, Eric Zimmerman travels to Spain to oversee his company's branches. In Madrid, he falls for Judith and engage in an</p>
        <div className='flex flex-row gap-3'>
          <div className="flex flex-row gap-2 bg-white rounded-sm justify-between items-center p-1 cursor-pointer hover:bg-[#E8E8E8] transition-colors duration-100">
            <FaPlay/>
            <h5 className="detail-con-3-but-icon">Play</h5>
          </div>
        <div className="flex flex-row gap-2 bg-white rounded-sm justify-between items-center p-1 cursor-pointer hover:bg-[#E8E8E8] transition-colors duration-100">
          <FaCircleInfo/>
          <h5 className="detail-con-3-but-icon">Info</h5>
        </div>
        </div>
    </div>
    <Main/>
   </>
  );
}

export default function Home() {
  return (
    <>
        <Header/>
    </>
  );
}