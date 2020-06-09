import Api from '../Api';

export default class CargoService extends Api {
  constructor() {
    super('/cargos');
  }
}
