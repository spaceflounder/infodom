import { resolve } from 'node:path';

export default {

  resolve: {
    alias: {
      '@infodom': resolve(__dirname, 'infodom.ts'),
      '#root': resolve(__dirname)
    }
  },
  base: './'

}
