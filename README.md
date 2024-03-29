# react-interactive-tutorial

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]

This is a React library to use a very customizable Interactive Tutorial Tool

## Installation:

```bash
npm install react-interactive-tutorial
```

or

```bash
yarn add react-interactive-tutorial
```

## Usage :

```tsx
import { Highlighted, Tutorial, TutorialProvider, TutorialStep, useTutorial } from 'react-interactive-tutorial'
import Main from './components/Main'

function App() {

  const steps: TutorialStep[] = [
    {
      id: "welcome",
      render({next, finish}) {
        return <>
            <div className='welcome-position welcome-style'>
                Welcome!
                <button onClick={next}>Next</button>
                <button onClick={finish}>Skip</button>
            </div>
        </>
      }
    },
    {
      id: "#first",
      render({next, finish}) {
        return <>
            <Tutorial position={'left'} onClick={next}>
                <button onClick={next}>Next</button>
                <button onClick={finish}>Finish</button>
            </Tutorial>
            <Highlighted style={{ marginLeft: '0.5em', marginTop: '0.5em' }}/>
        </>
      }
    },
    {
    id: "#second",
    render({next, back}) {
        return <>
            <Tutorial position={'right'} onClick={next}>
                <button onClick={next}>Next</button>
                <button onClick={back}>Back</button>
            </Tutorial>
            <Highlighted />
        </>
    }
    },
    {
        id: "#third",
        render({next, goTo}) {
            return <>
                <Tutorial position={'right'} onClick={next}>
                    <button onClick={next}>Next</button>
                    <button onClick={goTo('#first')}>Go to first</button>
                </Tutorial>
                <Highlighted />
            </>
        }
    }
  ]

  return (
    <TutorialProvider steps={steps}>
      <Main />
    </TutorialProvider>
  )
}

function Main() {

    const { start } = useTutorial();
    return <>
            <h1 id='first'>Title</h1>
            <h2 id='second'>Subtitle</h3>
            <section id='third'>Content</section>
            <button onClick={start}>Start tutorial</button>
           </>;
}
```

[npm-url]: https://www.npmjs.com/package/react-interactive-tutorial
[npm-image]: https://img.shields.io/npm/v/react-interactive-tutorial
[github-build]: https://github.com/CarlosPumar/react-interactive-tutorial/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/CarlosPumar/react-interactive-tutorial/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-interactive-tutorial