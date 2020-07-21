import { PubSub } from 'apollo-server-express';

export const sharedProviders = [
  {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  },
];
