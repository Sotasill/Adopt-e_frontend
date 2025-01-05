import { API_URLS } from '../../services/api';

export const uploadProfileBackground = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_URLS.AUTH}/upload-background`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка загрузки фона профиля");
  }

  const data = await response.json();
  return data.backgroundUrl;
};
