import React, { useCallback, useState } from 'react'
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
  IResolveParams
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

const REDIRECT_URI = 'https://20d3-1-55-164-102.ap.ngrok.io/account/login'
// const REDIRECT_URI = 'http://localhost:3000/account/login'

const App = () => {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState<any>()

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

  const onLogout = useCallback(() => {}, [])

  return (
    <>
      {provider && profile && (
        <User provider={provider} profile={profile} onLogout={onLogout} />
      )}
      <div className={`App ${provider && profile ? 'hide' : ''}`}>
        <h1 className='title'>ReactJS Social Login</h1>
        <LoginSocialFacebook
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
          client_id={process.env.REACT_APP_GG_APP_ID || ''}
          onLoginStart={onLoginStart}
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
        >
          <AmazonLoginButton />
        </LoginSocialAmazon>

        <LoginSocialInstagram
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
          client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
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
          client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
          client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
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
          client_id={process.env.REACT_APP_PINTEREST_APP_ID || ''}
          client_secret={process.env.REACT_APP_PINTEREST_APP_SECRET || ''}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
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
          client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
          // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
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
