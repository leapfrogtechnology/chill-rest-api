export default {
  logging: {
    level: 'info',
    logDir: 'logs',
    jsonFormat: false,
    levelColumnWidth: 7,
    tsFormat: () => new Date().toISOString(),
    dateFormat: 'yyyy-MM-dd'
  }
};
