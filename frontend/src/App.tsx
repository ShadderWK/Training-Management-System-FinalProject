import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//Page Register
import Register from "./page/register/Register";

//Page Member
import Member from "./page/login/Member";
import Home from "./component/Home/Home";
import CourseReg from "./component/CourseReg/CourseReg";
import CoursePurchase from "./component/CourseReg/CoursePurchase";
import MyCourse from "./component/MyCourse/MyCourse";
import FAQ from "./component/FAQ/FAQ";

//Page Admin
import Admin from "./page/login/Admin";
import AdminHome from "./component/Home/AdminHome";
import News from "./component/News/News";
import AddNews from "./component/News/AddNews";
import EditFAQ from "./component/FAQ/EditFAQ";
import AddFAQ from "./component/FAQ/AddFAQ";
import UpdateFAQ from "./component/FAQ/UpdateFAQ";
import CheckPayment from "./component/CheckPayment/CheckPayment";
import ChangeStatus from "./component/CheckPayment/ChangeStatus";

//Component
import Topbar from "./component/TopBar/Topbar";

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Topbar />} />
        <Route path="/register" element={<Register />} />

        {/* Member */}
        <Route path="member" element={<Member />} />
        <Route path="member/home" element={<Home />} />
        <Route path="member/course/:id" element={<CourseReg />} />
        <Route path="member/course-purchase/:id" element={<CoursePurchase />} />
        <Route path="member/mycourse" element={<MyCourse />} />
        <Route path="member/faq" element={<FAQ />} />

        {/* Admin */}
        <Route path="admin" element={<Admin />} />
        <Route path="admin/home" element={<AdminHome />} />
        <Route path="admin/edit-news" element={<News />} />
        <Route path="admin/add-news" element={<AddNews />} />
        <Route path="admin/edit-faq" element={<EditFAQ />} />
        <Route path="admin/add-faq" element={<AddFAQ />} />
        <Route path="admin/update-faq/:id" element={<UpdateFAQ />} />
        <Route path="admin/check-payment" element={<CheckPayment />} />
        <Route path="admin/change-status/:id" element={<ChangeStatus />} />
      </Routes>
    </div>
  );
}

export default App;
