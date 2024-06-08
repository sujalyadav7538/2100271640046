import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/product", async (req, res, next) => {
  try {
    const minPrice = parseInt(req.query.minPrice) || 1;
    const maxPrice = parseInt(req.query.maxPrice) || 10000;
    const limit = parseInt(req.query.top) || 10;
   

    // Construct the API URL
    let apiUrl = `http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const data = await response.json();
    data.map((product, index) => {
      product['id'] = uuidv4();
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
