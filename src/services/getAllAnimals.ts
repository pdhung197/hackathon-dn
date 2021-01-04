import { FirebasRepository } from './../firebase/FirebaseRepository';
import { setCORS } from 'google-translate-api-browser';
import { baseA2ZAnimalUrl } from './../variables/common';
import { crawlApi } from './crawlApi';
import { parse } from 'node-html-parser';
import { firestore } from 'firebase';

export type AnimalBase = {
  name: string;
  key: string;
  url: string;
};

export type AnimaBaseApbGroup = {
  [key in string]: AnimalBase[];
};

const translate = setCORS('http://localhost:8080/');

const insertAnimalDatas = async (docs: any[]) => {
  const collectionName = 'AnimalList';

  docs.map(async (doc: AnimalBase) => {
    const { key } = doc || {};
    if (!key) {
      return;
    }

    const citiesRef = firestore().collection(collectionName);
    const snapshot = await citiesRef.where('key', '==', key).get();

    if (snapshot.empty) {
      const insertDoc = await FirebasRepository.insertDoc(collectionName, doc);

      if (insertDoc) {
        console.log({ animal: insertDoc.id });
      }
    }
  });
};

export const getAllAnimals = async () => {
  const config = {
    method: 'GET',
  };

  const onFailure = (error: any) => {
    console.log({ error });
  };

  const onSuccess = (res: any) => {
    const { data } = res;

    const root = parse(data);
    const links = root.querySelectorAll(
      '.site-inner .list-unstyled .list-item a',
    );

    const animalLinks: AnimalBase[] = links.map((link: any) => {
      return {
        name: link.innerText,
        key: link
          .getAttribute('href')
          .replace(baseA2ZAnimalUrl, '')
          .replace('/', ''),
        url: link.getAttribute('href').replace(baseA2ZAnimalUrl, '?name='),
      };
    });

    // insertAnimalDatas(animalLinks);

    /* translate('Aldabra Giant Tortoise', { to: 'vi' })
      .then((resp: any) => {
        console.log(resp.text);
      })
      .catch(err => {
        console.error(err);
      }); */

    /* const fs = () => {
      firestore()
        .collection('AnimalList')
        .add({
          name: 'Tokyo',
          country: 'Japan',
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    };
    fs(); */

    return animalLinks;
  };

  return crawlApi('', config, undefined, onSuccess, onFailure);
};
