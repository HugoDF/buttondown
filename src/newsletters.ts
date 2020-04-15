import client, {VERBS, RESOURCES} from './lib/client';
import {validateNonEmptyObject, validatePresence} from './lib/validate';

interface NewsletterEditableFields {
  readonly username: string;
  readonly name: string;
  readonly description: string;
}

const REQUIRED_FIELDS = ['username', 'name', 'description'];

interface NewsletterRecord extends NewsletterEditableFields {
  readonly creation_date: string;
  readonly api_key: string;
}

type NewsletterList = NewsletterRecord[];

export async function list(page = 1): Promise<NewsletterList> {
  return client.request<NewsletterList>(VERBS.GET, RESOURCES.NEWSLETTERS, {
    query: {page}
  });
}

export async function create(fields: NewsletterEditableFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.newsletters.create() - username, name and description are required'
  );
  return client.request<void>(VERBS.POST, RESOURCES.NEWSLETTERS, {
    payload: fields
  });
}

export async function get(id: string): Promise<NewsletterRecord> {
  if (!id) {
    throw new Error('buttondown.newsletters.get() - id is required')
  }
  return client.request<NewsletterRecord>(VERBS.GET, RESOURCES.NEWSLETTERS, {
    resourcePath: id
  });
}

export async function put(
  id: string,
  fields: NewsletterRecord
): Promise<NewsletterRecord> {
  if (!id) {
    throw new Error('buttondown.newsletters.put() - id is required')
  }
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.newsletters.put() - username, name and description are required'
  );
  return client.request<NewsletterRecord>(VERBS.PUT, RESOURCES.NEWSLETTERS, {
    resourcePath: id,
    payload: fields
  });
}

export async function patch(
  id: string,
  fields: Partial<NewsletterRecord>
): Promise<NewsletterRecord> {
  if (!id) {
    throw new Error('buttondown.newsletters.patch() - id is required')
  }
  validateNonEmptyObject(
    fields,
    "buttondown.newsletters.patch() - can't patch newsletter to {}"
  );
  return client.request<NewsletterRecord>(VERBS.PATCH, RESOURCES.NEWSLETTERS, {
    resourcePath: id,
    payload: fields
  });
}
