/**
 *
 * LoginSocialGoogle
 *
 */
import React from 'react';
import { objectType, IResolveParams } from '../';
interface Props {
    scope?: string;
    client_id: string;
    className?: string;
    redirect_uri?: string;
    children?: React.ReactNode;
    onLoginStart?: () => void;
    onReject: (reject: string | objectType) => void;
    onResolve: ({ provider, data }: IResolveParams) => void;
}
declare const _default: React.MemoExoticComponent<({ client_id, scope, className, onLoginStart, onReject, onResolve, redirect_uri, children, }: Props) => JSX.Element>;
export default _default;
