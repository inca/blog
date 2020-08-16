import { app } from './app';
import { createWebSocketServer } from './ws';
import { startWatch } from './watch';

const server = app.listen(5000);
createWebSocketServer(server);
startWatch();
