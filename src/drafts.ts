import client, {VERBS, RESOURCES} from './lib/client';
import {ViewSetResponse} from './lib/types';

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
  const {results} = await client.request<ViewSetResponse<DraftRecord>>(
    VERBS.GET,
    RESOURCES.DRAFTS,
    {
      query: {page}
    }
  );
  return results;
}

export async function create(fields: DraftEditableFields): Promise<void> {
  return client.request(VERBS.POST, RESOURCES.DRAFTS, {payload: fields});
}

export async function get(id: string): Promise<DraftRecord> {
  if (!id) {
    throw new Error('buttondown.drafts.get() - id is required');
  }

  return client.request<DraftRecord>(VERBS.GET, RESOURCES.DRAFTS, {
    resourcePath: id
  });
}
