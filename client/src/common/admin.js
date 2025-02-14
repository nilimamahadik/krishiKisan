import { Dropdown, Menu, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, TextField } from '@material-ui/core';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Drawer from "./drawer";
import { RWebShare } from "react-web-share";
import { Box, CardContent, Grid } from "@mui/material";

//for developement
// const BASEURL = "http://localhost:5000/api"

//for production

const BASEURL = "/api"

function CustomTable({ data }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "receiptNumber"
    },
    {
      title: "LR No.",
      dataIndex: "receiptNumber",
      key: "receiptNumber"
    },
    {
      title: "Name of Dealer",
      dataIndex: "vendor_name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"]
    },
    {

      title: "Sub Dealer",

      dataIndex: "supplier_name",

      key: "phone",

      responsive: ["md"]

    },
   
    {
      title: "Place",
      dataIndex: "ship_to_address1",
      key: "name",
    },
    {
      title: "District",
      dataIndex: "ship_to_district",
      key: "name",
    },
    {
      title: "Driver Name",
      dataIndex: "transport_driver_name",
      key: "name",
    },
    
    {
      title: "Truck No.",
      dataIndex: "transport_number",
      key: "name",
    },
   
    {
      title: "Product",
      dataIndex: "product_name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "product_code",
      key: "name",
    },
   
    {
      title: "Total Freight",
      dataIndex: "total_freight",
      key: "amount"
    },
    {
      title: "Advance",
      dataIndex: "advance_paid",
      key: "name",
    },
    {
      title: "To Pay",
      dataIndex: "to_pay",
      key: "name",
    },
    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
      render: (text, record) => (

        <Link to={`/poster/${record._id}`}>
          <Button variant="contained">View Receipt</Button>
        </Link>
      ),
    },
    {

      title: "Share",

      dataIndex: "share",

      key: "share",
      render: (text, record) => (
        <RWebShare
          data={{
            text: " BHARAT ONLINE",
            url: `${window.location.protocol}//${window.location.host}/poster/${record._id}`,
            title: " BHARAT ONLINE",
          }}
        >

          <Button variant="contained">Share </Button>
        </RWebShare>
      )



    },

  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => {
    return arr.map((item, index) => {
      return {
        ...item,
        receiptNumber: index + 1
      }
    });
  }
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Dropdown
          overlay={
            <Menu onClick={colVisibilityClickHandler} items={columnItems} />
          }
          placement="bottomLeft"
        >
          <Button>Column Visibility</Button>
        </Dropdown>
      </div>
      <div>
        <div>
          <Table
            scroll={{ x: true }}
            columns={columnsToShow}
            dataSource={data ? addKeys(data) : []}
          />
        </div>
      </div>
    </div>
  );
}

const FormExampleAdmin = () => {
  const params = useParams()
  // console.log(params);
  // console.log(user);
  // console.log(info);
  const [data, setData] = useState([])
  const [value, setValue] = useState({})
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendor_name: "sfs",
    address: "ffd",
    supplier_name: "fdf",
    ship_to_address1: "fdf",
    ship_to_district: "sds",
    transport_mode: "3",
    transport_number: "34",
    transport_driver_name: "dfd",
    product_name: "dsd",
    product_code: "455",
    total_freight: "54",
    advance_paid: "345",
    to_pay: "445",
  })
  const handleonchange = (e) => {
    // console.log(e);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const getallusers = async () => {

    const get = axios.get(`${BASEURL}/getallusers/${params.id}`)
      .then((res) => {
        setData(res.data.data);
        //  console.log(res.data);
        localStorage.setItem("count", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getallusers();

  }, []);


  useEffect(() => {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
    else {
      navigate("/");
    }

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = {
      vendor_name: formData.vendor_name,
      address: formData.address,
      supplier_name: formData.supplier_name,
      group_id: params.id,
      receiver: value.receiver,
      // phone: formData.phone,
      ship_to_address1: formData.ship_to_address1,
      ship_to_district: formData.ship_to_district,
      transport_mode: formData.transport_mode,
      transport_number: formData.transport_number,
      transport_driver_name: formData.transport_driver_name,
      // from: formData.from,
      product_name: formData.product_name,
      product_code: formData.product_code,
      total_freight: formData.total_freight,
      advance_paid: formData.advance_paid,
      to_pay: formData.to_pay,
    };

    setFormData({
      vendor_name: "",
      address: "",
      supplier_name: "",
      ship_to_address1: "",
      ship_to_district: "",
      transport_mode: "",
      transport_number: "",
      transport_driver_name: "",
      product_name: "",
      product_code: "",
      total_freight: "",
      advance_paid: "",
      to_pay: "",
    });

    console.log(form);



    try {
      const response = await axios.post(`${BASEURL}/submit`, form);
      getallusers();
      alert(response.data.message)
      return response;
    } catch (err) {
      alert(err.response.data.message)
      console.log(err);
    }
  };


  return (
    <>
      <div className="card column-design">
        <div className="card-body">
          <div className="front" style={{ backgroundColor: "#ed5a90", color: "white" }}>
            <Drawer />
            <Typography variant="h2" align="center"><b>{value.id}</b></Typography>
            <Typography variant="h5" align="center">{value.address}</Typography>
            <hr />
          </div>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Box component="form" onSubmit={handleSubmit} p={4} border={2} borderColor="green" borderRadius={2} width={600}>
              <Grid container spacing={2}>
                {[
                  { label: "Name of Dealer", name: "vendor_name" },
                  { label: "Address", name: "address", multiline: true },
                  { label: "Sub Dealer", name: "supplier_name" },
                  { label: "Place", name: "ship_to_address1" },
                  { label: "District", name: "ship_to_district" },
                  // { label: "Bags", name: "bags" },
                  { label: "Transport Mode ", name: "transport_mode" },
                  { label: "Truck No.", name: "transport_number" },
                  { label: "Truck Driver Name", name: "transport_driver_name" },
                  // { label: "From", name: "from" },
                  { label: "Product", name: "product_name" },
                  { label: "Code", name: "product_code" },
                  { label: "Total Freight", name: "total_freight" },
                  { label: "Advance", name: "advance_paid" },
                  { label: "To Pay", name: "to_pay" }
                ].map((field, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleonchange}
                      required
                      multiline={field.multiline || false}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box mt={3} display="flex" justifyContent="center">
                <Button variant="contained" type="submit" fullWidth>Save</Button>
              </Box>
            </Box>
          </Box>

          <div>
            <h2><u>Contributors</u></h2>
            <CustomTable data={data} />
          </div>
        </div>
      </div>

    </>
  );

}
export default FormExampleAdmin;





{/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '40px', borderColor: "Green" }}>
              <div style={{ textAlign: "center" }}>
                <h4>Make Receipt</h4>
              </div>
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Name"><b>Name of Dealer :</b></label> &nbsp;&nbsp;
                <TextField
                  label="name"
                  name="name"
                  value={formData.name}
                  onChange={handleonchange}
                  required
                />
              </div>

              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Address"><b>Address:</b></label> &nbsp;&nbsp;
                <TextField
                  type="text"
                  label="address"
                  name='address'
                  value={formData.address}
                  onChange={handleonchange}
                  required
                  multiline
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <label htmlFor="Mobile No."><b>Sub Dealer</b></label> &nbsp;&nbsp;

                <TextField
                  type="text"
                  label="phone"
                  name='phone'
                  value={formData.phone}
                  onChange={handleonchange}
                  required
                  multiline
                />

              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Place:</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>District:</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Bags:</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Truck No. :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>From :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Product :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Code :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Total Freight :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>Advance :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="Amount"><b>To Pay :</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" type="submit" style={{ width: '100%' }}>
                  Save
                </Button>
              </div>
            
            </form>
          </div>
         */}