import { useEffect, useState, Fragment } from "react";
import { useNavigate} from "react-router-dom/dist";
import logo from "../Img/logo.jpg";

const ResturentPage = () => {
  const [dataa, setDataa] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    let url = "https://staging.fastor.in/v1/m/restaurant?city_id=118&&";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDataa(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  const cuisinePage = () => {
    navi('/cuisine');
  };
  console.log(dataa);
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft:"30%",
          marginRight:"auto"
        }}
      >
        <h3>Fastor 7 Resturent</h3>
        <img
          src={logo}
          alt="fastor7"
          style={{
            margin: "1rem auto 1rem auto",
            height: "4rem",
            width: "6rem",
            marginLeft:"2rem"
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {dataa.map((val) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              height: "20rem",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ margin: "1rem",marginBottom:".24rem" }}>{val.restaurant_name}<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}><p style={{color:"brown",fontWeight:"bold",fontFamily:'fantasy cursive',fontSize:".65rem",textAlign:"center"}}>Status : OPEN      </p><p style={{color:"green",fontSize:".65rem"}}>Rating : {val.rating.restaurant_avg_rating}</p></div></div>
            <div>
              <img
                src={val.images[0].url}
                alt="res-photo"
                style={{ height: "8rem", width: "8rem", margin: "1rem" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "blue",
                fontSize: ".68rem",
              }}
            >
              Opens At :{" "}
              <p
                style={{
                  marginRight: "1rem",
                  marginLeft: "0.24rem",
                  color: "red",
                  fontWeight: "700",
                }}
              >
                {" "}
                {val.opens_at}
              </p>{" "}
              Closes On :
              <p
                style={{
                  marginRight: "1rem",
                  marginLeft: "0.24rem",
                  color: "red",
                  fontWeight: "700",
                }}
              >
                {" "}
                {val.closes_at}
              </p>
            </div>
            <button style={{color:"white",backgroundColor:"magenta",height:"2rem",width:"10rem"}} onClick={cuisinePage}>View Cuisines</button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ResturentPage;
