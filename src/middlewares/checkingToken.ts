import { NextFunction, Request, Response } from "express";

type token = string;

export interface checkingTokenRequest extends Request {
  authorization: token;
}

function checkingToken(
  req: checkingTokenRequest,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization as string;
  if (!token) {
    return res.json({
      success: true,
      msg: "Please Enter Token",
    });
  }
  token = token.replace("Bearer", "").trim();
  req.authorization = token;
  next();
}

export default checkingToken;
