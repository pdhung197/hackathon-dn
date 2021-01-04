import { logger } from './../helpers/Logger';
import { firestore } from 'firebase';

export class FirebasRepository {
  static async insertDoc(collection: string, doc: any) {
    logger.info('Insert Document', `Insert document to ${collection}`);
    try {
      const insertedDoc = await firestore()
        .collection(collection)
        .add(doc);

      logger.success(
        'Insert Document',
        `Inserted ${insertedDoc.id} to ${collection}`,
      );
      return insertedDoc;
    } catch (error) {
      logger.error('Insert Document', error.message.toString());
    }
  }
}
