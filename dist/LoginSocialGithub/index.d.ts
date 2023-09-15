import React from 'react';
import { IResolveParams, objectType } from '../';
interface Props {
    state?: string;
    scope?: string;
    client_id: string;
    className?: string;
    redirect_uri: string;
    client_secret: string;
    allow_signup?: boolean;
    isOnlyGetToken?: boolean;
    isOnlyGetCode?: boolean;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    onLogoutSuccess?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialGithub: ({ state, scope, client_id, client_secret, className, redirect_uri, allow_signup, isOnlyGetToken, isOnlyGetCode, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, scope, client_id, client_secret, className, redirect_uri, allow_signup, isOnlyGetToken, isOnlyGetCode, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element>;
export default _default;
