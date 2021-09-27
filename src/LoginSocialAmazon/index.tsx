/* eslint-disable camelcase */
/**
 *
 * LoginSocialAmazon
 *
 */
import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react'
import { IResolveParams, objectType, TypeCrossFunction } from '../'

interface Props {
  scope?: string
  state?: string
  client_id: string
  className?: string
  redirect_uri?: string
  response_type?: string
  scope_data?: objectType
  children?: React.ReactNode
  onLoginStart?: () => void
  onLogoutSuccess?: () => void
  onReject: (reject: string | objectType) => void
  onResolve: ({ provider, data }: IResolveParams) => void
}

const JS_SRC = 'https://assets.loginwithamazon.com/sdk/na/login1.js'
const SCRIPT_ID = 'amazon-login'
const _window = window as any

export const LoginSocialAmazon = forwardRef(
  (
    {
      state = '',
      client_id,
      className,
      redirect_uri,
      scope = 'profile',
      scope_data = {
        profile: { essential: true }
      },
      response_type = 'token',
      children,
      onReject,
      onResolve,
      onLogoutSuccess,
      onLoginStart
    }: Props,
    ref: React.Ref<TypeCrossFunction>
  ) => {
    const [isLogged, setIsLogged] = useState(false)
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

    const getUserInfo = useCallback(
      async (res) => {
        fetch(`https://api.amazon.com/user/profile`, {
          headers: {
            Authorization: `Bearer ${res.access_token}`
          }
        })
          .then((data) => data.json())
          .then((data) => {
            onResolve({ provider: 'amazon', data: { ...data, ...res } })
          })
          .catch((err) => {
            onReject(err)
          })
          .finally(() => {
            setIsProcessing(false)
            setIsLogged(true)
          })
      },
      [onReject, onResolve]
    )

    const handleResponse = useCallback((res: objectType) => getUserInfo(res), [
      getUserInfo
    ])

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
          _window.amazon.Login.setClientId(client_id)
          setIsSdkLoaded(true)
        })
      }
    }, [checkIsExistsSDKScript, client_id, insertScriptGoogle])

    const onLogin = useCallback(() => {
      if (isProcessing || !isSdkLoaded) return
      setIsProcessing(true)
      if (!_window.amazon) {
        setIsProcessing(false)
        load()
        onReject("Google SDK isn't loaded!")
      } else {
        onLoginStart && onLoginStart()
        _window.amazon.Login.authorize(
          { scope, scope_data, response_type, redirect_uri, state },
          (res: objectType) => {
            if (res.error) handleError(res.error)
            else handleResponse(res)
          }
        )
      }
    }, [
      isProcessing,
      isSdkLoaded,
      load,
      onReject,
      onLoginStart,
      scope,
      scope_data,
      response_type,
      redirect_uri,
      state,
      handleError,
      handleResponse
    ])

    useImperativeHandle(ref, () => ({
      onLogout: () => {
        if (isLogged) {
          setIsLogged(false)
          _window.amazon.Login.logout()
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

export default memo(LoginSocialAmazon)
