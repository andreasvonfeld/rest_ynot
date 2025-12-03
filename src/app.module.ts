import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { VenueModule } from './venue/venue.module';
import { ParticipantModule } from './participant/participant.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UserModule, GameModule, VenueModule, ParticipantModule, NotificationModule],         
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
