/* eslint-disable camelcase */
/**
 *
 * LoginSocialMicrosoft
 *
 */
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { IResolveParams, objectType, TypeCrossFunction } from '../'

interface Props {
  scope?: string
  state?: string
  client_id: string
  className?: string
  redirect_uri: string
  response_type?: string
  response_mode?: string
  code_challenge?: string
  children?: React.ReactNode
  onLoginStart?: () => void
  onLogoutSuccess?: () => void
  onReject: (reject: string | objectType) => void
  code_challenge_method?: 'plain' | 's256'[]
  onResolve: ({ provider, data }: IResolveParams) => void
  tenant?: 'common' | 'organizations' | 'consumers'
  prompt?: 'login' | 'none' | 'consent' | 'select_account'
}

const MICROSOFT_URL = 'https://login.microsoftonline.com'
const MICROSOFT_API_URL = 'https://graph.microsoft.com'
// const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialMicrosoft = forwardRef(
  (
    {
      tenant = 'common',
      state = '',
      client_id,
      className,
      redirect_uri,
      scope = 'profile openid email',
      response_type = 'code',
      response_mode = 'query',
      children,
      code_challenge = '19cfc47c216dacba8ca23eeee817603e2ba34fe0976378662ba31688ed302fa9',
      code_challenge_method = 'plain',
      prompt = 'select_account',
      onLogoutSuccess,
      onLoginStart,
      onReject,
      onResolve
    }: Props,
    ref: React.Ref<TypeCrossFunction>
  ) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
      const popupWindowURL = new URL(window.location.href)
      const code = popupWindowURL.searchParams.get('code')
      const state = popupWindowURL.searchParams.get('state')
      if (state?.includes('_microsoft') && code) {
        localStorage.setItem('microsoft', code)
        window.close()
      }
    }, [])

    const getProfile = useCallback(
      (data) => {
        fetch(`${MICROSOFT_API_URL}/v1.0/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        })
          .then((res) => res.json())
          .then((res) => {
            setIsProcessing(false)
            setIsLogged(true)
            onResolve({ provider: 'microsoft', data: { ...res, ...data } })
          })
          .catch((err) => {
            setIsProcessing(false)
            onReject(err)
          })
      },
      [onReject, onResolve]
    )

    const getAccessToken = useCallback(
      (code: string) => {
        const params = {
          code,
          scope,
          client_id,
          redirect_uri,
          code_verifier: code_challenge,
          grant_type: 'authorization_code'
        }
        const headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        })
        fetch(`${MICROSOFT_URL}/${tenant}/oauth2/v2.0/token`, {
          method: 'POST',
          headers,
          body: new URLSearchParams(params)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) getProfile(data)
            else {
              setIsProcessing(false)
              onReject('no data')
            }
          })
          .catch((err) => {
            setIsProcessing(false)
            onReject(err)
          })
      },
      [
        scope,
        tenant,
        onReject,
        client_id,
        getProfile,
        redirect_uri,
        code_challenge
      ]
    )

    const handlePostMessage = useCallback(
      async ({ type, code, provider }) =>
        type === 'code' &&
        provider === 'microsoft' &&
        code &&
        getAccessToken(code),
      [getAccessToken]
    )

    const onChangeLocalStorage = useCallback(() => {
      window.removeEventListener('storage', onChangeLocalStorage, false)
      const code = localStorage.getItem('microsoft')
      if (code) {
        setIsProcessing(true)
        handlePostMessage({ provider: 'microsoft', type: 'code', code })
        localStorage.removeItem('microsoft')
      }
    }, [handlePostMessage])

    const onLogin = useCallback(() => {
      if (!isProcessing) {
        onLoginStart && onLoginStart()
        window.addEventListener('storage', onChangeLocalStorage, false)
        const oauthUrl = `${MICROSOFT_URL}/${tenant}/oauth2/v2.0/authorize?client_id=${client_id}
        &response_type=${response_type}
        &redirect_uri=${redirect_uri}
        &response_mode=${response_mode}
        &scope=${scope}
        &state=${state + '_microsoft'}
        &prompt=${prompt}
        &code_challenge=${code_challenge}
        &code_challenge_method=${code_challenge_method}`
        const width = 450
        const height = 730
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2
        window.open(
          oauthUrl,
          'Microsoft',
          'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
            width +
            ', height=' +
            height +
            ', top=' +
            top +
            ', left=' +
            left
        )
      }
    }, [
      isProcessing,
      onLoginStart,
      onChangeLocalStorage,
      tenant,
      client_id,
      response_type,
      redirect_uri,
      response_mode,
      scope,
      state,
      prompt,
      code_challenge,
      code_challenge_method
    ])

    useImperativeHandle(ref, () => ({
      onLogout: () => {
        if (isLogged) {
          setIsLogged(false)
          onLogoutSuccess && onLogoutSuccess()
        } else {
          console.log('You must login before logout.')
        }
      }
    }))

    return (
      <div className={className} onClick={onLogin}>
        {children}
      </div>
    )
  }
)

export default memo(LoginSocialMicrosoft)
