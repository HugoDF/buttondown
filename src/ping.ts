import client, {VERBS} from './lib/client';

type PingResponse = Record<string, unknown>;

export default async function ping() {
  return client.request<PingResponse>(VERBS.GET, 'ping');
}
