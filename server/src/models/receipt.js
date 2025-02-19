// const mongoose = require("mongoose")





// const applySchema = new mongoose.Schema(

//     {
//         Ttan_id: {
//             type: String,
//             trim: true
//         },

//         tran_date: {

//             type: String,

//             required: true,
//             trim: true

//         },
//         product_Code: {

//             type: String,

//             required: true,
//             trim: true

//         },
//         product_Name: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         Product_qty: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         uom: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         vendor_Name: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         supplier_Name: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         address: {

//             type: String,

//             required: true,
//             trim: true

//         },
//         ship_to_address1: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         ship_to_address2: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         ship_to_District: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         ship_to_City: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         ship_to_state: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         ship_to_pincode: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_address1: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_address2: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_District: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_City: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_state: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         bill_to_pincode: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         transport_mode: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         transport_Number: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         transport_drivername: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         total_Freight: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         advance_paid: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         to_Pay: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         receipt_Number: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         invoice_Number: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         group_id: {
//             type: String,
//             trim: true
//         },
//         receiver: {
//             type: String,
//             trim: true
//         }



//     },

//     { timestamps: true }

// )

// module.exports = mongoose.model('receipt', applySchema)

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, trim: true },
  product_code: { type: Number, trim: true },
  uom: { type: String, trim: true},
  weight: { type: String, trim: true },
  rate: { type: Number, trim: true },
  total_freight: { type: Number, trim: true},
  advance_paid:{ type: Number, trim: true},
  to_pay: { type: Number, trim: true}
}, { _id: false });

const applySchema = new mongoose.Schema(
  {
    tran_id: { type: String, trim: true }, // Corrected name
    tran_date: { type: Date },
    productDetails : [productSchema],

    vendor_name: { type: String,  trim: true },
    supplier_name: { type: String, trim: true },
    address: { type: String, trim: true },

    // Shipping Details
    ship_to_address1: { type: String,  trim: true },
    ship_to_address2: { type: String,  trim: true },
    ship_to_district: { type: String,trim: true },
    ship_to_city: { type: String, trim: true },
    ship_to_state: { type: String,  trim: true },
    ship_to_pincode: { type: Number,  trim: true }, // Changed to Number

    // Billing Details
    bill_to_address1: { type: String,  trim: true },
    bill_to_address2: { type: String,  trim: true },
    bill_to_district: { type: String, trim: true },
    bill_to_city: { type: String, trim: true },
    bill_to_state: { type: String,  trim: true },
    bill_to_pincode: { type: Number, trim: true }, // Changed to Number

    // Transport Details
    transport_mode: { type: String, trim: true },
    transport_number: { type: String,  trim: true },
    transport_driver_name: { type: String,  trim: true },

    // Payment Details
    total_freight: { type: Number,  trim: true }, // Changed to Number
    advance_paid: { type: Number,  trim: true }, // Changed to Number
    to_pay: { type: Number,  trim: true }, // Changed to Number

    receipt_number: { type: String,  trim: true },
    invoice_number: { type: String,  trim: true },

    group_id: { type: String, trim: true },
    receiver: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("receipt", applySchema);
