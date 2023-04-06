import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { SelectedAll } from "../Redux/allSlice";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Logic/firebase";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";

const ReportBug = () => {
  const uid = useSelector(SelectedAll).uid;
  const docRef = doc(db, "usersInfo", uid);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      const docSnap = await getDoc(docRef);
      const { displayName, email } = docSnap.data();
      setDisplayName(displayName);
      setEmail(email);
    };

    getDetails();
  }, []);

  const reportBug = (e) => {
    e.preventDefault();

    var templateParams = {
      location: location,
      description: description,
      displayName: displayName,
      email: email,
    };

    location.length == 0 || description.length == 0
      ? toast.error("Field Cant be empty")
      : emailjs
          .send(
            "service_82458w5",
            "template_wzbaeed",
            templateParams,
            "8O1myACtmeotPt_AL"
          )
          .then(
            function () {
              toast.success("Report Sent");
            },
            function () {
              toast.error("Something went wrong....");
            }
          );
  };

  return (
    <form onSubmit={reportBug} action="" className="reportBug">
      <Toaster />
      <div className="reportBug_head">
        <h2>I want to report a bug</h2>
        <Logo />
      </div>
      <div className="reportBug_label">
        <label htmlFor="">
          Location of the bug
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
          />
        </label>
        <label htmlFor="">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </label>
      </div>
      <div className="reportBug_btn">
        <button type="submit" className="reportBug_btn_cta">
          Report
        </button>
      </div>
    </form>
  );
};

export default ReportBug;
