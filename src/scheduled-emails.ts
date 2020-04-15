import client, {VERBS, RESOURCES} from './lib/client';
import {validatePresence} from './lib/validate';
import {ScheduledEmailCreateFields, EmailRecord, EmailList} from './lib/types';

const REQUIRED_FIELDS = ['subject', 'body', 'publish_date'];

export async function list(page = 1): Promise<EmailList> {
  return client.request<EmailList>(VERBS.GET, RESOURCES.SCHEDULED_EMAILS, {
    query: {page}
  });
}

export async function create(
  fields: ScheduledEmailCreateFields
): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.scheduled-emails.create() - body, subject and publish_date are required'
  );

  return client.request<void>(VERBS.POST, RESOURCES.SCHEDULED_EMAILS, {
    payload: fields
  });
}

export async function get(id: string): Promise<EmailRecord> {
  if (!id) {
    throw new Error('buttondown.scheduled-emails.get() - id is required');
  }

  return client.request<EmailRecord>(VERBS.GET, RESOURCES.SCHEDULED_EMAILS, {
    resourcePath: id
  });
}
