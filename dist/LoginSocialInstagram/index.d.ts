import React from 'react';
import { objectType, IResolveParams } from '../';
interface Props {
    scope?: string;
    state?: string;
    fields?: string;
    client_id: string;
    className?: string;
    client_secret: string;
    redirect_uri: string;
    response_type?: string;
    isOnlyGetCode?: boolean;
    isOnlyGetToken?: boolean;
    children?: React.ReactNode;
    onLogoutSuccess?: () => void;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialInstagram: ({ state, client_id, client_secret, className, redirect_uri, fields, scope, response_type, isOnlyGetCode, isOnlyGetToken, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, client_id, client_secret, className, redirect_uri, fields, scope, response_type, isOnlyGetCode, isOnlyGetToken, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element>;
export default _default;
