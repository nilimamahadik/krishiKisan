import React, { useRef, useEffect, useState } from 'react';
import logo from '../image/aiimslogo.jpg';
import { makeStyles } from '@material-ui/core/styles';
// import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import footer4 from '../image/footer4.jpg'
import { useNavigate } from "react-router-dom";
import './poster.css'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Divider, Button } from "@mui/material";
import { formatDate } from '../commonfunction/formatDate';
//for developement
// const BASEURL = "http://localhost:5000/api"

//for production

const BASEURL = "/api"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(4),
  },
  image: {
    maxWidth: '400px',
    maxHeight: '400px',

  },
}));

const Poster = (props) => {
  const param = useParams()
  console.log(param);
  const classes = useStyles();
  const componentsPDF = useRef();
  const [data, setData] = useState({});
  console.log(data);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [value, setValue] = useState({});
  console.log(value);

  const navigate = useNavigate();
  // console.log(user);
  const handlePrint = () => {
    setIsButtonDisabled(true);

    window.print();
  };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.print();
  //   }, 1000);

  //   // Clear the timer if the component unmounts before the 2-second delay
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    const getsingleusers = async () => {
      const get = axios.get(`${BASEURL}/getsingleusers/${param.id}`)
        .then((res) => {

          // console.log(res);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getsingleusers();
  }, [])
  useEffect(() => {
    const savedUser = localStorage.getItem("link");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setValue(parsedUser);
      // Update info state with parsedInfo
      // ...
    }
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
  }, []);

  return (
    // <>
    //   <br />
    //   <Box sx={{ maxWidth: 800, margin: "auto", paddingLeft: 3, paddingRight: 3, paddingBottom: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2, color: "#c11c84", border: "2px solid #c11c84" }}>
    //     {/* Header Section */}
    //     <Typography variant="body2" align="center" >
    //       Subject to Amravati Jurisdiction
    //     </Typography>
    //     <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px" }}>
    //       KISAN SEEDS CORPORATION
    //     </Typography>
    //     <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px" }}>
    //       TRANSPORTER & C&F
    //     </Typography>

    //     <Typography variant="body2" align="center">
    //       Opp. Jadhav Ginning, DABHA
    //     </Typography>
    //     <Typography variant="body2" align="center">
    //       Received goods as per details below for carriage Subject to condition overleaf
    //     </Typography>
    //     <Divider sx={{ my: 2, borderColor: "#ed0258", borderWidth: "1px" }} />


    //     {/* Details Section */}
    //     <Grid container spacing={2}>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Receipt No:</strong> <span style={{ borderBottom: "1px dotted black" }}>{data?.receipt_number}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6} textAlign="right">
    //         <Typography>
    //           <strong>Date:</strong> <span style={{ borderBottom: "1px dotted  #ed0258" }}>{formatDate(data?.createdAt)}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Typography>
    //           <strong>From:</strong> <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.vendor_name}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Driver Name:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.transport_driver_name}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Truck No:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.transport_number}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Consignor:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.supplier_name}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Place:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.address}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Consignee:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.vendor_name}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>Place:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.ship_to_address1}</span>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>
    //           <strong>District:</strong>{" "}
    //           <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.ship_to_district}</span>
    //         </Typography>
    //       </Grid>
    //     </Grid>




    //     {/* Table Section */}
    //     <TableContainer component={Paper} style={{ marginTop: "5px" }}>
    //       <Table>
    //         <TableHead sx={{ backgroundColor: "#ed0258" }}>
    //           <TableRow>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Description</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>No. of Articles</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Weight</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Rate</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Total Freight</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Advance</TableCell>
    //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>To Pay</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           <TableRow>
    //             <TableCell>{data?.product_name}</TableCell>
    //             <TableCell>{data?.uom}</TableCell>
    //             <TableCell>{data?.weight}</TableCell>
    //             <TableCell>{data?.rate}</TableCell>
    //             <TableCell>{data?.total_freight}</TableCell>
    //             <TableCell>{data?.advance_paid}</TableCell>
    //             <TableCell>{data?.to_pay}</TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>


    //     <Divider sx={{ my: 2 }} />

    //     {/* Payment Section */}
    //     <Grid container spacing={2}>
    //       <Grid item xs={6}><Typography><strong>S.C:</strong>{data?.sc}</Typography></Grid>
    //       <Grid item xs={6}><Typography><strong>Hamali:</strong>{data?.hamali}</Typography></Grid>
    //       <Grid item xs={6}><Typography><strong>S.Ch:</strong>{data?.sch }</Typography></Grid>
    //       <Grid item xs={6}><Typography><strong>Total:</strong>{data?.total}</Typography></Grid>
    //     </Grid>

    //     <Divider sx={{ my: 2, borderColor: "#ed0258", borderWidth: "1px" }} />

    //     {/* Footer Section */}
    //     <Typography variant="body2" align="center">
    //       दोन प्रतिवर खर स्टैम्प व सहीनिशी पोहोच देणे ७ दिवसाच्या आत पोहोच न आल्यास भाडे मिळणार नाही.
    //     </Typography>
    //     <Typography variant="body2" align="center">
    //       We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.
    //     </Typography>

    //     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
    //       <Typography variant="body2"><strong>Driver Signature:</strong> __________</Typography>
    //       <Typography variant="body2"><strong>For: Kisan Seeds Corporation</strong></Typography>
    //     </Box>


    //   </Box>
    //   <Box sx={{ textAlign: "center", mt: 3 }}>
    //     {/* <Button onClick={handlePrint} disabled={isButtonDisabled}>Print Page</Button> */}
    //     <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
    //       Back
    //     </Button>
    //     <Button variant="contained" color="primary" onClick={handlePrint} disabled={isButtonDisabled} style={{ marginLeft: "3px" }}>Print </Button>
    //   </Box>
    // </>


    //changes by dhawal




  //   <>
  //   <br />
  //   <Box sx={{ maxWidth: 800, margin: "auto", padding: 3, backgroundColor: "#fff", boxShadow: 5, borderRadius: 4, color: "#4A90E2", border: "2px solid #4A90E2", transition: "transform 0.3s ease-in-out", '&:hover': { transform: "scale(1.02)" } }}>
  //     {/* Header Section */}
  //     <Typography variant="body2" align="center" sx={{ color: "#555", fontSize: "0.9rem" }}>
  //       Subject to Amravati Jurisdiction
  //     </Typography>
  //     <Typography variant="h5" align="center" fontWeight="bold" sx={{ marginBottom: "4px", color: "#4A90E2", textTransform: "uppercase" }}>
  //       KISAN SEEDS CORPORATION
  //     </Typography>
  //     <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "4px", color: "#4A90E2", textTransform: "uppercase" }}>
  //       TRANSPORTER & C&F
  //     </Typography>
  
  //     <Typography variant="body2" align="center" sx={{ color: "#555", fontSize: "0.9rem" }}>
  //       Opp. Jadhav Ginning, DABHA
  //     </Typography>
  //     <Typography variant="body2" align="center" sx={{ color: "#555", fontSize: "0.9rem", marginTop: "8px" }}>
  //       Received goods as per details below for carriage Subject to condition overleaf
  //     </Typography>
  //     <Divider sx={{ my: 2, borderColor: "#50E3C2", borderWidth: "1px" }} />
  
  //     {/* Details Section */}
  //     <Grid container spacing={2}>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Receipt No:</strong> <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.receipt_number}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6} textAlign="right">
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Date:</strong> <span style={{ borderBottom: "1px dotted #50E3C2" }}>{formatDate(data?.createdAt)}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>From:</strong> <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.vendor_name}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Driver Name:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.transport_driver_name}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Truck No:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.transport_number}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Consignor:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.supplier_name}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Place:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.address}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Consignee:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.vendor_name}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>Place:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.ship_to_address1}</span>
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>
  //           <strong>District:</strong>{" "}
  //           <span style={{ borderBottom: "1px dotted #50E3C2" }}>{data?.ship_to_district}</span>
  //         </Typography>
  //       </Grid>
  //     </Grid>
  
  //     {/* Table Section */}
  //     <TableContainer component={Paper} style={{ marginTop: "16px", borderRadius: "8px", overflow: "hidden" }}>
  //       <Table>
  //         <TableHead sx={{ backgroundColor: "#50E3C2" }}>
  //           <TableRow>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>Description</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>No. of Articles</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>Weight</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>Rate</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>Total Freight</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>Advance</TableCell>
  //             <TableCell sx={{ color: "white", fontWeight: "bold", padding: "8px" }}>To Pay</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           <TableRow>
  //             <TableCell sx={{ padding: "8px" }}>{data?.product_name}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.uom}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.weight}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.rate}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.total_freight}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.advance_paid}</TableCell>
  //             <TableCell sx={{ padding: "8px" }}>{data?.to_pay}</TableCell>
  //           </TableRow>
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  
  //     <Divider sx={{ my: 2, borderColor: "#50E3C2", borderWidth: "1px" }} />
  
  //     {/* Payment Section */}
  //     <Grid container spacing={2}>
  //       <Grid item xs={6}><Typography sx={{ fontSize: "0.9rem", color: "#333" }}><strong>S.C:</strong> {data?.sc}</Typography></Grid>
  //       <Grid item xs={6}><Typography sx={{ fontSize: "0.9rem", color: "#333" }}><strong>Hamali:</strong> {data?.hamali}</Typography></Grid>
  //       <Grid item xs={6}><Typography sx={{ fontSize: "0.9rem", color: "#333" }}><strong>S.Ch:</strong> {data?.sch}</Typography></Grid>
  //       <Grid item xs={6}><Typography sx={{ fontSize: "0.9rem", color: "#333" }}><strong>Total:</strong> {data?.total}</Typography></Grid>
  //     </Grid>
  
  //     <Divider sx={{ my: 2, borderColor: "#50E3C2", borderWidth: "1px" }} />
  
  //     {/* Footer Section */}
  //     <Typography variant="body2" align="center" sx={{ color: "#555", fontSize: "0.9rem" }}>
  //       दोन प्रतिवर खर स्टैम्प व सहीनिशी पोहोच देणे ७ दिवसाच्या आत पोहोच न आल्यास भाडे मिळणार नाही.
  //     </Typography>
  //     <Typography variant="body2" align="center" sx={{ color: "#555", fontSize: "0.9rem", marginTop: "8px" }}>
  //       We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.
  //     </Typography>
  
  //     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
  //       <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#333" }}><strong>Driver Signature:</strong> __________</Typography>
  //       <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#333" }}><strong>For: Kisan Seeds Corporation</strong></Typography>
  //     </Box>
  //   </Box>
  
  //   <Box sx={{ textAlign: "center", mt: 3 }}>
  //     <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ backgroundColor: "#F5A623", '&:hover': { backgroundColor: "#E08C1E" } }}>
  //       Back
  //     </Button>
  //     <Button variant="contained" color="primary" onClick={handlePrint} disabled={isButtonDisabled} sx={{ backgroundColor: "#F5A623", marginLeft: "8px", '&:hover': { backgroundColor: "#E08C1E" } }}>
  //       Print
  //     </Button>
  //   </Box>
  // </>


//changes by dhawal end



// /* The above code is a JSX template for a receipt container in a web application. It includes sections
// for header, details, table, payment, footer, and buttons. */
// <>
//     <div className="receipt-container">
//         {/* Header Section */}
//         <div className="header-section">
//             <p>Subject to Amravati Jurisdiction</p>
//             <h5>KISAN SEEDS CORPORATION</h5>
//             <h6>TRANSPORTER & C&F</h6>
//             <p>Opp. Jadhav Ginning, DABHA</p>
//             <p>Received goods as per details below for carriage Subject to condition overleaf</p>
//         </div>
//         <hr className="divider" />

//         {/* Details Section */}
//         <div className="details-section">
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                 <p><strong>Receipt No:</strong> <span>{data?.receipt_number}</span></p>
//                 <p><strong>Date:</strong> <span>{formatDate(data?.createdAt)}</span></p>
//             </div>
//             <p><strong>From:</strong> <span>{data?.vendor_name}</span></p>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                 <p><strong>Driver Name:</strong> <span>{data?.transport_driver_name}</span></p>
//                 <p><strong>Truck No:</strong> <span>{data?.transport_number}</span></p>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                 <p><strong>Consignor:</strong> <span>{data?.supplier_name}</span></p>
//                 <p><strong>Place:</strong> <span>{data?.address}</span></p>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                 <p><strong>Consignee:</strong> <span>{data?.vendor_name}</span></p>
//                 <p><strong>Place:</strong> <span>{data?.ship_to_address1}</span></p>
//             </div>
//             <p><strong>District:</strong> <span>{data?.ship_to_district}</span></p>
//         </div>

//         {/* Table Section */}
//         <div className="table-section">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Description</th>
//                         <th>No. of Articles</th>
//                         <th>Weight</th>
//                         <th>Rate</th>
//                         <th>Total Freight</th>
//                         <th>Advance</th>
//                         <th>To Pay</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{data?.product_name}</td>
//                         <td>{data?.uom}</td>
//                         <td>{data?.weight}</td>
//                         <td>{data?.rate}</td>
//                         <td>{data?.total_freight}</td>
//                         <td>{data?.advance_paid}</td>
//                         <td>{data?.to_pay}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         <hr className="divider" />

//         {/* Payment Section */}
//         <div className="payment-section">
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <p><strong>S.C:</strong> {data?.sc}</p>
//                 <p><strong>Hamali:</strong> {data?.hamali}</p>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <p><strong>S.Ch:</strong> {data?.sch}</p>
//                 <p><strong>Total:</strong> {data?.total}</p>
//             </div>
//         </div>
//         <hr className="divider" />

//         {/* Footer Section */}
//         <div className="footer-section">
//             <p>दोन प्रतिवर खर स्टैम्प व सहीनिशी पोहोच देणे ७ दिवसाच्या आत पोहोच न आल्यास भाडे मिळणार नाही.</p>
//             <p>We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.</p>
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//             <p><strong>Driver Signature:</strong> __________</p>
//             <p><strong>For: Kisan Seeds Corporation</strong></p>
//         </div>
//     </div>

//     {/* Button Section */}
//     <div className="button-container">
//         <button onClick={() => navigate(-1)}>Back</button>
//         <button onClick={handlePrint} disabled={isButtonDisabled}>Print</button>
//     </div>
// </>

<>
  <br />
  <Box sx={{ maxWidth: 800, margin: "auto", padding: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2, color: "#c11c84", border: "2px solidrgb(236, 153, 206)" }}>
    {/* Header Section */}
    <Typography variant="body2" align="center" sx={{ color: "black" }}>
      Subject to Amravati Jurisdiction
    </Typography>
    <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px", color: "#CD499C" }}>
      KISAN SEEDS CORPORATION
    </Typography>
    <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px", color: "#CD499C" }}>
      TRANSPORTER & C&F
    </Typography>

    <Typography variant="body2" align="center" sx={{ color: "black" }}>
      Opp. Jadhav Ginning, DABHA
    </Typography>
    <Typography variant="body2" align="center" sx={{ color: "black" }}>
      Received goods as per details below for carriage Subject to condition overleaf
    </Typography>
    <Divider sx={{ my: 2, borderColor: "#ff0000", borderWidth: "1px" }} />

    {/* Details Section */}
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography sx={{ color: "#CD499C" }}>
          <strong>Receipt No:</strong> <span style={{ borderBottom: "1px dotted black", color:"black" }}>{data?.receipt_number}</span>
        </Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" , paddingRight:"240px"}}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Date:</strong> <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{formatDate(data?.createdAt)}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ color: "#CD499C" }}>
          <strong>From:</strong> <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{data?.vendor_name}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: "#CD499C" }}>
          <strong>Driver Name:</strong>{" "}
          <span style={{ borderBottom: "black",color:"black" }}>{data?.transport_driver_name}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Truck No:</strong>{" "}
          <span style={{ borderBottom: "1px dotted black",color:"black" }}>{data?.transport_number}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Consignor:</strong>{" "}
          <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{data?.supplier_name}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Place:</strong>{" "}
          <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{data?.address}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Consignee:</strong>{" "}
          <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{data?.vendor_name}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>Place:</strong>{" "}
          <span style={{ borderBottom: "1px dotted  black" ,color:"black"}}>{data?.ship_to_address1}</span>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: " #CD499C" }}>
          <strong>District:</strong>{" "}
          <span style={{ borderBottom: "1px dotted  black",color:"black" }}>{data?.ship_to_district}</span>
        </Typography>
      </Grid>
    </Grid>

    {/* Table Section */}
    <TableContainer component={Paper} style={{ marginTop: "5px" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#CD499C" }}>
          <TableRow>
            <TableCell sx={{ color: " white", fontWeight: "bold", padding: "6px",alignItems:"center",justifyContent:"center" }}>Description</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>No. of Articles</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Weight</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Rate</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Total Freight</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Advance</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>To Pay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{data?.product_name}</TableCell>
            <TableCell>{data?.uom}</TableCell>
            <TableCell>{data?.weight}</TableCell>
            <TableCell>{data?.rate}</TableCell>
            <TableCell>{data?.total_freight}</TableCell>
            <TableCell>{data?.advance_paid}</TableCell>
            <TableCell>{data?.to_pay}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <Divider sx={{ my: 2 }} />

    {/* Payment Section */}
    <Grid container spacing={2}>
      <Grid item xs={6}><Typography sx={{ color: "black" }}><strong>S.C:</strong>{data?.sc}</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ color: " black" }}><strong>Hamali:</strong>{data?.hamali}</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ color: "black" }}><strong>S.Ch:</strong>{data?.sch }</Typography></Grid>
      <Grid item xs={6}><Typography sx={{ color: "black" }}><strong>Total:</strong>{data?.total}</Typography></Grid>
    </Grid>

    <Divider sx={{ my: 2, borderColor: "#ff0000", borderWidth: "1px" }} />

    {/* Footer Section */}
    <Typography variant="body2" align="center" sx={{ color: "#ff0000" }}>
      दोन प्रतिवर खर स्टैम्प व सहीनिशी पोहोच देणे ७ दिवसाच्या आत पोहोच न आल्यास भाडे मिळणार नाही.
    </Typography>
    <Typography variant="body2" align="center" sx={{ color: "#ff0000" }}>
      We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Typography variant="body2" sx={{ color: " black" }}><strong>Driver Signature:</strong> __________</Typography>
      <Typography variant="body2" sx={{ color: "ed0258" }}><strong>For: Kisan Seeds Corporation</strong></Typography>
    </Box>
  </Box>
  <Box sx={{ textAlign: "center", mt: 3 }}>
    <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
      Back
    </Button>
    <Button variant="contained" color="primary" onClick={handlePrint} disabled={isButtonDisabled} style={{ marginLeft: "3px" }}>Print </Button>
  </Box>
</>














  );
};

export default Poster;