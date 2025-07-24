import react from 'react';
import { Outlet } from 'react-router-dom'
// Importing all header and Footer
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx"
function App(){
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200'>
      <div className='w-full max-sm:w-auto max-sm:min-h-screen'>
        <Navbar />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;