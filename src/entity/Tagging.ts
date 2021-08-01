import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { Tag } from "./Tag";

@Entity()
export class Tagging extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((_type) => Tag, (_type) => _type.taggings)
    tag: Tag;

    @ManyToOne((_type) => Post, (_type) => _type.taggings)
    post: Post;
};