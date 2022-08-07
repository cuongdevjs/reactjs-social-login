/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 *
 * LoginSocialGithub
 *
 */
import { PASS_CORS_KEY } from 'helper/constants'
import React, { memo, useCallback, useEffect } from 'react'
import { IResolveParams, objectType } from '..'

interface Props {
  client_id: string
  className?: string
  redirect_uri: string
  fields?: string
  children?: React.ReactNode
  onLoginStart?: () => void
  onLogoutSuccess?: () => void
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const TWITTER_URL: string = 'https://twitter.com'
const TWITTER_API_URL: string = 'https://api.twitter.com'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialTwitter = ({
  client_id,
  className = '',
  redirect_uri,
  children,
  fields = 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
  onLoginStart,
  onReject,
  onResolve
}: Props) => {
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href)
    const code = popupWindowURL.searchParams.get('code')
    const state = popupWindowURL.searchParams.get('state')
    if (state && code) {
      localStorage.setItem('twitter', `${code}`)
      window.close()
    }
  }, [])

  const getProfile = useCallback(
    (data: objectType) => {
      const url = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/users/me?user.fields=${fields}`
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'x-cors-grida-api-key': PASS_CORS_KEY
        }
      })
        .then((res) => res.json())
        .then((res) => {
          onResolve({ provider: 'twitter', data: { ...data, ...res.data } })
        })
        .catch((err) => onReject(err))
    },
    [fields, onReject, onResolve]
  )

  const getAccessToken = useCallback(
    async (code: string) => {
      var details = new URLSearchParams({
        code,
        redirect_uri,
        client_id,
        grant_type: `authorization_code`,
        code_verifier: 'challenge'
      })

      const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/oauth2/token`
      const data = await fetch(requestOAuthURL, {
        method: 'POST',
        body: details,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-cors-grida-api-key': PASS_CORS_KEY
        }
      })
        .then((data) => data.json())
        .catch((err) => onReject(err))

      data && getProfile(data)
    },
    [client_id, getProfile, onReject, redirect_uri]
  )

  const handlePostMessage = useCallback(
    async ({ type, code, provider }: objectType) =>
      type === 'code' && provider === 'twitter' && code && getAccessToken(code),
    [getAccessToken]
  )

  const onChangeLocalStorage = useCallback(() => {
    window.removeEventListener('storage', onChangeLocalStorage, false)
    const code = localStorage.getItem('twitter')
    if (code) {
      handlePostMessage({ provider: 'twitter', type: 'code', code })
      localStorage.removeItem('twitter')
    }
  }, [handlePostMessage])

  const onLogin = useCallback(async () => {
    onLoginStart && onLoginStart()
    window.addEventListener('storage', onChangeLocalStorage, false)
    const oauthUrl = `${TWITTER_URL}/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=users.read%20tweet.read&state=state&code_challenge=challenge&code_challenge_method=plain`
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
  }, [onLoginStart, redirect_uri, client_id, onChangeLocalStorage])

  return (
    <div className={className} onClick={onLogin}>
      {children}
    </div>
  )
}

export default memo(LoginSocialTwitter)
