import * as Yup from "yup";

export const nameValidationSchema = (currentName, companyName) =>
  Yup.string()
    .required("Кличка обязательна")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .matches(
      /^[A-Z][a-z]+$/,
      "Кличка должна начинаться с большой буквы и содержать только латинские буквы"
    )
    .test(
      "name-unique",
      "У вас уже есть животное с таким именем",
      async (value) => {
        if (!value || value === currentName) return true;
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:3000/api/animals/check-name",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: value,
                fullName: companyName ? `${value} ${companyName}` : value,
              }),
            }
          );

          const data = await response.json();
          return data.status === "success" && !data.data.exists;
        } catch (error) {
          console.error("Ошибка при проверке имени:", error);
          return false;
        }
      }
    );

export const microchipValidationSchema = () =>
  Yup.string().matches(
    /^\d{3} \d{4} \d{8}$/,
    "Номер микрочипа должен соответствовать формату: XXX XXXX XXXXXXXX (например: 643 0981 00000003)"
  );
