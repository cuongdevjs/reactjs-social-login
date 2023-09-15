import React from 'react';
import { IResolveParams, objectType } from '..';
interface Props {
    client_id: string;
    className?: string;
    redirect_uri: string;
    state?: string;
    fields?: string;
    scope?: string;
    children?: React.ReactNode;
    isOnlyGetCode?: boolean;
    isOnlyGetToken?: boolean;
    onLoginStart?: () => void;
    onLogoutSuccess?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialTwitter: ({ client_id, className, redirect_uri, children, fields, state, scope, isOnlyGetCode, isOnlyGetToken, onLoginStart, onReject, onResolve, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ client_id, className, redirect_uri, children, fields, state, scope, isOnlyGetCode, isOnlyGetToken, onLoginStart, onReject, onResolve, }: Props) => JSX.Element>;
export default _default;
