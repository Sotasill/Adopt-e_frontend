import { authService } from "../services/authService";
import { DEFAULT_ROUTES_BY_ROLE } from "../constants/routes";

export const handleSocialAuth = async (provider) => {
  try {
    let authUrl;
    switch (provider) {
      case "google":
        authUrl = `${process.env.REACT_APP_API_URL}/auth/google`;
        break;
      case "facebook":
        authUrl = `${process.env.REACT_APP_API_URL}/auth/facebook`;
        break;
      case "apple":
        authUrl = `${process.env.REACT_APP_API_URL}/auth/apple`;
        break;
      default:
        throw new Error("Неподдерживаемый провайдер авторизации");
    }

    // Открываем окно авторизации
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const authWindow = window.open(
      authUrl,
      `${provider}Auth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (authWindow) {
      // Слушаем сообщения от окна авторизации
      const handleMessage = async (event) => {
        if (event.origin !== process.env.REACT_APP_API_URL) return;

        try {
          const data = JSON.parse(event.data);
          if (data.type === "auth_success") {
            const { email, name, providerId } = data.user;

            // Отправляем данные на сервер для завершения авторизации
            const response = await authService.socialAuth({
              email,
              name,
              providerId,
              provider,
              acceptTerms: true,
            });

            const { user, tokens } = response;

            // Сохраняем токены
            if (tokens) {
              localStorage.setItem("accessToken", tokens.accessToken);
              localStorage.setItem("refreshToken", tokens.refreshToken);
            }

            localStorage.setItem("user", JSON.stringify(user));

            // Перенаправляем на соответствующую страницу в зависимости от роли
            const redirectUrl =
              DEFAULT_ROUTES_BY_ROLE[user.role] || DEFAULT_ROUTES_BY_ROLE.user;
            window.location.href = redirectUrl;

            // Отправляем событие успешной авторизации
            window.dispatchEvent(
              new CustomEvent("social_auth_success", {
                detail: user,
              })
            );
          } else if (data.type === "auth_error") {
            window.dispatchEvent(
              new CustomEvent("social_auth_error", {
                detail: data.error,
              })
            );
          }
        } catch (error) {
          console.error("Ошибка при обработке сообщения авторизации:", error);
          window.dispatchEvent(
            new CustomEvent("social_auth_error", {
              detail: "Ошибка при обработке ответа от сервера",
            })
          );
        }

        window.removeEventListener("message", handleMessage);
        authWindow.close();
      };

      window.addEventListener("message", handleMessage);
    }
  } catch (error) {
    console.error("Ошибка социальной авторизации:", error);
    throw error;
  }
};
