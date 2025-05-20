"use client";
import { CircleUserRound, ChartNoAxesCombined  } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";


const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-[1000] w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 mx-auto sm:px-8 sm:py-4 max-w-7xl">
        
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-xl sm:text-2xl font-bold text-primary cursor-pointer hover:text-secondary transition-colors"
        >
          INSTITUTO SONORENSE <br className="sm:hidden" />
          <span className="text-secondary">DE CULTURA</span>
        </h1>

        {/* Menú de escritorio */}
        <div className="hidden sm:flex items-center gap-6">
          <MenuList />
        </div>

        {/* Menú móvil */}
        <div className="sm:hidden">
          <ItemsMenuMobile />
        </div>

        {/* Iconos */}
        <div className="hidden sm:flex items-center gap-6">
          <CircleUserRound
            strokeWidth="1.5"
            className="text-gray-600 dark:text-gray-300 hover:text-secondary transition duration-200 transform hover:scale-110 cursor-pointer"
            onClick={() => router.push("/login")}
          />
          <ChartNoAxesCombined 
            strokeWidth="1.5"
            className="text-gray-600 dark:text-gray-300 hover:text-secondary transition duration-200 transform hover:scale-110 cursor-pointer"
            onClick={() => router.push("/graficas")}
          />
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

