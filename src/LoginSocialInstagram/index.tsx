/**
 *
 * LoginSocialInstagram
 *
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { objectType, IResolveParams } from '../'

interface Props {
  scope?: string
  state?: string
  client_id: string
  className?: string
  client_secret: string
  redirect_uri: string
  response_type?: string
  children?: React.ReactNode
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const INSTAGRAM_URL = 'https://api.instagram.com'
const INSTAGRAM_API_URL = 'https://graph.instagram.com/'
const PREVENT_CORS_URL: string = 'https://cors-anywhere.herokuapp.com'

export const LoginSocialInstagram = memo(
  ({
    state = 'DCEeFWf45A53sdfKef424',
    client_id,
    client_secret,
    className,
    redirect_uri,
    scope = 'user_profile,user_media',
    response_type = 'code',
    children,
    onReject,
    onResolve
  }: Props) => {
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
      if (window.opener && window.opener !== window) {
        const popupWindowURL = new URL(window.location.href)
        const code = popupWindowURL.searchParams.get('code')
        window.opener.postMessage({ type: 'code', code: code }, '*')
        window.close()
      }
      window.addEventListener('message', handlePostMessage)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProfile = useCallback(
      (data) => {
        fetch(
          `${PREVENT_CORS_URL}/${INSTAGRAM_API_URL}/me?fields=id,username&access_token=${data.access_token}`,
          {
            method: 'GET'
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setIsProcessing(false)
            onResolve({ provider: 'linkedin', data: { ...res, ...data } })
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
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        fetch(`${PREVENT_CORS_URL}/${INSTAGRAM_URL}/oauth/access_token`, {
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
      [client_id, client_secret, getProfile, onReject, redirect_uri]
    )

    const handlePostMessage = useCallback(
      async (event: any) => {
        if (event.data.type === 'code') {
          window.removeEventListener('message', handlePostMessage)
          const { code } = event.data
          code && getAccessToken(code)
        }
      },
      [getAccessToken]
    )

    const onLogin = useCallback(() => {
      if (!isProcessing) {
        setIsProcessing(true)
        const oauthUrl = `${INSTAGRAM_URL}/oauth/authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&state=${state}&redirect_uri=${redirect_uri}`
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
    }, [isProcessing, client_id, redirect_uri, response_type, scope, state])

    return (
      <div className={className} onClick={onLogin}>
        {children}
      </div>
    )
  }
)

export default LoginSocialInstagram
