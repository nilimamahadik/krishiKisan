import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu, Segmented, Table, Input, Spin, Form, DatePicker, Typography, Card, Col, Row, Select } from "antd";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './poster.css'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Error, ErrorOutline } from '@mui/icons-material';
// import "./minutes.css"
// import { Icons } from '../../../Partner/Comman';
const BASEURL = "/api"
const { Option } = Select;

const FormDataInfoUser = ({
    graceEligibleStudents,
    open,
    handleClose,
    user,
    style,
    props,
    loader,
    setLoader,
    modalForm,
    filteredExam,
    selectedSubject,
    selectedBranch,
    findSubjectMaxMArks,
    findCourseName,
    findCourseCode,
    exams,
}) => {
    const { TextArea } = Input;
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [users, setUsers] = useState({})
    const [master, setMaster] = useState([])
    // // console.log(master);

    const [value, setValue] = useState({})
    const navigate = useNavigate();

    const [file, setFile] = useState();
    const [projectOptions, setProjectOptions] = useState([]);
    const [openUser, setOpenUser] = useState(false)
    // // console.log(graceEligibleStudents)
    const params = useParams()


    // console.log("Form Values:", modalForm.getFieldsValue());

    const handleUserClose = () => {
        setOpenUser(false); // Close modal
    };


    useEffect(() => {

        const savedUser = localStorage.getItem("link");

        if (savedUser) {

    
        const parsedUser = JSON.parse(savedUser);
    
        setUsers(parsedUser);
    
        }
        else {
        navigate("/");
        }
    

    }, []);
    const getMaster = async () => {

        const get = axios.get(`${BASEURL}/get/master`)
            .then((res) => {
                setMaster(res.data.data);
                //  // console.log(res.data);
                localStorage.setItem("count", JSON.stringify(res.data));
            })
            .catch((err) => {
                // console.log(err);
            })
    }
    const getallusers = async () => {

        const get = axios.get(`${BASEURL}/getallusers/${params.id}`)
            .then((res) => {
                setData(res.data.data);
                //  // console.log(res.data);
                localStorage.setItem("count", JSON.stringify(res.data));
            })
            .catch((err) => {
                // console.log(err);
            })
    }
    useEffect(() => {
        getallusers();
        getMaster()
    }, []);

    const onFinish = async (values) => {
        // console.log(values)
        const userConfirmed = window.confirm(
            "Are you sure you want to proceed with the action?"
        );
        if (userConfirmed) {
            const formData = new FormData();

            formData.append("from", values.from);
            formData.append("transport_number", values.transport_number);
            formData.append("transport_driver_name", values.transport_driver_name)
            formData.append("transport_mode", values.transport_mode)
            formData.append("vendor_name", values.vendor_name)
            formData.append("address", values.address)
            formData.append("supplier_name", values.supplier_name)
            formData.append("ship_to_address1", values.ship_to_address1)
            formData.append("ship_to_district", values.ship_to_district)
            formData.append("productDetails", JSON.stringify(values.productDetails))
            // formData.append("advance_paid", values.advance_paid)
            // formData.append("to_pay", values.to_pay)
            formData.append("sc", values.sc)
            formData.append("hamali", values.hamali)
            formData.append("sch", values.sch)
            formData.append("total", values.total)
            formData.append("group_id", params.id)

            // formData.append("createdBy", values.user.id);
            // formData.append("createdByName", values.user.name);
            // // console.log(...formData.entries());

            try {

                const response = await axios.post(`${BASEURL}/submit`, formData);

                getallusers();
                handleClose();
                alert(response.data.message)
                return response;
            } catch (err) {
                // console.log(err);

                alert(err.response.data.message)
                // console.log(err);
            }
        }

    }

    const onFinishFailed = (errorInfo) => {
        // setLoader(false);
        alert("Please fill in the mandatory fields!")
        // console.log("Failed:", errorInfo);
    };

        const handleValuesChange = (changedValues, allValues) => {
            const productDetails = allValues.productDetails || [];

            // Loop through productDetails and calculate total_freight
            const updatedDetails = productDetails.map((product, index) => {
                if (product.weight && product.rate) {
                    return {
                        ...product,
                        total_freight: (parseFloat(product.weight) || 0) * (parseFloat(product.rate) || 0),
                    };
                }
                return product;
            });
            console.log(updatedDetails);

            modalForm.setFieldsValue({ productDetails: updatedDetails });
        };

    // console.log(modalForm.getFieldsValue());

   
    

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        // style={{ maxWidth: '60%', margin: 'auto' }}
        >
            <Box sx={style}>
                {/* <Card bordered={false} style={{ overflowY: 'auto', height: '100%' }}> */}
                <Title level={4} className="m-2 text-center">
                    {value.id}
                </Title>
                <hr />


                <Form
                    form={modalForm}
                    onValuesChange={handleValuesChange}
                    className="custom-form"
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    labelWrap
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                        productDetails: [{ product_name: "" }]
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h5>Transportation Details</h5>
                    <div className='custom-container'>

                        <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='from' label="From">
                                    <Input placeholder="Enter From" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='transport_number' label="Truck No.">
                                    <Input placeholder="Enter Truck No." />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='transport_driver_name' label="Truck Driver Name">
                                    <Input placeholder="Enter Truck Driver Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='transport_mode' label="Transport Mode">
                                    {/* <Input /> */}
                                    {/* <Select placeholder="Select Transport Mode">
                                        {master.length > 0 &&
                                            master[0]?.transportmodename?.map((mode, index) => (
                                                <Option key={index} value={mode}>
                                                    {mode}
                                                </Option>
                                            ))}
                                    </Select> */}
                                    <Select
                                        showSearch
                                        placeholder="Select Transport Mode"
                                        optionFilterProp="label"
                                        size="large"
                                        style={{ width: '100%' }}
                                        options={master[0]?.transportmodename?.map((mode) => ({
                                            value: mode,
                                            label: mode,
                                        }))} // Convert array to objects
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                    />

                                </Form.Item>
                            </Col>
                        </Row>

                    </div>

                    {/* Roll Number */}

                    <h5>Consignor Details</h5>
                    <div className='custom-container' >
                        <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='vendor_name' label="Name">
                                    <Input placeholder="Enter Name of Consignor" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item style={{ marginBottom: "0px" }} name='address' label="Address">
                                    <Input placeholder="Enter Address" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <h5>Consignee Details</h5>
                    <div className='custom-container'>
                        <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            {/* Student Name */}
                            <Col span={12}>
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    name='supplier_name'
                                    label="Name of Consignee"
                                >
                                    <Input placeholder="Enter Name of Consignee" />
                                </Form.Item>
                            </Col>

                            {/* Roll Number */}
                            <Col span={12}>
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    name='ship_to_address1'
                                    label="Place"
                                >
                                    <Input placeholder="Enter Place" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            {/* Student Name */}
                            <Col span={12}>
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    name='ship_to_district'
                                    label="District"
                                >
                                    <Input placeholder="Enter District" />
                                </Form.Item>
                            </Col>


                        </Row>

                    </div>

                    <h5>Goods Details</h5>
                    <div className='custom-container'>
                        <Form.List name="productDetails">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                        <div key={key}
                                        // style={{ marginBottom: "10px" }}
                                        >
                                            <Row
                                                gutter={16}
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '10px' // Adjust spacing between rows
                                                }}
                                            >
                                                {/* Grade Name */}
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'product_name']}
                                                        fieldKey={[fieldKey, 'product_name']}
                                                        label={index === 0 ? 'Product Name' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Product Name!' }]}
                                                    >
                                                        <Input size="medium" placeholder="Enter Product Name" />
                                                    </Form.Item>

                                                </Col>

                                                {/* From Range */}
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'product_code']}
                                                        fieldKey={[fieldKey, 'product_code']}
                                                        label={index === 0 ? 'Product Code' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Product Code!' }]}
                                                    >
                                                        <Input size="medium" placeholder=" enter Product Code" />
                                                    </Form.Item>

                                                </Col>

                                                {/* To Range */}
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'uom']}
                                                        fieldKey={[fieldKey, 'uom']}
                                                        label={index === 0 ? 'Select uom' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Select uom' }]}
                                                    >
                                                        <Select
                                                            showSearch
                                                            placeholder="Select unit of measure"
                                                            optionFilterProp="label"
                                                            size="large"
                                                            style={{ width: '100%' }}
                                                            options={master[0]?.uom_name?.map((mode) => ({
                                                                value: mode,
                                                                label: mode,
                                                            }))} // Convert array to objects
                                                            getPopupContainer={(trigger) => trigger.parentNode}
                                                        />

                                                    </Form.Item>
                                                </Col>

                                                {/* Grade Point */}
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'weight']}
                                                        fieldKey={[fieldKey, 'weight']}
                                                        label={index === 0 ? 'Weight' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Weight!' }]}
                                                    >
                                                        <Input type="number" size="medium" placeholder=" enter Weight" />
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'rate']}
                                                        fieldKey={[fieldKey, 'rate']}
                                                        label={index === 0 ? 'Rate' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Rate!' }]}
                                                    >
                                                        <Input type="number" size="medium" placeholder="enter Rate" />
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'total_freight']}
                                                        fieldKey={[fieldKey, 'total_freight']}
                                                        label={index === 0 ? 'Total Freight' : null}
                                                        rules={[{ required: true, message: 'Please enter Total Freight!' }]}
                                                    >
                                                        <Input placeholder="Total Freight" />
                                                    </Form.Item>
                                                </Col>


                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'advance_paid']}
                                                        fieldKey={[fieldKey, 'advance_paid']}
                                                        label={index === 0 ? 'Advance' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter Advance!' }]}
                                                    >
                                                        <Input size="medium" placeholder="Enter Advance" />
                                                    </Form.Item>
                                                </Col>
                                                {/* Remove Button */}
                                                <Col style={{ flex: 1 }}>
                                                    <Form.Item
                                                        style={{ marginBottom: '5px' }}
                                                        {...restField}
                                                        name={[name, 'to_pay']}
                                                        fieldKey={[fieldKey, 'to_pay']}
                                                        label={index === 0 ? 'To Pay' : null} // Show label only for the first row
                                                        rules={[{ required: true, message: 'Please enter To Pay!' }]}
                                                    >
                                                        <Input size="medium" placeholder="Enter To Pay" />
                                                    </Form.Item>
                                                </Col>

                                                <Col
                                                    style={{
                                                        flex: '0 0 auto',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginTop: index === 0 ? '24px' : '0px', // Align button to inputs for the first row
                                                    }}
                                                >
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => remove(name)}
                                                        icon={<MinusCircleOutlined />}
                                                    >

                                                    </Button>
                                                </Col>

                                            </Row>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                                style={{ width: '100%' }}
                                            >
                                                Add Product Details
                                            </Button>
                                        </div>
                                    </Form.Item>

                                </>
                            )}
                        </Form.List>
                    </div>

                    <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {/* Student Name */}
                        <Col span={6}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                name='sc'
                                label="S.C"
                            >
                                <Input size="medium" placeholder="Enter S.C " />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={6}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                name='hamali'
                                label="Hamali"
                            >
                                <Input size="medium" placeholder="Enter Hamali" />
                            </Form.Item>
                        </Col>
                        {/* Student Name */}
                        <Col span={6}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                name='sch'
                                label="S.Ch "
                            >
                                <Input size="medium" placeholder="Enter S.Ch" />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={6}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                name='total'
                                label="Total"
                            >
                                <Input size="medium" placeholder="Enter Total" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Form.Item
                        style={{ marginBottom: "15px" }}
                        wrapperCol={{
                            offset: 10,
                            span: 12,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            size='medium'
                            // shape="round"


                            loading={loader}
                        // onClick={onClickLoading}
                        // style={{ backgroundColor: "#2c3e50", color: "white" }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Box>
        </Modal>
    );
};

export default FormDataInfoUser;