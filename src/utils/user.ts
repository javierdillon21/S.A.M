import { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useQuery } from 'urql'
import { CognitoUserCustom } from '../data'

/**
 * fecthing the current user if it exist, if it isn't,
 * we will be redirected to the login page.
 * */
export function useUser(): [CognitoUserCustom | undefined, boolean, Function] {
  const [user, setUser] = useState<CognitoUserCustom>()
  const [loading, setLoading] = useState(true)

  async function getCurrentAuth() {
    setLoading(true)
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        console.error('Error retrieving the current user:', e)
      })
  }
  useEffect(() => {
    getCurrentAuth()
  }, [])

  return [user, loading, getCurrentAuth]
}
export type LoginState =
  | 'UNDEFINED'
  | 'NEW_PASSWORD_REQUIRED'
  | 'MFA_SETUP'
  | 'SOFTWARE_TOKEN_MFA'
  | 'SUCCESS'

