// Утилитная функция для обработки данных пользователя
export const processUserData = (userData) => {
  if (!userData) return null;

  // Создаем копию данных пользователя
  const processedUser = { ...userData };

  // Добавляем специализацию по умолчанию для заводчиков, если она отсутствует
  if (processedUser.role === "breeder" && !processedUser.specialization) {
    processedUser.specialization = "dog"; // Устанавливаем значение по умолчанию
    console.log(
      "Установлена специализация по умолчанию для заводчика:",
      processedUser
    );
  }

  // Добавляем дополнительные поля, если они отсутствуют
  processedUser.userId = processedUser.userId || processedUser.id;
  processedUser.role = processedUser.role || "user";

  return processedUser;
};
