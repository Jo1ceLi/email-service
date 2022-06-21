import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import * as sgMail from '@sendgrid/mail';
import { SendEmailEvent } from './send-email-event.dto';

@Injectable()
export class AppService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async handleSendEmail(data: SendEmailEvent, context: RmqContext) {
    try {
      await sgMail.send({
        from: '',
        to: data.to,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      });
      const channel = context.getChannelRef();
      channel.ack(context.getMessage());
    } catch (error) {
      console.log(error);
      const channel = context.getChannelRef();
      channel.nack(context.getMessage());
    }
  }
}
