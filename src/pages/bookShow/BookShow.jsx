import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleShowDetals } from "../../API/show";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import moment from "moment";
function BookShow() {
  const { id } = useParams();
  const [moviedata, setMoviedata] = useState();
  const [totalSeats, setTotalSeats] = useState(120); 
  const [isSelected, setIsSelected] = useState([]);
  const navigate = useNavigate();

  const seatsBooking = (seatNumber) => {
    if (isSelected.includes(seatNumber)) {
      setIsSelected(isSelected.filter((seat) => seat !== seatNumber));
    } else {
      setIsSelected([...isSelected, seatNumber]);
    }
  };

  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    const isSeatSelected = isSelected.includes(i);
    seats.push(
      <div
        key={i}
        onClick={() => seatsBooking(i)}
        style={{
          width: "35px",
          height: "30px",
          margin: "2px",
          background: isSeatSelected ? "green" : "white",
          border: "1px solid green",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          borderRadius: "3px",
          transition: "background 0.3s ease", 
        }}
        onMouseEnter={(e) => {
          if (!isSeatSelected) e.target.style.background = "#f1f1f1"; 
        }}
        onMouseLeave={(e) => {
          if (!isSeatSelected) e.target.style.background = "white"; 
        }}
      >
        {i}
      </div>
    );
  }

  const singleShow = async () => {
    const showDetails = await getSingleShowDetals({ showId: id });
    setMoviedata(showDetails.data);
    console.log(showDetails.data)
    if (showDetails) {
      setTotalSeats(showDetails.data.totalSeats || 120);
    }
  };

  useEffect(() => {
    singleShow();
  }, []);

  if (!moviedata) return null; 

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        height: "93vh",
        position: "relative",
        background: "#f9f9f9",
      }}
    >
      
      <Button
        type="primary"
        shape="round"
        icon={<LeftOutlined />}
        size="large"
        onClick={()=>{
          navigate(`/movie/${moviedata.movie._id}?=${moment().format('YYYY-MM-DD')}`)
        }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "linear-gradient(90deg, #4b79a1, #283e51)",
          borderColor: "#283e51",
          color: "white",
        }}
      >
        Go Back
      </Button>

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <p>{moviedata.movie.title}</p>
        <p style={{ fontSize: "13px", fontWeight: "400", marginTop:"-15px" }}>
          Theater: {moviedata.theater.name}
        </p>
      </div>

      {/* Screen Indicator */}
      <div
        style={{
          position: "absolute",
          top: "75px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "20px",
          backgroundColor: "#e6e6e6",
          textAlign: "center",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        SCREEN
      </div>

      {/* Seats Grid */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2px",
          overflow: "hidden",
        }}
      >
        {seats}
      </div>

      {/* Selected Seats */}
      {isSelected.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "430px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          <p>
            {isSelected.length > 1
              ? `Selected Seats: ${isSelected.join(", ")}`
              : `Selected Seat: ${isSelected[0]}`}
          </p>
        </div>
      )}

      {/* Details Section */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          textAlign: "right",
          fontSize: "14px",
          fontWeight: "500",
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <p>
          Show Name: <strong>{moviedata.name}</strong>
        </p>
        <p>
          Date & Time: <strong>{moviedata.time}</strong>
        </p>
        <p>
          Ticket Price: <strong>₹{moviedata.ticketPrice}</strong>
        </p>
        <p>
          Total Seats: <strong>{moviedata.totalSeats}</strong>
        </p>
        <p>
          Available Seats:{" "}
          <strong>{moviedata.totalSeats - isSelected.length}</strong>
        </p>
      </div>

      {/* Pay Button */}
      {isSelected.length > 0 && (
        <Button
          type="primary"
          size="large"
          style={{
            position: "absolute",
            bottom: "50px",
            right: "48%",
            background: "linear-gradient(90deg, #4CAF50, #087f23)",
            borderColor: "#087f23",
            color: "white",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Pay Now
        </Button>
      )}
    </div>
  );
}

export default BookShow;
























// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSingleShowDetals } from "../../API/show";
// import { LeftOutlined } from '@ant-design/icons';
// import { Button } from 'antd';


// function BookShow(){
//   const {id} = useParams();
//   const[moviedata, setMoviedata] = useState();
//   const[totalSeats, setTotalSeats] = useState(0);
//   const[bookedSeates, setBookedSeats] = useState([]);
//   const seats = [];
//   const [isSelected, setIsSelecetd] = useState([])
//    function seatsBooking(seatNumber){
//     if(isSelected.includes(seatNumber)){
//       setIsSelecetd(isSelected.filter((seat)=>seat !== seatNumber))
//     }else{
//       setIsSelecetd([...isSelected, seatNumber])
//     }
//    }

//   for (let i = 1; i <= totalSeats; i++) {
//     const isSeatSelected = isSelected.includes(i);
//     seats.push(
//       <div
//        onClick={()=>{seatsBooking(i)}}
//         key={i}
//         style={{
//           width: "43px",
//           height: "28px",
//           margin: "3px 2.5px",
//           background: isSeatSelected ? "green" : "white",
//           border:"1px solid green",
//           cursor:"pointer",
//           textAlign:"center",
//           fontWeight:"600"
          
//         }}
//       >
//         {i}
//       </div>
//     );
//   }

//     const singleShow = async()=>{
//       const showDetails = await getSingleShowDetals({showId:id});
//       console.log(showDetails.data);
//       setMoviedata(showDetails.data);
//       if(showDetails){
//         setTotalSeats(showDetails.data.totalSeats);
//         setBookedSeats(showDetails.data.bookedSeats)
//       }
//     }

//     useEffect(()=>{
//     singleShow();
//     },[])
//   if(moviedata){
//   return (
//     <div>
//        <Button
//       type="primary"
//       shape="round"
//       icon={<LeftOutlined />}
//       size="large"
      
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(90deg, #4b79a1, #283e51)', // Gradient background
//         borderColor: '#283e51',
//         color: 'white',
//         fontWeight: 'bold',
//         padding: '0 20px',
//       }}
//       hoverable="true"
//     >
//       Go Back
//     </Button>
//       <div style={{position:"absolute", width:"300px", height:"120px",top:"20px",left:"20px",textAlign:"center"}}>
//          <p style={{position:"absolute",top:"-27px",left:"30px",fontSize:"27px", fontWeight:"700"}}>{moviedata.movie.title}</p>
//          <span style={{marginTop:"-10px",position:"absolute",top:"50px",left:"30px",fontSize:"12px",fontWeight:"600"}}>Theater: {moviedata.theater.name}</span>
//       </div>
//      <div style={{position:"absolute",width:(totalSeats * 5)+"px",height:"15px",borderRadius:"8px",background:"#e6e6e6",top:"17%",left:"24%",
//       textAlign:"center",fontWeight:"600",fontSize:"10px"
//      }}>
//       SCREEN
//      </div>
//       <div
//       style={{position:"absolute",width:(totalSeats * 5)+"px",height:(totalSeats * 3)+"px",
//         display:"flex", flexWrap:"wrap",top:"20%",left:"24%"}}
//       >
//          <div style={{ display: "flex", flexWrap: "wrap"}}>{seats}</div>
//       </div>
//       <div style={{position:"absolute",
//                    right:"60px",
//                    top:"30px",
//                    width:"300px",
//                    height:"200px",
//                    fontFamily:"inherit",
//                    fontSize:"14px"
//                   }}>
//         <p>show name : <span style={{fontWeight:"500"}}>{moviedata.name}</span></p>
//         <p style={{marginTop:"-10px"}}>Date & Time: <span style={{fontWeight:"500"}}>{moviedata.time}</span></p>
//         <p style={{marginTop:"-10px"}}>Ticket Price: <span style={{fontWeight:"500"}}>RS/- {moviedata.ticketPrice}</span></p>
//         <p style={{marginTop:"-10px"}}>Total seats: <span style={{fontWeight:"500"}}>{moviedata.totalSeats}</span></p>
//         <p style={{marginTop:"-10px"}}>Avaliable seats: <span style={{fontWeight:"500"}}>{moviedata.totalSeats - isSelected.length}</span></p>

//       </div>
//      {isSelected.length !==0 && <div style={{position:"absolute", bottom:"40px",left:"200px",fontFamily:"sans-serif",fontWeight:"500",width:"700px",height:"20px",border:"1px solid gray",padding:"20px"}}>
//                       {isSelected.length !== 1 ? (<span style={{fontWeight:"700"}}>SELECTED SEATS : {isSelected.map((s,i)=>i==0?s:", "+s)}</span> ): (<span style={{fontWeight:"700"}}>SELECTED SEAT : {isSelected.map(s=>s)}</span>)
//                         }
//       </div>
      
//       }
//     </div>
//   )}
// }

// export default BookShow;

