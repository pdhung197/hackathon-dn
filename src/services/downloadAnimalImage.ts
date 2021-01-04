import { getAnimalDetail } from './getAnimalDetail';
import { AnimalBase } from './getAllAnimals';
import { api, baseQldAnimalApiUrl } from './api';
import { baseHeaders } from '../variables/common';

const downloadImageUrl = 'http://localhost:3000/animal/download';

export const downloadAnimalImage = async (url: string, animalKey: string) => {
  const config = {
    method: 'POST',
    data: {
      url,
      animalKey,
    },
  };

  const onFailure = (error: any) => {
    /* console.log({ error }); */
  };

  const onSuccess = (res: any) => {
    return res.data;
  };

  return api(downloadImageUrl, config, undefined, onSuccess, onFailure);
};

export const downloadAllimage = (amimalData: AnimalBase[]) => {
  amimalData.forEach(async (animal: AnimalBase, index: number) => {
    const animalDetail = await getAnimalDetail(animal.key);
    if (!animalDetail || !animalDetail.images) {
      return null;
    }

    await animalDetail.images.forEach(async (image: string) => {
      await downloadAnimalImage(image, animal.key);
    });
  });
};
