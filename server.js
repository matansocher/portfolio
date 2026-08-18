import { createServer } from 'node:http';
import sirv from 'sirv';
import { LINK_HEADER, isDocumentRequest } from './linkHeaders.js';

const port = Number(process.env.PORT) || 3000;

const serve = sirv('build', {
  single: true,
  setHeaders(res, pathname) {
    if (isDocumentRequest(pathname)) {
      res.setHeader('Link', LINK_HEADER);
    }
  },
});

createServer(serve).listen(port, () => {
  console.log(`> Serving build on http://localhost:${port}`);
});
