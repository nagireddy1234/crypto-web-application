import express from "express";
import { getHistory } from "@/controller/historyController";

const router = express.Router();

router.get("/", getHistory);

export const historyRouter = router;
