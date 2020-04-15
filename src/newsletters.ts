import client, {VERBS, RESOURCES} from './lib/client';
import {validateNonEmptyObj, validatePresence} from './lib/validate';

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
  return client.request<NewsletterList>(VERBS.GET, RESOURCES.DRAFTS, {
    query: {page}
  });
}

export async function create(fields: NewsletterEditableFields): Promise<void> {
  return client.request<void>(VERBS.POST, RESOURCES.DRAFTS, {payload: fields});
}

export async function get(id: string): Promise<NewsletterRecord> {
  return client.request<NewsletterRecord>(VERBS.GET, RESOURCES.DRAFTS, {
    resourcePath: id
  });
}

export async function put(
  id: string,
  fields: NewsletterRecord
): Promise<NewsletterRecord> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.newsletters.put() - username, name and description are required'
  );
  return client.request<NewsletterRecord>(VERBS.PUT, RESOURCES.DRAFTS, {
    resourcePath: id,
    payload: fields
  });
}

export async function patch(
  id: string,
  fields: Partial<NewsletterRecord>
): Promise<NewsletterRecord> {
  validateNonEmptyObj(
    fields,
    "buttondown.newsletters.patch() - can't set newsletter to {}"
  );
  return client.request<NewsletterRecord>(VERBS.PATCH, RESOURCES.DRAFTS, {
    resourcePath: id,
    payload: fields
  });
}
