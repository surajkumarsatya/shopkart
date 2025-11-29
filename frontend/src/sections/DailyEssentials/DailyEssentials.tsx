import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";

// --- START: TYPE DEFINITIONS ---

// Define the type for a single Product object
interface Product {
  name: string;
  url: string;
  images: string; // Assuming 'images' is a string URL
  brand: {
    name: string;
  };
  variants: {
    name: string;
    storeSpecificData: {
      mrp: number; // Assuming mrp is a number
    }[];
  }[];
}

// Define the shape of the API response data property
interface DailyEssentialsData {
  product: Product[];
  // Include other properties of 'data' if necessary, e.g., 'pageInfo: any;'
}

// Define the full structure of the resolved value from useQuery
interface QueryResponse {
  data: DailyEssentialsData;
  // Include other top-level properties if the API response has them
}

// --- END: TYPE DEFINITIONS ---


export default function DailyEssentials(): JSX.Element {
  // 1. Assign the QueryResponse type to the `data` variable
  const { isLoading, isError, error, data } = useQuery<QueryResponse>({
    queryKey: ["daily-essentials"],
    queryFn: () =>
      fetch("https://www.modernbazaar.online/api/product?page=1&sorting=POPULARITY&hasImage=1&hasOffers=1&hasStock=1&layoutType=SCROLLER&loadMoreType=SEEALL&tag=daily-esse-7&title=Daily%20Essentials").then((res) =>
        res.json()
      ),
  });

  console.log("Daily Essentials", data?.data?.product);
  // Safely assign the product array, providing a default empty array for map
  const dailyEssentials = data?.data?.product ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error?.message}</div>;

  return (
    <section className="p-10">
      <p className="pb-3">Daily Essentials</p>

      <div className="flex gap-5 flex-wrap">
        {/* 2. Assign the Product type to the 'item' parameter */}
        {dailyEssentials.map((item: Product) => (
            <div className="w-30 flex flex-col gap-2" key={item.name}>
                <a className="" href={item.url}>
                    <img src={item.images} alt="" className="border p-3 rounded-2xl h-30"/>
                </a>
                <div className=" flex flex-col gap-1">
                    <p className="text-xs">{item.brand.name} {item.name}</p>
                    <p className="text-xs">{item.variants[0].name}</p>
                    {/* Add checks since variants[0] and storeSpecificData[0] might be missing */}
                    <p className="text-xs">Rs. {item.variants[0]?.storeSpecificData[0]?.mrp}</p> 
                </div>
            </div>
        ))}
      </div>

    </section>
  );
}