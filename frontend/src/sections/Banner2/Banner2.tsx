import banner05 from '../../assets/images/bannerImages/banner-image05.webp'
import banner06 from '../../assets/images/bannerImages/banner-image06.webp'
import banner07 from '../../assets/images/bannerImages/banner-image07.webp'
import banner08 from '../../assets/images/bannerImages/banner-image08.webp'
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";


export default function Banne2(){
    return(
        <section className='relative max-w-[1440px] px-10 mx-auto flex items-center'>
            <div className='absolute left-15 text-black border-2 border-white rounded-full p-2 bg-white'>
                <SlArrowLeft />
            </div>
            <div className=' flex mx-auto overflow-auto rounded-2xl'>
                <img src={banner05} alt="banner05" />
                <img src={banner06} alt="banner06" />
                <img src={banner07} alt="banner07" />
                <img src={banner08} alt="banner08" />
            </div>
            <div className='absolute right-15 text-black border-2 border-white rounded-full p-2 bg-white'>
                <SlArrowRight />
            </div>
        </section>
    )
}