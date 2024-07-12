import app from './app';
import { Server } from 'http';

let server: Server;

const main = async () => {
  server = app.listen(5000, () =>
    console.log(`pure plus listening on http://localhost:${5000}`),
  );

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('server closed');
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
