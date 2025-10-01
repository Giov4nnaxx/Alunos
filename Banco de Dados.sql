-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para escola_db
CREATE DATABASE IF NOT EXISTS `escola_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `escola_db`;

-- Copiando estrutura para tabela escola_db.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(80) NOT NULL,
  `CPF` char(11) NOT NULL,
  `CEP` char(8) NOT NULL,
  `UF` char(2) NOT NULL,
  `RUA` varchar(120) NOT NULL,
  `NUMERO` int(11) NOT NULL,
  `COMPLEMENTO` varchar(120) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola_db.alunos: ~5 rows (aproximadamente)
INSERT IGNORE INTO `alunos` (`ID`, `NOME`, `CPF`, `CEP`, `UF`, `RUA`, `NUMERO`, `COMPLEMENTO`, `create_at`, `update_at`) VALUES
	(1, 'Giovanna', '12345678901', '06060250', 'SP', 'Rua Roblox', 65, 'Roube um Brainrot', '2025-09-16 13:21:43', '2025-10-01 13:56:23'),
	(2, 'Jhonatan', '68945619041', '06060250', 'SP', 'Rua Roblox', 99, '99 noites na Floresta', '2025-09-16 13:21:43', '2025-09-16 13:21:43'),
	(3, 'Nathalia', '56276554267', '06060250', 'SP', 'Rua Roblox', 3, '', '2025-09-16 13:21:43', '2025-10-01 14:23:42'),
	(9, 'Cintia', '12345678901', '06060250', 'SP', 'Rua Roblox', 77, 'Bee Swarm Simulator', '2025-09-23 13:32:04', '2025-09-23 13:32:04'),
	(10, 'Lorena', '1245678904', '06060209', 'Sp', 'Rua Limoeiro', 39, 'Casa', '2025-09-30 13:39:52', '2025-09-30 13:39:52');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
