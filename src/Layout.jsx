import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import NewSideBar from './Components/NewSideBar';

const Layout = () => {
    return (
        <div>
        <Header/>
        {/* <Sidebar/> */}
        <NewSideBar/>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;