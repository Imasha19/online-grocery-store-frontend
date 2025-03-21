import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moneySVG from "../../img/money.svg";
import baseURL from "../../utils/baseURL";

// ✅ Validation Schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
});

const EditIncome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incLoading, setIncLoading] = useState(false);
  const [incServerErr, setIncServerErr] = useState(null);

  const fetchIncomeData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIncServerErr("Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      const { data } = await axios.get(`${baseURL}/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      formik.setValues({
        title: data.title || "",
        description: data.description || "",
        amount: data.amount || "",
      });
    } catch (error) {
      setIncServerErr(error.response?.data || "Failed to fetch income data");
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, [id]);

  const formik = useFormik({
    initialValues: { title: "", description: "", amount: "" },
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIncLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setIncServerErr("Unauthorized: No token found. Please log in.");
        setIncLoading(false);
        return;
      }

      try {
        await axios.put(`${baseURL}/income/${id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Income updated successfully!");
        navigate("/income-list");
      } catch (error) {
        setIncServerErr(error.response?.data || "Failed to update income");
      } finally {
        setIncLoading(false);
      }
    },
  });

  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <img className="img-fluid mb-4" src={moneySVG} alt="SVG Income" width="200" />
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <h2 className="mb-4 fw-light">Update Income</h2>
                {incServerErr && <div className="text-danger mb-3">{incServerErr}</div>}

                {/* Form Fields */}
                {["title", "description", "amount"].map((field) => (
                  <div key={field} className="mb-3 input-group">
                    <input
                      name={field}
                      value={formik.values[field]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      type={field === "amount" ? "number" : "text"}
                      placeholder={`Enter ${field}`}
                    />
                    {formik.touched[field] && formik.errors[field] && (
                      <div className="text-danger">{formik.errors[field]}</div>
                    )}
                  </div>
                ))}

                <button type="submit" className="btn btn-primary w-100" disabled={incLoading}>
                  {incLoading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditIncome;
