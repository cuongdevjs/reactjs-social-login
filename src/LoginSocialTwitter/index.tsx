/* eslint-disable camelcase */
/**
 *
 * LoginSocialGithub
 *
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { IResolveParams, objectType } from '..'
import {
  accessTokenSignature,
  parseOAuthRequestToken,
  requestTokenSignature
} from '../helper/signature'

interface Props {
  client_id: string
  client_secret: string
  className?: string
  redirect_uri: string
  // client_secret: string
  children?: React.ReactNode
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const TWITTER_URL: string = 'https://api.twitter.com/oauth'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialTwitter = memo(
  ({
    client_id,
    client_secret,
    className = '',
    redirect_uri,
    children,
    onReject,
    onResolve
  }: Props) => {
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

    const getAccessToken = useCallback(
      async (code: string) => {
        const authRes = code.split('&')
        const oauthSignature = accessTokenSignature({
          method: 'POST',
          apiUrl: `${TWITTER_URL}/access_token`,
          consumerKey: client_id,
          consumerSecret: client_secret,
          oauthToken: authRes[1],
          oauthVerifier: authRes[0]
        })
        const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_URL}/access_token`
        const data = await fetch(requestOAuthURL, {
          method: 'POST',
          headers: {
            Authorization: `OAuth ${oauthSignature}`
          }
        })
          .then((data) => data.text())
          .then((data) => parseOAuthRequestToken(data))
          .catch((err) => onReject(err))

        data && onResolve({ provider: 'twitter', data })
        setIsProcessing(false)
      },
      [client_id, client_secret, onResolve, onReject]
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
        const oauthSignature = requestTokenSignature({
          method: 'POST',
          apiUrl: `${TWITTER_URL}/request_token`,
          callbackUrl: redirect_uri,
          consumerKey: client_id,
          consumerSecret: client_secret
        })
        const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_URL}/request_token`
        const data = await fetch(requestOAuthURL, {
          method: 'POST',
          headers: {
            Authorization: `OAuth ${oauthSignature}`
          }
        })
          .then((data) => data.text())
          .catch((err) => onReject(err))

        if (data) {
          const result = parseOAuthRequestToken(data)

          window.addEventListener('storage', onChangeLocalStorage, false)
          const oauthUrl = `${TWITTER_URL}/authenticate?oauth_token=${result.oauth_token}`
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
      redirect_uri,
      client_id,
      client_secret,
      onReject,
      onChangeLocalStorage
    ])

    return (
      <div className={className} onClick={onLogin}>
        {children}
      </div>
    )
  }
)

export default LoginSocialTwitter
