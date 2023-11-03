import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailCategoriesController } from "./controllers/categories/DetailCategoriesController";
import { CreateProductController } from "./controllers/products/CreateProductController";

import uploadConfig from "./config/multer";
import multer from "multer";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController";

const router = Router();

/* Passando o nome da pasta onde as imagens vao ser salvas */
const upload = multer(uploadConfig.upload("./tmp"));

/* Aqui eu chamo o controller e o controller chama os services */

/* ------ ROTAS DO USUARIO -------*/
/* Criar o usuário */
router.post("/users", new CreateUserController().handle);

/* Fazer o login */
router.post("/session", new AuthUserController().handle);

/* Em algumas rotas privadas nao sao todas pessoas que podem criar um produto por exemplo,
 * logo eu tenho que saber se a pessoa esta autenticada */
router.get("/me", isAuthenticated, new DetailUserController().handle);

/* ------ ROTAS DA CATEGORIA -------*/
/* Chamar o middleware para garantir que apenas usuarios autenticados possam
 * cadastrar categorias, ou seja no insomnia tem que informar o token */
router.post(
  "/categories",
  isAuthenticated,
  new CreateCategoryController().handle,
);

/* Listar todas categorias */
router.get(
  "/categories",
  isAuthenticated,
  new DetailCategoriesController().handle,
);

/* ------------ROTAS PRODUTO -------------- */
router.post(
  "/products",
  isAuthenticated,

  upload.single("file"),
  new CreateProductController().handle,
);

/* Lista os produtos das categorias */

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle,
);

/* ------------ROTAS ORDER-------------- */

/* Abre uma nova mesa com número e um nome (opcional) */
router.post("/order", isAuthenticated, new CreateOrderController().handle);

/* Remover uma order, nao importa ser o mesmo ja que um é post e o outro delete */
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

/* Adicionar item no order */
router.post("/order/add", isAuthenticated, new AddItemController().handle);

router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle,
);

/* put pois eu vou atualizar o draft */
router.put("/order/send", isAuthenticated, new SendOrderController().handle);

/* Lista todos os pedidos com draft e status false */
router.get("/orders", isAuthenticated, new ListOrdersController().handle);

router.get(
  "/order/detail",
  isAuthenticated,
  new OrderDetailsController().handle,
);

/* Exporto para poder usar em outras partes do programa,
 * bem como na parte do server.ts */
export { router };
