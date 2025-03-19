import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpenseAction } from "../../redux/slices/expenses/expensesSlices";

// Form validation schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
});

const Expense = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.user);
  const { loading, appErr, serverErr, expenseCreated } = useSelector((state) => state.expenses);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
      user: userAuth?._id || "", // Match schema (use `user` instead of `userId`)
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(createExpenseAction(values));
      resetForm();
    },
    validationSchema: formSchema,
  });

  // Auto-fill user ID when available
  useEffect(() => {
    if (userAuth) {
      formik.setFieldValue("user", userAuth._id);
    }
  }, [userAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {/* Image Section */}
        <div className="flex justify-center mb-4">
          <img src="/exp1.svg" alt="Expense" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Expense</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter expense title"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formik.values.amount}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
            {formik.touched.amount && formik.errors.amount && (
              <div className="text-red-500">{formik.errors.amount}</div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          {/* User ID (Auto-filled) */}
          <div>
            <label className="block text-gray-700 font-medium">User</label>
            <input
              type="text"
              name="user"
              value={formik.values.user}
              readOnly
              className="w-full px-3 py-2 border bg-gray-200 rounded-md focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Expense"}
          </button>
        </form>

        {/* Error & Success Messages */}
        {appErr || serverErr ? <div className="text-red-500 mt-4">{appErr || serverErr}</div> : null}
        {expenseCreated && <div className="text-green-500 mt-4">Expense created successfully!</div>}
      </div>
    </div>
  );
};

export default Expense;
