import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        
        <Sidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <Navbar />
        <Outlet/>
        </main>

      </div>
    </div>
  );
}