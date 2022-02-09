/* eslint-disable camelcase */
/**
 *
 * LoginSocialInstagram
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
import { objectType, IResolveParams, TypeCrossFunction } from '../'

interface Props {
  scope?: string
  state?: string
  client_id: string
  className?: string
  client_secret: string
  redirect_uri: string
  response_type?: string
  children?: React.ReactNode
  onLogoutSuccess?: () => void
  onLoginStart?: () => void
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const INSTAGRAM_URL = 'https://api.instagram.com'
const INSTAGRAM_API_URL = 'https://graph.instagram.com/'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialInstagram = forwardRef(
  (
    {
      state = '',
      client_id,
      client_secret,
      className,
      redirect_uri,
      scope = 'user_profile,user_media',
      response_type = 'code',
      children,
      onLogoutSuccess,
      onReject,
      onResolve,
      onLoginStart
    }: Props,
    ref: React.Ref<TypeCrossFunction>
  ) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
      const popupWindowURL = new URL(window.location.href)
      const code = popupWindowURL.searchParams.get('code')
      const state = popupWindowURL.searchParams.get('state')
      if (state?.includes('_instagram') && code) {
        localStorage.setItem('instagram', code)
        window.close()
      }
    }, [])

    const getProfile = useCallback(
      (data) => {
        fetch(
          `${PREVENT_CORS_URL}/${INSTAGRAM_API_URL}/me?fields=id,username,account_type,media_count&access_token=${data.access_token}`,
          {
            method: 'GET',
            headers: {
              'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
            }
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setIsLogged(true)
            setIsProcessing(false)
            onResolve({ provider: 'instagram', data: { ...res, ...data } })
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
          grant_type: 'authorization_code',
          code,
          redirect_uri,
          client_id,
          client_secret
        }
        const headers = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
        })
        fetch(`${PREVENT_CORS_URL}/${INSTAGRAM_URL}/oauth/access_token`, {
          method: 'POST',
          headers,
          body: new URLSearchParams(params)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) getProfile(data)
            else onReject('no data')
          })
          .catch((err) => {
            onReject(err)
          })
          .finally(() => {
            setIsProcessing(false)
          })
      },
      [client_id, client_secret, getProfile, onReject, redirect_uri]
    )

    const handlePostMessage = useCallback(
      async ({ type, code, provider }) =>
        type === 'code' &&
        provider === 'instagram' &&
        code &&
        getAccessToken(code),
      [getAccessToken]
    )

    const onChangeLocalStorage = useCallback(() => {
      window.removeEventListener('storage', onChangeLocalStorage, false)
      const code = localStorage.getItem('instagram')
      if (code) {
        setIsProcessing(true)
        handlePostMessage({ provider: 'instagram', type: 'code', code })
        localStorage.removeItem('instagram')
      }
    }, [handlePostMessage])

    const onLogin = useCallback(() => {
      if (!isProcessing) {
        onLoginStart && onLoginStart()
        window.addEventListener('storage', onChangeLocalStorage, false)
        const oauthUrl = `${INSTAGRAM_URL}/oauth/authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&state=${
          state + '_instagram'
        }&redirect_uri=${redirect_uri}`
        const width = 450
        const height = 730
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2
        window.open(
          oauthUrl,
          'Instagram',
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
      response_type,
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

export default memo(LoginSocialInstagram)
