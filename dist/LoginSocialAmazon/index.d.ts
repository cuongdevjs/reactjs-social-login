/**
 *
 * LoginSocialAmazon
 *
 */
import React from 'react';
import { IResolveParams, objectType } from '../';
interface Props {
    scope?: string;
    state?: string;
    client_id: string;
    className?: string;
    redirect_uri?: string;
    response_type?: string;
    scope_data?: objectType;
    isOnlyGetToken?: boolean;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialAmazon: ({ state, client_id, className, redirect_uri, scope, isOnlyGetToken: onlyGetToken, scope_data, response_type, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, client_id, className, redirect_uri, scope, isOnlyGetToken: onlyGetToken, scope_data, response_type, children, onReject, onResolve, onLoginStart, }: Props) => JSX.Element>;
export default _default;
