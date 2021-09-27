
# reactjs-social-login

> Group social login for ReactJS
>
> 1. Facebook
> 2. Google
> 3. Linkedin
> 4. Github
> 5. Microsoft
> 6. Amazon
> 7. Instagram
> 8. Pinterest
> 9. Twitter

This repository includes multiple platform for social login, is written by TypeScript and React Hooks, tree-shakeable, zero dependencies, extremely lightweight.
You can customize any style UI as you like.

Reactjs Social Login is an HOC which provides social login through multiple providers.

**Currently supports Amazon, Facebook, GitHub, Google, Instagram, Linkedin, Pinterest, Twitter, Microsoft as providers (more to come!)**

[![npm download](https://img.shields.io/npm/dm/reactjs-social-login.svg?style=flat)](https://www.npmjs.com/package/reactjs-social-login)
[![npm bundle zip](https://img.shields.io/bundlephobia/minzip/reactjs-social-login?style=flat)](https://www.npmjs.com/package/reactjs-social-login)
[![node version](https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat)](http://nodejs.org/download/)
[![NPM](https://img.shields.io/npm/v/reactjs-social-login.svg)](https://www.npmjs.com/package/reactjs-social-login)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![img-description](./gif.gif)

## Install

```bash
npm install --save reactjs-social-login
```

<br/>

### Demo

[Online Demo](https://react-social-login.netlify.app)

<br/>

### Example code

[Code Demo](https://github.com/cuongdevjs/reactjs-social-login/blob/master/example/src/App.tsx)

Clone project, open terminal and type these commands

```bash
npm install
```

```bash
npm run start
```

then go to directory /example, add .env.development by following format

````bash
NODE_ENV=development
REACT_APP_FB_APP_ID=
REACT_APP_GG_APP_ID=
REACT_APP_AMAZON_APP_ID=
REACT_APP_INSTAGRAM_APP_ID=
REACT_APP_INSTAGRAM_APP_SECRET=
REACT_APP_MICROSOFT_APP_ID=
REACT_APP_LINKEDIN_APP_SECRET=
REACT_APP_LINKEDIN_APP_ID=
REACT_APP_GITHUB_APP_ID=
REACT_APP_GITHUB_APP_SECRET=
REACT_APP_PINTEREST_APP_ID=
REACT_APP_PINTEREST_APP_SECRET=
REACT_APP_TWITTER_APP_ID=
REACT_APP_TWITTER_API_KEY=
REACT_APP_TWITTER_APP_SECRET=
REACT_APP_TWITTER_TOKEN=
````

and on directory /example, then open other terminal, type these commands

```shell
npm run start
```

You can then view the demo at [https://localhost:3000][demo].

<br/>

### Usage

````tsx
import React, { useCallback, useRef, useState } from 'react'
import './app.css'
import { User } from './User' // component display user (see detail on /example directory)
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

// CUSTOMIZE ANY UI BUTTON
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

const REDIRECT_URI = 'http://localhost:3000/account/login'

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

````

<br/>

#### Google Props

| Prop                                                                                                                                                  | Type                                           | Default | Description                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| onLogoutFailure                                                                                                                                       | `function() { // } (optional)`                 |   `-`   | Called when logout failure                                        |
| onLogoutSuccess                                                                                                                                       | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                        | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | ID application                                                    |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class container                                                   |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/498a8bf58b670d5845d239a7e48de8c7b7afddc8/src/LoginSocialGoogle/index.tsx#L9) |

<br/>

#### Facebook Props

| Prop                                                                                                                                                    | Type                                           | Default | Description                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                               | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                                | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| appId                                                                                                                                                   | `string (required)`                            |   `-`   | ID application                                                    |
| onLogoutSuccess                                                                                                                                         | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                          | `function() { // } (optional)`                 |   `-`   | Called when click login                                           | className | `string (optional)` | `-` | Class for button |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialFacebook/index.tsx#L9) |

<br/>

#### Microsoft Props

| Prop                                                                                                                                                     | Type                                           | Default | Description                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                                | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                                 | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                                | `string (required)`                            |   `-`   | ID application                                                    |
| onLogoutSuccess                                                                                                                                          | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                           | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                                | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialMicrosoft/index.tsx#L9) |

<br/>

#### Amazon Props

| Prop                                                                                                                                                  | Type                                           | Default | Description                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | ID application                                                    |
| onLogoutSuccess                                                                                                                                       | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                        | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialAmazon/index.tsx#L9) |

<br/>

#### Instagram Props

| Prop                                                                                                                                                     | Type                                           | Default | Description                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                                | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                                 | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                                | `string (required)`                            |   `-`   | App ID application                                                |
| client_secret                                                                                                                                            | `string (required)`                            |   `-`   | App Secret application                                            |
| onLogoutSuccess                                                                                                                                          | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                           | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                                | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialInstagram/index.tsx#L9) |

<br/>

#### Linkedin Props

| Prop                                                                                                                                                    | Type                                           | Default | Description                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                               | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                                | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                               | `string (required)`                            |   `-`   | App ID application                                                |
| client_secret                                                                                                                                           | `string (required)`                            |   `-`   | App Secret application                                            |
| onLogoutSuccess                                                                                                                                         | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                          | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                               | `string (optional)`                            |   `-`   | Class for button                                                  |
| scope                                                                                                                                                   | `string (optional)`                            |   `-`   | Scope application                                                 |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialLinkedin/index.tsx#L9) |

<br/>

#### Github Props

| Prop                                                                                                                                                  | Type                                           | Default | Description                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | App ID application                                                |
| client_secret                                                                                                                                         | `string (required)`                            |   `-`   | Secret ID application                                             |
| onLogoutSuccess                                                                                                                                       | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                        | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialGithub/index.tsx#L9) |

<br/>

#### Pinterest Props

| Prop                                                                                                                                                     | Type                                           | Default | Description                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                                | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                                 | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                                | `string (required)`                            |   `-`   | App ID application                                                |
| client_secret                                                                                                                                            | `string (required)`                            |   `-`   | Secret ID application                                             |
| onLogoutSuccess                                                                                                                                          | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                           | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                                | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialPinterest/index.tsx#L9) |

<br/>

#### Twitter Props

| Prop                                                                                                                                                   | Type                                           | Default | Description                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------------------- |
| onResolve                                                                                                                                              | `function({provider, data}) { // } (required)` |   `-`   | Return provider and data (include user's info & access_token,...) |
| onReject                                                                                                                                               | `function(err) { // } (required)`              |   `-`   | Return error                                                      |
| client_id                                                                                                                                              | `string (required)`                            |   `-`   | API Key                                                           |
| client_secret                                                                                                                                          | `string (required)`                            |   `-`   | Secret Key                                                        |
| onLogoutSuccess                                                                                                                                        | `function() { // } (optional)`                 |   `-`   | Called when logout successfully                                   |
| onLoginTrigger                                                                                                                                         | `function() { // } (optional)`                 |   `-`   | Called when click login                                           |
| className                                                                                                                                              | `string (optional)`                            |   `-`   | Class for button                                                  |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialTwitter/index.tsx#L9) |

<br/>

### How get client_id, client_secret_id

> Create application developer and you can get detail id & secret_id on these link

1. [Facebook](https://developers.facebook.com/apps/)
2. [Instagram](https://developers.facebook.com/apps/)
3. [Github](https://github.com/settings/developers)
4. [Linkedin](https://www.linkedin.com/developers/apps/)
5. [Google](https://console.developers.google.com/apis/credentials)
6. [Microsoft](https://portal.azure.com/)
7. [Amazon](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html)
8. [Pinterest](https://developers.pinterest.com/docs/api/v5/)
9. [Twitter](https://developer.twitter.com/en/docs/authentication/)

## License

MIT © [Nguyen-Manh-Cuong](https://github.com/cuongdevjs )
