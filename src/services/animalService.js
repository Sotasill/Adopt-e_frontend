import api from "./api";

const ANIMAL_API_URLS = {
  registerAnimal: "/animals/register",
  checkBreederCode: "/animals/check-breeder-code",
  checkParent: "/animals/check-parent",
  getUserAnimals: "/animals/user",
  getAnimalById: "/animals",
  updateAnimal: "/animals",
  addTreatmentPost: "/animals/treatment-post",
  addNote: "/animals/note",
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

  async getUserAnimals(filters = {}) {
    const queryParams = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      sortBy: filters.sortBy || "registrationDate",
      sortOrder: filters.sortOrder || "desc",
      ...(filters.type && { type: filters.type }),
      ...(filters.sex && { sex: filters.sex }),
      ...(filters.breed && { breed: filters.breed }),
      ...(filters.ageMin && { ageMin: filters.ageMin }),
      ...(filters.ageMax && { ageMax: filters.ageMax }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await api.get(
      `${ANIMAL_API_URLS.getUserAnimals}?${queryParams}`
    );
    return response.data;
  },

  async getAnimalById(id) {
    const response = await api.get(`${ANIMAL_API_URLS.getAnimalById}/${id}`);
    return response.data;
  },

  async updateAnimal(id, updateData) {
    try {
      const response = await api.put(
        `${ANIMAL_API_URLS.updateAnimal}/${id}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating animal:", error);
      throw error;
    }
  },

  async deleteAnimal(id) {
    try {
      const response = await api.delete(
        `${ANIMAL_API_URLS.updateAnimal}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting animal:", error);
      throw error;
    }
  },

  async addTreatmentPost(animalId, formData) {
    try {
      const response = await api.post(
        `${ANIMAL_API_URLS.addTreatmentPost}/${animalId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding treatment post:", error);
      throw error;
    }
  },

  async addNote(animalId, formData) {
    try {
      const response = await api.post(
        `${ANIMAL_API_URLS.addNote}/${animalId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },
};

export default animalService;
