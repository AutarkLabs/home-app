import React from 'react'
// import { useAragonApi } from '@aragon/api-react'
import { Main, AppBar, AppView, Button, Card } from '@aragon/ui'
import styled from 'styled-components'

const cardsData = {
  left: {
    title: 'Welcome to Autark',
    content:
      'Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker-autonomy, and access to tools that support the global development of complex mega-projects.<br>To us, complex mega-projects can mean autonomous cities, next-generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships. There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.<br>We will be calling this Aragon suite of project and human-coordination tools Open Enterprise, as DAOs that are solving mega-projects are the definition of an open enterprise.<br>In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become (or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80% use case.<br>The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.<br>Privacy, internationalization, and accessibility are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.',
  },
  right: {
    title: 'More text goes here',
    content:
      'Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker-autonomy, and access to tools that support the global development of complex mega-projects.<br>To us, complex mega-projects can mean autonomous cities, next-generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships. There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.<br>We will be calling this Aragon suite of project and human-coordination tools Open Enterprise, as DAOs that are solving mega-projects are the definition of an open enterprise.<br>In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become (or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80% use case.<br>The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.<br>Privacy, internationalization, and accessibility are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.',
  },
}

function App() {
  // const { api, appState } = useAragonApi()
  // const { count, syncing } = appState
  return (
    <Main>
      <BaseLayout>
        <AppView
          appBar={
            <AppBar
              title="Welcome!"
              endContent={<Button mode="strong">Edit Page</Button>}
            />
          }
        >
          <WidgetsLayout>
            <Card height="fit-content" width="100%">
              <CardContent>
                <h1>{cardsData.left.title}</h1>
                <span>{cardsData.left.content}</span>
              </CardContent>
            </Card>
            <Card height="fit-content" width="calc(100% - 30px)">
              <CardContent>
                <h1>{cardsData.right.title}</h1>
                <span>{cardsData.right.content}</span>
              </CardContent>
            </Card>
          </WidgetsLayout>
        </AppView>
      </BaseLayout>
    </Main>
  )
}

const BaseLayout = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: center; */
  height: 100vh;
  flex-direction: column;
`

// const Count = styled.h1`
//   font-size: 30px;
// `

const WidgetsLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-auto-flow: column;
  grid-gap: 30px;
`

const CardContent = styled.div`
  padding: 24px;
`

// const Syncing = styled.div.attrs({ children: 'Syncing…' })`
//   position: absolute;
//   top: 15px;
//   right: 20px;
// `

export default App
