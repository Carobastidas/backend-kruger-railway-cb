import mongoose from "mongoose";
// Objeto que representa el esquema de la orden 
//{
//    user: "idDelUser",
//    products: [
//        {
 //           id: "idDelProducto que estamos comprando",
//            quantity: "cantidad de productos que estamos comprando"
//        },
//        {
//            id : "idDelProduto que estamos comprando",
//            quantity: "cantidad de productos que estamos comprando"
//        }
//    ]
//    comments[
//        "idDelComentario", "idDelComentario"
//   ],
//    totalPrice: "precioTotal",
//}

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
        },
    ],
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"products",
                required: true,
            },
            quantity:{
                type:Number,
                required:true,
                min:[1,"A products must have  apositive quantity"],
            },
        },
    ],
    totalPrice:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

export const Order = mongoose.model("orders", orderSchema);