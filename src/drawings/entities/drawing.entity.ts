import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import Item from './item.entity';

@Unique(['id'])
@Entity()
class Drawing {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column()
  public id: string;

  @OneToMany(
    () => Item,
    item => item.drawing,
    {
      eager: true,
      cascade: true,
    },
  )
  public items: Item[];

  @BeforeInsert()
  beforeInsertActions() {
    this.items = [];
  }
}

export default Drawing;
