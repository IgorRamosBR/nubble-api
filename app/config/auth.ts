import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/User'),
      },
    },
    jwt: {
      driver: 'jwt',
      publicKey: '123',
      privateKey: '123',
      persistJwt: true,
      jwtDefaultExpire: '30s',
      refreshTokenDefaultExpire: '30m',
      tokenProvider: {
        driver: 'database',
        table: '123',
        type: 'jwt'
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/User'),
      }
    }
  },
}

export default authConfig
