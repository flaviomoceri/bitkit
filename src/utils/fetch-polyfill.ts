// Polyfill fetch text streaming
// NOTE: TextEncoder is polyfilled in shim.js

import { polyfill as polyfillFetch } from 'react-native-polyfill-globals/src/fetch';
import { polyfill as polyfillReadableStream } from 'react-native-polyfill-globals/src/readable-stream';

polyfillReadableStream();
polyfillFetch();
