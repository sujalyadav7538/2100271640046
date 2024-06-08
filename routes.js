import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/product", async (req, res, next) => {
  try {
    const minPrice = parseInt(req.query.minPrice) || 1;
    const maxPrice = parseInt(req.query.maxPrice) || 10000;
    const limit = parseInt(req.query.top) || 10;

    // Construct the API URL
    const apiUrl = `http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const productsWithId = data.map(product => ({
      ...product,
      id: uuidv4(),
    }));

    res.status(200).json(productsWithId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
