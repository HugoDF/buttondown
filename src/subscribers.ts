import client, {VERBS, RESOURCES} from './lib/client';
import {validateNonEmptyObject, validatePresence} from './lib/validate';
import {ViewSetResponse} from './lib/types';

interface SubscriberCreateFields {
  readonly email: string;
  readonly notes: string;
  readonly referrer_url: string;
  readonly tags: string[];
}

type SubscriberType = 'regular' | 'unactivated' | 'unpaid' | 'removed';

interface SubscriberQueryFilters {
  readonly type?: SubscriberType;
  readonly email?: string;
  readonly tag?: string;
}

interface SubscribersDeleteQueryFilters extends SubscriberQueryFilters {
  readonly notes?: string;
  readonly tags?: string[];
  readonly referrer_url?: string;
}

export interface SubscriberRecord extends SubscriberCreateFields {
  readonly creation_date: string;
  readonly id: string;
  readonly metadata?: Record<any, any>;
  readonly secondary_id: number;
  readonly subscriber_type: SubscriberType;
  readonly source: string;
  readonly tags: string[];
  readonly utm_campaign: string;
  readonly utm_medium: string;
  readonly utm_source: string;
}

type SubscriberList = SubscriberRecord[];

const REQUIRED_FIELDS = ['email'];

export async function list(
  page = 1,
  query: SubscriberQueryFilters = {}
): Promise<SubscriberList> {
  const {results} = await client.request<ViewSetResponse<SubscriberRecord>>(
    VERBS.GET,
    RESOURCES.SUBSCRIBERS,
    {
      query: {
        ...query,
        page
      }
    }
  );
  return results;
}

export async function create(fields: SubscriberCreateFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.subscribers.create() - email is required'
  );
  return client.request(VERBS.POST, RESOURCES.SUBSCRIBERS, {
    payload: fields
  });
}

export async function get(id: string): Promise<SubscriberRecord> {
  if (!id) {
    throw new Error('buttondown.subscribers.get() - id is required');
  }

  return client.request<SubscriberRecord>(VERBS.GET, RESOURCES.SUBSCRIBERS, {
    resourcePath: id
  });
}

export async function put(
  id: string,
  fields: SubscriberRecord
): Promise<SubscriberRecord> {
  if (!id) {
    throw new Error('buttondown.subscribers.put() - id is required');
  }

  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.subscribers.put() - email is required'
  );
  return client.request<SubscriberRecord>(VERBS.PUT, RESOURCES.SUBSCRIBERS, {
    resourcePath: id,
    payload: fields
  });
}

export async function patch(
  id: string,
  fields: Partial<SubscriberRecord>
): Promise<SubscriberRecord> {
  if (!id) {
    throw new Error('buttondown.subscribers.patch() - id is required');
  }

  validateNonEmptyObject(
    fields,
    "buttondown.subscribers.patch() - can't patch subscriber to {}"
  );
  return client.request<SubscriberRecord>(VERBS.PATCH, RESOURCES.SUBSCRIBERS, {
    resourcePath: id,
    payload: fields
  });
}

export async function remove(
  id: string,
  filters: SubscribersDeleteQueryFilters = {}
): Promise<void> {
  if (!id) {
    throw new Error('buttondown.subscribers.remove() - id is required');
  }

  validatePresence(
    filters,
    REQUIRED_FIELDS,
    'buttondown.subscribers.remove() - email is required'
  );

  const query: Record<string, any> = {...filters};
  // Tags are expected as comma separated
  if (filters.tags) {
    query.tags = filters.tags.join(',');
  }

  return client.request(VERBS.DELETE, RESOURCES.SUBSCRIBERS, {
    resourcePath: id,
    query
  });
}
