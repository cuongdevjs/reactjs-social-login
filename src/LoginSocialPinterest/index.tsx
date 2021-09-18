/* eslint-disable camelcase */
/**
 *
 * LoginSocialGithub
 *
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { IResolveParams, objectType } from '..'

interface Props {
  state?: string
  scope?: string
  client_id: string
  client_secret: string
  className?: string
  redirect_uri: string
  // client_secret: string
  children?: React.ReactNode
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const PINTEREST_URL: string = 'https://www.pinterest.com/oauth'
const PINTEREST_URL_API: string = 'https://api.pinterest.com/v5/oauth'
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc'

export const LoginSocialPinterest = memo(
  ({
    state = '',
    scope = '',
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
      const code = popupWindowURL.searchParams.get('code')
      const state = popupWindowURL.searchParams.get('state')
      if (state?.includes('_pinterest') && code) {
        localStorage.setItem('pinterest', code)
        window.close()
      }
    }, [])

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
          `${PREVENT_CORS_URL}/${PINTEREST_URL_API}/token`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          }
        )
          .then((data) => data.json())
          .catch((err) => onReject(err))

        setIsProcessing(false)
        onResolve({ provider: 'pinterest', data })
      },
      [client_id, client_secret, onReject, onResolve, redirect_uri]
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
      onChangeLocalStorage,
      client_id,
      scope,
      state,
      redirect_uri
    ])

    return (
      <div className={className} onClick={onLogin}>
        {children}
      </div>
    )
  }
)

export default LoginSocialPinterest
