import { Router } from "express";
import verifyToken from "../middleware/auth";
// import jwt from "jsonwebtoken";

const router = Router();

// const token = jwt.sign(
//   { userId: user.id, role: user.role },
//   process.env.JWT_SECRET!,
//   { expiresIn: "7d" }
// );

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your dashboard", user: (req as any).user });
});

export default router;