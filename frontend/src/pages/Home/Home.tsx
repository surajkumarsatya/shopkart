import Banner from "@/sections/Banner/Banner";
import Banne2 from "@/sections/Banner2/Banner2";
import Collections from "@/sections/Collections/Collections";
import DailyEssentials from "@/sections/DailyEssentials/DailyEssentials";
import FrozenFoods from "@/sections/FrozenFoods/FrozenFoods";
import TopCategories from "@/sections/TopCategories/TopCategories";

export default function Home(){
    return(
        <section>
            <Banner />
            <TopCategories />
            <FrozenFoods />
            <DailyEssentials />
            <Banne2 />
            <Collections />
        </section>
    )
}