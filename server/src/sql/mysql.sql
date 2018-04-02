DROP TABLE IF EXISTS `blogs`.`blog_user`;
DROP TABLE IF EXISTS `blogs`.`article`;
DROP TABLE IF EXISTS `blogs`.`article_type`;
DROP TABLE IF EXISTS `blogs`.`article_collect`;

CREATE TABLE IF NOT EXISTS `blog_user`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `user_name` VARCHAR(100) NOT NULL,
  `nick_name` VARCHAR(100),
  `email` VARCHAR(200),
  `password` VARCHAR(100),
  `photo` TEXT,
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/** 文章相关表 **/
CREATE TABLE IF NOT EXISTS `article`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `user_id` INT,
  `collect_id` INT NOT NULL,
  `type_id` INT,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT,
  `create_time` DATETIME NOT NULL,
  `art_from` VARCHAR(200),
  `author` VARCHAR(10) NOT NULL,
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `article_type`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `type_name` VARCHAR(20) NOT NULL,
  `type_description` VARCHAR(100),
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `article_collect`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `collect_name` VARCHAR(20) NOT NULL,
  `collect_description` VARCHAR(100),
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO blog_user (user_name, nick_name,password, email,photo) VALUES ('jialj','jialj','1','514435903@qq.com','https://p0.ssl.qhimg.com/t01829502eff79e1437.png');
INSERT INTO article_collect (collect_name, collect_description) VALUES ('随笔', '随手记录的东东');
INSERT INTO article_collect (collect_name, collect_description) VALUES ('日记本', '每天的日记');
INSERT INTO article (user_id,collect_id, type_id, title, content, create_time, art_from, author) VALUES (1,1,1, '前端随想', '测试内容', '2018-03-07 23:59:59', 'github', 'jialj');
INSERT INTO article (user_id,collect_id, type_id, title, content, create_time, art_from, author) VALUES (1,1,1, '有意义的人生', '在人间有谁活着不像是一场炼狱', '2018-03-07 23:59:59', 'github', 'jialj');
INSERT INTO article (user_id,collect_id, type_id, title, content, create_time, art_from, author) VALUES (1,2,2, '我的日记', '当从前那些梦啊，溺死在人海里别难过，让她去', '2018-03-07 23:59:59', 'github', 'jialj');
