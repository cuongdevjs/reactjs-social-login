import React from 'react'
import './app.css'
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter
} from 'reactjs-social-login'

const REDIRECT_URI = 'https://a178-123-16-241-177.ap.ngrok.io/account/login'
// const REDIRECT_URI = 'http://localhost:3000/account/login'

const App = () => {
  return (
    <div>
      <LoginSocialFacebook
        appId={process.env.REACT_APP_FB_APP_ID || ''}
        onResolve={({ data }: any) => {
          console.log(data)
        }}
        onReject={() => {}}
        className={'storybook-button storybook-button--primary'}
      >
        <span>Facebook</span>
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={process.env.REACT_APP_GG_APP_ID || ''}
        onResolve={({ data }: any) => {
          console.log(data)
        }}
        onReject={() => {}}
        className={'storybook-button storybook-button--primary'}
      >
        <span>Google</span>
      </LoginSocialGoogle>

      <LoginSocialAmazon
        client_id={process.env.REACT_APP_AMAZON_APP_ID || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Amazon
      </LoginSocialAmazon>

      <LoginSocialInstagram
        client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
        client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Instagram
      </LoginSocialInstagram>

      <LoginSocialMicrosoft
        client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Microsoft
      </LoginSocialMicrosoft>

      <LoginSocialLinkedin
        client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
        client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Linkedin
      </LoginSocialLinkedin>

      <LoginSocialGithub
        client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
        client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Github
      </LoginSocialGithub>
      <LoginSocialPinterest
        client_id={process.env.REACT_APP_PINTEREST_APP_ID || ''}
        client_secret={process.env.REACT_APP_PINTEREST_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Pinterest
      </LoginSocialPinterest>

      <LoginSocialTwitter
        client_id={process.env.REACT_APP_TWITTER_API_KEY || ''}
        client_secret={process.env.REACT_APP_TWITTER_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: any) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err: any) => {
          console.log(err)
        }}
      >
        Login Twitter
      </LoginSocialTwitter>
    </div>
  )
}

export default App
