import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";

@Entity()
export default class Shift extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "date",
  })
  date: string;

  @Column({
    type: "time",
  })
  startTime: string;

  @Column({
    type: "time",
  })
  endTime: string;
}
