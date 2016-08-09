
CREATE TABLE IF NOT EXISTS `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Product` varchar(255) NOT NULL,
  `Cost` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

INSERT INTO `Products` (`id`, `Product`, `Cost`) VALUES
(1, '12000 Kredits', 99.99),
(2, '5200 Kredits', 49.99),
(3, '2400 Kredits', 24.99),
(4, '800 Kredits', 8.99),
(5, '400 Kredits', 4.99);

SELECT `id` , `Product` , `Cost`
FROM `Products`
WHERE `Cost` < (

    SELECT AVG( Cost )
    FROM `Products`
)
ORDER BY `id`