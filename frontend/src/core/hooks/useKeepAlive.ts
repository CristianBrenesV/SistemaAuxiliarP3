import { useEffect } from "react";

const TIEMPO = 5 * 60 * 1000; 

export default function useIdleLogout() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const logout = () => {
      window.dispatchEvent(new Event("session-expired"));
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, TIEMPO);
    };

    const eventos = ["click", "mousemove", "keydown", "scroll"];

    eventos.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeout);
      eventos.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, []);
}