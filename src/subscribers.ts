/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import client, {VERBS, RESOURCES} from './lib/client';
import {validateNonEmptyObject, validatePresence} from './lib/validate';

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

interface SubscriberRecord extends SubscriberCreateFields {
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
  return client.request<SubscriberList>(VERBS.GET, RESOURCES.SUBSCRIBERS, {
    query: {
      ...query,
      page
    }
  });
}

export async function create(fields: SubscriberCreateFields): Promise<void> {
  validatePresence(
    fields,
    REQUIRED_FIELDS,
    'buttondown.subscribers.create() - email is required'
  );
  return client.request<void>(VERBS.POST, RESOURCES.SUBSCRIBERS, {
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
