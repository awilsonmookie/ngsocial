CREATE TABLE `angdev`.`user` (
  `id` INT NOT NULL,
  `fullname` VARCHAR(50) NOT NULL,
  `bio` MEDIUMTEXT NULL,
  `email` VARCHAR(100) NOT NULL,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `image` VARCHAR(1000) NULL,
  `coverimage` VARCHAR(1000) NULL,
  `postCount` INT NOT NULL DEFAULT 0,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  //UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE)
COMMENT = 'User table for NgSocial Application';

CREATE TABLE `angdev`.`post` (
  `id` INT NOT NULL,
  `text` LONGTEXT NULL,
  `image` VARCHAR(1000) NULL,
  `commentscount` INT NOT NULL DEFAULT 0,
  `likescount` INT NOT NULL DEFAULT 0,
  `latestlike` VARCHAR(1000) NULL DEFAULT '\"\"',
  `createdat` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `likedbyauthuser` TINYINT NULL DEFAULT 0,
  `authorid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `AUTHOR_TO_ID` FOREIGN KEY (`authorid`) REFERENCES USER(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  INDEX `AUTHOR` (`authorid` ASC) VISIBLE)
COMMENT = 'NgSocial table for storing a users post';

CREATE TABLE `angdev`.`comment` (
  `id` INT NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `authorid` INT NOT NULL,
  `postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `AUTHOR_TO_ID_CMT` FOREIGN KEY (`authorid`) REFERENCES USER(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `POST_ID_ID_CMT` FOREIGN KEY (`postid`) REFERENCES POST(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  INDEX `AUTHOR` (`authorid` ASC) VISIBLE,
  INDEX `POST` (`postid` ASC) VISIBLE)
COMMENT = 'NgSocial table for storing comments';

CREATE TABLE `angdev`.`like` (
  `id` INT NOT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `authorid` INT NOT NULL,
  `postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `AUTHOR_TO_ID_LIK` FOREIGN KEY (`authorid`) REFERENCES USER(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `POST_ID_ID_LIK` FOREIGN KEY (`postid`) REFERENCES POST(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  INDEX `AUTHOR` (`authorid` ASC) VISIBLE,
  INDEX `POST` (`postid` ASC) VISIBLE   
  )
COMMENT = 'NgSociall table for maintaining likes';

CREATE TABLE `angdev`.`notification` (
  `id` INT NOT NULL,
  `text` MEDIUMTEXT NULL,
  `postid` INT NULL,
  `authorid` INT NOT NULL,
  `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `AUTHOR_TO_ID_NOT` FOREIGN KEY (`authorid`) REFERENCES USER(`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  INDEX `AUTHOR` (`authorid` ASC) VISIBLE
  )
COMMENT = 'NgSocial table for notifications';



