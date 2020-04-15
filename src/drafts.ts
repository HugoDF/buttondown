import client, {VERBS, RESOURCES} from './lib/client';

interface DraftEditableFields {
  readonly subject?: string;
  readonly body?: string;
}

interface DraftRecord extends DraftEditableFields {
  readonly id: string;
  readonly creation_date: string;
  readonly modification_date: string;
}

type DraftList = DraftRecord[];

export async function list(page = 1): Promise<DraftList> {
  return client.request<DraftList>(VERBS.GET, RESOURCES.DRAFTS, {
    query: {page}
  });
}

export async function create(fields: DraftEditableFields): Promise<void> {
  return client.request<void>(VERBS.POST, RESOURCES.DRAFTS, {payload: fields});
}

export async function get(id: string): Promise<DraftRecord> {
  if (!id) {
    throw new Error('buttondown.drafts.get() - id is required');
  }

  return client.request<DraftRecord>(VERBS.GET, RESOURCES.DRAFTS, {
    resourcePath: id
  });
}
