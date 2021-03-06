import client, {VERBS, RESOURCES} from './lib/client';
import {validatePresence} from './lib/validate';
import {
  EmailCreateFields,
  EmailRecord,
  EmailList,
  ViewSetResponse
} from './lib/types';

const REQUIRED_FIELDS = ['subject', 'body'];

export async function list(page = 1): Promise<EmailList> {
  const {results} = await client.request<ViewSetResponse<EmailRecord>>(
    VERBS.GET,
    RESOURCES.EMAILS,
    {
      query: {page}
    }
  );
  return results;
}

export async function create(fields: EmailCreateFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.emails.create() - body and subject are required'
  );

  return client.request(VERBS.POST, RESOURCES.EMAILS, {payload: fields});
}

export async function get(id: string): Promise<EmailRecord> {
  if (!id) {
    throw new Error('buttondown.emails.get() - id is required');
  }

  return client.request<EmailRecord>(VERBS.GET, RESOURCES.EMAILS, {
    resourcePath: id
  });
}
