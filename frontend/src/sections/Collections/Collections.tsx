import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";

// Helper function to fetch data
const fetchData = (url: string) => () =>
  fetch(url).then((res) => res.json());

export default function Collections(): JSX.Element {
  // Query 1: Juice/Drinks
  const { 
    isLoading: isLoadingJuice, 
    isError: isErrorJuice, 
    error: errorJuice, 
    data: dataJuice 
  } = useQuery({
    queryKey: ["collection-juice"],
    queryFn: fetchData("https://www.modernbazaar.online/api/layout/tag?url=juice-drinks-1"),
  });

  // Query 2: Fresh Vegetables
  const { 
    isLoading: isLoadingVeggies, 
    isError: isErrorVeggies, 
    error: errorVeggies, 
    data: dataVeggies 
  } = useQuery({
    queryKey: ["collection-vegetables"],
    queryFn: fetchData("https://www.modernbazaar.online/api/layout/tag?url=fresh-vegetables-1"),
  });

  // Query 3: Dry Fruits
  const { 
    isLoading: isLoadingDryFruits, 
    isError: isErrorDryFruits, 
    error: errorDryFruits, 
    data: dataDryFruits 
  } = useQuery({
    queryKey: ["collection-dryfruits"],
    queryFn: fetchData("https://www.modernbazaar.online/api/layout/tag?url=dry-fruits-1"),
  });

  // Combine loading states
  const isLoading = isLoadingJuice || isLoadingVeggies || isLoadingDryFruits;
  
  // Handle combined loading state
  if (isLoading) return <div>Loading Collections...</div>;

  // Handle individual error states
  if (isErrorJuice) return <div>An error occurred fetching Juice: {errorJuice?.message}</div>;
  if (isErrorVeggies) return <div>An error occurred fetching Vegetables: {errorVeggies?.message}</div>;
  if (isErrorDryFruits) return <div>An error occurred fetching Dry Fruits: {errorDryFruits?.message}</div>;

  // Extract images safely
  const juiceImage = dataJuice?.data?.page?.entity?.image;
  const veggiesImage = dataVeggies?.data?.page?.entity?.image;
  const dryFruitsImage = dataDryFruits?.data?.page?.entity?.image;

  return (
    <section className="p-10">
      <h2 className="pb-3 text-lg font-bold">🛒 Collections</h2>

      <div className="flex gap-8">
        {/* Display Juice/Drinks */}
        {juiceImage && (
          <div>
            <p className="font-semibold mb-2">Juice & Drinks</p>
            <img src={juiceImage} alt="Juice" className="max-w-xs rounded-lg shadow-md" />
          </div>
        )}
        
        {/* Display Fresh Vegetables */}
        {veggiesImage && (
          <div>
            <p className="font-semibold mb-2">Fresh Vegetables</p>
            <img src={veggiesImage} alt="Fresh Vegetables" className="max-w-xs rounded-lg shadow-md" />
          </div>
        )}
        
        {/* Display Dry Fruits */}
        {dryFruitsImage && (
          <div>
            <p className="font-semibold mb-2">Dry Fruits</p>
            <img src={dryFruitsImage} alt="Dry Fruits" className="max-w-xs rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </section>
  );
}