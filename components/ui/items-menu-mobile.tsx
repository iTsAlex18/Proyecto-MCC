import { Newspaper, ThumbsUp, User, Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import ToggleTheme from "./toggle-theme";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none">
        <Menu className="w-7 h-7 text-gray-800 dark:text-gray-200" />
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="w-64 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl space-y-6 z-[9999] animate-fade-in animate-slide-in"
      >
        {/* Enlaces principales */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            Introducción
          </Link>
          <Link
            href="/location"
            className="block text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            Visítanos
          </Link>
          <Link
            href="/schedules"
            className="block text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            Horarios y Tarifas
          </Link>
          <Link
            href="/index"
            className="block text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            Índice
          </Link>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 dark:border-gray-700"></div>

        {/* Íconos + toggle */}
        <div className="flex flex-col gap-4 pt-2">
          <Link
            href="/blog"
            className="flex items-center text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            <Newspaper className="w-5 h-5 mr-2" strokeWidth="1.2" />
            Blog
          </Link>
          <Link
            href="/graficas"
            className="flex items-center text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            <ThumbsUp className="w-5 h-5 mr-2" strokeWidth="1.2" />
            Me gusta
          </Link>
          <Link
            href="/login"
            className="flex items-center text-lg text-gray-800 dark:text-gray-200 hover:text-secondary transition-all"
          >
            <User className="w-5 h-5 mr-2" strokeWidth="1.2" />
            Perfil
          </Link>
          <div className="pt-2">
            <ToggleTheme />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;


