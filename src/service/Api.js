import queryString from 'querystring';
import { http } from './Http';
import { ResponseService } from './ResponseService';

export default class API {
  constructor(api) {
    this.api = api;
    this.http = http;
    this.queryString = queryString;
  }

  list = async () => {
    try {
      const response = await http.get(this.api);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'list');
    }
  }

  show = async ($id) => {
    try {
      const response = await http.get(`${this.api}/${$id}`);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'get', 'item');
    }
  }

  create = async ($data) => {
    try {
      const response = await http.post(this.api, $data);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'create');
    }
  }

  update = async ($data) => {
    try {
      const response = await http.put(`${this.api}/${$data.id}`, $data);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'update');
    }
  }

  remove = async ($id) => {
    try {
      const response = await http.delete(`${this.api}/${$id}`);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'remove');
    }
  }

  search = async (params = {}, page) => {
    const queryFilter = params ? `&${this.queryString.stringify(params)}` : '';
    const pagination = page || 1;
    try {
      const response = await http.get(`${this.api}/?page=${pagination}${queryFilter}`);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'get', 'item');
    }
  }

  createOrUpdate = async ($data) => {
    const method = $data.id ? 'put' : 'post';
    const id = $data.id ? `/${$data.id}` : '';
    const url = `${this.api}${id}`;
    try {
      const response = await http[method](url, $data);
      return response.data;
    } catch (error) {
      throw ResponseService(error, 'create');
    }
  }
}
