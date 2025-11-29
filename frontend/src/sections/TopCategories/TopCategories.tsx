import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";

type MenuItem = {
  id?: string | number;
  name?: string;
  url?: string;
};

type NavItem = {
  id?: string | number;
  name?: string;
  url?: string;
  menu?: MenuItem[]; // submenu items (if any)
  image?: "";
};

type NavApiResponse = {
  data?: {
    header?: {
      // the API seems to return an array-of-arrays where navigation[0] is the array you want
      navigation?: NavItem[][];
    };
  };
};           

export default function TopCategories(): JSX.Element {
  const { isLoading, isError, error, data } = useQuery<NavApiResponse, Error>({
    queryKey: ["navigation"],
    queryFn: () =>
      fetch("https://www.modernbazaar.online/api/navigation").then((res) =>
        res.json()
      ),
  });

  const navArray: NavItem[] = Array.isArray(
    data?.data?.header?.navigation?.[0]
  )
    ? (data!.data!.header!.navigation![0] as NavItem[])
    : [];

  const topNav = Array.isArray(navArray) ? navArray : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error?.message}</div>;

  return (
    <section className="p-10">
        <p>Top Categories</p>
        <div className="flex flex-wrap gap-5 items-start py-3">
          {topNav.slice(0, 8).map((nav) => {
            const idKey = String(nav.id ?? nav.name);
            return (
              <a href={nav.url} key={idKey} className="w-[100px]">                
                  <img className="flex gap-1 rounded-2xl" src={nav.image} width={100} height={100}>
                  </img> 
                  <p className="text-xs py-2 text-center">{nav.name}</p>              
              </a>
            );
          })}          
        </div>

        <p>Best Seller</p>
        <div className="flex flex-wrap gap-5 items-start py-3">
          {topNav.slice(8, 20).map((nav) => {
            const idKey = String(nav.id ?? nav.name);
            return (
              <a href={nav.url} key={idKey} className="w-[100px]">                
                  <img className="flex gap-1 rounded-2xl" src={nav.image} width={100} height={100}>
                  </img> 
                  <p className="text-xs py-2 text-center">{nav.name}</p>              
              </a>
            );
          })}          
        </div>
    </section>
  );
}