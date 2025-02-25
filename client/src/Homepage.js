/// import React, { useEffect } from "react";
// import frontpage from "./image/frontpage.jpg";
// import "./Homepage.css";
// import ganeshji1 from "./image/ganeshji1.jpg";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { userLogout } from "./Redux/actions";

// function App(props) {
//   useEffect(() => {
//     props.userLogout();
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <nav
//           style={{
//             position: "absolute",
//             top: 0,
//             right: "20px",
//             padding: "10px",
//             zIndex: 1,
//           }}
//         >
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/adminlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Association/Mandal
//               </a>
//             </li>
//             <li style={{ display: "flex", alignItems: "center" }}>
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/userlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Member
//               </a>
//             </li>
//           </ul>
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/cricket"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Cricket
//               </a>
//             </li>
//           </ul>
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/partnerlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Partner
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// }

// const mapStateToProps = (state) => {
//   return { candidate: state.candidate };
// };

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ userLogout }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogout } from "./Redux/actions";
// import * as React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "antd";



function App(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const selectedRoute = event.target.value;
    setSelectedOption(selectedRoute);

    if (selectedRoute) {
      navigate(selectedRoute); // Navigate to the selected route
    }
  };

  useEffect(() => {
    props.userLogout();
  }, []);

  return (


    <div className="outer">


  

    <div class="containers">
    {/* <!-- Left Side: Truck Image with Overlay Text --> */}
    
      
      

   
    
      
      
    </div>
       <div class="image-overlay">
        {/* <img src="./image/trucks.jpeg" alt="Truck Image" />  */}
        {/* <div class="overlay-text"> */}
          <h1 style={{alignContent:'center',textAlign:'center', color:'red'}} >Lorry Management System</h1>
          <p style={{alignContent:'center',textAlign:'center'}}>Efficiently manage your fleet with our advanced system.</p>
        {/* </div> */}
        <div class="login-options">
       <div class="design">
        
        <h2 style={{alignContent:'center',textAlign:'center',color:'black'}}>Choose Login Option </h2>
        {/* <div className="options">
          <label className="option">
            <Button
              placeholder="Admin"
              value="/adminlogin"
              checked={selectedOption === 'organization'}
              onChange={handleOptionChange}
            />
            
          </label>
          <br/>
          <label className="option">
            <Button

              placeholder="User"
             value="/userlogin"
              checked={selectedOption === 'member'}
              onChange={handleOptionChange}
            />
            
          </label>
        </div> */}

         <div class="buttons">
            <Button class="organisation" onClick={() => navigate("/adminlogin")}style={{width:"200px",height:"50px"}}>Company Admin</Button>
            <Button class="member" onClick={() => navigate("/userlogin")}style={{width:"200px",height:"50px"}}>Employee</Button>
          </div>
        </div>
        
        </div>
       </div>
       
    <footer className="footer">
      <p>For more information or query contact  <a href="http://www.bharat-online.com" target="_blank">
            www.bharat-online.com</a></p>
    </footer>
    
    </div>
  
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
