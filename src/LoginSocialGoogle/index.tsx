/**
 *
 * LoginSocialGoogle
 *
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { IResolveParams, objectType } from 'types'

interface Props {
  scope?: string
  prompt?: string
  ux_mode?: string
  client_id: string
  className?: string
  login_hint?: string
  access_type?: string
  redirect_uri?: string
  cookie_policy?: string
  hosted_domain?: string
  discoveryDocs?: string
  children?: React.ReactNode
  fetch_basic_profile?: boolean
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const SCOPE = ''
const JS_SRC = 'https://apis.google.com/js/api.js'
const SCRIPT_ID = 'google-login'
const _window = window as any

export const LoginSocialGoogle = memo(
  ({
    client_id,
    scope = 'email profile',
    prompt = 'select_account',
    ux_mode,
    className = '',
    login_hint = '',
    access_type = 'online',
    onReject,
    onResolve,
    redirect_uri = '/',
    cookie_policy = 'single_host_origin',
    hosted_domain = '',
    discoveryDocs = '',
    children,
    fetch_basic_profile = true
  }: Props) => {
    const [isSdkLoaded, setIsSdkLoaded] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
      !isSdkLoaded && load()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSdkLoaded])

    const checkIsExistsSDKScript = useCallback(() => {
      return !!document.getElementById(SCRIPT_ID)
    }, [])

    const insertScriptGoogle = useCallback(
      (
        d: HTMLDocument,
        s: string = 'script',
        id: string,
        jsSrc: string,
        cb: () => void
      ) => {
        const ggScriptTag: any = d.createElement(s)
        ggScriptTag.id = id
        ggScriptTag.src = jsSrc
        ggScriptTag.async = true
        ggScriptTag.defer = true
        const scriptNode = document.getElementsByTagName('script')![0]
        scriptNode &&
          scriptNode.parentNode &&
          scriptNode.parentNode.insertBefore(ggScriptTag, scriptNode)
        ggScriptTag.onload = cb
      },
      []
    )

    const handleResponse = useCallback(
      (res: objectType) => {
        setIsProcessing(false)
        // const auth2 = _window.gapi.auth2.getAuthInstance();
        // var user = auth2.currentUser.get();
        // var auth = user.getAuthResponse();
        onResolve({ provider: 'google', data: res })
      },
      [onResolve]
    )

    const handleError = useCallback(
      (err: objectType | string) => {
        setIsProcessing(false)
        onReject(err)
      },
      [onReject]
    )

    const load = useCallback(() => {
      if (checkIsExistsSDKScript()) {
        setIsSdkLoaded(true)
      } else {
        insertScriptGoogle(document, 'script', SCRIPT_ID, JS_SRC, () => {
          const params = {
            client_id,
            cookie_policy,
            login_hint,
            hosted_domain,
            fetch_basic_profile,
            discoveryDocs,
            ux_mode,
            redirect_uri,
            access_type,
            scope: SCOPE,
            immediate: true
          }
          _window.gapi.load('auth2', () => {
            const gapiAuth = _window.gapi.auth2
            !gapiAuth.getAuthInstance()
              ? gapiAuth.init(params).then(() => {
                  setIsSdkLoaded(true)
                })
              : onReject('not exist an instance')
          })
        })
      }
    }, [
      ux_mode,
      onReject,
      client_id,
      login_hint,
      access_type,
      redirect_uri,
      discoveryDocs,
      cookie_policy,
      hosted_domain,
      insertScriptGoogle,
      fetch_basic_profile,
      checkIsExistsSDKScript
    ])

    const loginGoogle = useCallback(() => {
      if (isProcessing || !isSdkLoaded) return
      setIsProcessing(true)
      if (!_window.gapi) {
        setIsProcessing(false)
        load()
        onReject("Google SDK isn't loaded!")
      } else {
        const auth2 = _window.gapi.auth2.getAuthInstance()
        const options = {
          prompt,
          scope,
          ux_mode
        }
        // auth2.grantOfflineAccess(options).then((res: any) => {
        //   console.log(res);
        // });
        auth2.signIn(options).then(handleResponse).catch(handleError)
      }
    }, [
      load,
      scope,
      prompt,
      ux_mode,
      onReject,
      handleError,
      isSdkLoaded,
      isProcessing,
      handleResponse
    ])

    return (
      <div className={className} onClick={loginGoogle}>
        {children}
      </div>
    )
  }
)

export default LoginSocialGoogle
