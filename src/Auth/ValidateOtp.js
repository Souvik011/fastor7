import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Img/logo.jpg";

const ValidateOtp = () => {
  const [valid, setValid] = useState(true);
  const otp = useRef();
  const Navigate = useNavigate();
  let number = localStorage.getItem("mobile");
  const otpSubmitHandler = (e) => {
    e.preventDefault();
    if (otp.current.value === "123456") {
      setValid(true);

      let url = "https://staging.fastor.in/v1/pwa/user/login";
      const obj = {
        phone: "9818979450",
        dial_code: "+91",
        otp: "123456",
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
          console.log(data.data.token);
          localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
      Navigate("/main");
    } else {
      setValid(false);
    }
  };
  return (
    <div
      style={{
        margin: "5rem 25vw 0 25vw",
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <form
        onSubmit={otpSubmitHandler}
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
        <div style={{ fontSize: "2.5rem" }}>Mobile Number : {number}</div>
        <label>Validate Otp</label>
        <input type="password" ref={otp} placeholder="validate your otp" />
        {!valid && (
          <p style={{ fontSize: "10px", color: "red" }}>
            This is not the Correct Otp
          </p>
        )}
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
          {" "}
          Validate{" "}
        </button>
        <div style={{margin:"1rem",display:"flex",flexDirection:"row",color:"black",justifyContent:"center"}}>Didn't Get the Otp ? <p style={{color:"blue"}}>Resend ?</p></div>
   
      </form>
       </div>
  );
};

export default ValidateOtp;
