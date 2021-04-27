import { Router } from "express";
import { CreateUserController } from "modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "modules/accounts/useCases/updateUserAvatar/UpdateUserAvatareController";
import multer from "multer";
import { ensureAuthenticated } from "shared/infra/http/middlewares/ensureAuthenticated";

import uploadConfig from "../../../../config/upload";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.updload("./tmp/avatar"));

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
