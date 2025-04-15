import Link from "next/link"
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

function Header() {
    <div className='flex flex-row flex-wrap flex-auto '>
        <div className='flex flex-row gap-3 justify-evenly'>
            <img className='w-full h-full' src='assets/logo.png' alt='Netflix-logo' placeholder='blur' layout='fill' />
            <Link className='flex text-white active:text-transparent leading-none'>Home</Link>
            <Link className='flex text-white active:text-transparent leading-none'>TV Shows</Link>
            <Link className='flex text-white active:text-transparent leading-none'>Movies</Link>
            <Link className='flex text-white active:text-transparent leading-none'>News & Popular</Link>
            <Link className='flex text-white active:text-transparent leading-none'>My List</Link>
        </div>
        <div className='flex flex-row gap-3 justify-end'>
            <Link><FiSearch/></Link>
            <Link><FaBell/></Link>
            <Link><FaRegUser/></Link>
        </div>
    </div>
}

function App() {
    return(
        <>
        <Header />
        </>
    )
}

export default App