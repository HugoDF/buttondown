import client, {VERBS, RESOURCES} from './lib/client';
import {validateNonEmptyObject, validatePresence} from './lib/validate';
import {ViewSetResponse} from './lib/types';

interface TagFields {
  readonly color?: string;
  readonly name: string;
  readonly description?: string;
}

interface TagRecord extends TagFields {
  readonly creation_date: string;
  readonly id: string;
}

type TagList = TagRecord[];

const REQUIRED_FIELDS = ['name'];

export async function list(page = 1): Promise<TagList> {
  const {results} = await client.request<ViewSetResponse<TagRecord>>(
    VERBS.GET,
    RESOURCES.TAGS,
    {
      query: {
        page
      }
    }
  );
  return results;
}

export async function create(fields: TagFields): Promise<TagRecord> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.tags.create() - name is required'
  );
  return client.request<TagRecord>(VERBS.POST, RESOURCES.TAGS, {
    payload: fields
  });
}

export async function get(id: string): Promise<TagRecord> {
  if (!id) {
    throw new Error('buttondown.tags.get() - id is required');
  }

  return client.request<TagRecord>(VERBS.GET, RESOURCES.TAGS, {
    resourcePath: id
  });
}

export async function put(id: string, fields: TagFields): Promise<TagRecord> {
  if (!id) {
    throw new Error('buttondown.tags.put() - id is required');
  }

  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.tags.put() - name is required'
  );
  return client.request<TagRecord>(VERBS.PUT, RESOURCES.TAGS, {
    resourcePath: id,
    payload: fields
  });
}

export async function patch(
  id: string,
  fields: Partial<TagFields>
): Promise<TagRecord> {
  if (!id) {
    throw new Error('buttondown.tags.patch() - id is required');
  }

  validateNonEmptyObject(
    fields,
    "buttondown.tags.patch() - can't patch tag to {}"
  );
  return client.request<TagRecord>(VERBS.PATCH, RESOURCES.TAGS, {
    resourcePath: id,
    payload: fields
  });
}

export async function remove(
  id: string,
  filters: TagFields = {} as TagFields
): Promise<void> {
  if (!id) {
    throw new Error('buttondown.tags.remove() - id is required');
  }

  validatePresence(
    filters,
    REQUIRED_FIELDS,
    'buttondown.tags.remove() - name is required'
  );

  return client.request(VERBS.DELETE, RESOURCES.TAGS, {
    resourcePath: id,
    query: filters
  });
}
