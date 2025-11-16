import { Router } from "express";
import {
  addSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet
} from "../controllers/sweetController";

import { isAuthenticatedAdmin } from "../middleware/isAuthenticatedAdmin";
import { isAuthenticatedUser } from "../middleware/isAuthenticatedUser";

const router = Router();

// Admin operations
router.post("/", isAuthenticatedAdmin, addSweet);
router.put("/:id", isAuthenticatedAdmin, updateSweet);
router.delete("/:id", isAuthenticatedAdmin, deleteSweet);
router.post("/:id/restock", isAuthenticatedAdmin, restockSweet);



router.get("/getAllsweets", getAllSweets); // public
router.get("/search", searchSweets); // public

router.post("/:id/purchase", isAuthenticatedUser, purchaseSweet);
export default router;
