import React from 'react'
import './app.css'
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft
} from 'reactjs-social-login'

const REDIRECT_URI = 'https://reactjs-social-login.netlify.app/account/login'

const App = () => {
  console.log(process.env.FB_APP_ID)
  return (
    <div>
      <LoginSocialFacebook
        appId={process.env.FB_APP_ID || ''}
        onResolve={({ data }) => {
          console.log(data)
        }}
        onReject={() => {}}
        className={'storybook-button storybook-button--primary'}
      >
        <span>Facebook</span>
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={process.env.GG_APP_ID || ''}
        onResolve={({ data }) => {
          console.log(data)
        }}
        onReject={() => {}}
        className={'storybook-button storybook-button--primary'}
      >
        <span>Google</span>
      </LoginSocialGoogle>

      <LoginSocialAmazon
        client_id={process.env.AMAZON_APP_ID || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        Login Amazon
      </LoginSocialAmazon>

      <LoginSocialInstagram
        client_id={process.env.INSTAGRAM_APP_ID || ''}
        client_secret={process.env.INSTAGRAM_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        Login Instagram
      </LoginSocialInstagram>

      <LoginSocialMicrosoft
        // client_secret: 50.41O-kG_igQar-C8wH2uvhkxn026LoVx
        client_id={process.env.MICROSOFT_APP_ID || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        Login Microsoft
      </LoginSocialMicrosoft>

      <LoginSocialLinkedin
        client_id={process.env.LINKEDIN_APP_ID || ''}
        client_secret={process.env.LINKEDIN_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        Login Linkedin
      </LoginSocialLinkedin>

      <LoginSocialGithub
        client_id={process.env.GITHUB_APP_ID || ''}
        client_secret={process.env.GITHUB_APP_SECRET || ''}
        className={'storybook-button storybook-button--primary'}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(provider)
          console.log(data)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        Login Github
      </LoginSocialGithub>
    </div>
  )
}

export default App
