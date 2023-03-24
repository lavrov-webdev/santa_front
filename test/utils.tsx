import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { persistor, store } from '../src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'

export const renderWithProviders = (
  ui: React.ReactElement,
  renderOption?: Omit<RenderOptions, 'queries'>
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>{children}</BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOption }) }
}

export const getUrlToTest = (url: string) =>
  `${window.location.protocol}//${window.location.host}/${url}`
