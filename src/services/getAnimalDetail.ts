/* import { baseA2ZAnimalUrl } from './../variables/common'; */
import { crawlApi } from './crawlApi';
import { parse } from 'node-html-parser';

const path = require('path');
const download = require('image-downloader');

export type BaseObject = {
  [key in string]: any;
};

export type AnimalDetail = {
  key: string;
  mainImage: string;
  blockQuote: string;
  classifications: BaseObject;
  conservationStatus: string[];
  location: string[];
  animalFacts: any;
  images: (string | null | undefined)[];
  detail: {
    classificationDetail: string;
    appearanceDetail: string;
    distributionAndHabitDetail: string;
    behaviorAndLifeStyleDetail: string;
    reproductionAndLifeCyclesDetail: string;
    dietAndPreyDetail: string;
    predatorsAndThreatsDetail: string;
    factsAndFeaturesDetail: string;
    relationshipWithHumansDetail: string;
    conservationStatusAndLifeTodayDetail: string;
  };
  summaryDetails: BaseObject;
};

export const camelCase = (str: string): string | null => {
  if (!str || !str.length) {
    return null;
  }
  return (str.slice(0, 1).toLowerCase() + str.slice(1))
    .replace(/([-_ ]){1,}/g, ' ')
    .split(/[-_ ]/)
    .reduce((cur, acc) => {
      return cur + acc[0].toUpperCase() + acc.substring(1);
    });
};

export const processImageLink = (url: string): string | null => {
  if (!url || !url.length) {
    return null;
  }
  const splitDots = url.split('.');
  const extension = splitDots.pop();

  const lastThing = splitDots.pop();

  if (!lastThing?.includes('-')) {
    return url;
  }
  const includeSize = lastThing?.split('-');

  const size = includeSize?.pop();

  if (!size?.includes('x')) {
    return url;
  }

  const processedUrl = [
    splitDots.join('.'),
    (includeSize || []).join('-'),
    extension,
  ].join('.');

  return processedUrl;
};

export const getAnimalDetail = async (animal: string) => {
  const config = {
    method: 'GET',
  };

  const onFailure = (error: any) => {
    console.log({ error });
  };

  const onSuccess = (res: any) => {
    const { data } = res;

    const root = parse(data);

    /* const mainImage = root.querySelector('.page-title-row'); */

    const blockQuote = root.querySelector('blockquote.blockquote p').innerText;

    const classification = root.querySelector('.animal-facts');

    const classificationGroup = classification ? classification.childNodes : [];

    /* const regExpBackgroundUrl = /\(([^)]+)\)/; */
    /* const backgroundUrl = regExpBackgroundUrl.exec(
      mainImage.getAttribute('style') || '',
    ); */

    const classifications: any = {};
    for (let i = 0; i < classificationGroup.length; i = i + 2) {
      const classKey = camelCase(classificationGroup[i].innerText);
      if (!classKey) {
        continue;
      }
      classifications[classKey] = classificationGroup[i + 1].innerText;
    }

    const conservationAndLocation = root
      .querySelectorAll('.animal-facts-box')[0]
      .querySelectorAll('.list-unstyled');

    let conservationStatus: string[] = [];
    let location: string[] = [];

    (conservationAndLocation || []).map((convOrLocation): any => {
      const preH2 = ((convOrLocation as unknown) as HTMLElement).parentNode?.querySelector(
        'h2',
      );

      if (!preH2) {
        return convOrLocation;
      }
      const h2Text = (preH2 as HTMLElement).innerText;
      if (h2Text.toLowerCase().includes('conservation')) {
        conservationStatus = convOrLocation.childNodes.map(
          ele => ((ele as unknown) as HTMLElement).innerText,
        );
      } else if (h2Text.toLowerCase().includes('location')) {
        location = convOrLocation.childNodes.map(
          ele => ((ele as unknown) as HTMLElement).innerText,
        );
      }
      return convOrLocation;
    });

    /* const conservationStatus =
      !conservationAndLocation ||
      !conservationAndLocation[0] ||
      !conservationAndLocation[0].childNodes ||
      !conservationAndLocation[0].childNodes[0] ||
      !conservationAndLocation[0].childNodes[0].childNodes ||
      !conservationAndLocation[0].childNodes[0].childNodes[0]
        ? ''
        : conservationAndLocation[0].childNodes[0].childNodes[0].innerText; */
    /* const location =
      !conservationAndLocation ||
      !conservationAndLocation[1] ||
      !conservationAndLocation[1].childNodes ||
      !conservationAndLocation[1].childNodes[0] ||
      !conservationAndLocation[1].childNodes[0].childNodes ||
      !conservationAndLocation[1].childNodes[0].childNodes[0]
        ? ''
        : conservationAndLocation[1].childNodes[0].childNodes[0].innerText; */

    const factBox = root.querySelectorAll('.animal-facts-box')[1];

    const factRows = factBox.querySelectorAll('div.row');

    factRows.push(factBox.querySelectorAll('.row')[3]);

    const animalFacts: any = {};

    const generateFacts = (factListElm: HTMLElement[]) => {
      for (let i = 0; i < factListElm.length; i = i + 2) {
        const keyElm = factListElm[i];
        const key = camelCase(keyElm.innerText);
        if (!key) {
          continue;
        }
        const valueElm = factListElm[i + 1];

        const listValueElm = valueElm.querySelector('ul');

        if (!listValueElm) {
          animalFacts[key] = valueElm.innerText;
        } else {
          animalFacts[key] = Array.from(listValueElm.childNodes).map(
            listElm => (listElm as HTMLElement).innerText,
          );
        }
      }
    };

    factRows.forEach(factRow => {
      generateFacts((factRow.childNodes as unknown) as HTMLElement[]);
    });

    const imageListElm = root.querySelectorAll('.animal-images-slider img');
    const images = imageListElm.map(imageElm => {
      const imageUrl = imageElm.getAttribute('data-lazy');
      const processedUrl = processImageLink(imageUrl || '');
      if (!processedUrl) {
        return null;
      }

      return processedUrl.split('/').pop();
    });

    const classificationDetail = root.querySelector(
      `#h-${animal}-classification-and-evolution`,
    )
      ? root.querySelector(`#h-${animal}-classification-and-evolution`)
          .nextSibling.innerText
      : '';

    const appearanceDetail = root.querySelector(
      `#h-${animal}-anatomy-and-appearance`,
    )
      ? root.querySelector(`#h-${animal}-anatomy-and-appearance`).nextSibling
          .innerText
      : '';

    const distributionAndHabitDetail = root.querySelector(
      `#h-${animal}-distribution-and-habitat`,
    )
      ? root.querySelector(`#h-${animal}-distribution-and-habitat`).nextSibling
          .innerText
      : '';

    const behaviorAndLifeStyleDetail = root.querySelector(
      `#h-${animal}-behaviour-and-lifestyle`,
    )
      ? root.querySelector(`#h-${animal}-behaviour-and-lifestyle`).nextSibling
          .innerText
      : '';

    const reproductionAndLifeCyclesDetail = root.querySelector(
      `#h-${animal}-reproduction-and-life-cycles`,
    )
      ? root.querySelector(`#h-${animal}-reproduction-and-life-cycles`)
          .nextSibling.innerText
      : '';

    const dietAndPreyDetail = root.querySelector(`#h-${animal}-diet-and-prey`)
      ? root.querySelector(`#h-${animal}-diet-and-prey`).nextSibling.innerText
      : '';

    const predatorsAndThreatsDetail = root.querySelector(
      `#h-${animal}-predators-and-threats`,
    )
      ? root.querySelector(`#h-${animal}-predators-and-threats`).nextSibling
          .innerText
      : '';

    const factsAndFeaturesDetail = root.querySelector(
      `#h-${animal}-interesting-facts-and-features`,
    )
      ? root.querySelector(`#h-${animal}-interesting-facts-and-features`)
          .nextSibling.innerText
      : '';

    const relationshipWithHumansDetail = root.querySelector(
      `#h-${animal}-relationship-with-humans`,
    )
      ? root.querySelector(`#h-${animal}-relationship-with-humans`).nextSibling
          .innerText
      : '';

    const conservationStatusAndLifeTodayDetail = root.querySelector(
      `#h-${animal}-conservation-status-and-life-today`,
    )
      ? root.querySelector(`#h-${animal}-conservation-status-and-life-today`)
          .nextSibling.innerText
      : '';

    const summaryDetailEles = root.querySelector('#single-animal-text')
      .childNodes;

    const summaryDetails = (
      ((summaryDetailEles as unknown) as HTMLElement[]) || []
    ).map((detailEle: HTMLElement): any => {
      const tag = (detailEle.tagName || '').toLowerCase();
      if (
        !tag.startsWith('p') &&
        !tag.startsWith('h') &&
        !tag.startsWith('ul')
      ) {
        return null;
      }

      if (
        detailEle.innerText.includes(
          'This post may contain affiliate links to our partners',
        )
      ) {
        return null;
      }

      const contents = !tag.startsWith('ul')
        ? detailEle.innerText
        : ((detailEle.childNodes as unknown) as HTMLElement[]).map(
            (ele: HTMLElement) => ele.innerText,
          );

      return {
        [tag]: contents,
      };
    });

    const animalDetail: AnimalDetail = {
      key: animal,
      mainImage: images && images[0] ? images[0] : '',
      blockQuote,
      classifications,
      conservationStatus,
      location,
      animalFacts,
      images,
      detail: {
        classificationDetail,
        appearanceDetail,
        distributionAndHabitDetail,
        behaviorAndLifeStyleDetail,
        reproductionAndLifeCyclesDetail,
        dietAndPreyDetail,
        predatorsAndThreatsDetail,
        factsAndFeaturesDetail,
        relationshipWithHumansDetail,
        conservationStatusAndLifeTodayDetail,
      },
      summaryDetails,
    };

    return animalDetail;
  };

  return crawlApi(animal + '/', config, undefined, onSuccess, onFailure);
};
