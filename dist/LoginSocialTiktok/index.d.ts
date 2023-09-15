/**
 *
 * LoginSocialTiktok
 *
 */
import React from 'react';
import { IResolveParams, objectType } from '..';
interface Props {
    state?: string;
    scope?: string;
    client_key: string;
    className?: string;
    redirect_uri: string;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
export declare const LoginSocialGithub: ({ state, scope, client_key, className, redirect_uri, children, onResolve, onLoginStart, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ state, scope, client_key, className, redirect_uri, children, onResolve, onLoginStart, }: Props) => JSX.Element>;
export default _default;
