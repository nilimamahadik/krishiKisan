const express = require("express");
const receipt = require("../models/receipt");

exports.submit_form = async (req, res) => {
    console.log(req.body);

    try {
        const date = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        const {
            vendor_name,
            address,
            supplier_name,
            ship_to_address1,
            ship_to_district,
            transport_mode,
            transport_number,
            transport_driver_name,
            product_name,
            product_code,
            total_freight,
            advance_paid,
            to_pay,

            group_id,
            receiver
        } = req.body;


        if (!vendor_name || !address || !group_id) {
            return res.status(400).json({
                status: "error",
                message: "All required fields (name, address, amount, group_id) must be filled",
            });
        }

        // Trim values to prevent duplicate records with spaces
        const existingReceipt = await receipt.findOne({
            vendor_name: vendor_name.trim(),
            group_id: group_id.trim(),
        });

        if (existingReceipt) {
            return res.status(400).json({
                message: "Receipt with this name already exists in this group",
            });
        }

        // Create a new receipt document
        const newReceipt = new receipt({
            tran_date: new Date(),
            product_name: product_name ? product_name.trim() : "",
            product_code: product_code ? product_code.trim() : "",


            vendor_name: vendor_name.trim(),
            address: address.trim(),



            ship_to_address1: ship_to_address1 ? ship_to_address1.trim() : "",
            ship_to_district: ship_to_district ? ship_to_district.trim() : "",

            supplier_name: supplier_name ? supplier_name.trim() : "",
            transport_number: transport_number ? transport_number.trim() : "",
            transport_driver_name: transport_driver_name ? transport_driver_name.trim() : "",
            total_freight: total_freight || 0,
            advance_paid: advance_paid || 0,
            to_pay: to_pay || 0,

            group_id: group_id.trim(),
            receiver: receiver ? receiver.trim() : "",
        });

        const savedReceipt = await newReceipt.save();
        console.log("savedReceipt", savedReceipt);

        return res.status(201).json({
            data: savedReceipt,
            status: "success",
            message: "Receipt Saved Successfully",
        });
    } catch (error) {
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