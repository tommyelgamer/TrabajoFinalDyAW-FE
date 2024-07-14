import ServiceConfig from "./config";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "./exceptions/HTTPError";

export default class MerchandiseService {
  async getAllMerchandise(token) {
    const data = await fetch(`${ServiceConfig.url}/api/merchandise`, {
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

    return data;
  }

  async getMerchandiseById(token, id) {
    const data = await fetch(`${ServiceConfig.url}/api/merchandise/${id}`, {
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

  async updateMerchandise(token, id, merch) {
    console.log({id, merch})

    const data = await fetch(`${ServiceConfig.url}/api/merchandise/${id}`, {
      method: 'PUT',
      body: JSON.stringify(merch),
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

  async createMerchandise(token, merch) {
    const data = await fetch(`${ServiceConfig.url}/api/merchandise`, {
      method: 'POST',
      body: JSON.stringify(merch),
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

  async deleteMerchandise(token, id) {
    const data = await fetch(`${ServiceConfig.url}/api/merchandise/${id}`, {
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