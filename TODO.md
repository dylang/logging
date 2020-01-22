* createLog('title') support => createLog({ label: 'foobar' })
* import createLog from 'logging';
* way to show json on one line vs mulitple
  logging.info({ ...logging.compact,  })
* set output stream to file
  createLog({ filename: '' })
* test log.trace, debug
* make sure we export correct Logging type - based on Abstract logging
* Switch progress api
  const progress = logging.progress();
  progress.percentage(10, message);
  progress.done();
