import app from './app';
import env from './env';
import { Server } from 'http';

let server: Server;

const main = async () => {
  server = app.listen(env.PORT, () =>
    console.log(`pure plus listening on http://localhost:${env.PORT}`),
  );

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed!');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
};

main();
