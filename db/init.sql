
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `price` int(10) NOT NULL,
  `seller` int(10) NOT NULL,
  `phone` int(11),
  `description` varchar(200),
  `image` varchar(200),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`name`, `email`, `password`) VALUES ('test1', 'test1@test.com', 'test1');
INSERT INTO `users` (`name`, `email`, `password`) VALUES ('test2', 'test2@test.com', 'test2');

INSERT INTO `listings` (`title`,`price`,`seller`, `phone`, `description`, `image`) VALUES ('Bike', 80, 1, '0451223682', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type a', 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81wGn2TQJeL._SX425_.jpg');
INSERT INTO `listings` (`title`,`price`,`seller`, `phone`, `description`, `image`) VALUES ('Nike Shoes', 30, 2, '0452323881', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type an', 'https://static.nike.com/a/images/t_default/b6e11cbd-509d-483d-b21d-850e2d7924ca/alphafly-2-road-racing-shoes-fvDSdT.png');
