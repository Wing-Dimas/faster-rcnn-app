import React from "react";
import { NavLink } from "react-router-dom";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "@/components/atomics";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 w-full py-3 px-4 bg-card/50 border-b backdrop-blur-xl z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between w-full">
        <NavbarMenu />
        <ModeToggle />
      </div>
    </div>
  );
};

const NavbarMenu: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink className={navigationMenuTriggerStyle()} to="/">
              <GitHubLogoIcon className="mr-2 h-4 w-4" /> Github
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink className={navigationMenuTriggerStyle()} to="/">
              Contact Me
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink className={navigationMenuTriggerStyle()} to="/">
              About
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
