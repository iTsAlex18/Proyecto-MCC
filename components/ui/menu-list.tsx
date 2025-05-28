"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const MenuList =() => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explora</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/location"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                        Visítanos
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Nos ubicamos en: Heroica Ciudad de Cananea, Sonora, México. 
                    Es una ciudad minera mexicana localizada al norte del estado de Sonora.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Introducción">
              El edificio que aloja al museo fue originalmente la Cárcel de Cananea de 1903 a 1979.
              </ListItem>
              <ListItem href="/schedules" title="Horarios y Tarifas">
              Aquí te daremos más información sobre nuestros horarios y tarifas.
              </ListItem>
              <ListItem href="/index" title="Índice">
              Conocerás toda nuestra galería e información que tienen nuestras salas y celdas.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nuestras Redes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const components: { title: string; href: string; }[] = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/MuseoLuchaObrera/?locale=es_LA",
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@MuseodelaLuchaObreraCananeaSon",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/ISCsonora",
  },
  {
    title: "Pagina-Web Isc",
    href: "https://isc.sonora.edu.mx",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


