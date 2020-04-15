import client, {VERBS, RESOURCES} from './lib/client';
import {validatePresence} from './lib/validate';

interface ImageCreateFields {
  readonly image: string;
  readonly page?: number;
}

const REQUIRED_FIELDS = ['image'];

interface ImageRecord {
  readonly id: string;
  readonly creation_date: string;
  readonly image: string;
}

type ImageList = ImageRecord[];

export async function list(page = 1): Promise<ImageList> {
  return client.notImplemented<ImageList>(VERBS.GET, RESOURCES.IMAGES, {
    query: {page}
  });
}

export async function create(fields: ImageCreateFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.image.create() - image is required'
  );

  return client.notImplemented<void>(VERBS.POST, RESOURCES.IMAGES, {
    payload: fields
  });
}

export async function get(id: string): Promise<ImageRecord> {
  return client.notImplemented<ImageRecord>(VERBS.GET, RESOURCES.IMAGES, {
    resourcePath: id
  });
}
