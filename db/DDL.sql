

DROP TABLE feed_post_images;
DROP TABLE accountXplaylist;
DROP TABLE songXfeed_post;
DROP TABLE chatXaccount;
DROP TABLE comments;
DROP TABLE feed_posts;
DROP TABLE messages;
DROP TABLE dailys;
DROP TABLE playlists;
DROP TABLE states;
DROP TABLE visibilities;
DROP TABLE chats;
DROP TABLE songs;
DROP TABLE accounts;
DROP TABLE roles;
DROP TABLE hashtags;


CREATE TABLE roles (
    `id_role` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (`name`)
);

CREATE TABLE accounts (
    `username` VARCHAR(255) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `active` TINYINT NOT NULL DEFAULT 1,
    `google` TINYINT NOT NULL DEFAULT 1,
    `image` VARCHAR(255) DEFAULT NULL,
    `role` BIGINT(20) UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`role`) REFERENCES roles(id_role)
        ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (`email`)
);

CREATE TABLE songs (
    `id_song` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `sound` VARCHAR(255) NOT NULL,
    `duration` TIME NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `album` VARCHAR(255),
    `image` VARCHAR(255) DEFAULT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE chats (
    `id_chat` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `num_accounts` INT(11) NOT NULL DEFAULT 0,
    `description` TEXT DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE visibilities (
    `id_visibility` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (`name`)
);

CREATE TABLE states (
    `id_state` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (`name`)
);

CREATE TABLE playlists (
    `id_playlist` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `num_songs` INT(11) NOT NULL DEFAULT 0,
    `duration` TIME NOT NULL DEFAULT 0,
    `path` VARCHAR(255) NOT NULL DEFAULT '/',
    `likes` INT(11) NOT NULL DEFAULT 0,
    `username` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE dailys (
    `id_daily` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `likes` INT(11) NOT NULL DEFAULT 0,
    `image` VARCHAR(255) DEFAULT NULL,
    `username` VARCHAR(255) NOT NULL,
    `id_song` BIGINT(20) UNSIGNED NOT NULL,
    `id_visibility` BIGINT(20) UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_song) REFERENCES songs(id_song)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_visibility) REFERENCES visibilities(id_visibility)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE messages (
    `id_message` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `text` TEXT NOT NULL,
    `likes` INT(11) NOT NULL DEFAULT 0,
    `username` VARCHAR(255) NOT NULL,
    `id_chat` BIGINT(20) UNSIGNED NOT NULL,
    `id_state` BIGINT(20) UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_chat) REFERENCES chats(id_chat)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE feed_posts (
    `id_feed_post` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(255) DEFAULT NULL,
    `id_playlist` BIGINT(20) UNSIGNED NOT NULL,
    `likes` INT(11) NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_playlist) REFERENCES playlists(id_playlist)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
    `id_comment` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `text` TEXT NOT NULL,
    `likes` INT(11) NOT NULL DEFAULT 0,
    `username` VARCHAR(255) NOT NULL,
    `id_feed_post` BIGINT(20) UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_feed_post) REFERENCES feed_posts(id_feed_post)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE chatXaccount (
    `id_chat` BIGINT(20) UNSIGNED,
    `username` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_chat`, `username`),
    FOREIGN KEY (id_chat) REFERENCES chats(id_chat)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE accountXplaylist (
    `username` VARCHAR(255) NOT NULL,
    `id_playlist` BIGINT(20) UNSIGNED,
    PRIMARY KEY (`username`, `id_playlist`),
    FOREIGN KEY (id_playlist) REFERENCES playlists(id_playlist)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES accounts(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE songXfeed_post (
    `id_song` BIGINT(20) UNSIGNED,
    `id_feed_post` BIGINT(20) UNSIGNED,
    PRIMARY KEY (`id_song`, `id_feed_post`),
    FOREIGN KEY (id_song) REFERENCES songs(id_song)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_feed_post) REFERENCES feed_posts(id_feed_post)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE feed_post_images (
    `id_feed_post` BIGINT(20) UNSIGNED,
    `image` VARCHAR(255),
    PRIMARY KEY (`id_feed_post`, `image`),
    FOREIGN KEY (id_feed_post) REFERENCES feed_posts(id_feed_post)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hashtags (
    `id_hashtag` BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `hashtag` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (`hashtag`)
);

CREATE TABLE feed_postXhashtags (
    `id_feed_post` BIGINT(20) UNSIGNED,
    `id_hashtag` BIGINT(20) UNSIGNED,
    PRIMARY KEY (`id_feed_post`, `id_hashtag`),
    FOREIGN KEY (id_feed_post) REFERENCES feed_posts(id_feed_post)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_hashtag) REFERENCES hashtags(id_hashtag)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- inserts:
--Roles Cuenta
INSERT INTO roles(`name`) values('ADMIN');
INSERT INTO roles(`name`) values('USER');

--Estado mensajes
INSERT INTO states('state') values ('SENT');
INSERT INTO states('state') values ('RECIEVED');
INSERT INTO states('state') values ('SEEN');

--Visibilidad dailys
INSERT INTO visibilities('visibility') values ('ALL');
INSERT INTO visibilities('visibility') values ('BEST_FRIENDS');
