import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shareed/Footer/Footer";
import Nav from "../Pages/Shareed/Navigationbar/Nav";

const MMain = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MMain;