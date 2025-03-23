import express from "express";
import { getPrice } from "@/controller/priceController";

const router = express.Router();

router.get("/", getPrice);

export const priceRouter = router;
