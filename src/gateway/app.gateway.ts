import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway(3001, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server
  private logger: Logger = new Logger('MessageGateway')
  constructor() {}

  afterInit(server: any) {
    this.logger.log('Sever Socket Init')
  }

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'a client connected')
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'a client disconnected')
  }
}
