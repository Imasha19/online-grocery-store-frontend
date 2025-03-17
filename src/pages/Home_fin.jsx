import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/finance.jpg";
import dataSvg from "../img/data.svg";

const Home_fin = () => {
  return (
    <>
      <section
        className="relative min-h-screen w-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 w-[50%] max-w-[500px] h-auto p-8 rounded-xl shadow-lg bg-blue-200 bg-opacity-50 backdrop-blur-md flex flex-col justify-center items-center text-center">
          <img src={dataSvg} alt="Data" className="mb-5 w-[60%] h-auto" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Track Your Income & Expenses
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Get a clear overview of your income and expenses in one powerful dashboard.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/profile"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 hover:from-blue-600 hover:to-blue-800 transform hover:scale-105"
              style={{ textDecoration: "none" }}
            >
              Track Your Performance
            </Link>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
              className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 hover:from-gray-700 hover:to-black transform hover:scale-105"
              style={{ textDecoration: "none" }}
            >
              Video Tutorial
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home_fin;
