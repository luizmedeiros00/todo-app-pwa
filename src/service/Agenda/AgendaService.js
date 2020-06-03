import Api from '../Api';

export default class AgendaService extends Api {
  constructor() {
    super('/agendas');
  }
}
