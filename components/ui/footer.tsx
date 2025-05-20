import Link from "next/link";
import { Separator } from "./separator";

const dataFooter = [
  { id: 1, name: "Visítanos", link: "/location" },
  { id: 2, name: "Horarios", link: "/schedules" },
  { id: 3, name: "Índice", link: "/index" },
  { id: 4, name: "Blog", link: "#" },
  { id: 5, name: "Política de Privacidad", link: "/privpoli" },
];

const Footer = () => {
  return (
    <footer className="mt-12 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 shadow-inner">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-700 dark:text-white text-sm md:text-base">
            <span className="font-semibold text-secondary">
              Instituto Sonorense de Cultura
            </span>{" "}
            - Museo de la Lucha Obrera
          </p>

          <ul className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.link}
                  className="relative inline-block after:block after:h-[2px] after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left hover:text-secondary"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-6 border-gray-200 dark:border-gray-700" />

        <span className="block text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; 2025{" "}
          <Link
            href="#"
            className="hover:text-secondary transition-colors duration-200"
          >
            Instituto Sonorense de Cultura
          </Link>
          . Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
