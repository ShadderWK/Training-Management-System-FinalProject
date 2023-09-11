import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BlogCourse.css";

type Props = {
  id: number;
  name: string;
  image: string;
};

function BlogCourse({ id, name, image }: Props) {
  let navigate = useNavigate();

  return (
    <div
      className="blog-course-container"
      onClick={() => navigate(`/member/course/${id}`)}
    >
      <div className="blog-course-img">
        <img src={image} />
      </div>
      <div className="blog-course-title">{name}</div>
    </div>
  );
}

export default BlogCourse;
