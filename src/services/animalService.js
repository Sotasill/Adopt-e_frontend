import api from "./api";

const ANIMAL_API_URLS = {
  registerAnimal: "/animals/register",
  checkBreederCode: "/animals/check-breeder-code",
  checkParent: "/animals/check-parent",
  getUserAnimals: "/animals/user",
};

export const animalService = {
  async registerAnimal(animalData) {
    const response = await api.post(ANIMAL_API_URLS.registerAnimal, animalData);
    return response.data;
  },

  async checkBreederCode(code) {
    const response = await api.post(ANIMAL_API_URLS.checkBreederCode, { code });
    return response.data;
  },

  async checkParent(parentId) {
    const response = await api.get(
      `${ANIMAL_API_URLS.checkParent}/${parentId}`
    );
    return response.data;
  },

  async getUserAnimals() {
    const response = await api.get(ANIMAL_API_URLS.getUserAnimals);
    return response.data;
  },
};

export default animalService;
