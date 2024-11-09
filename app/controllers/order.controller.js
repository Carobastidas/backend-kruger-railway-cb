import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import {Comment} from "../models/comment.model.js"

const createOrder = async (req, res) => {
    try {
        // Extraemos los datos de la solicitud
        const { products, userId, comments } = req.body;
        // Estructura de productos: [{ id:1 , quantity: 2}, {id:2, quantity:3}]
        let totalPrice = 0;

        // Recorremos los productos y calculamos el precio total
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" }); // Detenemos la ejecución
            }
            totalPrice += product.price * item.quantity;
        }

        // Creamos la orden si todos los productos existen
        const order = new Order({
            user: userId,
            products,
            comments,
            totalPrice,
        });

        await order.save();
        return res.status(201).json({ message: "Orden creada exitosamente", order });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// traemos las ordenes creadass
const getOrder = async (req, res) =>{
try{
    const { userId } = req.params;

        // Buscamos las órdenes por el ID del usuario
        const orders = await Order.find({ user: userId })
        .populate("products.product")
        .populate("user")
        .exec();

    return res.status(200).json({ message: "Órdenes obtenidas exitosamente", orders });
}catch(error) {
    return res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
}
};

const addCommentToOrder = async (req,res) => {
    try { 
    // primero  vamos a obtener el id de laorden de nuestro patch
    const {orderId} = req.params;
    // luego necesitamos saber el id del usuario que esta haciendo el comentario 
    // necesitamos el mensaje o comentario q escribio el usuario
    // esto lo vamos a obtener el cueepo de la peticion -> req.body
    const {userId, message} = req.body;
    // vamos a crea un comentario a nuestro BDD
    const comment =new Comment({
         user: userId,
         message,
    });

       await comment.save();

     // vamos a relacionar el comentario con la orden
     // primero necesito buscar con el id que ecibi en el path param
     const order = await Order.findById(orderId);
     // validamos si la orden exite en bdd
     if(!order){
        return res.status(404).json({message: "Orden no encontrada"});

     }
     // comments: ["id comentario 1", "id comentario2"]
     // vamos a asociar el comentario q insertamos en la bdd a la orden q encontramos
     order.comments.push(comment._id);

     // vamos a guardar la orden con el nuevo comentario en la base de datos
     await order.save();
     
     res.status(201).json({message: "Comentario agregado exitosamente"});
    }catch (error){
    res.status(500).send({message: error.message});
    }
};
export { createOrder , getOrder, addCommentToOrder};
