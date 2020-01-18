import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App.js';
import template from '../template.js';

import seoConfig from '../config/seo.json';
console.log(seoConfig);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./assets'));

app.get('/*', (req, res) => {
  try{
    const app = ReactDOMServer.renderToString(<App />);
    return res.send(template({app, seoConfig}));
  }catch(e){
    console.error('Something went wrong:', e);
    return res.status(500).send('Oops server error, better luck next time!');
  }
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
  
  if (process.send) {
    process.send({ event:'online', url:'http://localhost:3000' });
  }
});