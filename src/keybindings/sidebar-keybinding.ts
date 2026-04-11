import { useUIStore } from "@/store/uiStore";
import { useEffect, useRef } from "react";

export function sidebarKeybindings() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const toogleSidebar = useUIStore((s) => s.toggleSidebar)

  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

      if (e.key === 'o' && sidebarOpen) {
        console.log('open')
      }

      if (e.key === 'f' && lastKeyRef.current === ',' && timeDiff < 300) {
        toogleSidebar();
      }

      lastKeyRef.current = e.key;
      lastTimeRef.current = now;
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen])

}
