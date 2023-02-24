const config = {
    baseURL: process.env['REACT_APP_BASE_URL'] || '',
    env: process.env['REACT_APP_ENV'] || 'dev'
} as const;

export default config;
