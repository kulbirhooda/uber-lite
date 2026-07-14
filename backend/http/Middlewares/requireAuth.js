import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client.js"

const { JWT_SECRET } = process.env;

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) return res.status(401).json({ error: "Token required" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true, email: true, name: true, role: true,
        createdAt: true, updatedAt: true,
        driver: {
          select: { id: true, vehicleModel: true, plateNumber: true, vehicleType: true, isAvailable: true }
        }
      }
    });
    if (!user) return res.status(401).json({ error: "Invalid or expired token" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const requireRider = (req, res, next) => {
  if (req.user.role !== 'RIDER') {
    return res.status(403).json({ error: 'Riders only' });
  }
  next();
};

export const requireDriver = (req, res, next) => {
  if (req.user.role !== 'DRIVER') {
    return res.status(403).json({ error: 'Drivers only' });
  }
  next();
};