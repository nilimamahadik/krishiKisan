// import React from "react";
// import { Dropdown, Menu, Table } from "antd";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { TextField } from '@material-ui/core';
// import axios from 'axios';
// import { Typography } from '@material-ui/core';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button'
// import Drawer from "./drawer";
// import { RWebShare } from "react-web-share";
// // import { ExportToExcel } from "../Admin/csv";

// //for developement
// // const BASEURL = "http://localhost:5000/api"

// //for production

// const BASEURL = "/api"


// function CustomTable({ data }) {

//   const [columnItems, setColumnItems] = useState([]);

//   const [columnsToShow, setColumnsToShow] = useState([]);


//   const columns = [
//     {

//       title: "Receipt No.",

//       dataIndex: "receiptNumber",

//       key: "receiptNumber"

//     },

//     {

//       title: "Name",

//       dataIndex: "name",

//       key: "name",

//     },

//     {

//       title: "Address",

//       dataIndex: "address",

//       key: "address",

//       responsive: ["md"]

//     },
//     {

//       title: "Phone Number",

//       dataIndex: "phone",

//       key: "phone",

//       responsive: ["md"]

//     },

//     {

//       title: "Amount",

//       dataIndex: "amount",

//       key: "amount"

//     },
//     {

//       title: "Receipt",
//       dataIndex: "receipt",
//       key: "receipt",
//       render: (text, record) => (

//         <Link to={`/poster/${record._id}`}>
//           <Button variant="contained">View Receipt</Button>
//         </Link>
//       ),
//     },
//     {
//       title: "Share",
//       dataIndex: "share",
//       key: "share",
//       render: (text, record) => (
//         <RWebShare
//           data={{
//             text: "BHARAT ONLINE",
//             url: `${window.location.protocol}//${window.location.host}/poster/${record._id}`,
//             title: "BHARAT ONLINE",
//           }}
//         >
//           <Button variant="contained">Share </Button>
//         </RWebShare>
//       )
//     },
//   ];

//   useEffect(() => {
//     setColumnItems(menuItems);
//     setColumnsToShow(columns);
//   }, []);

//   const colVisibilityClickHandler = (col) => {

//     const ifColFound = columnsToShow.find((item) => item.key === col.key);

//     if (ifColFound) {

//       const filteredColumnsToShow = columnsToShow.filter(

//         (item) => item.key !== col.key

//       );

//       setColumnsToShow(filteredColumnsToShow);

//     } else {

//       const foundIndex = columns.findIndex((item) => item.key === col.key);

//       const foundCol = columns.find((item) => item.key === col.key);

//       let updatedColumnsToShow = [...columnsToShow];

//       updatedColumnsToShow.splice(foundIndex, 0, foundCol);

//       setColumnsToShow(updatedColumnsToShow);

//     }

//   };

//   const menuItems = columns.map((item) => {
//     return {
//       key: item.key,
//       label: <span>{item.title}</span>
//     };
//   });

//   const addKeys = (arr) => {
//     return arr.map((item, index) => {
//       return {
//         ...item,
//         receiptNumber: index + 1
//       }
//     });
//   }

//   return (
//     <div>
//       <div style={{ marginBottom: "30px" }}>
//         <Dropdown
//           overlay={
//             <Menu onClick={colVisibilityClickHandler} items={columnItems} />
//           }
//           placement="bottomLeft"
//         >
//           <Button>Column Visibility</Button>
//         </Dropdown>
//       </div>
//       <div>
//         <div>
//           <Table
//             scroll={{ x: true }}
//             columns={columnsToShow}
//             dataSource={data ? addKeys(data) : []}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// const FormExample = () => {
//   // const [isOpen, setIsOpen] = React.useState(false)

//   const params = useParams()
//   const [data, setData] = useState([])
//   const [users, setUsers] = useState({})
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     amount: "",
//     phone: ""
//   })

//   const handleonchange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const getallusers = async () => {
//     const get = axios.get(`${BASEURL}/getallusers/${params.id}`)
//       .then((res) => {
//         setData(res.data.data);
//         localStorage.setItem("count", JSON.stringify(res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }

//   useEffect(() => {

//     getallusers();

//   }, []);



//   useEffect(() => {

//     const savedUser = localStorage.getItem("link");

//     if (savedUser) {

//       const parsedUser = JSON.parse(savedUser);

//       setUsers(parsedUser);

//     }
//     else {
//       navigate("/");
//     }

//   }, []);
//   // console.log(data);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = {
//       name: formData.name,
//       address: formData.address,
//       amount: formData.amount,
//       phone: formData.phone,
//       group_id: params.id,
//       receiver: users.name

//     };


//     setFormData({
//       name: "",
//       address: "",
//       amount: "",
//       phone: "",
//       group_id: ""

//     })

//     try {
//       const response = await axios.post(`${BASEURL}/submit`, form);
//       getallusers();
//       alert(response.data.message)
//       return response;
//     } catch (err) {
//       alert(err.response.data.message)
//       console.log(err);
//     }
//   }

//   return (

//     <>
//       <div className="card column-design" >
//         <div className="card-body">
//           <div className="front" style={{ backgroundColor: '#FA7D09' }}>
//             <Link to="/">
//               <Button variant="contained">Log Out</Button>
//             </Link>
//             {/* <Typography variant="h6" align="center">

//               <b>|| श्री गणेशाय नमः ||</b>

//             </Typography> */}

//             <br />

//             <Typography variant="h2" align="center">

//               <b>{users.id}</b>

//             </Typography>

//             <Typography variant="h5" align="center">

//               {users.address}

//             </Typography>

//             <hr />

//           </div>


//           <div>

//           </div>

//           <br /><br />

//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

//             <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '40px', borderColor: "Green" }}>
//               <div style={{ textAlign: "center" }}>
//                 <h4>Make Receipt</h4>
//               </div>
//               <br />
//               <div style={{ display: 'flex', alignItems: 'center' }}>

//                 <label htmlFor="Name"><b>Namee:</b></label> &nbsp;&nbsp;

//                 <TextField

//                   label="name"

//                   name="name"

//                   value={formData.name}

//                   onChange={handleonchange}

//                   required

//                 />

//               </div>



//               <br /><br />

//               <div style={{ display: 'flex', alignItems: 'center' }}>

//                 <label htmlFor="Address"><b>Address:</b></label> &nbsp;&nbsp;

//                 <TextField

//                   type="text"

//                   label="address"

//                   name='address'

//                   value={formData.address}

//                   onChange={handleonchange}

//                   required

//                   multiline

//                 />

//               </div>

//               <br /><br />
//               <div style={{ display: 'flex', alignItems: 'center' }}>

//                 <label htmlFor="Mobile"><b>Mobile No:</b></label> &nbsp;&nbsp;

//                 <TextField

//                   type="text"

//                   label="phone"

//                   name='phone'

//                   value={formData.phone}

//                   onChange={handleonchange}

//                   required

//                   multiline

//                 />

//               </div>

//               <br /><br />

//               <div style={{ display: 'flex', alignItems: 'center' }}>

//                 <label htmlFor="Amount"><b>Amount:</b></label> &nbsp;&nbsp;

//                 <TextField

//                   label="amount"

//                   name='amount'

//                   value={formData.amount}

//                   onChange={handleonchange}

//                   required

//                   type="text"

//                 />

//               </div>

//               <br /><br />

//               {/* <Button variant="contained" type="submit">Save</Button> */}
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <Button variant="contained" type="submit" style={{ width: '100%' }}>
//                   Save
//                 </Button>
//                 {/* Add other buttons here if needed */}
//               </div>

//             </form>

//           </div>

//           <br></br>

//           <div>

//             <h2><u>Contributors</u></h2>

//             <CustomTable data={data} />




//             <br></br>

//           </div>
//         </div>
//         {/* <div>
//           <ExportToExcel userDetail={userData}/>
//         </div> */}

//       </div>
//     </>

//   );



// }

// export default FormExample;




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
import { Box, CardContent, Grid, IconButton, Toolbar } from "@mui/material";
import { formatDate } from "../commonfunction/formatDate";
import FormData from "./form";
import { Col, Form, Select, Row, Checkbox } from "antd";
// import FormDataInfo from "./form";
import { LuEye } from "react-icons/lu";
import { FaRegShareSquare } from "react-icons/fa";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Group as GroupIcon,
  ExitToApp as ExitToAppIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import FormDataInfo from "./form";
import FormDataInfoUser from "./userform";
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
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<LuEye size={20} color="white" />}
          >           
        
          </Button>    */}

          <LuEye size={20} color="primary" />
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
          <FaRegShareSquare size={20} color="#1677ff" />
          {/* <Button variant="contained">Share </Button> */}
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
  maxHeight: "98vh", // Set maximum height to 90% of the viewport height
  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  "@media (min-width: 600px)": { // For larger screens (web)
    width: "70%",
    p: 4,
  },
};
const drawerWidth = 240;

const FormExample = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [value, setValue] = useState({})
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [openUser, setOpenUser] = useState(false)
  const [graceOpen, setGraceOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [users, setUsers] = useState({})
  console.log(users);
  

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

    const savedUser = localStorage.getItem("link");
// console.log(savedUser);

    if (savedUser) {

      const parsedUser = JSON.parse(savedUser);

      setUsers(parsedUser);

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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerCollapse = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <div >
        {/* <div className="card-body">
          <Drawer />
          </div> */}
        {/* <div className="front" style={{ backgroundColor: "#c11c84", color: "white" , marginTop:"100px"}}>
          <h4> Lorry Receipt</h4>
        </div> */}
 <Typography variant="h3" align="center" style={{ marginTop: "15px" }}><b>{users.id}</b></Typography>
        <Typography variant="h5" align="center">{users.address}</Typography>

        <Toolbar style={{ backgroundColor: "#c11c84", color: "white", alignItems: "center", justifyContent: "center",height:"100px" }} >
          <h1 style={{marginTop:"50px", padding:"10px"}}> Lorry Receipt</h1>

        </Toolbar>

        <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: "40px" }} >
          {/* <h2><u>Contributors</u></h2> */}
          <Button variant="contained" type="submit" style={{ marginRight: "10px" }} onClick={handleGraceMarks}> Generate   + </Button>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" >
          <CustomTable data={data} />
        </Box>



      </div>
      <FormDataInfoUser
        open={graceOpen}
        handleClose={handleUserClose}
        // props={props}
        style={style}
        modalForm={modalForm}
      />
    </>
  );

}
export default FormExample;
