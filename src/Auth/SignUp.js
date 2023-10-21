import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Img/logo.jpg";

const SignUp = () => {
  const MobileRef = useRef();
  const Navigate = useNavigate();

  const submitHandler = () => {
    const url = "https://staging.fastor.in/v1/pwa/user/register";
    localStorage.setItem('mobile',MobileRef.current.value);
    const obj = {
      phone: "9818979450",
      dial_code: "+91",
    };
    const requestBodyJSON = JSON.stringify(obj);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBodyJSON,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    Navigate("/otp");
  };
  return (
    <Fragment>
      <div
        style={{
          margin: "5rem 25vw 0 25vw",
          position: "relative",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={logo}
            alt="fastor7"
            style={{
              margin: "1rem auto 1rem auto",
              height: "7rem",
              width: "7rem",
            }}
          />
          <label style={{ fontSize: "2.5rem" }}>Enter Your Mobile Number</label>
          <p style={{ textAlign: "center" }}>
            We will send you 6 digit verification code
          </p>
          <input type="text" placeholder="Mobile Number" ref={MobileRef} />
          <button
            type="submit"
            style={{
              height: "2rem",
              width: "12rem",
              textAlign: "center",
              backgroundColor: "orange",
              color: "white",
              margin: "1rem auto 1rem auto",
            }}
          >
            Send Code{" "}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
