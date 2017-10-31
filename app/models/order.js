var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wheelSchema = new Schema({
    type: {
       type: String,
       required: true
    },
    hub: {
        leftside: {
            pitch:{
                type: Number,
                required: true
            },
            flangedistance:{
                type: Number,
                required: true
            }
        },
        rightside:{
            pitch:{
                type: Number,
                required: true
            },
            flangedistance:{
                type: Number,
                required: true
            }
        }
    },
    rim:{
            erd: {
                type: Number,
                required: true
            },
            insidewidth:{
                type: String,
                required: true
            }
        },
    spokes:{
            spokecount:{
                type: Number,
                required: true
            },
            crossesleft:{
                type: Number,
                required: true
            },
            crossesright:{
                type: Number,
                required: true
            },
            nipple:{
                type: Number,
                required: true
            }
        }
});
 
var clientSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

var orderDetailsSchema = new Schema({
    //isn't added to frontend
   confirmed:{
       type: Boolean,
       required: true,
       default: false
   },    
   service:{
       type: String,
       required: true
   },
   delivery:{
       type: String,
       required: false
   },
    payment:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: true,
        default: "new order"
    },
});

var orderSchema = new Schema({
    
   reference:{
       type: String,
       required: true
   },
    
    orderdetails: orderDetailsSchema,
    
    client: clientSchema,
    
    wheelspec: [wheelSchema],

    invoice:{
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    }
    
    
});

module.exports = mongoose.model('Order', orderSchema);