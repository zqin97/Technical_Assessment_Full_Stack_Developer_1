import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbBar from "@/components/breadcrumb-bar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbBar />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
      <Toaster richColors />
      <TailwindIndicator />
    </SidebarProvider>
  ),
});
