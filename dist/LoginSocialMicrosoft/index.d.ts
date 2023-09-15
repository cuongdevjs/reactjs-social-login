/**
 *
 * LoginSocialMicrosoft
 *
 */
import React from 'react';
import { IResolveParams, objectType } from '../';
interface Props {
    scope?: string;
    state?: string;
    client_id: string;
    className?: string;
    redirect_uri: string;
    response_type?: string;
    response_mode?: string;
    code_challenge?: string;
    children?: React.ReactNode;
    isOnlyGetCode?: boolean;
    isOnlyGetToken?: boolean;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    code_challenge_method?: 'plain' | 's256'[];
    onResolve: ({ provider, data }: IResolveParams) => void;
    tenant?: 'common' | 'organizations' | 'consumers';
    prompt?: 'login' | 'none' | 'consent' | 'select_account';
}
export declare const LoginSocialMicrosoft: ({ tenant, state, client_id, className, redirect_uri, scope, response_type, response_mode, children, code_challenge, code_challenge_method, prompt, isOnlyGetCode, isOnlyGetToken, onLoginStart, onReject, onResolve, }: Props) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ tenant, state, client_id, className, redirect_uri, scope, response_type, response_mode, children, code_challenge, code_challenge_method, prompt, isOnlyGetCode, isOnlyGetToken, onLoginStart, onReject, onResolve, }: Props) => JSX.Element>;
export default _default;
