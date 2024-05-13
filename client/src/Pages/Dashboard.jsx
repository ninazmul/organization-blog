import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import DashPost from "../Components/DashPost";


const Dashboard = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* sidebar */}
        <div className="md:w-56">
          <DashSidebar />
        </div>
        {/* profile  */}
        <div className="flex-1">
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <DashPost />}
        </div>
      </div>
    );
};

export default Dashboard;