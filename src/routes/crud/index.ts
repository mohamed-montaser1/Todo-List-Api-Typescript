import { Router, Request, Response } from "express";
import todoModel from "../../models/todo.model";
import mongoose from "mongoose";
import checkingToken, {
  checkingTokenRequest,
} from "../../middlewares/checkingToken";
const router = Router();

router.get("/all", [checkingToken], async (req: Request, res: Response) => {
  let todos = await todoModel.find();
  res.json({
    success: true,
    todos,
  });
});

router.post(
  "/add",
    [checkingToken],
  async (req: checkingTokenRequest, res: Response) => {
    type bodyType = {
      title: string;
    };

    let body: bodyType = req.body;

    if (body.title.trim() === "") {
      return res.json({
        success: true,
        msg: "Please Enter A value for title",
      });
    }

    let newTodo = new todoModel({
      title: body.title,
      complated: false,
    });

    try {
      await newTodo.save().then(() => {
        return res.status(201).json({
          success: true,
          msg: "Created!",
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        msg: error.message,
        error,
      });
    }
  }
);

router.put(
  "/:id",
  [checkingToken],
  async (req: Request<{ id: string }>, res: Response) => {
    let id = req.params.id;

    if (id === "") {
      return res.json({
        success: true,
        msg: "Please Enter Id",
      });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        success: true,
        msg: "Unvalid Id",
      });
    }
    try {
      await todoModel.findByIdAndUpdate(id, { ...req.body }).then(() => {
        return res.status(201).json({
          success: true,
          msg: "Updated!",
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        msg: error.message,
        error,
      });
    }
  }
);

router.delete(
  "/:id",
  [checkingToken],
  async (req: checkingTokenRequest, res: Response) => {
    let id = req.params.id;

    if (id === "") {
      return res.json({
        success: true,
        msg: "Please Enter Id",
      });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        success: true,
        msg: "Unvalid Id",
      });
    }
    try {
      await todoModel.findByIdAndDelete(id).then(() => {
        return res.status(201).json({
          success: true,
          msg: "deleted!",
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        msg: error.message,
        error,
      });
    }
  }
);

export default router;
