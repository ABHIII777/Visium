import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>LANDING PAGE AHAHAHAH</h1>
      <button onClick={() => navigate("/sort")}>SORT HAHAHA</button>
      <button onClick={() => navigate("/graphs")}>GRAPHS HAHAHA</button>
    </>
  );
}
