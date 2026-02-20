import { Router } from "express";
import prisma from "../prismaClient";
import verifyToken from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/users", verifyToken, requireRole("admin"), async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  res.json(users);
});

router.delete("/users/:id", verifyToken, requireRole("admin"), async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id as string }
  });

  res.json({ message: "User deleted" });
});

router.patch("/users/:id/promote",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    const user = await prisma.user.update({
      where: { id: req.params.id as string },
      data: { role: "admin" }
    });

    res.json({ message: "User promoted", user });
  }
);

export default router;