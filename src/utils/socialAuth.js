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
        throw new Error("Unsupported provider");
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
      const handleMessage = (event) => {
        if (event.origin !== process.env.REACT_APP_API_URL) return;

        try {
          const data = JSON.parse(event.data);
          if (data.type === "auth_success") {
            // Обработка успешной авторизации
            window.dispatchEvent(
              new CustomEvent("social_auth_success", {
                detail: data.user,
              })
            );
          } else if (data.type === "auth_error") {
            // Обработка ошибки
            window.dispatchEvent(
              new CustomEvent("social_auth_error", {
                detail: data.error,
              })
            );
          }
        } catch (error) {
          console.error("Failed to parse auth message:", error);
        }

        window.removeEventListener("message", handleMessage);
        authWindow.close();
      };

      window.addEventListener("message", handleMessage);
    }
  } catch (error) {
    console.error("Social auth error:", error);
    throw error;
  }
};
