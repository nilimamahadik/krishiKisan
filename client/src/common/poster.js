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
    <>
      <br />
      <Box sx={{ maxWidth: 800, margin: "auto", paddingLeft: 3, paddingRight: 3, paddingBottom: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2, color: "#c11c84", border: "2px solid #c11c84" }}>
        {/* Header Section */}
        <Typography variant="body2" align="center" >
          Subject to Amravati Jurisdiction
        </Typography>
        <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px" }}>
          KISAN SEEDS CORPORATION
        </Typography>
        <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px" }}>
          TRANSPORTER & C&F
        </Typography>

        <Typography variant="body2" align="center">
          Opp. Jadhav Ginning, DABHA
        </Typography>
        <Typography variant="body2" align="center">
          Received goods as per details below for carriage Subject to condition overleaf
        </Typography>
        <Divider sx={{ my: 2, borderColor: "#ed0258", borderWidth: "1px" }} />


        {/* Details Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>No:</strong> <span style={{ borderBottom: "1px dotted black" }}></span>
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>
              <strong>Date:</strong> <span style={{ borderBottom: "1px dotted  #ed0258" }}>{formatDate(data?.createdAt)}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>From:</strong> <span style={{ borderBottom: "1px dotted  #ed0258" }}></span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Driver Name:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.transport_driver_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Truck No:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.transport_number}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Consignor:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.supplier_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Place:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.address}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Consignee:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.vendor_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Place:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.ship_to_address1}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>District:</strong>{" "}
              <span style={{ borderBottom: "1px dotted  #ed0258" }}>{data?.ship_to_district}</span>
            </Typography>
          </Grid>
        </Grid>




        {/* Table Section */}
        <TableContainer component={Paper} style={{ marginTop: "5px" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ed0258" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold", padding: "6px" }}>Description</TableCell>
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
                <TableCell>Bags</TableCell>
                <TableCell>MT</TableCell>
                <TableCell>_____</TableCell>
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
          <Grid item xs={6}><Typography><strong>S.C:</strong> _____</Typography></Grid>
          <Grid item xs={6}><Typography><strong>Hamali:</strong> _____</Typography></Grid>
          <Grid item xs={6}><Typography><strong>S.Ch:</strong> _____</Typography></Grid>
          <Grid item xs={6}><Typography><strong>Total:</strong> _____</Typography></Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: "#ed0258", borderWidth: "1px" }} />

        {/* Footer Section */}
        <Typography variant="body2" align="center">
          दोन प्रतिवर खर स्टैम्प व सहीनिशी पोहोच देणे ७ दिवसाच्या आत पोहोच न आल्यास भाडे मिळणार नाही.
        </Typography>
        <Typography variant="body2" align="center">
          We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Typography variant="body2"><strong>Driver Signature:</strong> __________</Typography>
          <Typography variant="body2"><strong>For: Kisan Seeds Corporation</strong></Typography>
        </Box>


      </Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        {/* <Button onClick={handlePrint} disabled={isButtonDisabled}>Print Page</Button> */}
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrint} disabled={isButtonDisabled} style={{ marginLeft: "3px" }}>Print </Button>
      </Box>
    </>
  );
};

export default Poster;