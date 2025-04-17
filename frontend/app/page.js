'use client'
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaBell, FaRegUser, FaPlay } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaCircleInfo } from "react-icons/fa6";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ImEnlarge } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";

import 'video.js/dist/video-js.css';
import { fetchMovies } from '../components/datafetch';

const WhiteButton = styled(Button)({
    boxSizing: 'content-box', // Default is 'border-box' in MUI
    padding: '10px 15px',
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    },
  });

function VideoPlayer({ videoUrl }) {
    const videoRef = useRef(null);
  
    const playFullscreen = () => {
      if (videoRef.current) {
        // Play video
        videoRef.current.play();
        // Request fullscreen
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen();
        }
      }
    };
  
    return (
      <div>
        <ImEnlarge onClick={playFullscreen} className='fill-white text-xl cursor-pointer hover:fill-red'/>
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          style={{ display: "none" }} // Hide video until fullscreen
          onPlay={() => (videoRef.current.style.display = "block")}
        />
      </div>
    );
  }
const ImageVid = () => {
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseMove = () => {
    setShowBack(true);
    clearTimeout(window.hideBackTimeout);
    window.hideBackTimeout = setTimeout(() => setShowBack(false), 2000);
  };

  return (
    <>
  {movies.map((movie, idx) => (
    <div
      key={idx}
      className={`rounded-md overflow-hidden transition-all duration-300 ${
        isHovered !== idx ? 'min-w-60 h-50 shadow-lg' : 'min-w-60 h-50'
      }`}>
      {isHovered !== idx ? (
        <img
          className={`object-cover transition-transform duration-300 ${
            isHovered !== idx ? 'scale-110' : 'scale-100'
          }`}
          src={movie.logo}
          alt={`${movie.name}-photo`}
          width={400}
          height={300}
          onMouseEnter={() => setIsHovered(idx)}
        />
      ) : (
        <div
          className="w-full h-full bg-black z-50"
          style={{ pointerEvents: 'auto' }}
          onMouseMove={handleMouseMove}
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
                  {showBack && <div className='absolute left-0 bottom-0 flex flex-col gap-3 p-4 h-auto w-full'>
                    <div className="flex flex-row gap-3 justify-between items-center">
                      <div className="flex flex-row gap-3">
                        <AiOutlineLike className='fill-white text-xl cursor-pointer hover:fill-red'/>
                        <AiOutlineDislike className='fill-white text-xl cursor-pointer hover:fill-red'/>
                      </div>
                      <VideoPlayer videoUrl={video_url}/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl text-white leading-none">{movie.name}</h2>
                      <h4 className="text-md italic text-white">{movie.status}</h4>
                    </div>
                  </div>}
                </div>
            </div>
          )}
    </div>
        )
    )}
    </>
  );
}

function Main() {

    return (
        <>
            <div className='absolute flex flex-col gap-5 w-full left-5 top-130 w-30 h-auto'>
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-start text-white text-xl font-bold">
                        Popular on Netflix
                    </div>
                    <div className="flex flex-row gap-2 overflow-x-auto [scrollbar-width:none]">
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
    <img className='relative w-full h-full' src='/assets/netflicb.avif'/>
    <div className='absolute top-3 left-0 flex flex-row justify-between w-full h-[25px] px-4'>
      <div className='flex flex-row gap-2 justify-evenly w-[40%]'>
        <div className='flex justify-center items-center'>
            <img 
            className='w-30 h-7' 
            src='/assets/logo.png'
            alt='Netflix-logo'
            width={100} 
            height={40}
            />
        </div>
        <Link href="/" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none'>Home</Link>
        <Link href="/tv-shows" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none'>TV Shows</Link>
        <Link href="/movies" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none'>Movies</Link>
        <Link href="/news" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none'>News & Popular</Link>
        <Link href="/my-list" className='flex text-white text-sm justify-center items-center active:text-transparent leading-none'>My List</Link>
      </div>
      <div className='flex flex-row gap-5 justify-end w-[60%] p-1'>
        <Link href="/search"><IoMdSearch className='fill-white w-auto h-full aspect-square'/></Link>
        <Link href="/notifications"><FaBell className='fill-white w-auto h-full aspect-square'/></Link>
        <Link href="/profile"><FaRegUser className='fill-white w-auto h-full aspect-square'/></Link>
      </div>
    </div>
    <div className="absolute flex flex-col gap-3 top-70 left-7 w-100 h-60">
        <h1 className='flex text-5xl font-bold text-white'>Ask me what you want</h1>
        <p className='flex text-sm text-white'>After his father's death, Eric Zimmerman travels to Spain to oversee his company's branches. In Madrid, he falls for Judith and engage in an</p>
        <div className='flex flex-row gap-3'>
        <WhiteButton className='bg-white text-black' variant="contained" startIcon={<FaPlay />}>
            Play
        </WhiteButton>
        <WhiteButton className='bg-white text-black' variant="contained" startIcon={<FaCircleInfo />}>
            More Info
        </WhiteButton>
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