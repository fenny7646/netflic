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
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const WhiteButton = styled(Button)({
    boxSizing: 'content-box', // Default is 'border-box' in MUI
    padding: '10px 15px',
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    },
  });

const ImageVid = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  return (
    <div 
      className="relative w-[200px] h-[112.5px] transition-all duration-300 z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <img
          className="w-full h-full object-cover"
          src='/assets/jimmyfallon.webp'
          alt='jimmy-photo'
        />
      ) : (
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-black z-50">
              <div className="flex w-full h-[50%] ">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`webxplayer://play?url=${encodeURIComponent(videoUrl)}`);
                }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              </div>
            <div className='flex flex-col gap-3 p-4 h-[40%]'>
            <div className="flex flex-row gap-3 justify-start items-center">
              <AiOutlineLike className='text-white text-xl cursor-pointer' />
              <AiOutlineDislike className='text-white text-xl cursor-pointer' />
              <ImEnlarge className='text-white text-xl cursor-pointer' />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl text-white leading-none">Morning Show with Jimmy Fallon</h2>
              <h4 className="text-md italic text-white">Series</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Main() {
    return (
        <>
            <div className='absolute flex flex-col gap-5 w-full left-5 top-170 w-30 h-auto'>
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-start text-white text-xl font-bold">
                        Popular on Netflix
                    </div>
                    <div className="flex flex-row gap-1">
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
    <div className="absolute flex flex-col gap-3 top-100 left-7 w-100 h-60">
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