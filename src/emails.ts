import client, {VERBS, RESOURCES} from './lib/client';
import {validatePresence} from './lib/validate';

interface EmailCreateFields {
  readonly included_tags?: string[];
  readonly excluded_tags?: string[];
  readonly subject: string;
  readonly body: string;
}

const REQUIRED_FIELDS = ['subject', 'body'];

interface EmailRecord extends EmailCreateFields {
  readonly id: string;
  readonly creation_date: string;
  readonly modification_date: string;
  readonly email_type?: string;
  readonly secondary_id?: number;
  readonly publish_date: string;
  readonly slug?: string;
}

type EmailList = EmailRecord[];

export async function list(page = 1): Promise<EmailList> {
  return client.request<EmailList>(VERBS.GET, RESOURCES.EMAILS, {
    query: {page}
  });
}

export async function create(fields: EmailCreateFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.emails.create() - body and subject are required'
  );

  return client.request<void>(VERBS.POST, RESOURCES.EMAILS, {payload: fields});
}

export async function get(id: string): Promise<EmailRecord> {
  return client.request<EmailRecord>(VERBS.GET, RESOURCES.EMAILS, {
    resourcePath: id
  });
}
