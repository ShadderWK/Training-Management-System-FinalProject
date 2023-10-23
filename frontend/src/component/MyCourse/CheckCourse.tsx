import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCourseRegistrationByCourseID } from "../../service/HttpClientService";

function CheckCourse() {
  const { id } = useParams();
  const Uid = localStorage.getItem("uid") + "";
  const [check1, setCheck1] = useState("not_checked");
  const [check2, setCheck2] = useState("not_checked");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchCheckCourseRegistrationByCourseID1 = async () => {
    let res = await CheckCourseRegistrationByCourseID(Uid, id + "", "1");
    setCheck1(res);

    if (res === "checked") {
      navigate(`/member/waiting/${id}`);
    }
  };

  const fetchCheckCourseRegistrationByCourseID2 = async () => {
    let res = await CheckCourseRegistrationByCourseID(Uid, id + "", "2");
    setCheck2(res);

    if (res === "checked") {
      navigate(`/member/mycourse/${id}`);
    }
  };

  const check2fetch = async () => {
    if (check1 === "not_checked" && check2 === "not_checked") {
      navigate(`/member/course/${id}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/member");
    }

    const role = localStorage.getItem("Role");
    if (role === "member") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    fetchCheckCourseRegistrationByCourseID1();
    fetchCheckCourseRegistrationByCourseID2();
    check2fetch();
  }, []);

  return <div></div>;
}

export default CheckCourse;
