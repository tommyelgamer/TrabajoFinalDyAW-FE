import ServiceConfig from "./config";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "./exceptions/HTTPError";

export default class UserService {
  async getAllUser(token) {
    const data = await fetch(`${ServiceConfig.url}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) throw new UnauthorizedError('Unauthorized');
        if (res.status === 403) throw new ForbiddenError('Forbidden');
        throw new InternalServerError("InternalServerError");
      }

      return res.json();
    })

    console.log(data)
    return data;
  }

  async getUserById(token, id) {
    const data = await fetch(`${ServiceConfig.url}/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) throw new UnauthorizedError('Unauthorized');
        if (res.status === 403) throw new ForbiddenError('Forbidden');
        if (res.status === 404) throw new NotFoundError('NotFound');
        throw new InternalServerError("InternalServerError");
      }

      return res.json();
    })

    return data;
  }

  async updateUser(token, id, user) {
    console.log({id, user})

    const data = await fetch(`${ServiceConfig.url}/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 400) throw new BadRequestError('BadRequest');
        if (res.status === 401) throw new UnauthorizedError('Unauthorized');
        if (res.status === 403) throw new ForbiddenError('Forbidden');
        if (res.status === 404) throw new NotFoundError('NotFound');
        throw new InternalServerError("InternalServerError");
      }

      return res.json();
    })

    return data;
  }

  async createUser(token, user) {
    const data = await fetch(`${ServiceConfig.url}/api/user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 400) throw new BadRequestError('BadRequest');
        if (res.status === 401) throw new UnauthorizedError('Unauthorized');
        if (res.status === 403) throw new ForbiddenError('Forbidden');
        throw new InternalServerError("InternalServerError");
      }

      return res.json();
    })

    return data;
  }

  async deleteUser(token, id) {
    const data = await fetch(`${ServiceConfig.url}/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 400) throw new BadRequestError('BadRequest');
        if (res.status === 401) throw new UnauthorizedError('Unauthorized');
        if (res.status === 403) throw new ForbiddenError('Forbidden');
        if (res.status === 404) throw new NotFoundError('Forbidden');
        throw new InternalServerError("InternalServerError");
      }
    })

    return data;
  }
}