import { Router, Request, Response } from "express";
import userModel from "../../models/user.model";
import { compareSync, hashSync } from "bcrypt";
import { sign, verify } from "../../utilities/jwtHelper";
import checkingToken, {
  checkingTokenRequest,
} from "../../middlewares/checkingToken";
const router = Router();

router.post("/create-account", async (req: Request, res: Response) => {
  type reqBodyType = {
    name: string;
    email: string;
    password: string;
  };
  let body: reqBodyType = req.body;
  let { name, email, password } = body;

  let user = await userModel.findOne({ email });
  if (user !== null) {
    return res.json({
      success: true,
      msg: `There Is Already User With ${email} email !`,
    });
  }

  let newUser = new userModel({
    name,
    email,
    password: hashSync(password, 10),
  });

  try {
    await newUser.save().then(() => {
      return res.status(201).json({
        success: true,
        msg: "Register Successfully!",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      msg: error.message,
      error,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  type reqBodyType = {
    email: string;
    password: string;
  };
  let { email, password } = req.body as reqBodyType;

  if (!email || !password) {
    return res.json({
      success: true,
      msg: "There Is No Email Or Password Send With Request",
    });
  }

  let user = await userModel.findOne({ email });
  if (user === null) {
    return res.status(404).json({
      success: true,
      msg: `Cannot Find User With ${email} email !`,
    });
  }

  if (!compareSync(password, user.password as string)) {
    return res.json({
      success: true,
      msg: "passowrd is wrong!",
    });
  }

  let token = sign({ name: user.name as string, email });

  return res.json({
    success: true,
    msg: "Found User Successfully!",
    token,
  });
});

router.get(
  "/current-user",
  [checkingToken],
  async (req: checkingTokenRequest, res: Response) => {
    let token = req.authorization;
    let payload = verify(token);
    res.status(200).json({
      success: true,
      data: payload,
    });
  }
);

export default router;
