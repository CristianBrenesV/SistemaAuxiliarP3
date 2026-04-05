import { useEffect, useState } from "react";
import AppRoutes from './core/routes/AppRoutes';
import SessionExpiredModal from './core/components/SessionExpiredModal';
import useIdleLogout from './core/hooks/useKeepAlive';

function App() {
  const [sessionExpired, setSessionExpired] = useState(false);

useIdleLogout();

  useEffect(() => {
    const handleSessionExpired = () => {
      setSessionExpired(true);
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <AppRoutes />

      <SessionExpiredModal
        show={sessionExpired}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default App;