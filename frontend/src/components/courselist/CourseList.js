import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses") // Assure-toi que l'API tourne
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Erreur de chargement des cours", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">📚 Nos Cours</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={course.videoURL}
                    title={course.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
