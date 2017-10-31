var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchemaProduct = new Schema({
   product: {
       type: String,
       required: true
   },
   quantity: {
       type: Number,
       required: true
   },
   price: {
       type: Number,
       required: true
   }
});

var invoiceSchema = new Schema({
    order: {
        type: String,
        required: true
    },
    fulfiled: {
        type: Boolean,
        required: true,
        default: false
    },
    contents: [invoiceSchemaProduct]
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;