import path from 'path';
import type {Plugin} from '@docusaurus/types';

export default function plugin(): Plugin {
  return {
    name: 'test-plugin',
    getThemePath() {
      return path.resolve(__dirname, '..', 'lib', 'theme');
    },
    getTypeScriptThemePath() {
      return path.resolve(__dirname, '..', 'src', 'theme');
    },
    async contentLoaded() {
      console.log('Loaded!');
    }
  };
}
