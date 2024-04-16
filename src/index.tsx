import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { store } from './App/store'
import App from './App'

const Global = createGlobalStyle`
* {
margin: 0;
padding: 0;
box-sizing: border-box;
list-style: none;
text-decoration: none;
font-family: 'Inter', sans-serif;
font-weight: 500;

::-webkit-scrollbar {
  display: none;
}
scrollbar-width: none;
}

body {
  background: #EBEEF3;
}
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <>
      <Global />
      <Provider store={store}>
         <App />
      </Provider>
   </>
)
