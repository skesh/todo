import { AppFrame } from "@/interfaces/appFrames";
import { useEffect, useRef } from "react";

export function sidebarKeybindings(
  isSidebarOpen: boolean,
  setSidebar: (state: boolean) => void,
  activeFrame: AppFrame,
) {
  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

      if (e.key === 'o' && activeFrame === AppFrame.sidebar) {
        console.log('open')
      }

      if (e.key === 'f' && lastKeyRef.current === ',' && timeDiff < 300) {
        setSidebar(!isSidebarOpen);
      }


      lastKeyRef.current = e.key;
      lastTimeRef.current = now;
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  })

}
