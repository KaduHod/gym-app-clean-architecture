-- CreateTable
CREATE TABLE `adonis_schema` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,
    `migration_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adonis_schema_versions` (
    `version` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alunos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `personal_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `alunos_personal_id_foreign`(`personal_id`),
    INDEX `alunos_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulation_movement` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `articulation_id` INTEGER UNSIGNED NOT NULL,
    `movement_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `movement_articulations_articulation_id_foreign`(`articulation_id`),
    INDEX `movement_articulations_movement_id_foreign`(`movement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulation_movement_muscle` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `muscle_id` INTEGER UNSIGNED NOT NULL,
    `movement_id` INTEGER UNSIGNED NOT NULL,
    `articulation_id` INTEGER UNSIGNED NOT NULL,
    `role` ENUM('agonist', 'synergist', 'stabilizer', 'antagonist stabilizer', 'dynamic stabilizer') NULL,

    INDEX `articulation_movement_muscle_articulation_id_foreign`(`articulation_id`),
    INDEX `articulation_movement_muscle_movement_id_foreign`(`movement_id`),
    INDEX `articulation_movement_muscle_muscle_id_foreign`(`muscle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulation_muscle` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `muscle_id` INTEGER UNSIGNED NOT NULL,
    `articulation_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `muscle_articulation_articulation_id_foreign`(`articulation_id`),
    INDEX `muscle_articulation_muscle_id_foreign`(`muscle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercicios` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `name` VARCHAR(255) NOT NULL,
    `force` VARCHAR(255) NULL,
    `link` VARCHAR(255) NULL,
    `execution` TEXT NULL,
    `mechanic` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercise_muscle` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `muscle_id` INTEGER UNSIGNED NOT NULL,
    `exercise_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `role` ENUM('agonist', 'synergist', 'stabilizer', 'antagonist stabilizer', 'dynamic stabilizer') NULL,

    INDEX `exercise_muscle_muscle_id_foreign`(`muscle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movement_muscle` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `muscle_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `movement_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_movements_id`(`movement_id`),
    INDEX `muscle_articulation_movements_muscle_id_foreign`(`muscle_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movements` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `muscles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodizacoes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personais` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `personais_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treinos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NULL,
    `nickname` VARCHAR(30) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,
    `cellphone` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_nickname_unique`(`nickname`),
    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_personal_id_foreign` FOREIGN KEY (`personal_id`) REFERENCES `personais`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_movement` ADD CONSTRAINT `movement_articulations_articulation_id_foreign` FOREIGN KEY (`articulation_id`) REFERENCES `articulations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_movement` ADD CONSTRAINT `movement_articulations_movement_id_foreign` FOREIGN KEY (`movement_id`) REFERENCES `movements`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_movement_muscle` ADD CONSTRAINT `FK_articulation_id` FOREIGN KEY (`articulation_id`) REFERENCES `articulations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_movement_muscle` ADD CONSTRAINT `FK_movement_id` FOREIGN KEY (`movement_id`) REFERENCES `movements`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_movement_muscle` ADD CONSTRAINT `FK_muscle_id` FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_muscle` ADD CONSTRAINT `muscle_articulation_articulation_id_foreign` FOREIGN KEY (`articulation_id`) REFERENCES `articulations`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `articulation_muscle` ADD CONSTRAINT `muscle_articulation_muscle_id_foreign` FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exercise_muscle` ADD CONSTRAINT `exercise_muscle_muscle_id_foreign` FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movement_muscle` ADD CONSTRAINT `FK_movements_id` FOREIGN KEY (`movement_id`) REFERENCES `movements`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movement_muscle` ADD CONSTRAINT `muscle_articulation_movements_muscle_id_foreign` FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personais` ADD CONSTRAINT `personais_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
