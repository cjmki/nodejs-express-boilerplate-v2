import EE from 'extendable-error-class';

export default class NotFoundError extends EE {
  constructor(m) {
    super(m);

    this.status = 404;
  }
}
