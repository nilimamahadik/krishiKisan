import React, { useRef, useEffect, useState } from 'react';
import logo from '../image/aiimslogo.jpg';
import { makeStyles } from '@material-ui/core/styles';
// import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import footer4 from '../image/footer4.jpg'
import { useNavigate } from "react-router-dom";
import './poster.css'
import {
  Box,
  Typography,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { formatDate } from '../commonfunction/formatDate';

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
  const [open, setOpen] = useState(false); // Modal state

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [value, setValue] = useState({});
  console.log(value);
  const [columns, setColumns] = useState({
    description: true,
    articles: true,
    weight: true,
    rate: true,
    totalFreight: true,
    advance: true,
    toPay: true,
  });
  const navigate = useNavigate();
  // console.log(user);
  const handlePrint = () => {
    setIsButtonDisabled(true);

    window.print();
  };

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
    }
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
  }, []);



  return (


    <>
    <div style={{paddingBottom:"100px"}}>
      <Box textAlign="center" sx={{ mb: 3 }}>

      </Box>

      {/* Modal for Column Selection */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Select Options to Print
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
              {Object.keys(columns).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={columns[key]}
                      onChange={() =>
                        setColumns((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      sx={{
                        color: "black",
                        "&.Mui-checked": { color: "secondary" },
                      }}
                    />
                  }
                  label={key.replace(/([A-Z])/g, " $1").trim()}
                />
              ))}
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(false)}
                sx={{ mr: 2 }}
              >
                Close
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(false);
                  handlePrint();
                }}                                  Button comment because the it create issue.
                sx={{
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#9a156e" },
                }}
              >
                Print
              </Button> */}
            </Box>
          </Box>
        </Fade>
      </Modal>
      <br />
      <Box sx={{ maxWidth: 800, margin: "auto", paddingLeft: 3, paddingRight: 3, paddingBottom: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2, color: "black", border: "2px solid black" }}>
        {/* Header Section */}
        {/* <Typography variant="body2" align="center" >
          Subject to Amravati Jurisdiction
        </Typography> */}
        <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px",fontSize:"30px" }}>
        {value.id}
        </Typography>
        {/* <Typography variant="h6" align="center" fontWeight="bold" sx={{ marginBottom: "1px" }}>
          TRANSPORTER & C&F
        </Typography> */}

        <Typography variant="body2" align="center"sx={{ marginBottom: "1px",fontSize:"15px" }}>
          {value.address}
        </Typography>
        <Typography variant="body2" align="center">
          Received goods as per details below for carriage Subject to condition overleaf
        </Typography>
        <Divider sx={{ my: 2, borderColor: "black", borderWidth: "1px" }} />


        {/* Details Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>Receipt No:</strong> <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{data?.receipt_number}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}  style={{ textAlign: "center" , paddingRight:"235px"}}>
            <Typography>
              <strong>Date:</strong> <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{formatDate(data?.createdAt)}</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>From:</strong> <span style={{ borderBottom: "" ,color:"rgba(16, 16, 16, 0.73)"}}>{data?.from}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Driver Name:</strong>{" "}
              <span style={{ borderBottom: "" ,color:"rgba(16, 16, 16, 0.73)"}}>{data?.transport_driver_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Truck No:</strong>{" "}
              <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{data?.transport_number}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Consignor:</strong>{" "}
              <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{data?.supplier_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Place:</strong>{" "}
              <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{data?.address}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Consignee:</strong>{" "}
              <span style={{ borderBottom: "",color:"rgba(16, 16, 16, 0.73)" }}>{data?.vendor_name}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Place:</strong>{" "}
              <span style={{ borderBottom: "" ,color:"rgba(16, 16, 16, 0.73)"}}>{data?.ship_to_address1}</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>District:</strong>{" "}
              <span style={{ borderBottom: "" , color:"rgba(16, 16, 16, 0.73)" }}>{data?.ship_to_district}</span>
            </Typography>
          </Grid>
        </Grid>




     
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius:0, boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "white",boxShadow:5 }}>
              <TableRow>
                {columns.description && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>Description</TableCell>}
                {columns.articles && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>No. of Articles</TableCell>}
                {columns.weight && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>Weight</TableCell>}
                {columns.rate && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>Rate</TableCell>}
                {columns.totalFreight && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>Total Freight</TableCell>}
                {columns.advance && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>Advance</TableCell>}
                {columns.toPay && <TableCell sx={{ color: "black", fontWeight: "bold", padding: "8px" }}>To Pay</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.productDetails?.map((product, index) => (
                <TableRow key={index}>
                  {columns.description && <TableCell>{product.product_name}</TableCell>}
                  {columns.articles && <TableCell>{product.uom}</TableCell>}
                  {columns.weight && <TableCell>{product.weight}</TableCell>}
                  {columns.rate && <TableCell>{product.rate}</TableCell>}
                  {columns.totalFreight && <TableCell>{product.total_freight}</TableCell>}
                  {columns.advance && <TableCell>{product.advance_paid}</TableCell>}
                  {columns.toPay && <TableCell>{product.to_pay}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        {/* Payment Section */}
        <Grid container spacing={2}>
          <Grid item xs={3}><Typography><strong>S.C:</strong> {data.sc}</Typography></Grid>
          <Grid item xs={3}><Typography><strong>Hamali:</strong> {data.hamali}</Typography></Grid>
          <Grid item xs={3}><Typography><strong>S.Ch:</strong> {data.sch}</Typography></Grid>
          <Grid item xs={3}><Typography><strong>Total:</strong>{data.total}</Typography></Grid>
        </Grid>

        <Typography style={{ marginTop: "15px" }}>
          <strong> To Pay Rs :</strong>{" "}
          <span style={{ borderBottom: "1px dotted  #ed0258" }}></span>
        </Typography>

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
          <Typography variant="body2"><strong>For: {value.id}</strong></Typography>
        </Box>


      </Box>
      <div className='no-print'>
      <Box sx={{ textAlign: "center", mt: 3 ,  marginBottom: "300px", }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          style={{ marginLeft: "3px" }}
          variant="contained"
          color="primary"
          marginBottom= "300px"
        
          onClick={() => setOpen(true)}
        // sx={{
        //   backgroundColor: "black",
        //   "&:hover": { backgroundColor: "#9a156e" },
        //   px: 3,
        //   py: 1,
        // }}
        >
          Select Print Options
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrint} disabled={isButtonDisabled} style={{ marginLeft: "3px" }}>Print </Button>

      </Box>
      </div>
      </div>
    </>
  );
};

export default Poster;