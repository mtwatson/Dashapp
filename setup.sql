CREATE TABLE IF NOT EXISTS `fic_todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `fic_name` text(2000) NOT NULL,
  `fic_priority` tinyint(50) NOT NULL,
  `fic_completion` tinyint(3) NOT NULL,
  `fic_category` varchar(50) NOT NULL,
  `fic_status` varchar(50) NOT NULL,
  `fic_details` blob( 65535),
  `fic_color` varchar(50),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;