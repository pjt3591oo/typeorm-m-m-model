# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

```sql
CREATE DATABASE test;
USE test;

CREATE TABLE post (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE tag (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    color CHAR(6) NOT NULL DEFAULT "000000"
);

CREATE TABLE tagging (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    postId INT NOT NULL,
    tagId INT NOT NULL,
    FOREIGN KEY (postId) REFERENCES post (id),
    FOREIGN KEY (tagId) REFERENCES tag (id)
);

DESC post;
DESC tag;
DESC tagging;

SHOW INDEX FROM tagging;

# Insert: post table
INSERT INTO post(title) VALUES("title 1");
INSERT INTO post(title) VALUES("title 2");
INSERT INTO post(title) VALUES("title 3");
INSERT INTO post(title) VALUES("title 4");
INSERT INTO post(title) VALUES("title 5");
INSERT INTO post(title) VALUES("title 6");
INSERT INTO post(title) VALUES("title 7");
INSERT INTO post(title) VALUES("title 8");

# Insert: tag
INSERT INTO tag (name, color) VALUES("dev", "ff0000");         # 1
INSERT INTO tag (name, color) VALUES("test", "f0f000");        # 2
INSERT INTO tag (name, color) VALUES("ui/ux", "00ff00");       # 3
INSERT INTO tag (name, color) VALUES("tool", "0000ff");        # 4
INSERT INTO tag (name, color) VALUES("javascript", "222222");  # 5
INSERT INTO tag (name, color) VALUES("python", "888888");      # 6

# Insert: tagging
INSERT INTO tagging (postId, tagId) VALUES(1, 1);
INSERT INTO tagging (postId, tagId) VALUES(1, 5);
INSERT INTO tagging (postId, tagId) VALUES(2, 1);
INSERT INTO tagging (postId, tagId) VALUES(2, 2);
INSERT INTO tagging (postId, tagId) VALUES(2, 3);
INSERT INTO tagging (postId, tagId) VALUES(2, 5);
INSERT INTO tagging (postId, tagId) VALUES(5, 2);
INSERT INTO tagging (postId, tagId) VALUES(5, 4);


SELECT * FROM post;
SELECT * FROM tag;
SELECT * FROM tagging;

EXPLAIN SELECT post.id, post.title, tagging.* FROM post INNER JOIN tagging ON post.id = tagging.postId LIMIT 3;

SELECT 
	post.id, post.title, tag.name, tag.color
FROM 
	post
INNER JOIN 
	tagging 
INNER JOIN 
	tag 
ON 
	post.id = tagging.postId AND tag.id = tagging.tagId
ORDER BY post.id ASC;

SELECT 
	* 
FROM 
	 post
LEFT OUTER JOIN tagging 
	ON post.id = tagging.postId 
LEFT OUTER JOIN tag 
	ON tag.id = tagging.tagId
ORDER BY post.id ASC 
LIMIT 3;

SELECT 
	* 
FROM 
	 (SELECT id, title FROM post limit 3 OFFSET 3) as post
LEFT OUTER JOIN tagging 
	ON post.id = tagging.postId 
LEFT OUTER JOIN tag 
	ON tag.id = tagging.tagId;

SELECT 
	* 
FROM 
	 (SELECT * FROM post LIMIT 3) AS post
LEFT OUTER JOIN tagging 
	ON post.id = tagging.postId 
LEFT OUTER JOIN tag 
	ON tag.id = tagging.tagId
ORDER BY post.id ASC;

SELECT 
	* 
FROM 
	 post
LEFT OUTER JOIN tagging 
	ON post.id = tagging.postId 
LEFT OUTER JOIN tag 
	ON tag.id = tagging.tagId
WHERE post.id in (
	SELECT * FROM (
		SELECT id FROM post LIMIT 3
    ) as post
)
ORDER BY post.id ASC;

# 1235 error: Error Code: 1235. This version of MySQL doesn't yet support 'LIMIT & IN/ALL/ANY/SOME subquery'
SELECT * FROM post WHERE id IN (SELECT id FROM post LIMIT 3);
```