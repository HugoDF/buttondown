import client from './lib/client';
import ping from './ping';
import * as drafts from './drafts';

export default {
  // Alias from client
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  drafts,
  ping
};
