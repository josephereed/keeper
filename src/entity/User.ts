import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from './Note';

@Entity()
export class User {
  _id(arg0: null, _id: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: string;

  @Column()
  photo: string;

  @OneToMany('Note', (note: Note) => note.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notes: Note[];
}
