/* eslint-disable camelcase */
/**
 *
 * LoginSocialGoogle
 *
 */
import { PASS_CORS_KEY } from 'helper/constants';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { objectType, IResolveParams } from '../';

interface Props {
  scope?: string;
  prompt?: string;
  ux_mode?: string;
  client_id: string;
  className?: string;
  login_hint?: string;
  access_type?: string;
  redirect_uri?: string;
  cookie_policy?: string;
  hosted_domain?: string;
  discoveryDocs?: string;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  isOnlyGetToken?: boolean;
  onReject: (reject: string | objectType) => void;
  fetch_basic_profile?: boolean;
  onResolve: ({ provider, data }: IResolveParams) => void;
}

// const SCOPE = ''
// const JS_SRC = 'https://apis.google.com/js/api.js'
const JS_SRC = 'https://accounts.google.com/gsi/client';
const SCRIPT_ID = 'google-login';
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc';
const _window = window as any;

const LoginSocialGoogle = ({
  client_id,
  scope = 'https://www.googleapis.com/auth/userinfo.profile',
  prompt = 'select_account',
  ux_mode,
  className = '',
  login_hint = '',
  access_type = 'online',
  onLoginStart,
  onReject,
  onResolve,
  redirect_uri = '/',
  isOnlyGetToken = false,
  cookie_policy = 'single_host_origin',
  hosted_domain = '',
  discoveryDocs = '',
  children,
  fetch_basic_profile = true,
}: Props) => {
  const scriptNodeRef = useRef<HTMLScriptElement>(null!);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [instance, setInstance] = useState<any>(null!);

  useEffect(() => {
    !isSdkLoaded && load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSdkLoaded]);

  useEffect(
    () => () => {
      if (scriptNodeRef.current) scriptNodeRef.current.remove();
    },
    [],
  );

  const checkIsExistsSDKScript = useCallback(() => {
    return !!document.getElementById(SCRIPT_ID);
  }, []);

  const insertScriptGoogle = useCallback(
    (
      d: HTMLDocument,
      s: string = 'script',
      id: string,
      jsSrc: string,
      cb: () => void,
    ) => {
      const ggScriptTag: any = d.createElement(s);
      ggScriptTag.id = id;
      ggScriptTag.src = jsSrc;
      ggScriptTag.async = true;
      ggScriptTag.defer = true;
      const scriptNode = document.getElementsByTagName('script')![0];
      scriptNodeRef.current = ggScriptTag;
      scriptNode &&
        scriptNode.parentNode &&
        scriptNode.parentNode.insertBefore(ggScriptTag, scriptNode);
      ggScriptTag.onload = cb;
    },
    [],
  );

  const onGetMe = useCallback((res: objectType) => {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-cors-grida-api-key': PASS_CORS_KEY,
      Authorization: 'Bearer ' + res.access_token,
    });

    fetch(
      `${PREVENT_CORS_URL}/https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        method: 'GET',
        headers,
      },
    )
      .then(response => response.json())
      .then(response => {
        const data: objectType = { ...res, ...response };
        onResolve({
          provider: 'google',
          data,
        });
      })
      .catch(err => {
        onReject(err);
      });
  }, []);

  const handleResponse = useCallback(
    (res: objectType) => {
      if (res?.access_token) {
        if (isOnlyGetToken)
          onResolve({
            provider: 'google',
            data: res,
          });
        else onGetMe(res);
      } else {
        const data: objectType = res;
        onResolve({
          provider: 'google',
          data,
        });
      }
    },
    [isOnlyGetToken, onGetMe, onResolve],
  );

  const load = useCallback(() => {
    if (checkIsExistsSDKScript()) {
      setIsSdkLoaded(true);
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
          scope,
          immediate: true,
          prompt,
        };
        var client = _window.google.accounts.oauth2.initTokenClient({
          ...params,
          callback: handleResponse,
        });
        setInstance(client);
        setIsSdkLoaded(true);
      });
    }
  }, [
    scope,
    prompt,
    ux_mode,
    client_id,
    login_hint,
    access_type,
    redirect_uri,
    discoveryDocs,
    cookie_policy,
    hosted_domain,
    handleResponse,
    fetch_basic_profile,
    insertScriptGoogle,
    checkIsExistsSDKScript,
  ]);

  const loginGoogle = useCallback(() => {
    if (!isSdkLoaded) return;
    if (!_window.google) {
      load();
      onReject("Google SDK isn't loaded!");
    } else {
      onLoginStart && onLoginStart();
      if (instance) instance.requestAccessToken();
    }
  }, [instance, isSdkLoaded, load, onLoginStart, onReject]);

  return (
    <div className={className} onClick={loginGoogle}>
      {children}
    </div>
  );
};

export default memo(LoginSocialGoogle);
