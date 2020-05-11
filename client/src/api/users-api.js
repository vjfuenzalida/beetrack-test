import axios from "axios";
import { parseLinkHeader } from '../helpers';

const source = axios.CancelToken.source();

const UsersAPI = {
  // Retrieve users applying pagination and search queries at the same time.
  async fetchUsers(payload, signal) {
    const url = "http://localhost:3000/api/users";
    const { page, limit, query } = payload;
    const params = { _page: page, _limit: limit };
    if (query && query !== '') {
      params.q = query;
    }
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const options = { params, cancelToken: source.token };
    try {
      const response = await axios.get(url, options);
      const { data, headers } = response;
      const pagination = parseLinkHeader(headers.link);
      return { data, pagination };
    } catch (err) {
      return err;
    }
  },
  // Creates a user by passing the required object data.
  async createUser(payload, signal) {
    const url = "http://localhost:3000/api/users";
    const { name, description, photo } = payload;
    const user = { name, description, photo };
    const headers = { "Content-Type": "application/json" };
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const options = { headers, cancelToken: source.token };
    try {
      const response = await axios.post(url, user, options);
      const { data } = response;
      return { data };
    } catch (err) {
      return err;
    }
  },
  // Retrieve a single user based on its id.
  async getUser(payload, signal) {
    const url = "http://localhost:3000/api/users";
    const { id } = payload;
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const options = { cancelToken: source.token };    
    try {
      const response = await axios.get(`${url}/${id}`, options);
      return response;
    } catch (err) {
      return err;
    }
  },
  // Destroys a user by its id.
  async deleteUser(payload, signal) {
    const url = "http://localhost:3000/api/users";
    const { id } = payload;
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const options = { cancelToken: source.token };    
    try {
      const response = await axios.delete(`${url}/${id}`, options);
      const { data } = response;      
      return { data };
    } catch (err) {
      return err;
    }
  },
};

export default UsersAPI;
