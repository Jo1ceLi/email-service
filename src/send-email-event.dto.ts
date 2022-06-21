export class SendEmailEvent {
  constructor(
    public readonly userId: string,
    public readonly to: string,
    public readonly subject: string,
  ) {}
}
