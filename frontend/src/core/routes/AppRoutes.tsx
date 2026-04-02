import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Login from '../pages/Login';
import Test from '../../modules/pruebas/pages/Test';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 👇 AQUÍ VA */}
        <Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}