import Api from '../Api';

export default class FuncionarioService extends Api {
  constructor() {
    super('/funcionarios');
  }
}
