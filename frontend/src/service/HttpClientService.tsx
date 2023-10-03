import { useState } from "react";
import { SignInInterface } from "../interfaces/ISignIn";
import { AdminInterface } from "../interfaces/IAdmin";
import { MemberInterface } from "../interfaces/IMember";
import { CourseInterface } from "../interfaces/ICourse";
import { CourseRegistrationInterface } from "../interfaces/ICourseRegistration";
import { NewsInterface } from "../interfaces/INews";
import { QuestionInterface } from "../interfaces/IQuestion";

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

  //Member
  CreateMember,
  GetMembers,
  GetMemberByID,
  UpdateMember,
  DeleteMember,

  //PaymentStatus
  GetPaymentStatuses,

  //Course
  CreateCourse,
  GetCourses,
  GetCourseByID,
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
  UpdateCourseRegistration,
  DeleteCourseRegistration,
};
