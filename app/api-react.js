import buildStubbedApiReact from './utils/api-react'

// TODO: insert favicon to avoid 404

const initialState = process.env.NODE_ENV !== 'production' && {
  // entries: [{ addr: 'hello', deleted: false }],
  isSyncing: false,
}

const functions =
  process.env.NODE_ENV !== 'production' &&
  ((appState, setAppState) => ({
    newEntry: content =>
      setAppState({
        ...appState,
        entries: [ ...appState.entries, { content }],
      }),
    setSyncing: syncing =>
      setAppState({
        ...appState,
        isSyncing: syncing,
      })
  }))

const { AragonApi, useAragonApi, usePath } = buildStubbedApiReact({
  initialState,
  functions,
})

export { AragonApi, useAragonApi, usePath }
