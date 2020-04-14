import client, {Client} from './lib/client';
import ping from './ping';
import * as drafts from './drafts';

export default {
  // Kinda just exporting for tests :shrug:
  Client,
  // Alias from client instance
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  drafts,
  ping
};
