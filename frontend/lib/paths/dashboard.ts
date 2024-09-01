const basePath = '/dashboard';
const companiesPath = '/companies';
const createCompanyPath = '/create-company';
const monitorsPath = '/monitors';
const createMonitorPath = '/create-monitor';

export const dashboard = (() => {
  return {
    get companies() {
      return {
        createCompany: basePath + companiesPath + createCompanyPath,

        get path() {
          return basePath + companiesPath;
        },
      };
    },

    get monitors() {
      return {
        createCompany: basePath + monitorsPath + createMonitorPath,

        get path() {
          return basePath + monitorsPath;
        },
      };
    },

    get path() {
      return basePath;
    },
  };
})();
