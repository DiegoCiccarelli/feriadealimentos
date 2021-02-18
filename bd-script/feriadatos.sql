

INSERT INTO `categoria` (`id`, `nombre_categoria`, `estado_categoria`, `created_at`, `updated_at`) VALUES
(1, 'Casero', 0, '2021-02-18 16:04:05', '2021-02-18 16:04:15'),
(2, 'Panificados', 1, '2021-02-18 16:04:23', '2021-02-18 16:04:23'),
(3, 'Casero', 1, '2021-02-18 16:04:28', '2021-02-18 16:04:28'),
(4, 'Pastas', 1, '2021-02-18 16:04:42', '2021-02-18 16:04:42'),
(5, 'Vegetariano', 1, '2021-02-18 16:05:01', '2021-02-18 16:05:01');


INSERT INTO `categoria_producto` (`id`, `categoria_id`, `producto_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, '2021-02-18 16:12:04', '2021-02-18 16:12:04'),
(2, 4, 1, '2021-02-18 16:12:04', '2021-02-18 16:12:04'),
(3, 5, 1, '2021-02-18 16:12:04', '2021-02-18 16:12:04'),
(4, 3, 2, '2021-02-18 16:13:38', '2021-02-18 16:13:38'),
(5, 5, 2, '2021-02-18 16:13:38', '2021-02-18 16:13:38'),
(6, 3, 3, '2021-02-18 16:15:15', '2021-02-18 16:15:15'),
(7, 5, 3, '2021-02-18 16:15:15', '2021-02-18 16:15:15'),
(8, 3, 4, '2021-02-18 16:16:22', '2021-02-18 16:16:22'),
(9, 4, 4, '2021-02-18 16:16:22', '2021-02-18 16:16:22'),
(10, 3, 5, '2021-02-18 16:28:58', '2021-02-18 16:28:58'),
(11, 4, 5, '2021-02-18 16:28:58', '2021-02-18 16:28:58'),
(12, 3, 6, '2021-02-18 16:30:19', '2021-02-18 16:30:19'),
(13, 2, 7, '2021-02-18 16:31:03', '2021-02-18 16:31:03'),
(14, 3, 7, '2021-02-18 16:31:03', '2021-02-18 16:31:03');


INSERT INTO `producto` (`id`, `nombre_producto`, `descripcion_corta`, `descripcion_larga`, `precio`, `imagen`, `estado_producto`, `variacion`, `tamano`, `productor_id`, `created_at`, `updated_at`) VALUES
(1, 'Lasagna Vegetariana', 'Lasagna vegetariana', 'Lasagna vegetariana...', 600, 'imagenProducto-1613664724420.jpg', 1, NULL, NULL, 1, '2021-02-18 16:12:04', '2021-02-18 16:12:04'),
(2, 'Empanadas árabes veganas', 'Emapandas arabes veganas', 'Empanadas arabes veganas, etc', 150, 'imagenProducto-1613664818802.jpg', 1, NULL, NULL, 1, '2021-02-18 16:13:38', '2021-02-18 16:13:38'),
(3, 'Emapanadas de verdura', 'Emapanadas de verdura', 'Empanadas de verdura, etc', 300, 'imagenProducto-1613664915234.jpg', 1, NULL, NULL, 1, '2021-02-18 16:15:15', '2021-02-18 16:15:15'),
(4, 'Sorrentinos', 'Sorrentinos caseros', 'Sorrentinos caseros, etc', 800, 'imagenProducto-1613664982285.jpg', 1, NULL, NULL, 2, '2021-02-18 16:16:22', '2021-02-18 16:16:22'),
(5, 'Ravioles', 'Ravioles caseros', 'Ravioles caseros, etc', 700, 'imagenProducto-1613665738901.jpg', 1, NULL, NULL, 2, '2021-02-18 16:28:58', '2021-02-18 16:28:58'),
(6, 'Arepas', 'Arepa', 'Arepa. etc', 200, 'imagenProducto-1613665819333.jpg', 1, NULL, NULL, 3, '2021-02-18 16:30:19', '2021-02-18 16:30:19'),
(7, 'Budines artesanales', 'Alamacenes caseros', 'Almacenes caseros, etc', 650, 'imagenProducto-1613665863217.jpg', 1, NULL, NULL, 3, '2021-02-18 16:31:03', '2021-02-18 16:31:03');


INSERT INTO `productor` (`id`, `nombre_productor`, `apellido_productor`, `email_productor`, `domicilio_productor`, `logotipo`, `telefono_productor`, `nombre_emprendimiento`, `descripcion_productor`, `estado_productor`, `created_at`, `updated_at`) VALUES
(1, 'Juan', 'Torres', 'juantorres@mail.com', 'Calle Falsa 123', NULL, '1167896532', 'Lo de Mona', '', 1, '2021-02-18 16:01:40', '2021-02-18 16:01:40'),
(2, 'Pepe', 'Pompin', 'pepepompin@mail.com', 'Calle Autentica 123', NULL, '1178589436', 'La Patrona', '', 1, '2021-02-18 16:02:33', '2021-02-18 16:10:11'),
(3, 'Monica', 'Gutierrez', 'monicagutierrez@mail.com', 'Algun Lugar 30', NULL, '1120203030', 'La Tribu Gastronomica', '', 1, '2021-02-18 16:03:29', '2021-02-18 16:10:20');


INSERT INTO `usuario` (`id`, `nombre_usuario`, `apellido_usuario`, `email_usuario`, `telefono_usuario`, `contrasena`, `dni`, `calle`, `altura`, `piso`, `departamento`, `barrio`, `localidad`, `provincia`, `pais`, `avatar`, `tipo_usuario`, `created_at`, `updated_at`) VALUES
(1, 'Rodriguez', 'Martin', 'martinrodriguez@mail.com', '1130356563', '$2a$10$ou3PohJ2WBxXaHHrvdk6.ux7z8K/IssDlt1PkBP9wFEOk2OnISo1.', 11543560, 'Calle', '1205', '', '', 'Merlo Norte', 'Merlo', '', '', NULL, 'cliente', '2021-02-18 16:34:24', '2021-02-18 16:34:24'),
(2, 'Jose', 'Torres', 'josetorres@mail.com', '1124245467', '$2a$10$W13kroxLBF5XCdgEJpzNOezBNmp6WK20.hdm0zHQUbAIU25riOIRy', 310233465, 'Calle Unica', '3030', '', '', 'Flores', 'Flores ', '', '', NULL, 'cliente', '2021-02-18 16:35:37', '2021-02-18 16:35:37');
COMMIT;
