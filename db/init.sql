
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(36) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `price` varchar(60) NOT NULL,
  `seller` varchar(60) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `contact` int(10) NOT NULL,
  `description` varchar(200),
  `image` varchar(200),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` char(20) NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `categories` (`category`) VALUES ('Electronics');
INSERT INTO `categories` (`category`) VALUES ('Kitchen Appliances');
INSERT INTO `categories` (`category`) VALUES ('House Appliances');
INSERT INTO `categories` (`category`) VALUES ('Sports');
INSERT INTO `categories` (`category`) VALUES ('Children');
INSERT INTO `categories` (`category`) VALUES ('Clothes');
INSERT INTO `categories` (`category`) VALUES ('Literature');
INSERT INTO `categories` (`category`) VALUES ('Pets');
INSERT INTO `categories` (`category`) VALUES ('Furniture');
INSERT INTO `categories` (`category`) VALUES ('Gardening');
INSERT INTO `listings` (`title`,`price`,`seller`,`categoryid`,`contact`,`image`) VALUES ('Bike','150','Mark', 4,'0451223682','https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81wGn2TQJeL._SX425_.jpg');
INSERT INTO `listings` (`title`,`price`,`seller`,`categoryid`,`contact`,`image`) VALUES ('Nike Shoes','30','Anna', 6,'0452323881','https://static.nike.com/a/images/t_default/b6e11cbd-509d-483d-b21d-850e2d7924ca/alphafly-2-road-racing-shoes-fvDSdT.png');
INSERT INTO `users` (`name`,`email`,`password`) VALUES ('Admin','admin@root.com','admin123');