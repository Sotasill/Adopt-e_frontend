// Утилитная функция для обработки данных пользователя
export const processUserData = (userData) => {
  const user = { ...userData };

  // Определяем роль пользователя
  if (!user.role) {
    // Проверяем все возможные поля, где может быть роль
    user.role = user.userType || user.type || "user";
  }

  // Приводим роль к нижнему регистру
  user.role = user.role.toLowerCase();

  // Проверяем, является ли пользователь заводчиком
  const isBreederRole = user.role === "breeder";
  const hasBreederEmail = user.email?.toLowerCase().includes("breeder");
  const hasBreederUsername = user.username?.toLowerCase().includes("breeder");

  // Если есть явные признаки того, что это заводчик - устанавливаем роль breeder
  if (isBreederRole || hasBreederEmail || hasBreederUsername) {
    user.role = "breeder";

    // Определяем специализацию заводчика
    if (!user.specialization) {
      const identifiers = [
        user.email?.toLowerCase(),
        user.username?.toLowerCase(),
        user.specialization?.toLowerCase(),
      ].filter(Boolean);

      // Проверяем все идентификаторы на наличие специализации
      for (const identifier of identifiers) {
        if (identifier.includes("dog")) {
          user.specialization = "dog";
          break;
        } else if (identifier.includes("cat")) {
          user.specialization = "cat";
          break;
        }
      }

      // Если специализация не определена, логируем это
      if (!user.specialization) {
        console.warn("Не удалось определить специализацию заводчика:", {
          email: user.email,
          username: user.username,
          role: user.role,
        });
      }
    }
  }

  return user;
};
