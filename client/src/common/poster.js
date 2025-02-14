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
       <Box sx={{ maxWidth: 800, margin: "auto", padding: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2 , marginTop:"50px"}}>
      {/* Header Section */}
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        KISAN SEEDS CORPORATION
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        TRANSPORTER & C&F
      </Typography>
      <Typography variant="body2" align="center">
        Opp. Jadhav Ginning, DABHA
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      {/* Details Section */}
      <Grid container spacing={2}>
        <Grid item xs={6}><Typography><strong>No:</strong> ______</Typography></Grid>
        <Grid item xs={6} textAlign="right"><Typography><strong>Date:</strong> ______</Typography></Grid>
        <Grid item xs={12}><Typography><strong>From:</strong> ______________________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Driver Name:</strong> __________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Truck No:</strong> __________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Consignor:</strong> __________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Consignee:</strong> __________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>Place:</strong> __________</Typography></Grid>
        <Grid item xs={6}><Typography><strong>District:</strong> __________</Typography></Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>No. of Articles</strong></TableCell>
              <TableCell><strong>Weight</strong></TableCell>
              <TableCell><strong>Rate</strong></TableCell>
              <TableCell><strong>Total Freight</strong></TableCell>
              <TableCell><strong>Advance</strong></TableCell>
              <TableCell><strong>To Pay</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Bags</TableCell>
              <TableCell>MT</TableCell>
              <TableCell>_____</TableCell>
              <TableCell>_____</TableCell>
              <TableCell>_____</TableCell>
              <TableCell>_____</TableCell>
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
      
      <Divider sx={{ my: 2 }} />
      
      {/* Footer Section */}
      <Typography variant="body2" align="center">
        We have carefully read the terms and conditions of the back here and we undertake to abide by the said terms and conditions.
      </Typography>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Typography variant="body2"><strong>Driver Signature:</strong> __________</Typography>
        <Typography variant="body2"><strong>For: Kisan Seeds Corporation</strong></Typography>
      </Box>
      
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="contained" color="primary">Print Receipt</Button>
      </Box>
    </Box>
      {/* <div className='wrapper' style={{ display: "flex" }}>

        <Paper className={classes.content}  >

          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="ganeshji1" style={{ height: "220px", width: "120px" }} />

            <div style={{ marginLeft: "20px", alignItems: "center" }}>
              <Typography variant="h3" align="center" style={{ fontSize: "h6" }}>
                <b style={{ color: "#FA7D09" }}>{value.id}</b>
              </Typography>
              <Typography variant="h6" align="center">
                <b style={{ color: "#862B0D" }}>{value.address}</b>
              </Typography>
            </div>
          </div>

          <hr />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Receipt id"
                variant="standard"
                size="small"
                fullWidth
                // value={param.id}
                value={param.id.slice(-3)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date:"
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.name) }}
                value={data.date}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                label="Mr./Mrs."
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.name) }}

                value={data.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="From"
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.amount) }}
                value={data.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>amounttt Received</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.inputGroup}>
                <div className={classes.inputGroupPrepend}>
                  <span className={classes.inputGroupText}>₹ </span>
                </div>
                <TextField
                  type="text"
                  className={classes.formControl}
                  aria-label="Amount (to the nearest dollar)"
                  value={data.amount}
                />

              </div>
            </Grid>
            <Grid item xs={12}>

              <TextField
                label="Receiver"
                variant="standard"
                size="small"
                fullWidth
                value={data.receiver}
                InputLabelProps={{ shrink: Boolean(data.amount) }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <b style={{ fontStyle: "italic", fontSize: "30px", color: "red" }}>Thank You!</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div style={{ display: "flex ", justifyContent: "center", minWidth: "100%" }}>
        <img src={footer4} alt="footer4" style={{ width: "100%", alignItems: "center" }} />
      </div>
      <div>
        <button onClick={handlePrint} disabled={isButtonDisabled}>Print Page</button>

      </div> */}
    </>
  );
};

export default Poster;