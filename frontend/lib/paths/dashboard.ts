const basePath = '/dashboard';
const companiesPath = '/companies';
const createCompanyPath = '/create-company';
const monitorsPath = '/monitors';
const createMonitorPath = '/create-monitor';

export const dashboard = (() => {
  return {
    // Companies path
    get companies() {
      return {
        get createCompany() {
          return {
            get path() {
              return basePath + companiesPath + createCompanyPath;
            },
          };
        },
        get path() {
          return basePath + companiesPath;
        },
      };
    },

    // Monitors path
    get monitors() {
      return {
        get createMonitor() {
          return {
            get path() {
              return basePath + monitorsPath + createMonitorPath;
            },
          };
        },

        get path() {
          return basePath + monitorsPath;
        },
      };
    },

    // Dashboard root
    get path() {
      return basePath;
    },
  };
})();
