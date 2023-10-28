import http from 'http';
import { AppDataSource } from './data-source';
import app from '@config/index';

const PORT = 38000;

const server = http.createServer({}, app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('Banco funcionando');
    })
    .catch(error => console.log(error));
  console.log('Servidor funcionando');
});
