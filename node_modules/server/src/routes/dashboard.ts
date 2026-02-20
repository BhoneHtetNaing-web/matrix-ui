import { Router } from "express";
import verifyToken from "../middleware/auth";
import { requireRole } from "../middleware/role";
import prisma from "../prismaClient";
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

router.get("/stats", verifyToken, requireRole("admin"), async (req, res) => {
  const totalUsers = await prisma.user.count();
  const admins = await prisma.user.count({
    where: { role: "admin" }
  });

  res.json({
    totalUsers,
    admins,
    regularUsers: totalUsers - admins
  });
});

export default router;