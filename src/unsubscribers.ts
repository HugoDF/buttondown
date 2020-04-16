import client, {VERBS, RESOURCES} from './lib/client';
import {ViewSetResponse} from './lib/types';
import {SubscriberRecord} from './subscribers';

interface UnsubscriberRecord extends SubscriberRecord {
  readonly unsubscribe_reason: string;
  readonly unsubscribe_date: string;
}

type UnsubscriberList = UnsubscriberRecord[];

export async function list(page = 1): Promise<UnsubscriberList> {
  const {results} = await client.request<ViewSetResponse<UnsubscriberRecord>>(
    VERBS.GET,
    RESOURCES.UNSUBSCRIBERS,
    {
      query: {page}
    }
  );
  return results;
}

export async function get(id: string): Promise<UnsubscriberRecord> {
  if (!id) {
    throw new Error('buttondown.unsubscribers.get() - id is required');
  }

  return client.request<UnsubscriberRecord>(
    VERBS.GET,
    RESOURCES.UNSUBSCRIBERS,
    {
      resourcePath: id
    }
  );
}
