import client, {Client} from './lib/client';
import ping from './ping';
import * as drafts from './drafts';
import * as emails from './emails';
import * as images from './images';
import * as newsletters from './newsletters';
import * as scheduledEmails from './scheduled-emails';
import * as subscribers from './subscribers';
// Import * as tags from './tags';
// import * as unsubscribers from './unsubscribers';

export default {
  // Kinda just exporting for tests :shrug:
  Client,
  // Alias from client instance
  setApiKey(apiKey: string): void {
    return client.setApiKey(apiKey);
  },
  drafts,
  emails,
  images,
  newsletters,
  ping,
  scheduledEmails,
  subscribers
  // Tags,
  // unsubscribers
};
