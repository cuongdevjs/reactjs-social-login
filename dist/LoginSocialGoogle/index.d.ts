import React from 'react';
import { objectType, IResolveParams } from '../';
interface Props {
    scope?: string;
    prompt?: string;
    ux_mode?: string;
    client_id: string;
    className?: string;
    login_hint?: string;
    access_type?: string;
    auto_select?: boolean;
    redirect_uri?: string;
    cookie_policy?: string;
    hosted_domain?: string;
    discoveryDocs?: string;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    isOnlyGetToken?: boolean;
    typeResponse?: 'idToken' | 'accessToken';
    onReject: (reject: string | objectType) => void;
    fetch_basic_profile?: boolean;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
declare const _default: React.MemoExoticComponent<({ client_id, scope, prompt, typeResponse, ux_mode, className, login_hint, access_type, onLoginStart, onReject, onResolve, redirect_uri, auto_select, isOnlyGetToken, cookie_policy, hosted_domain, discoveryDocs, children, fetch_basic_profile, }: Props) => JSX.Element>;
export default _default;
