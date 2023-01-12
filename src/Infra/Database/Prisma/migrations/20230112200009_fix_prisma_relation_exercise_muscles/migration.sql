-- CreateIndex
CREATE INDEX `exercise_muscle_exercise_id_foreign` ON `exercise_muscle`(`exercise_id`);

-- AddForeignKey
ALTER TABLE `exercise_muscle` ADD CONSTRAINT `exercise_muscle_exercise_id_foreign` FOREIGN KEY (`exercise_id`) REFERENCES `exercicios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
