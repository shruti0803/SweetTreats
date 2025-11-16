import { Request, Response } from "express";
import Sweet from "../models/Sweet";

// ADD SWEET (Admin)
export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, price, category, quantity } = req.body;

    const sweet = await Sweet.create({ name, price, category, quantity });
    res.status(201).json({ message: "Sweet added", sweet });
  } catch {
    res.status(500).json({ message: "Error adding sweet" });
  }
};

// UPDATE SWEET (Admin)
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Updated", sweet });
  } catch {
    res.status(500).json({ message: "Error updating sweet" });
  }
};

// DELETE SWEET (Admin)
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting sweet" });
  }
};

// RESTOCK SWEET (Admin)
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.json({ message: "Restocked", sweet });
  } catch {
    res.status(500).json({ message: "Error restocking" });
  }
};



export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch {
    res.status(500).json({ message: "Error fetching sweets" });
  }
};
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query: any = {};

    if (name) query.name = { $regex: name.toString(), $options: "i" };
    if (category) query.category = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const sweets = await Sweet.find(query);

    res.json(sweets);
  } catch {
    res.status(500).json({ message: "Error searching sweets" });
  }
};
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch {
    res.status(500).json({ message: "Error purchasing sweet" });
  }
};
