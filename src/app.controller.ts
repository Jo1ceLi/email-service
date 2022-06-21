import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SendEmailEvent } from './send-email-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send_email')
  async sendEmail(@Payload() data: SendEmailEvent, @Ctx() context: RmqContext) {
    console.log(data.to);
    console.log(context.getPattern());
    return this.appService.handleSendEmail(data, context);
  }
}
