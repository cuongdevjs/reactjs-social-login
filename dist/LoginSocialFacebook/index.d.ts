/**
 *
 * LoginSocialFacebook
 *
 */
import React from 'react';
import { objectType, IResolveParams } from '../';
interface Props {
    appId: string;
    configId: string;
    scope?: string;
    state?: boolean;
    xfbml?: boolean;
    cookie?: boolean;
    version?: string;
    language?: string;
    auth_type?: string;
    className?: string;
    isDisabled?: boolean;
    isOnlyGetToken?: boolean;
    onLoginStart?: () => void;
    onLogoutSuccess?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
    redirect_uri?: string;
    fieldsProfile?: string;
    response_type?: string;
    return_scopes?: boolean;
    children?: React.ReactNode;
}
declare const _default: React.MemoExoticComponent<({ appId, configId, scope, state, xfbml, cookie, version, language, auth_type, className, onLoginStart, onReject, onResolve, redirect_uri, fieldsProfile, response_type, return_scopes, isOnlyGetToken, children, }: Props) => JSX.Element>;
export default _default;
