import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Enum for Equipment Type
 */
export enum EquipmentType {
  MACHINE = "Machine",
  VESSEL = "Vessel",
  TANK = "Tank",
  MIXER = "Mixer",
}

/**
 * Enum for Equipment Status
 */
export enum EquipmentStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  UNDER_MAINTENANCE = "Under Maintenance",
}

@Entity({ name: "equipment" })
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({
    type: "enum",
    enum: EquipmentType,
  })
  type!: EquipmentType;

  @Column({
    type: "enum",
    enum: EquipmentStatus,
  })
  status!: EquipmentStatus;

  @Column({ type: "date" })
  lastCleanedDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
