import { DateTime } from "luxon";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({ type: "bigint" })
  created_at: number;

  @Column({ type: "bigint", nullable: true })
  updated_at: number;

  @Column({ type: "bigint", nullable: true })
  deleted_at: number;

  @BeforeInsert()
  BeforeInsert() {
    this.created_at = DateTime.now().toUnixInteger();
  }

  @BeforeUpdate()
  BeforeUpdate() {
    this.updated_at = DateTime.now().toUnixInteger();
  }
}
