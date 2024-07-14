import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from "./exceptions/HTTPError";
import ServiceConfig from "./config";
import CredentialError from "./exceptions/CredentialError";

export default class AuthnService {
  async basicLogin(username, password) {
    if (username === null || username.length === 0) throw new CredentialError("username is required");
    if (password === null || password.length === 0) throw new CredentialError("password is required");

    const response = await fetch(`${ServiceConfig.url}/api/authn/login/basic`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
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
    });

    return response;
  }

  async refreshToken(token) {
    const response = await fetch(`${ServiceConfig.url}/api/authn/login/refresh`, {
      method: 'POST',
      headers: {
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
    });

    return response;
  }
}