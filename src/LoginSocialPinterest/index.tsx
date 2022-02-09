/* eslint-disable camelcase */
/**
 *
 * LoginSocialGithub
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
import { IResolveParams, objectType, TypeCrossFunction } from '..'

interface Props {
  state?: string
  scope?: string
  client_id: string
  client_secret: string
  className?: string
  redirect_uri: string
  children?: React.ReactNode
  onLoginStart?: () => void
  onLogoutSuccess?: () => void
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const PINTEREST_URL: string = 'https://www.pinterest.com/oauth'
const PINTEREST_URL_API: string = 'https://api.pinterest.com/v5'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialPinterest = forwardRef(
  (
    {
      state = '',
      scope = '',
      client_id,
      client_secret,
      className = '',
      redirect_uri,
      children,
      onLoginStart,
      onLogoutSuccess,
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
      if (state?.includes('_pinterest') && code) {
        localStorage.setItem('pinterest', code)
        window.close()
      }
    }, [])

    const getProfile = useCallback(
      (data) => {
        fetch(`${PREVENT_CORS_URL}/${PINTEREST_URL_API}/user_account`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
          }
        })
          .then((res) => res.json())
          .then((res) => {
            setIsLogged(true)
            setIsProcessing(false)
            onResolve({ provider: 'pinterest', data: { ...data, ...res } })
          })
          .catch((err) => onReject(err))
      },
      [onReject, onResolve]
    )

    const getAccessToken = useCallback(
      async (code: string) => {
        var details = {
          code,
          redirect_uri,
          grant_type: `authorization_code`
        }
        var formBody: string | string[] = []
        for (var property in details) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(details[property])
          formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        const data = await fetch(
          `${PREVENT_CORS_URL}/${PINTEREST_URL_API}/oauth/token`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
            },
            body: formBody
          }
        )
          .then((data) => data.json())
          .catch((err) => onReject(err))

        getProfile(data)
      },
      [client_id, client_secret, getProfile, onReject, redirect_uri]
    )

    const handlePostMessage = useCallback(
      async ({ type, code, provider }) =>
        type === 'code' &&
        provider === 'pinterest' &&
        code &&
        getAccessToken(code),
      [getAccessToken]
    )

    const onChangeLocalStorage = useCallback(() => {
      window.removeEventListener('storage', onChangeLocalStorage, false)
      const code = localStorage.getItem('pinterest')
      if (code) {
        setIsProcessing(true)
        handlePostMessage({ provider: 'pinterest', type: 'code', code })
        localStorage.removeItem('pinterest')
      }
    }, [handlePostMessage])

    const onLogin = useCallback(() => {
      if (!isProcessing) {
        onLoginStart && onLoginStart()
        window.addEventListener('storage', onChangeLocalStorage, false)
        const oauthUrl = `${PINTEREST_URL}/?client_id=${client_id}&scope=${scope}&state=${
          state + '_pinterest'
        }&redirect_uri=${redirect_uri}&response_type=code&scope=boards:read,pins:read,user_accounts:read`
        const width = 450
        const height = 730
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2
        window.open(
          oauthUrl,
          'Pinterest',
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
      client_id,
      scope,
      state,
      redirect_uri
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

export default memo(LoginSocialPinterest)
