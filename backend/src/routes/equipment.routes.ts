import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Equipment } from "../entity/Equipment";

const router = Router();
const equipmentRepo = AppDataSource.getRepository(Equipment);


/**
 * GET /api/equipment
 * Search & filter equipment
 */
router.get("/", async (req, res) => {
  try {
    const { search, type, status } = req.query;

    const queryBuilder = equipmentRepo.createQueryBuilder("equipment");

    // Search by name
    if (search) {
      queryBuilder.andWhere(
        "LOWER(equipment.name) LIKE LOWER(:search)",
        { search: `%${search}%` }
      );
    }

    // Filter by type
    if (type) {
      queryBuilder.andWhere("equipment.type = :type", { type });
    }

    // Filter by status
    if (status) {
      queryBuilder.andWhere("equipment.status = :status", { status });
    }

    queryBuilder.orderBy("equipment.createdAt", "DESC");

    const equipment = await queryBuilder.getMany();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment" });
  }
});


/**
 * GET /api/equipment
 * Get all equipment
 */
router.get("/", async (req, res) => {
  try {
    const { search, type, status, sortBy, order } = req.query;

    const queryBuilder = equipmentRepo.createQueryBuilder("equipment");

    // Search by name
    if (search) {
      queryBuilder.andWhere(
        "LOWER(equipment.name) LIKE LOWER(:search)",
        { search: `%${search}%` }
      );
    }

    // Filter by type
    if (type) {
      queryBuilder.andWhere("equipment.type = :type", { type });
    }

    // Filter by status
    if (status) {
      queryBuilder.andWhere("equipment.status = :status", { status });
    }

    // Sorting (safe allowlist)
    const allowedSortFields = ["name", "lastCleanedDate", "createdAt"];
    const sortField = allowedSortFields.includes(sortBy as string)
      ? (sortBy as string)
      : "createdAt";

    const sortOrder =
      order === "asc" || order === "desc" ? order.toUpperCase() : "DESC";

    queryBuilder.orderBy(`equipment.${sortField}`, sortOrder as "ASC" | "DESC");

    const equipment = await queryBuilder.getMany();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment" });
  }
});


/**
 * POST /api/equipment
 * Add new equipment
 */
router.post("/", async (req, res) => {
  try {
    const { name, type, status, lastCleanedDate } = req.body;

    if (!name || !type || !status || !lastCleanedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEquipment = equipmentRepo.create({
      name,
      type,
      status,
      lastCleanedDate,
    });

    const savedEquipment = await equipmentRepo.save(newEquipment);
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create equipment" });
  }
});

/**
 * PUT /api/equipment/:id
 * Update equipment
 */
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, type, status, lastCleanedDate } = req.body;

    const equipment = await equipmentRepo.findOneBy({ id });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    equipment.name = name ?? equipment.name;
    equipment.type = type ?? equipment.type;
    equipment.status = status ?? equipment.status;
    equipment.lastCleanedDate =
      lastCleanedDate ?? equipment.lastCleanedDate;

    const updated = await equipmentRepo.save(equipment);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update equipment" });
  }
});

/**
 * DELETE /api/equipment/:id
 * Delete equipment
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await equipmentRepo.delete({ id });

    if (result.affected === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete equipment" });
  }
});

export default router;
