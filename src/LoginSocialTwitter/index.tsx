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
import {
  profileSignature,
  accessTokenSignature,
  parseOAuthRequestToken,
  requestTokenSignature
} from '../helper/signature'

interface Props {
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

const TWITTER_URL: string = 'https://api.twitter.com'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialTwitter = forwardRef(
  (
    {
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
      const code = popupWindowURL.searchParams.get('oauth_verifier')
      const state = popupWindowURL.searchParams.get('oauth_token')
      if (state && code) {
        localStorage.setItem('twitter', `${code}&${state}`)
        window.close()
      }
    }, [])

    const getProfile = useCallback(
      (data) => {
        const oauthSignature = profileSignature({
          method: 'GET',
          apiUrl: `${TWITTER_URL}/1.1/account/verify_credentials.json`,
          consumerKey: client_id,
          consumerSecret: client_secret,
          oauthToken: data.oauth_token,
          oauthTokenSecret: data.oauth_token_secret
        })
        const url = `${PREVENT_CORS_URL}/${TWITTER_URL}/1.1/account/verify_credentials.json`
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `OAuth ${oauthSignature}`,
            'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
          }
        })
          .then((res) => res.json())
          .then((res) => {
            setIsLogged(true)
            onResolve({ provider: 'twitter', data: { ...data, ...res } })
            setIsProcessing(false)
          })
          .catch((err) => onReject(err))
      },
      [client_id, client_secret, onReject, onResolve]
    )

    const getAccessToken = useCallback(
      async (code: string) => {
        const authRes = code.split('&')
        const oauthSignature = accessTokenSignature({
          method: 'POST',
          apiUrl: `${TWITTER_URL}/oauth/access_token`,
          consumerKey: client_id,
          consumerSecret: client_secret,
          oauthToken: authRes[1],
          oauthVerifier: authRes[0]
        })
        const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_URL}/oauth/access_token`
        const data = await fetch(requestOAuthURL, {
          method: 'POST',
          headers: {
            Authorization: `OAuth ${oauthSignature}`,
            'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
          }
        })
          .then((data) => data.text())
          .then((data) => parseOAuthRequestToken(data))
          .catch((err) => onReject(err))

        data && getProfile(data)
      },
      [client_id, client_secret, getProfile, onReject]
    )

    const handlePostMessage = useCallback(
      async ({ type, code, provider }) =>
        type === 'code' &&
        provider === 'twitter' &&
        code &&
        getAccessToken(code),
      [getAccessToken]
    )

    const onChangeLocalStorage = useCallback(() => {
      window.removeEventListener('storage', onChangeLocalStorage, false)
      const code = localStorage.getItem('twitter')
      if (code) {
        setIsProcessing(true)
        handlePostMessage({ provider: 'twitter', type: 'code', code })
        localStorage.removeItem('twitter')
      }
    }, [handlePostMessage])

    const onLogin = useCallback(async () => {
      if (!isProcessing) {
        onLoginStart && onLoginStart()
        const oauthSignature = requestTokenSignature({
          method: 'POST',
          apiUrl: `${TWITTER_URL}/oauth/request_token`,
          callbackUrl: redirect_uri,
          consumerKey: client_id,
          consumerSecret: client_secret
        })
        const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_URL}/oauth/request_token`
        const data = await fetch(requestOAuthURL, {
          method: 'POST',
          headers: {
            Authorization: `OAuth ${oauthSignature}`,
            'x-cors-grida-api-key': '875c0462-6309-4ddf-9889-5227b1acc82c'
          }
        })
          .then((data) => data.text())
          .catch((err) => onReject(err))

        if (data) {
          const result = parseOAuthRequestToken(data)

          window.addEventListener('storage', onChangeLocalStorage, false)
          const oauthUrl = `${TWITTER_URL}/oauth/authenticate?oauth_token=${result.oauth_token}`
          const width = 450
          const height = 730
          const left = window.screen.width / 2 - width / 2
          const top = window.screen.height / 2 - height / 2
          window.open(
            oauthUrl,
            'twitter',
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
      }
    }, [
      isProcessing,
      onLoginStart,
      redirect_uri,
      client_id,
      client_secret,
      onReject,
      onChangeLocalStorage
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

export default memo(LoginSocialTwitter)
