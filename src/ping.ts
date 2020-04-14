/* eslint-disable @typescript-eslint/no-unsafe-return */
import client, {VERBS} from './lib/client';

export default async function ping() {
  return client.request(VERBS.GET, 'ping');
}
