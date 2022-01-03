import React, { useCallback, useRef, useState } from 'react'
import './app.css'
import { User } from './User'
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  IResolveParams,
  TypeCrossFunction
} from 'reactjs-social-login'

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton
} from 'react-social-login-buttons'

import { ReactComponent as PinterestLogo } from './assets/pinterest.svg'

const REDIRECT_URI = 'https://7923-123-16-241-177.ap.ngrok.io/account/login'
// const REDIRECT_URI = 'http://localhost:3000/account/login'

const App = () => {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState<any>()
  const amazonRef = useRef<TypeCrossFunction>(null!)
  const instagramRef = useRef<TypeCrossFunction>(null!)
  const googleRef = useRef<TypeCrossFunction>(null!)
  const facebookRef = useRef<TypeCrossFunction>(null!)
  const microsoftRef = useRef<TypeCrossFunction>(null!)
  const linkedinRef = useRef<TypeCrossFunction>(null!)
  const githubRef = useRef<TypeCrossFunction>(null!)
  const pinterestRef = useRef<TypeCrossFunction>(null!)
  const twitterRef = useRef<TypeCrossFunction>(null!)

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutFailure = useCallback(() => {
    alert('logout fail')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

  const onLogout = useCallback(() => {
    switch (provider) {
      case 'amazon':
        amazonRef.current?.onLogout()
        break
      case 'facebook':
        facebookRef.current?.onLogout()
        break
      case 'google':
        googleRef.current?.onLogout()
        break
      case 'instagram':
        instagramRef.current?.onLogout()
        break
      case 'microsoft':
        microsoftRef.current?.onLogout()
        break
      case 'github':
        githubRef.current?.onLogout()
        break
      case 'pinterest':
        pinterestRef.current?.onLogout()
        break
      case 'twitter':
        twitterRef.current?.onLogout()
        break
      case 'linkedin':
        linkedinRef.current?.onLogout()
        break
      default:
        break
    }
  }, [provider])

  return (
    <>
      {provider && profile && (
        <User provider={provider} profile={profile} onLogout={onLogout} />
      )}
      <div className={`App ${provider && profile ? 'hide' : ''}`}>
        <h1 className='title'>ReactJS Social Login</h1>
        <LoginSocialFacebook
          ref={facebookRef}
          appId={process.env.REACT_APP_FB_APP_ID || ''}
          fieldsProfile={
            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
          }
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>

        <LoginSocialGoogle
          ref={googleRef}
          client_id={process.env.REACT_APP_GG_APP_ID || ''}
          onLogoutFailure={onLogoutFailure}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>

        <LoginSocialAmazon
          ref={amazonRef}
          client_id={process.env.REACT_APP_AMAZON_APP_ID || ''}
          redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
        >
          <AmazonLoginButton />
        </LoginSocialAmazon>

        <LoginSocialInstagram
          ref={instagramRef}
          client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
          client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
        >
          <InstagramLoginButton />
        </LoginSocialInstagram>

        <LoginSocialMicrosoft
          ref={microsoftRef}
          client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
        >
          <MicrosoftLoginButton />
        </LoginSocialMicrosoft>

        <LoginSocialLinkedin
          ref={linkedinRef}
          client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
          client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
        >
          <LinkedInLoginButton />
        </LoginSocialLinkedin>

        <LoginSocialGithub
          ref={githubRef}
          client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
          client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
        >
          <GithubLoginButton />
        </LoginSocialGithub>
        <LoginSocialPinterest
          ref={pinterestRef}
          client_id={process.env.REACT_APP_PINTEREST_APP_ID || ''}
          client_secret={process.env.REACT_APP_PINTEREST_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
          className='pinterest-btn'
        >
          <div className='content'>
            <div className='icon'>
              <PinterestLogo />
            </div>
            <span className='txt'>Login With Pinterest</span>
          </div>
        </LoginSocialPinterest>

        <LoginSocialTwitter
          ref={twitterRef}
          client_id={process.env.REACT_APP_TWITTER_API_KEY || ''}
          client_secret={process.env.REACT_APP_TWITTER_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider)
            setProfile(data)
          }}
          onReject={(err: any) => {
            console.log(err)
          }}
        >
          <TwitterLoginButton />
        </LoginSocialTwitter>
      </div>
    </>
  )
}

export default App
