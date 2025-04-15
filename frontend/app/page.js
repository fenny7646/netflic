// app/page.js
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

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
            width={100} // Added width and height
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