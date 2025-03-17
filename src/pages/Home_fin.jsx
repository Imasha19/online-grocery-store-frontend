import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/finance.jpg";
import dataSvg from "../img/data.svg";

const Home_fin = () => {
  return (
    <section
      className="relative min-h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content on top of the background */}
      <div className="relative z-10 text-center text-white max-w-[500px] px-6">
        <img src={dataSvg} alt="Data" className="mb-5 w-[60%] h-auto mx-auto" />
        <h2 className="text-3xl font-extrabold mb-4">
          Track Your Income & Expenses
        </h2>
        <p className="text-lg leading-relaxed">
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
        </div>
      </div>
    </section>
  );
};

export default Home_fin;
