import { useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

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
};

type NavApiResponse = {
  data?: {
    header?: {
      // the API seems to return an array-of-arrays where navigation[0] is the array you want
      navigation?: NavItem[][];
    };
  };
};

export function Header(): JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  // typed useQuery so `data` has a known shape
  const { isLoading, isError, error, data } = useQuery<NavApiResponse, Error>({
    queryKey: ["navigation"],
    queryFn: () =>
      fetch("https://www.modernbazaar.online/api/navigation").then((res) =>
        res.json()
      ),
    // optionally tune options like staleTime here
  });

  // DEBUG: inspect the exact raw shape, remove in production
  // console.log("NAV raw response:", data);

  // Normalize: the API returns navigation as nested arrays (navigation[0] is the array of nav items)
  const navArray: NavItem[] = Array.isArray(
    data?.data?.header?.navigation?.[0]
  )
    ? (data!.data!.header!.navigation![0] as NavItem[])
    : [];

  const topNav = Array.isArray(navArray) ? navArray : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred: {error?.message}</div>;

  return (
    <nav className="max-w-[1440px] px-10 mx-auto py-5">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div>
          <img
            src="https://shopkart.ae/assets/logo_desktop.svg"
            alt="logo"
            width={100}
          />
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search for items..." className="pl-3" />
        </div>

        <div>location</div>

        <div className="flex gap-10">
          <div className="flex gap-1 items-center">
            <Heart /> <span className="text-sm">Wishlist</span>
          </div>
          <div className="flex gap-1 items-center">
            <ShoppingCart /> <span className="text-sm">Cart</span>
          </div>
          <div>
            <Button className="bg-black text-white">Sign In</Button>
          </div>
        </div>
      </div>

      {/* nav row */}
      <div className="flex items-center py-5 justify-between">
        {/* categories select */}
        <div className="">
          <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Categories</SelectLabel>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="babycare">Baby Care</SelectItem>
              <SelectItem value="healthAndOrganic">Health & Organic</SelectItem>
              <SelectItem value="snacksAndConfectionery">
                Snacks & Confectionery
              </SelectItem>
              <SelectItem value="eggs">Eggs</SelectItem>
              <SelectItem value="grainsAndMasala">Grains, Oils & Masala</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
              <SelectItem value="personalCare">Personal Care</SelectItem>
              <SelectItem value="householdAndCleaning">
                Household & Cleaning
              </SelectItem>
              <SelectItem value="teaAndCoffee">Tea & Coffee</SelectItem>
              <SelectItem value="fruitsAndVegetables">
                Fruits & Vegetables
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

        {/* <div className="text-2xl px-5"><IoIosArrowDropleft /></div> */}

        {/* top-level menu items + their submenu (only render submenu for active item) */}
        <div className="flex flex-nowrap items-center gap-3 ">
          {topNav.slice(0, 6).map((nav) => {
            const idKey = String(nav.id ?? nav.name);
            const submenu = Array.isArray(nav.menu) ? nav.menu : [];

            return (
              <div
                key={idKey}
                className="relative shrink-0"
                // ensure keyboard focus also shows submenu
                onMouseLeave={() => setActive((prev) => (prev === nav.name ? null : prev))}
              >
                {/* top-level item: use anchor with href (or button if not a real link) */}
                <a href={nav.url ?? "#"}
                  className=" text-sm font-medium hover:text-blue-600 text-black "
                  onMouseEnter={() => setActive(nav.name ?? null)}
                  onFocus={() => setActive(nav.name ?? null)}
                >
                  <p className="flex gap-1 items-center"> {nav.name ?? "Untitled"}
                    <span className="text-sm">{active === nav.name ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
                  </p>
                </a>

                {/* submenu: rendered only for active top-level item */}
                {active === nav.name && submenu.length > 0 && (
                  <div
                    className="absolute left-0 bg-white shadow-md rounded z-50 w-full"
                    role="menu"
                    aria-label={`${nav.name} submenu`}
                  >
                    {submenu.map((item, idx) => {
                      const itemKey = String(item.id ?? item.name ?? idx);
                      return (
                        <a
                          key={itemKey}
                          href={item.url ?? "#"}
                          className="block text-sm hover:bg-gray-100 px-3 py-2 text-black"
                        >
                          {item.name ?? "Untitled"}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* <div className="text-2xl pl-5"><IoIosArrowDropright /></div> */}
      </div>
    </nav>
  );
}
