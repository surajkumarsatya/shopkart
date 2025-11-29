import banner01 from '../../assets/images/bannerImages/banner-image01.webp'
import banner02 from '../../assets/images/bannerImages/banner-image02.webp'
import banner03 from '../../assets/images/bannerImages/banner-image03.webp'
import banner04 from '../../assets/images/bannerImages/banner-image04.webp'
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";


export default function Banner(){
    return(
        <section className='relative max-w-[1440px] px-10 mx-auto flex items-center'>
            <div className='absolute left-15 text-black border-2 border-white rounded-full p-2 bg-white'>
                <SlArrowLeft />
            </div>
            <div className=' flex mx-auto overflow-auto rounded-2xl'>
                <img src={banner01} alt="banner01" />
                <img src={banner02} alt="banner02" />
                <img src={banner03} alt="banner03" />
                <img src={banner04} alt="banner04" />
            </div>
            <div className='absolute right-15 text-black border-2 border-white rounded-full p-2 bg-white'>
                <SlArrowRight />
            </div>
        </section>
    )
}