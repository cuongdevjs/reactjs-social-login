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

This repository is written by TypeScript and React Hooks, tree-shakeable, zero dependencies, extremely lightweight.
You can customize any style UI as you like

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

<br/>

### Usage

````jsx
import React from 'react';
import {
 LoginSocialFacebook,
 LoginSocialGoogle,
 LoginSocialGithub,
 LoginSocialAmazon,
 LoginSocialLinkedin,
 LoginSocialInstagram,
 LoginSocialMicrosoft,
} from "reactjs-social-login";

const REDIRECT_URI = "https://reactjs-social-login.netlify.app/account/login";

export default function App() {
 return (
  <div className="App">
   <LoginSocialFacebook
    appId={app_id}
    onResolve={({ data }) => {
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    <span>Facebook</span>
   </LoginSocialFacebook>

   <LoginSocialGoogle
    client_id={client_id}
    onResolve={({ data }) => {
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    <span>Google</span>
   </LoginSocialGoogle>

   <LoginSocialAmazon
    client_id={client_id}
    redirect_uri={REDIRECT_URI}
    onResolve={({ provider, data }) => {
     alert(provider);
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    Login Amazon
   </LoginSocialAmazon>

   <LoginSocialInstagram
    client_id={client_id}
    redirect_uri={REDIRECT_URI}
    onResolve={({ provider, data }) => {
     alert(provider);
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    Login Instagram
   </LoginSocialInstagram>

   <LoginSocialMicrosoft
    client_id={client_id}
    redirect_uri={REDIRECT_URI}
    onResolve={({ provider, data }) => {
     alert(provider);
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    Login Microsoft
   </LoginSocialMicrosoft>

   <LoginSocialLinkedin
    client_id={client_id}
    redirect_uri={REDIRECT_URI}
    onResolve={({ provider, data }) => {
     alert(provider);
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    Login Linkedin
   </LoginSocialLinkedin>

   <LoginSocialGithub
    client_id={client_id}
    redirect_uri={REDIRECT_URI}
    onResolve={({ provider, data }) => {
     alert(provider);
     alert(JSON.stringify(data));
    }}
    onReject={(err) => alert(err)}
   >
    Login Github
   </LoginSocialGithub>
  </div>
 );
}

````

<br/>

#### Google Props

| Prop                                                                                                                                                  | Type                                           | Default | Description                                          |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :--------------------------------------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Response when logged (include profile, access_token) |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error                                         |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | ID application                                       |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class container                                      |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/498a8bf58b670d5845d239a7e48de8c7b7afddc8/src/LoginSocialGoogle/index.tsx#L9) |

<br/>

#### Facebook Props

| Prop                                                                                                                                                    | Type                                           | Default | Description                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :-----: | :--------------------------------------------------- |
| onResolve                                                                                                                                               | `function({provider, data}) { // } (required)` |   `-`   | Response when logged (include profile, access_token) |
| onReject                                                                                                                                                | `function(err) { // } (required)`              |   `-`   | Return error                                         |
| appId                                                                                                                                                   | `string (required)`                            |   `-`   | ID application                                       |
| className                                                                                                                                               | `string (optional)`                            |   `-`   | Class for button                                     |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialFacebook/index.tsx#L9) |

<br/>

#### Microsoft Props

| Prop                                                                                                                                                     | Type                                           | Default | Description                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :---------------------------------------------------- |
| onResolve                                                                                                                                                | `function({provider, data}) { // } (required)` |   `-`   | Response when logged  (include profile, access_token) |
| onReject                                                                                                                                                 | `function(err) { // } (required)`              |   `-`   | Return error                                          |
| client_id                                                                                                                                                | `string (required)`                            |   `-`   | ID application                                        |
| className                                                                                                                                                | `string (optional)`                            |   `-`   | Class for button                                      |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialMicrosoft/index.tsx#L9) |

<br/>

#### Amazon Props

| Prop                                                                                                                                                  | Type                                           | Default | Description          |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Response when logged |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error         |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | ID application       |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class for button     |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialAmazon/index.tsx#L9) |

<br/>

#### Instagram Props

| Prop                                                                                                                                                     | Type                                           | Default | Description                                                                                                                                                                                            |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onResolve                                                                                                                                                | `function({provider, data}) { // } (required)` |   `-`   | Response when logged (return code, because security reason if you want to get access_token, you must send back this code to backend, send request to <https://graph.instagram.com/oauth/access_token>) |
| onReject                                                                                                                                                 | `function(err) { // } (required)`              |   `-`   | Return error                                                                                                                                                                                           |
| client_id                                                                                                                                                | `string (required)`                            |   `-`   | ID application                                                                                                                                                                                         |
| className                                                                                                                                                | `string (optional)`                            |   `-`   | Class for button                                                                                                                                                                                       |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialInstagram/index.tsx#L9) |

<br/>

#### Linkedin Props

| Prop                                                                                                                                                    | Type                                           | Default | Description                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onResolve                                                                                                                                               | `function({provider, data}) { // } (required)` |   `-`   | Response when logged (return code, because security reason if you want to get access_token, you must send back this code to backend, send request to <https://api.linkedin.com/oauth/v2/accessToken>) |
| onReject                                                                                                                                                | `function(err) { // } (required)`              |   `-`   | Return error                                                                                                                                                                                          |
| client_id                                                                                                                                               | `string (required)`                            |   `-`   | ID application                                                                                                                                                                                        |
| className                                                                                                                                               | `string (optional)`                            |   `-`   | Class for button                                                                                                                                                                                      |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialLinkedin/index.tsx#L9) |

<br/>

#### Github Props

| Prop                                                                                                                                                  | Type                                           | Default | Description                                                                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onResolve                                                                                                                                             | `function({provider, data}) { // } (required)` |   `-`   | Response when logged (return code, because security reason if you want to get access_token, you must send back this code to backend, send request to <https://api.github.com/login/oauth/access_token> |
| onReject                                                                                                                                              | `function(err) { // } (required)`              |   `-`   | Return error                                                                                                                                                                                           |
| client_id                                                                                                                                             | `string (required)`                            |   `-`   | ID application                                                                                                                                                                                         |
| className                                                                                                                                             | `string (optional)`                            |   `-`   | Class for button                                                                                                                                                                                       |
| [other_props...](https://github.com/cuongdevjs/reactjs-social-login/blob/757df855d0b16aad7bccd6e76b756a92e707fe46/src/LoginSocialGithub/index.tsx#L9) |

<br/>

### How get client_id, client_secret_id

> Create application developer and you can get detail id & secret_id

1. [Facebook](https://developers.facebook.com/apps/)
2. [Instagram](https://developers.facebook.com/apps/)
3. [Github](https://github.com/settings/developers)
4. [Linkedin](https://www.linkedin.com/developers/apps/)
5. [Google](https://console.developers.google.com/apis/credentials)
6. [Microsoft](https://portal.azure.com/)
7. [Amazon](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html)

## License

MIT © [Nguyen-Manh-Cuong](https://github.com/cuongdevjs )
