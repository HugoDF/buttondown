import client from './lib/client';
import ping from './ping';

export default {
  // Alias from client
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  ping
};
