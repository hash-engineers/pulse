const baseApi = process.env.NEXT_PUBLIC_MAIN_API as string;
const usersApi = '/users';
const userApi = '/user';
const companiesApi = '/companies';
const incidentsApi = '/incidents';
const monitorsApi = '/monitors';
const subscriptionsApi = '/subscriptions';

export const api = (() => {
  return {
    // User routes
    get users() {
      return {
        get user() {
          return {
            get route() {
              return baseApi + usersApi + userApi;
            },
          };
        },

        get route() {
          return baseApi + usersApi;
        },
      };
    },

    // Company routes
    get companies() {
      return {
        get route() {
          return baseApi + companiesApi;
        },
      };
    },

    // Monitor routes
    get monitors() {
      return {
        get route() {
          return baseApi + monitorsApi;
        },
      };
    },

    // Incident routes
    get incidents() {
      return {
        get route() {
          return baseApi + incidentsApi;
        },
      };
    },

    // Subscriptions routes
    get subscriptions() {
      return {
        get route() {
          return baseApi + subscriptionsApi;
        },
      };
    },
  };
})();

export const commonHeaders = { 'Content-Type': 'application/json' };
