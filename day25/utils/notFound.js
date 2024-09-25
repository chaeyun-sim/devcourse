export class NotFound {
  constructor(message) {
    this.message = message;
  }

  send(res) {
    res.status(404).json({
      message: this.message,
    });
  }
}
