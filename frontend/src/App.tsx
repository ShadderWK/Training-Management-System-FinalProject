import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//Page Register
import Register from "./page/register/Register";

//Page Member
import Member from "./page/login/Member";
import MemberProfile from "./component/UserProfile/MemberProfile";
import EditProfile from "./component/UserProfile/EditProfile";
import ChangePassword from "./component/UserProfile/ChangePassword";
import Home from "./component/Home/Home";
import CourseReg from "./component/CourseReg/CourseReg";
import CoursePurchase from "./component/CourseReg/CoursePurchase";
import MyCourse from "./component/MyCourse/MyCourse";
import FAQ from "./component/FAQ/FAQ";
import CheckCourse from "./component/MyCourse/CheckCourse";
import MyCourseWaiting from "./component/MyCourse/MyCourseWaiting";

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
import ListRegCourse from "./component/ListRegCourse/ListRegCourse";
import ListCourseByID from "./component/ListRegCourse/ListCourseByID";
import Course from "./component/ListRegCourse/Course";
import AddCourse from "./component/ListRegCourse/AddCourse";
import UpdateCourse from "./component/ListRegCourse/UpdateCourse";
import MyCourseDetail from "./component/MyCourse/MyCourseDetail";
import ListMember from "./component/ListMember/ListMember";
import MemberDetail from "./component/ListMember/MemberDetail";

//Component
import Topbar from "./component/TopBar/Topbar";

function App() {
  const [token, setToken] = useState<String>("");

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
        <Route path="member/profile/:id" element={<MemberProfile />} />
        <Route path="member/edit-profile/:id" element={<EditProfile />} />
        <Route path="member/change-password/:id" element={<ChangePassword />} />
        <Route path="member/home" element={<Home />} />
        <Route path="member/course/:id" element={<CourseReg />} />
        <Route path="member/course-purchase/:id" element={<CoursePurchase />} />
        <Route path="member/mycourse" element={<MyCourse />} />
        <Route path="member/faq" element={<FAQ />} />
        <Route path="member/mycourse/:id" element={<MyCourseDetail />} />
        <Route path="member/check/:id" element={<CheckCourse />} />
        <Route path="member/waiting/:id" element={<MyCourseWaiting />} />

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
        <Route path="admin/list-reg-course" element={<ListRegCourse />} />
        <Route path="admin/list-course/:id" element={<ListCourseByID />} />
        <Route path="admin/course/:id" element={<Course />} />
        <Route path="admin/add-course" element={<AddCourse />} />
        <Route path="admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="admin/list-member" element={<ListMember />} />
        <Route path="admin/member-detail/:id" element={<MemberDetail />} />
      </Routes>
    </div>
  );
}

export default App;
