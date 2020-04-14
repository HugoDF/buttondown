import client from './lib/client';
import ping from './ping';

export const buttondown = {
  // Alias from client
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  ping
};

export default buttondown;
