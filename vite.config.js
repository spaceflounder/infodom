
import { resolve } from 'node:path';

export default {

  resolve: {
    alias: {
      '@infodom': resolve(__dirname, 'infodom'),
      '#root': resolve(__dirname)
    }
  }  

}
