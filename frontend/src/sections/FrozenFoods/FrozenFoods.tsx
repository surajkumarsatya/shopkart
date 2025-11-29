import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";

// 1. Define the deepest nested type first:
type ProductStoreData = {
  mrp: number; // Assuming 'mrp' is a number
};

// 2. Define the ProductVariant type
type ProductVariant = {
  name?: string;
  // Assuming 'storeSpecificData' is an array of ProductStoreData
  storeSpecificData?: ProductStoreData[]; 
};

// 3. Update MenuItem to use the new ProductVariant type
type MenuItem = {
  images: string | undefined;
  id?: string | number;
  name?: string;
  url?: string;
  product?: string;
  // FIX: Changed 'string' to 'ProductVariant[]' to match usage
  variants: ProductVariant[]; 
};

type NavApiResponse = {
  data?: {
    product?: MenuItem[];
  };
};

export default function FrozenFoods(): JSX.Element {
  const { isLoading, isError, error, data } = useQuery<NavApiResponse, Error>({
    queryKey: ["frozen-foods"],
    queryFn: () =>
      fetch("https://www.modernbazaar.online/api/product?category=frozen-foods").then((res) =>
        res.json()
      ),
  });

  console.log("Frozen Foods", data?.data?.product);

  const productData = data?.data?.product;
  
  // Cast to MenuItem[] is now safer due to updated types
  const navArray: MenuItem[] = Array.isArray(productData)
    ? (productData as MenuItem[]) 
    : [];

  const topNav = navArray; // Simplified assignment

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error?.message}</div>;

  return (
    <section className="p-10">
      <p className="pb-3">Frozen Foods</p>
      <div className="flex flex-wrap gap-5">
        {topNav.map((nav) => {
          // Fallback to name if id is undefined for the key
          const idKey = String(nav.id ?? nav.name); 
          
          // Get the first variant safely
          const firstVariant = nav.variants[0]; 
          
          // Get the first store data safely
          const firstStoreData = firstVariant?.storeSpecificData?.[0];

          return (
            // Added key to the outermost repeated element for best practice
            <div key={idKey} className="flex flex-col gap-2 w-30"> 
              <a href={nav.url} className="">
                {/* Image source is correct as nav?.images */}
                <img className="border p-3 rounded-2xl w-full h-30" src={nav?.images} alt={nav.name || "Product Image"}/> 
              </a>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-left">{nav?.name}</p>
                {/* Accessing .name on the first variant is now correct */}
                <p className="text-xs text-left">{firstVariant?.name}</p> 
                {/* Accessing .mrp on the first store data is now correct */}
                <p className="text-xs text-left">Rs. {firstStoreData?.mrp}</p> 
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}