'use client'
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

const WhiteButton = styled(Button)({
    boxSizing: 'content-box', // Default is 'border-box' in MUI
    padding: '10px 15px',
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    },
  });

function Main() {
    return (
        <>
            <div className='absolute flex flex-col gap-5 w-full left-5 top-170 w-30 h-auto'>
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-start text-white text-lg font-bold">
                        <a>Popular on Netflix</a>
                    </div>
                    <div className="flex flex-row gap-1">
                        <img 
                        className="w-60 h-35 rounded-md"
                        alt='jimmy-logo'
                        src='/assets/jimmyfallon.webp'/>
                        <img 
                        className="w-60 h-35 rounded-md"
                        alt='jimmy-logo'
                        src='/assets/jimmyfallon.webp'/>
                        <img 
                        className="w-60 h-35 rounded-md"
                        alt='jimmy-logo'
                        src='/assets/jimmyfallon.webp'/>
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