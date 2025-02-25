const express = require("express");
const receipt = require("../models/receipt");



exports.submit_form = async (req, res) => {
    // console.log("req", req.body);

    try {

        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD

        const {
            vendor_name,
            address,
            supplier_name,
            ship_to_address1,
            ship_to_district,
            transport_mode,
            transport_number,
            transport_driver_name,
            productDetails,
            total_freight,
            advance_paid,
            to_pay,

            sc,
            hamali,
            sch,
            total,
            from,
            group_id,
            receiver
        } = req.body;

        const parsed_productdetails = productDetails && JSON.parse(productDetails)

        const existingReceipt = await receipt.findOne({
            vendor_name: vendor_name?.trim(),
            group_id: group_id?.trim(),
        });

        if (existingReceipt) {
            return res.status(400).json({
                message: "Receipt with this name already exists in this group",
            });
        }




        const lastReceipt = await receipt.findOne({ receipt_number: new RegExp(`KSC-${formattedDate}-`, "i") })
            .sort({ tran_date: -1 })
            .exec();

        // console.log("Last Receipt Found:", lastReceipt);  // Debug log

        let nextCounter = 1;
        if (lastReceipt) {
            const lastNumber = parseInt(lastReceipt.receipt_number.split("-")[2], 10);
            console.log("Last Number Extracted:", lastNumber); // Debug log
            nextCounter = lastNumber + 1;
        }

        const receiptNo = `KSC-${formattedDate}-${String(nextCounter).padStart(1, "0")}`;

        // Create a new receipt document
        const newReceipt = new receipt({
            tran_date: new Date(),
            receipt_number: receiptNo,
            vendor_name: vendor_name.trim(),
            address: address.trim(),
            from: from ? from.trim() : "",

            productDetails: parsed_productdetails,
            ship_to_address1: ship_to_address1 ? ship_to_address1.trim() : "",
            ship_to_district: ship_to_district ? ship_to_district.trim() : "",
            transport_mode: transport_mode ? transport_mode.trim() : "",
            supplier_name: supplier_name ? supplier_name.trim() : "",
            transport_number: transport_number ? transport_number.trim() : "",
            transport_driver_name: transport_driver_name ? transport_driver_name.trim() : "",
            total_freight: total_freight || 0,
            advance_paid: advance_paid || 0,
            to_pay: to_pay || 0,

            sc: sc || 0,
            hamali: hamali || 0,
            sch: sch || 0,
            total: total || 0,
            group_id: group_id?.trim(),
            receiver: receiver ? receiver.trim() : "",
        });

        const savedReceipt = await newReceipt.save();
        // console.log("savedReceipt", savedReceipt);

        return res.status(201).json({
            data: savedReceipt,
            status: "success",
            message: "Receipt Saved Successfully",
        });
    } catch (error) {
        console.log(error);

        console.error("Error saving receipt:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong while saving the receipt",
        });
    }
};


exports.getallusers = async (req, res) => {
    // console.log(req.params);
    try {
        const allusers = await receipt.find({ group_id: req.params.id }).sort({ createdAt: -1 })
        // console.log(allusers);

        return res.status(201).json({
            data: allusers,
            status: "success",
            message: "candidate get successfully",
            count: allusers.length
        })
    }
    catch (err) {
        console.log(err.message)
    }
}


exports.getsingleusers = async (req, res) => {
    // console.log(req.params);
    try {
        const singleusers = await receipt.findById(req.params.id)
        //  console.log(singleusers);
        return res.status(201).json({
            data: singleusers,
            status: "success",
            message: "candidate get successfully"
        })
    }
    catch (err) {
        console.log(err.message)
    }
}


exports.getallinfo = async (req, res) => {
    // console.log(req.params);
    try {
        const allinfo = await receipt.find()
        // console.log(allinfo);
        return res.status(201).json({
            allinfo
            // status:"success",
            // message:"candidate get successfully",
            // count: allusers.length
        })
    }
    catch (err) {
        console.log(err.message)
    }
}