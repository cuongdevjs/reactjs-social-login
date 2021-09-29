/* eslint-disable camelcase */
/**
 *
 * LoginSocialGoogle
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
  onLoginStart?: () => void
  onLogoutSuccess?: () => void
  onLogoutFailure?: () => void
  onReject: (reject: string | objectType) => void
  fetch_basic_profile?: boolean
  onResolve: ({ provider, data }: IResolveParams) => void
}

const SCOPE = ''
const JS_SRC = 'https://apis.google.com/js/api.js'
const SCRIPT_ID = 'google-login'
const _window = window as any

const LoginSocialGoogle = forwardRef(
  (
    {
      client_id,
      scope = 'email profile',
      prompt = 'select_account',
      ux_mode,
      className = '',
      login_hint = '',
      access_type = 'online',
      onLogoutFailure,
      onLogoutSuccess,
      onLoginStart,
      onReject,
      onResolve,
      redirect_uri = '/',
      cookie_policy = 'single_host_origin',
      hosted_domain = '',
      discoveryDocs = '',
      children,
      fetch_basic_profile = true
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

    const handleResponse = useCallback(
      (res: objectType) => {
        setIsLogged(true)
        setIsProcessing(false)
        const data: objectType = {}
        Object.values(res)
          .filter((item) => typeof item === 'string' || item?.access_token)
          .forEach((item) => {
            typeof item === 'string'
              ? (data.provider_id = item)
              : Object.entries(item).map(
                  ([key, value]: any) => (data[key] = value)
                )
          })
        const auth2 = _window.gapi.auth2.getAuthInstance()
        if (auth2.isSignedIn.get()) {
          const profile = auth2.currentUser.get().getBasicProfile()
          data.id = profile.getId()
          data.name = profile.getName()
          data.firstName = profile.getGivenName()
          data.lastName = profile.getFamilyName()
          data.avatar = profile.getImageUrl()
          data.email = profile.getEmail()
        }
        onResolve({
          provider: 'google',
          data
        })
      },
      [onResolve]
    )

    const handleError = useCallback(
      (err: objectType | string) => {
        console.log('🚀 ~ file: index.tsx ~ line 129 ~ err', err)
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
        onLoginStart && onLoginStart()
        const auth2 = _window.gapi.auth2.getAuthInstance()
        const options = {
          prompt,
          scope,
          ux_mode
        }
        auth2.signIn(options).then(handleResponse).catch(handleError)
      }
    }, [
      isProcessing,
      isSdkLoaded,
      load,
      onReject,
      onLoginStart,
      prompt,
      scope,
      ux_mode,
      handleResponse,
      handleError
    ])

    useImperativeHandle(ref, () => ({
      onLogout: () => {
        if (isLogged) {
          setIsLogged(false)
          var auth2 = _window.gapi.auth2.getAuthInstance()
          auth2
            .signOut()
            .then(function () {
              onLogoutSuccess && onLogoutSuccess()
            })
            .catch((err: any) => {
              console.log(err)
              onLogoutFailure && onLogoutFailure()
            })
        } else {
          console.log('You must login before logout.')
        }
      }
    }))

    return (
      <div className={className} onClick={loginGoogle}>
        {children}
      </div>
    )
  }
)

export default memo(LoginSocialGoogle)
