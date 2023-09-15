import React from 'react';
import { IResolveParams, objectType } from '../';
interface Props {
    state?: string;
    scope?: string;
    client_id: string;
    className?: string;
    redirect_uri: string;
    client_secret: string;
    response_type?: string;
    isOnlyGetCode?: boolean;
    isOnlyGetToken?: boolean;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialLinkedin: ({ state, scope, client_id, client_secret, className, redirect_uri, response_type, isOnlyGetCode, isOnlyGetToken, children, onLoginStart, onReject, onResolve, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, scope, client_id, client_secret, className, redirect_uri, response_type, isOnlyGetCode, isOnlyGetToken, children, onLoginStart, onReject, onResolve, }: Props) => JSX.Element>;
export default _default;
