export const Environment = process.env.NODE_ENV || 'development';
export const IsDevMode = Object.is(Environment, 'development');
export const IsProdMode = Object.is(Environment, 'production');
export const IsTestMode = Object.is(Environment, 'test');

export default {
  Environment,
  IsDevMode,
  IsProdMode,
};
