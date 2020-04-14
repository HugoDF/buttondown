import client, {Client} from './lib/client';
import ping from './ping';
import * as drafts from './drafts';
import * as emails from './emails';

export default {
  // @todo remove this
  client,
  // Kinda just exporting for tests :shrug:
  Client,
  // Alias from client instance
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  drafts,
  emails,
  ping
};
