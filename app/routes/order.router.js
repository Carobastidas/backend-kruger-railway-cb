import express from "express";
import { createOrder,
         getOrder,
         addCommentToOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
//servicio para obtener listado de ordenes
router.get("/:userId",getOrder);
//servicio para agregar un comentario a una orden
// primero necesito la orden a la cual vamos agrgar los comentarios -> id de la orden
// vamos a ecibir  un path param 
router.post("/:orderId/comment", addCommentToOrder);


export default router;