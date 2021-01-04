import { AnimalDetail, getAnimalDetail } from './getAnimalDetail';
import { firestore } from 'firebase';
import { AnimalBase } from './getAllAnimals';
import { FirebasRepository } from '../firebase/FirebaseRepository';
export const syncAnimalData = async (animalData: any) => {
  const collectionName = 'AnimalList';
  const animalInfoCollection = 'AnimalDetail';
  animalData.forEach(async (animal: AnimalBase, index: number) => {
    const { key } = animal || {};
    if (!key) {
      return;
    }

    const animalDetail: AnimalDetail = await getAnimalDetail(key);

    const {
      classifications: {
        class: className = '',
        family = '',
        kingdom = '',
        order = '',
        phylum = '',
        scientificName = '',
      } = {},
      animalFacts: { type: animalType = '' } = {},
    } = animalDetail || {};

    try {
      const animalRef = firestore().collection(collectionName);
      const snapshot = await animalRef.where('key', '==', key).get();

      if (!snapshot.empty) {
        const animalId = snapshot.docs[0];
        animalId.ref.set(
          {
            class: className,
            family,
            kingdom,
            order,
            phylum,
            groupName: (scientificName.charAt(0) || '').toLowerCase(),
            type: animalType,
          },
          { merge: true },
        );
      }
    } catch (error) {
      console.log({ error: error.message.toString() });
    }

    try {
      const animalDetailRef = firestore().collection(animalInfoCollection);
      const snapshotDetail = await animalDetailRef
        .where('key', '==', key)
        .get();

      if (snapshotDetail.empty) {
        const insertDoc = await FirebasRepository.insertDoc(
          animalInfoCollection,
          animalDetail,
        );

        if (insertDoc) {
          console.log({ animalDetail: insertDoc.id });
        }
      } else {
        console.log('Item is exists');
      }
    } catch (error) {
      console.log({ error: error.message.toString() });
    }
  });
};
