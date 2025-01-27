import { useTranslatedContent } from "./useTranslatedContent";

export const useBreeds = () => {
  const { t } = useTranslatedContent();

  const getTranslatedBreeds = (animalType) => {
    const breeds = {
      dogs: [
        {
          id: 1,
          name: t("breeds.dogs.goldenRetriever"),
          image: "/images/breeds/golden-retriever.jpg",
        },
        {
          id: 2,
          name: t("breeds.dogs.germanShepherd"),
          image: "/images/breeds/german-shepherd.jpg",
        },
        {
          id: 3,
          name: t("breeds.dogs.labrador"),
          image: "/images/breeds/labrador.jpg",
        },
        {
          id: 4,
          name: t("breeds.dogs.husky"),
          image: "/images/breeds/husky.jpg",
        },
        {
          id: 5,
          name: t("breeds.dogs.beagle"),
          image: "/images/breeds/beagle.jpg",
        },
        {
          id: 6,
          name: t("breeds.dogs.poodle"),
          image: "/images/breeds/poodle.jpg",
        },
      ],
      cats: [
        {
          id: 1,
          name: t("breeds.cats.persian"),
          image: "/images/breeds/persian.jpg",
        },
        {
          id: 2,
          name: t("breeds.cats.maineCoon"),
          image: "/images/breeds/maine-coon.jpg",
        },
        {
          id: 3,
          name: t("breeds.cats.siamese"),
          image: "/images/breeds/siamese.jpg",
        },
        {
          id: 4,
          name: t("breeds.cats.british"),
          image: "/images/breeds/british.jpg",
        },
        {
          id: 5,
          name: t("breeds.cats.sphynx"),
          image: "/images/breeds/sphynx.jpg",
        },
        {
          id: 6,
          name: t("breeds.cats.bengal"),
          image: "/images/breeds/bengal.jpg",
        },
      ],
    };

    return breeds[animalType] || [];
  };

  return {
    getTranslatedBreeds,
  };
};
