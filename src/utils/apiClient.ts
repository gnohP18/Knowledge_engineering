import { USER_TOKEN } from "~/constants/authentication";
import * as StatusCode from "~/constants/status-code";

const config = useRuntimeConfig();
const singletonEnforcer = Symbol();
const nuxtApp = useNuxtApp();

class ApiClient {
  private static inst: ApiClient;

  private client: any;
  private typeToken: string;
  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot initialize client single instance");
    }
    this.typeToken = USER_TOKEN;
    this.client = $fetch.create(this.makeClient());
  }

  static get instance(): ApiClient {
    if (this.inst) {
      return this.inst;
    }

    this.inst = new ApiClient(singletonEnforcer);

    return this.inst;
  }

  makeClient(): Object {
    const type = this.typeToken;
    return {
      baseURL: config.public.API_BASE_URL,
      headers: this.getHeaders(),
      async onRequest() {
        nuxtApp.callHook("page:loading:start");
      },
      async onResponse() {
        nuxtApp.callHook("page:loading:end");
      },
      async onResponseError({ response }) {
        if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
          console.log(`Log status code ${StatusCode.INTERNAL_SERVER_ERROR}`);
        } else if (response.status === StatusCode.NOT_FOUND) {
          navigateTo("/notfound");
        } else if (response.status === StatusCode.UNAUTHENTICATED) {
          console.log(`Log status code ${StatusCode.UNAUTHENTICATED}`);
          setToken(type, "");
          toastError("Error", response._data.message);
          // switch (type) {
          //   case USER_TOKEN:
          //     navigateTo(USER_LOGIN);
          //     break;
          //   case COMPANY_TOKEN:
          //     navigateTo(COMPANY_LOGIN);
          //     break;
          //   case ADMIN_TOKEN:
          //     navigateTo(ADMIN_LOGIN);
          //     break;
          //   default:
          //     break;
          // }
        } else if (
          [
            StatusCode.UNPROCESSABLE_CONTENT,
            StatusCode.BAD_REQUEST,
            StatusCode.FORBIDDEN,
          ].includes(response.status)
        ) {
          console.log(`Log status code ${response.status}`);
        }
      },
    };
  }

  getHeaders(): Object {
    const token = getToken(this.typeToken);
    let headers = {
      Accept: "application/json",
    };

    if (token) {
      headers = Object.assign(headers, { Authorization: `${token}` });
    }

    return headers;
  }

  get(
    url: string,
    params: Object = {},
    type: string = USER_TOKEN,
  ): Promise<any> {
    this.typeToken = type;

    return this.client(url, {
      method: "GET",
      query: params,
    });
  }

  post(
    url: string,
    data: Object = {},
    type: string = USER_TOKEN,
  ): Promise<any> {
    this.typeToken = type;

    return this.client(url, {
      method: "POST",
      body: data,
    });
  }

  put(url: string, data: Object = {}, type: string = USER_TOKEN): Promise<any> {
    this.typeToken = type;

    return this.client(url, {
      method: "PUT",
      body: data,
    });
  }

  patch(
    url: string,
    data: Object = {},
    type: string = USER_TOKEN,
  ): Promise<any> {
    this.typeToken = type;

    return this.client(url, {
      method: "PATCH",
      body: data,
    });
  }

  delete(
    url: string,
    data: Object = {},
    type: string = USER_TOKEN,
  ): Promise<any> {
    this.typeToken = type;

    return this.client(url, {
      method: "DELETE",
      body: data,
    });
  }
}

export const apiClient = ApiClient.instance;
