import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu, Segmented, Table, Input, Spin, Form, DatePicker, Typography, Card, Col, Row, Select } from "antd";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import "./minutes.css"
// import { Icons } from '../../../Partner/Comman';

const FormData = ({
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

    const [file, setFile] = useState();
    const [projectOptions, setProjectOptions] = useState([]);
    const [openUser, setOpenUser] = useState(false)
    // console.log(graceEligibleStudents)

    const onClickLoading = () => {
        // setLoader(true);
    };


    console.log("Form Values:", modalForm.getFieldsValue());

    // console.log(modalForm.getFieldsValue());
    const handleUserClose = () => {
        setOpenUser(false); // Close modal
    };

    const examGradeScheme = (exams?.length > 0 && filteredExam && selectedBranch?.branchID && selectedSubject) && exams.find(item => item._id === filteredExam?._id)?.branches.find(branch => branch.branchID === selectedBranch.branchID)?.courses.find(course => course.courseID === selectedSubject)

    const onFinish = (values) => {
        // console.log(values)
        if (examGradeScheme?.gradeScheme?.gradeRange?.length === 0) {
            return alert("Please confirm grade normalization before calculating grade data")
        }

        const userConfirmed = window.confirm("Are you sure you want to proceed with calculating the grades?");
        if (userConfirmed) {
            const updatedGradeData = values?.garceEligibleStudents.map((perfo, index) => {
                // console.log("perfo", perfo)
                if (!perfo || !perfo.studPerfo.length) {
                    console.error(`Invalid entry at index ${index}:`, perfo);
                    return null; // Handle invalid entries gracefully
                }
                const exam = exams && exams.length > 0 && exams?.find(exam => exam._id === perfo?.examID).branches?.find(branch => branch?.branchID === graceEligibleStudents[0].branchID);

                const updatedStudPerfo = perfo.studPerfo.map((item, i) => {
                    const findCourse = exam && exam?.courses?.find(course => course.courseID === item?.courseID)

                    const totalObtainedMarks = findCourse?.gradeScheme?.gradeType === "Absolute"
                        ? ((
                            (item?.obtailedMarks ? parseInt(item?.obtailedMarks) : 0) +
                            (item?.graceMark ? parseInt(item?.graceMark) : 0)
                        ) / (item.outOfMarks && parseInt(item.outOfMarks)) * 100).toFixed(2)  // Calculate percentage properly
                        :
                        (item?.obtailedMarks ? parseInt(item?.obtailedMarks) : 0) +
                        (item?.graceMark ? parseInt(item?.graceMark) : 0);

                    // console.log("totalObtainedMarks ::", totalObtainedMarks)
                    const findGradePoints = findCourse && findCourse?.gradeScheme?.gradeRange.find(grade =>
                        parseInt(grade.fromRange) <= parseInt(totalObtainedMarks) && parseInt(grade.toRange) >= parseInt(totalObtainedMarks));

                    // console.log("findGradePoints ::", findGradePoints);
                    return {
                        ...item,
                        grade: findGradePoints?.gradename || "N/A",
                        earnedGradePoints: findGradePoints?.gradePoint || 0,
                        totalGradePoints: findGradePoints?.gradePoint
                            ? parseInt(findGradePoints.gradePoint) * parseInt(findSubjectMaxMArks(item?.courseID, "credit"))
                            : 0
                    };

                })
                return { ...perfo, studPerfo: updatedStudPerfo };
            });
            // console.log(updatedGradeData)
            modalForm.setFieldsValue({ garceEligibleStudents: updatedGradeData });
            alert("Grades calculated successfully.");
        }
    }




    const onFinishFailed = (errorInfo) => {
        setLoader(false);
        alert("Please fill in the mandatory fields!")
        console.log("Failed:", errorInfo);
    };
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
                    Save Details
                </Title>
                <hr />


                <Form
                    form={modalForm}
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
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >


                    <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {/* Student Name */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'student_name']}
                                // fieldKey={[fieldKey, 'student_name']}
                                label="Name of Dealer"
                            >
                                <Input readOnly placeholder="Enter Name of Dealer" />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'roll_no']}
                                // fieldKey={[fieldKey, 'roll_no']}
                                label="Address"
                            >
                                <Input readOnly placeholder="Enter Address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {/* Student Name */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'student_name']}
                                // fieldKey={[fieldKey, 'student_name']}
                                label="Name of Sub Dealer"
                            >
                                <Input readOnly placeholder="Enter Name of Sub Dealer" />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'roll_no']}
                                // fieldKey={[fieldKey, 'roll_no']}
                                label="Place"
                            >
                                <Input readOnly placeholder="Enter Place" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {/* Student Name */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'student_name']}
                                // fieldKey={[fieldKey, 'student_name']}
                                label="District"
                            >
                                <Input readOnly placeholder="Enter District" />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'roll_no']}
                                // fieldKey={[fieldKey, 'roll_no']}
                                label="Transport Mode"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {/* Student Name */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'student_name']}
                                // fieldKey={[fieldKey, 'student_name']}
                                label="Truck No."
                            >
                                <Input readOnly placeholder="Enter Truck No." />
                            </Form.Item>
                        </Col>

                        {/* Roll Number */}
                        <Col span={12}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                // {...restField}
                                // name={[name, 'roll_no']}
                                // fieldKey={[fieldKey, 'roll_no']}
                                label="Truck Driver Name"
                            >
                                <Input readOnly placeholder="Enter Truck Driver Name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <hr />
                    <Form.List name="gradeRange">
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
                                                    name={[name, 'gradename']}
                                                    fieldKey={[fieldKey, 'gradename']}
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
                                                    name={[name, 'fromRange']}
                                                    fieldKey={[fieldKey, 'fromRange']}
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
                                                    name={[name, 'toRange']}
                                                    fieldKey={[fieldKey, 'toRange']}
                                                    label={index === 0 ? 'Select uom' : null} // Show label only for the first row
                                                    rules={[{ required: true, message: 'Please enter Select uom' }]}
                                                >
                                                    <Input size="medium" placeholder="  Select uom" />
                                                </Form.Item>
                                            </Col>

                                            {/* Grade Point */}
                                            <Col style={{ flex: 1 }}>
                                                <Form.Item
                                                    style={{ marginBottom: '5px' }}
                                                    {...restField}
                                                    name={[name, 'gradePoint']}
                                                    fieldKey={[fieldKey, 'gradePoint']}
                                                    label={index === 0 ? 'Weight' : null} // Show label only for the first row
                                                    rules={[{ required: true, message: 'Please enter Weight!' }]}
                                                >
                                                    <Input size="medium" placeholder=" enter Weight" />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ flex: 1 }}>
                                                <Form.Item
                                                    style={{ marginBottom: '5px' }}
                                                    {...restField}
                                                    name={[name, 'gradePoint']}
                                                    fieldKey={[fieldKey, 'gradePoint']}
                                                    label={index === 0 ? 'Rate' : null} // Show label only for the first row
                                                    rules={[{ required: true, message: 'Please enter Rate!' }]}
                                                >
                                                    <Input size="medium" placeholder="enter Rate" />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ flex: 1 }}>
                                                <Form.Item
                                                    style={{ marginBottom: '5px' }}
                                                    {...restField}
                                                    name={[name, 'gradePoint']}
                                                    fieldKey={[fieldKey, 'gradePoint']}
                                                    label={index === 0 ? 'Total Freight' : null} // Show label only for the first row
                                                    rules={[{ required: true, message: 'Please enter Total Freight!' }]}
                                                >
                                                    <Input size="medium" placeholder="Enter Total Freight" />
                                                </Form.Item>
                                            </Col>
                                            {/* Remove Button */}

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
                                                    Remove
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
                                <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                    {/* Student Name */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'student_name']}
                                            // fieldKey={[fieldKey, 'student_name']}
                                            label="Advance "
                                        >
                                            <Input readOnly placeholder="Enter Advance" />
                                        </Form.Item>
                                    </Col>

                                    {/* Roll Number */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'roll_no']}
                                            // fieldKey={[fieldKey, 'roll_no']}
                                            label="To Pay"
                                        >
                                            <Input readOnly placeholder="Enter To Pay"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                    {/* Student Name */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'student_name']}
                                            // fieldKey={[fieldKey, 'student_name']}
                                            label="S.C "
                                        >
                                            <Input readOnly placeholder="Enter S.C "/>
                                        </Form.Item>
                                    </Col>

                                    {/* Roll Number */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'roll_no']}
                                            // fieldKey={[fieldKey, 'roll_no']}
                                            label="Hamali"
                                        >
                                            <Input readOnly placeholder="Enter Hamali"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                    {/* Student Name */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'student_name']}
                                            // fieldKey={[fieldKey, 'student_name']}
                                            label="S.Ch "
                                        >
                                            <Input readOnly placeholder="Enter S.Ch"/>
                                        </Form.Item>
                                    </Col>

                                    {/* Roll Number */}
                                    <Col span={12}>
                                        <Form.Item
                                            style={{ marginBottom: "0px" }}
                                            // {...restField}
                                            // name={[name, 'roll_no']}
                                            // fieldKey={[fieldKey, 'roll_no']}
                                            label="Total"
                                        >
                                            <Input readOnly placeholder="Enter Total"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form.List>
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
                            onClick={onClickLoading}
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

export default FormData;