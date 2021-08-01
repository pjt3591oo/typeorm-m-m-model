import "reflect-metadata";
import { createConnection } from "typeorm";

import { Post } from "./entity/Post";

createConnection().then(async connection => {
    let postsPaging = await Post.find({take: 3})
    
    let posts = await Post
        .createQueryBuilder('post')
        .leftJoinAndSelect("post.taggings", "taggings")
        .leftJoinAndSelect('taggings.tag', 'tag')
        .where("post.id IN (:id)", { id: postsPaging.map(({ id }) => id)})
        .getMany();
    
    console.log(posts);
    console.log(posts[0].taggings);
}).catch(error => console.log(error));
