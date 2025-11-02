CREATE TABLE IF NOT EXISTS `experiences` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_title` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description_md` text,
  `order_index` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `experiences` (`id`, `role_title`, `company_name`, `location`, `start_date`, `end_date`, `description_md`, `order_index`, `created_at`) VALUES
(1, 'Senior Software Developer', 'Incedo Inc.', 'Gurugram, India', '2021-01-01', NULL, '- AI-powered business analytics platform with customizable dashboards\n- React performance optimisation partnering with product managers\n- Modular data visualisation components for AI insights', 1, NOW()),
(2, 'Game Development Intern', 'All Friends Studio', 'Remote', '2021-06-01', '2021-07-01', '- Unity-based 2D car game with responsive physics\n- Built playful interactions to showcase creative coding', 2, NOW()),
(3, 'B. Tech Engineering Physics', 'Delhi Technological University', 'Delhi, India', '2017-08-01', '2021-05-01', '- Electronics minor in Robotics\n- Built engineering and visual projects including astrophysics HR-diagram explorations', 3, NOW());
