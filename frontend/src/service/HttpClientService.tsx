import { useState } from "react";
import { SignInInterface } from "../interfaces/ISignIn";
import { AdminInterface } from "../interfaces/IAdmin";
import { MemberInterface } from "../interfaces/IMember";
import { CourseInterface } from "../interfaces/ICourse";
import { CourseRegistrationInterface } from "../interfaces/ICourseRegistration";
import { NewsInterface } from "../interfaces/INews";
import { QuestionInterface } from "../interfaces/IQuestion";
import { GenderInterface } from "../interfaces/IGender";

const apiUrl = `http://localhost:8080`;

const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

// ===== Login =====
//Member Login
async function MemberLogin(data: SignInInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/memberLogin`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("Role", "member");
        localStorage.setItem("Firstname", res.data.firstname);
        localStorage.setItem("Lastname", res.data.lastname);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// Admin Login
const AdminLogin = async (data: AdminInterface) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/adminLogin`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("Role", "admin");
        return res.data;
      } else {
        return false;
      }
    });

  return res;
};

// ===== Admin =====
const GetAdmins = async () => {
  let res = await fetch(`${apiUrl}/admins`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetAdminByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/admin/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== Gender =====
const GetGenders = async () => {
  let res = await fetch(`${apiUrl}/genders`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetGenderByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/gender/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== Member =====
const CreateMember = async (data: MemberInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/member`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const GetMembers = async () => {
  let res = await fetch(`${apiUrl}/members`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetMemberByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/member/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCountMembers = async () => {
  let res = await fetch(`${apiUrl}/count-members`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.totalCount ? result.totalCount : false;
    });

  return res;
};

const UpdateMember = async (data: MemberInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-member`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const UpdateMemberPassword = async (data: MemberInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-member-password`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const DeleteMember = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-member/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== PaymentStatus =====
const GetPaymentStatuses = async () => {
  let res = await fetch(`${apiUrl}/payment_statuses`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetPaymentStatusByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/payment_status/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== CourseStatus =====
const GetCourseStatuses = async () => {
  let res = await fetch(`${apiUrl}/course_statuses`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCourseStatusByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/course_status/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== Course =====
const CreateCourse = async (data: CourseInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/course`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const GetCourses = async () => {
  let res = await fetch(`${apiUrl}/courses`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCourseByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/course/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCoursesByCourseStatusID = async (id: string) => {
  let res = await fetch(
    `${apiUrl}/course_bycoursestatus_id/${id}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCountCoursesByCourseStatusID = async (id: string) => {
  let res = await fetch(
    `${apiUrl}/count-course_bycoursestatus_id/${id}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.totalCount ? result.totalCount : false;
    });

  return res;
};

const UpdateCourse = async (data: CourseInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-course`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const DeleteCourse = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-course/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== Question =====
const CreateQuestion = async (data: QuestionInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/question`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const GetQuestions = async () => {
  let res = await fetch(`${apiUrl}/questions`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetQuestionByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/question/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateQuestion = async (data: QuestionInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-question`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const DeleteQuestion = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-question/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== News =====
const CreateNews = async (data: NewsInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/news`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const GetNews = async () => {
  let res = await fetch(`${apiUrl}/news`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetNewsByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/news/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateNews = async (data: NewsInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-news`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const DeleteNews = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-news/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ===== CourseRegistration =====
const CreateCourseRegistration = async (data: CourseRegistrationInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/course_registration`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const GetCourseRegistrations = async () => {
  let res = await fetch(`${apiUrl}/course_registrations`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCourseRegistrationByID = async (id: string) => {
  let res = await fetch(
    `${apiUrl}/course_registration/${id}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCountCourseRegistrationByPaymentStatusID = async (
  statusId: string
) => {
  let res = await fetch(
    `${apiUrl}/count_course_registrations_bypaymentstatus_id/${statusId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.totalCount ? result.totalCount : false;
    });

  return res;
};

const GetSumCourseRegistrationPrice = async (statusId: string) => {
  let res = await fetch(
    `${apiUrl}/sum_course_registrations_price/${statusId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CheckCourseRegistrationByCourseID = async (
  memberId: string,
  courseId: string,
  statusId: string
) => {
  let res = await fetch(
    `${apiUrl}/check_course_registration_by_courseid/${memberId}/${courseId}/${statusId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.is_registered ? result.is_registered : false;
    });

  return res;
};

const GetCourseRegistrationsByCourseID = async (
  memberId: string,
  courseId: string,
  statusId: string
) => {
  let res = await fetch(
    `${apiUrl}/course_registrations_bycourseid/${courseId}/${statusId}/${memberId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCourseRegistrationByMemberID = async (
  memberId: string,
  statusId: string
) => {
  let res = await fetch(
    `${apiUrl}/course_registrations_bymemberid/${memberId}/${statusId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCourseRegistrationByCourseID = async (
  courseId: string,
  statusId: string
) => {
  let res = await fetch(
    `${apiUrl}/course_registrations_bycourseid/${courseId}/${statusId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCountCoursesRegistraionByMemberID = async (memberId: string) => {
  let res = await fetch(
    `${apiUrl}/count_course_registrations_bymember_id/${memberId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.totalCount ? result.totalCount : false;
    });

  return res;
};

const GetSumCourseRegistrationPricesByMemberID = async (
  statusId: string,
  memberId: string
) => {
  let res = await fetch(
    `${apiUrl}/sum_course_registrations_price/${statusId}/${memberId}`,
    requestOptionsGet
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateCourseRegistration = async (data: CourseRegistrationInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-course_registration`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
};

const DeleteCourseRegistration = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/delete-course_registration/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

export {
  //Login
  MemberLogin,
  AdminLogin,

  //Admin
  GetAdmins,
  GetAdminByID,

  //Gender
  GetGenders,
  GetGenderByID,

  //Member
  CreateMember,
  GetMembers,
  GetMemberByID,
  GetCountMembers,
  UpdateMember,
  UpdateMemberPassword,
  DeleteMember,

  //PaymentStatus
  GetPaymentStatuses,
  GetPaymentStatusByID,

  //CourseStatus
  GetCourseStatuses,
  GetCourseStatusByID,

  //Course
  CreateCourse,
  GetCourses,
  GetCourseByID,
  GetCoursesByCourseStatusID,
  GetCountCoursesByCourseStatusID,
  UpdateCourse,
  DeleteCourse,

  //Question
  CreateQuestion,
  GetQuestions,
  GetQuestionByID,
  UpdateQuestion,
  DeleteQuestion,

  //News
  CreateNews,
  GetNews,
  GetNewsByID,
  UpdateNews,
  DeleteNews,

  //CourseRegistration
  CreateCourseRegistration,
  GetCourseRegistrations,
  GetCourseRegistrationByID,
  GetCourseRegistrationByMemberID,
  GetCourseRegistrationByCourseID,
  GetCourseRegistrationsByCourseID,
  GetCountCourseRegistrationByPaymentStatusID,
  GetSumCourseRegistrationPrice,
  CheckCourseRegistrationByCourseID,
  GetSumCourseRegistrationPricesByMemberID,
  GetCountCoursesRegistraionByMemberID,
  UpdateCourseRegistration,
  DeleteCourseRegistration,
};
