import React from 'react';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import UserPage from "./pages/user-page/UserPage";
import NavigationPanel, {Link} from "./components/navigation/NavigationPanel";
import doctorIcon from './assets/doctor.png';
import userIcon from './assets/user.png';
import DoctorPage from "./pages/doctor/DoctorPage";

function App() {

    const navigationLinks: Link[] = [
        {
            link: "/doctor",
            name: "Doctors",
            icon: doctorIcon,
        },
        {
            link: "/user",
            name: "Users",
            icon: userIcon,        },
    ]


    return (
        <div className="App">

            <NavigationPanel links={navigationLinks}/>

                <Routes>
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/doctor" element={<DoctorPage />} />
                </Routes>
        </div>
    );
}

export default App;
