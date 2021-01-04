/**
 *
 * LoginSocialLinkedin
 *
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { IResolveParams, objectType } from '../'

interface Props {
  state?: string
  scope?: string
  client_id: string
  className?: string
  redirect_uri: string
  // client_secret: string
  response_type?: string
  children?: React.ReactNode
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const LINKEDIN_URL: string = 'https://www.linkedin.com'
// const LINKEDIN_API_URL: string = 'https://api.linkedin.com'
// const PREVENT_CORS_URL: string = 'https://cors-anywhere.herokuapp.com'

export const LoginSocialLinkedin = memo(
  ({
    state = 'DCEeFWf45A53sdfKef424',
    scope = 'r_liteprofile',
    client_id,
    // client_secret,
    className = '',
    redirect_uri,
    response_type = 'code',
    children,
    // onReject,
    onResolve
  }: Props) => {
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
      const popupWindowURL = new URL(window.location.href)
      const code = popupWindowURL.searchParams.get('code')
      const state = popupWindowURL.searchParams.get('state')
      if (state?.includes('_linkedin') && code) {
        localStorage.setItem('linkedin', code)
        window.close()
      }
    }, [])

    const onChangeLocalStorage = useCallback(() => {
      window.removeEventListener('storage', onChangeLocalStorage, false)
      const code = localStorage.getItem('linkedin')
      if (code) {
        setIsProcessing(true)
        handlePostMessage({ provider: 'linkedin', type: 'code', code })
        localStorage.removeItem('linkedin')
      }
    }, [])

    // const getProfile = useCallback(
    //   (data) => {
    //     fetch(`${PREVENT_CORS_URL}/${LINKEDIN_API_URL}/v2/me`, {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer ${data.access_token}`
    //       }
    //     })
    //       .then((res) => res.json())
    //       .then((res) => {
    //         setIsProcessing(false)
    //         onResolve({ provider: 'linkedin', data: { ...res, ...data } })
    //       })
    //       .catch((err) => {
    //         setIsProcessing(false)
    //         onReject(err)
    //       })
    //   },
    //   [onReject, onResolve]
    // )

    const getAccessToken = useCallback(
      (code: string) => {
        setIsProcessing(false)
        onResolve({ provider: 'linkedin', data: { code } })
        // const params = {
        //   grant_type: 'authorization_code',
        //   code,
        //   redirect_uri,
        //   client_id,
        //   client_secret
        // }
        // const headers = new Headers({
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // })
        // fetch(`${PREVENT_CORS_URL}/${LINKEDIN_URL}/oauth/v2/accessToken`, {
        //   method: 'POST',
        //   headers,
        //   body: new URLSearchParams(params)
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setIsProcessing(false)
        //     if (data.access_token) onResolve({ provider: 'linkedin', data })
        //     else onReject('no data')
        //   })
        //   .catch((err) => {
        //     setIsProcessing(false)
        //     onReject(err)
        //   })
      },
      [onResolve]
    )

    const handlePostMessage = useCallback(
      async ({ type, code, provider }) =>
        type === 'code' &&
        provider === 'linkedin' &&
        code &&
        getAccessToken(code),
      [getAccessToken]
    )

    const onLogin = useCallback(() => {
      if (!isProcessing) {
        window.addEventListener('storage', onChangeLocalStorage, false)
        const oauthUrl = `${LINKEDIN_URL}/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&scope=${scope}&state=${
          state + '_linkedin'
        }&redirect_uri=${redirect_uri}`
        const width = 450
        const height = 730
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2
        window.open(
          oauthUrl,
          'Linkedin',
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

export default LoginSocialLinkedin
