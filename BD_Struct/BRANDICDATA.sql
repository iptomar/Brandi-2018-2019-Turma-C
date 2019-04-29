
INSERT INTO `tbl_supercategories` (`id`, `supercategory`) VALUES
	(3, 'Artes plásticas / Artes decorativas'),
	(1, 'Bens Culturais'),
	(2, 'Mobiliário Religioso');

INSERT INTO `tbl_categories` (`id`, `category`, `supercategory`) VALUES
	(1, 'Bens Culturais Móveis', 1),
	(4, 'Bens Culturais Móveis integrados', 1),
	(7, 'Bens móveis', 1),
	(8, 'Brinquedo', 1),
	(9, 'Móvel Integrado', 1),
	(11, 'Bem Móvel', 2),
	(12, 'Escultura', 3);

INSERT INTO `tbl_subcategories` (`id`, `subcategory`, `category`) VALUES
	(1, 'Escultura arquitetónica / Retábulos', 12),
	(2, 'Mobiliário', 1),
	(4, 'Mobiliário civil', 1),
	(6, 'Mobiliário Religioso', 1),
	(7, 'Retabulística / Escultura / Talha', 1),
	(10, 'Retabulística/Escultura/Talha', 4),
	(12, 'Mobiliário BM', 7),
	(13, 'Instrumento Musical', 8),
	(14, 'Coluna pertencente a um retábulo', 9),
	(15, 'Retabulística / Escultura/ Talha', 9),
	(17, 'Gaveta', 11);
