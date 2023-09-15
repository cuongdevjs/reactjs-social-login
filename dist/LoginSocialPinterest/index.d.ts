import React from 'react';
import { IResolveParams, objectType } from '..';
interface Props {
    state?: string;
    scope?: string;
    client_id: string;
    client_secret: string;
    className?: string;
    redirect_uri: string;
    children?: React.ReactNode;
    isOnlyGetCode?: boolean;
    isOnlyGetToken?: boolean;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialPinterest: ({ state, scope, client_id, client_secret, className, redirect_uri, isOnlyGetCode, isOnlyGetToken, children, onLoginStart, onReject, onResolve, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, scope, client_id, client_secret, className, redirect_uri, isOnlyGetCode, isOnlyGetToken, children, onLoginStart, onReject, onResolve, }: Props) => JSX.Element>;
export default _default;
