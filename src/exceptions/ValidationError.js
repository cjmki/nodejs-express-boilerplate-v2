import EE from 'extendable-error-class';

export default class ValidationError extends EE {
  constructor(m) {
    super(m);

    this.status = 400;
  }
}
