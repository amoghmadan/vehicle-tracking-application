import yargs from 'yargs'

import { bootstrap, createsuperuser } from './cli';

yargs
  .strict()
  .command('runserver [port] [host]', 'Run server', (setup) => {
    setup
      .positional('port', {type: 'number', describe: 'Port', default: 8000})
      .positional('host', {type: 'string', describe: 'Host', default: '127.0.0.1'})
  }, async (args) => {
    await bootstrap(Number(args.port, String(args.host)));
  })
  .command('createsuperuser [email] [firstName] [lastName] [password]', 'Create admin user', (setup) => {
    setup
      .positional('email', {type: 'string', describe: 'Email'})
      .positional('firstName', {type: 'string', describe: 'First name'})
      .positional('lastName', {type: 'string', describe: 'Last name'})
      .positional('password', {type: 'string', describe: 'Password'})
  }, async (args) => {
    await createsuperuser(args.email, args.firstName, args.lastName, args.password);
  }).argv;
