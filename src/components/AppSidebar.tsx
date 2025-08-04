import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, User, Code, Terminal, Mail, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "#about", icon: User },
  { title: "Skills", url: "#skills", icon: Code },
  { title: "Projects", url: "#projects", icon: Menu },
  { title: "Terminal", url: "#terminal", icon: Terminal },
  { title: "Contact", url: "#contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavClick = (url: string) => {
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (url === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-14" : "w-60"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-background/70 backdrop-blur-xl border-r border-white/10 shadow-2xl">
        {/* Logo Section */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-lg"
              style={{
                background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                color: 'hsl(var(--primary-foreground))'
              }}
            >
              MJ
            </div>
            {!collapsed && (
              <div>
                <div className="font-bold text-sm text-foreground">Mohammad Jaber</div>
                <div className="text-xs text-muted-foreground">Flutter Developer</div>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full transition-colors duration-200 hover:bg-accent/50",
                      "text-muted-foreground hover:text-foreground",
                      "rounded-lg px-3 py-2"
                    )}
                  >
                    <button
                      onClick={() => handleNavClick(item.url)}
                      className="flex items-center w-full text-left"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}