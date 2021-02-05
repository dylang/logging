Bugs
* config.indent based on time size
* Use payload to separate data

Dynamic
* Switch progress api
  const progress = logging.progress();
  progress.percentage(10, message);
  progress.done();
  * BUG - progress doesn't show duration because last log message is previous % not start time

New Features
* way to show json on one line vs multiple
  logging.info({ ...logging.compact,  })
* set output stream to file
  createLog({ filename: '' })
* raw

Typing
* import createLog from 'logging';
* type concordance
* make sure we export correct Logging type - based on Abstract logging

Testing
* test log.trace, debug
