import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ReservationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    date: "",
    lessonType: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be a valid phone number")
      .required("Phone is required"),
    date: Yup.date().required("Please select a date"),
    lessonType: Yup.string()
      .oneOf(["Beginner", "Advanced"], "Invalid lesson type")
      .required("Lesson type is required"),
    notes: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reservations",
        values
      );
      console.log(response)
      alert("Reservation Successful!");
      resetForm();
    } catch (error) {
      alert("Error making reservation: " + error.response?.data?.error || error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-4">
      <h2>Book a Driving Lesson</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="p-4 border rounded shadow">
            <div className="mb-3">
              <label>Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <Field type="text" name="phone" className="form-control" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Preferred Date</label>
              <Field type="date" name="date" className="form-control" />
              <ErrorMessage name="date" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Lesson Type</label>
              <Field as="select" name="lessonType" className="form-control">
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Advanced">Advanced</option>
              </Field>
              <ErrorMessage name="lessonType" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Additional Notes</label>
              <Field as="textarea" name="notes" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationForm;
