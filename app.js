import express from 'express';

import * as  issuesRouter from './routes/issues.js';
import { getIssues } from './routes/issues.service.js';

const issuesService = () => {
  return Object.freeze({
    getIssues,
  });
};

const exposeIssuesService = async (req, res, next) => {
  req.service = issuesService();
  next();
};


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/issues', exposeIssuesService, issuesRouter.router);

app.use(function(req, res, next) {
  res.status(404).json({ error: 'Not found' });
  return;
});

app.listen(3000, () => {
  console.log('Server is started');
});
