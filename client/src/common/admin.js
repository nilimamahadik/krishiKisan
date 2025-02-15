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
import { formatDate } from "../commonfunction/formatDate";
import FormData from "./form";
import { Col, Form, Select, Row, Checkbox } from "antd";

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
        receiptNumber: index + 1,
        createdAt: formatDate(item?.createdAt)

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Default for mobile
  maxHeight: "90vh", // Set maximum height to 90% of the viewport height
  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  "@media (min-width: 600px)": { // For larger screens (web)
    width: "60%",
    p: 4,
  },
};

const FormExampleAdmin = (props) => {
  const params = useParams()
  const [data, setData] = useState([])
  const [value, setValue] = useState({})
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [openUser, setOpenUser] = useState(false)
  const [graceOpen, setGraceOpen] = useState(false)

  const [modalForm] = Form.useForm();

  const [formData, setFormData] = useState({
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

  const handleGraceMarks = () => {
    // console.log(gradeData)
    setGraceOpen(true)
  }
  // console.log(modalForm.getFieldsValue());


  const handleUserClose = () => {
    setGraceOpen(false)
    modalForm.resetFields()
  }
  return (
    <>
      <div className="card column-design">
        <div className="card-body">
          <Drawer />

          <div className="front" style={{ backgroundColor: "#c11c84", color: "white" }}>

            <Typography variant="h2" align="center"><b>{value.id}</b></Typography>
            <Typography variant="h5" align="center">{value.address}</Typography>
            <hr />
          </div>



          <Box display="flex" justifyContent="center" alignItems="center">

            <h2><u>Contributors</u></h2>
            <Button variant="contained" type="submit" onClick={handleGraceMarks}>+ </Button>

            <CustomTable data={data} />

          </Box>


        </div>
        <Button variant="contained" justifyContent="center" alignItems="center" type="submit" onClick={handleGraceMarks}>+ </Button>

      </div>
      <FormData
        open={graceOpen}
        handleClose={handleUserClose}
        props={props}
        style={style}
        modalForm={modalForm}
      />
    </>
  );

}
export default FormExampleAdmin;


{/* <Box component="form" onSubmit={handleSubmit} p={4} border={2} borderColor="green" borderRadius={2} width={600}>
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
                <Button variant="contained" type="submit" >Save</Button>
              </Box>
            </Box> */}

