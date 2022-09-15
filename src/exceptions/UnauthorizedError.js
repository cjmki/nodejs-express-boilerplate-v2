import EE from 'extendable-error-class';

export default class UnauthorizedError extends EE {
  constructor(m) {
    super(m);

    this.status = 401;
  }
}
