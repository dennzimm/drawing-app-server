import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import Drawing from './drawing.entity';

@Unique(['id'])
@Entity()
class Item {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column()
  public id: string;

  @Column()
  public data: string;

  @ManyToOne(
    () => Drawing,
    drawing => drawing.items,
    {
      onDelete: 'CASCADE',
    },
  )
  public drawing: Drawing;
}

export default Item;
