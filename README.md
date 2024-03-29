# react-interactive-tutorial

[![NPM version][npm-image]][npm-url](https://www.npmjs.com/package/react-interactive-tutorial)
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

Wrap your App file into TutorialProvider. You have to pass a list of steps to your TutorialProvider. These steps have two attributes: id and render.

```tsx
import { Highlighted, Tutorial, TutorialProvider, TutorialStep } from 'react-interactive-tutorial'
import Main from './components/Main'

function App() {

  const steps: TutorialStep[] = [
    {
      id: "#first",
      render({next}) {
        return <>
          <Tutorial position={'left'} onClick={next}>
            <button onClick={next}>NEXT</button>
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
```

[npm-url]: https://www.npmjs.com/package/react-interactive-tutorial
[npm-image]: https://img.shields.io/npm/v/react-interactive-tutorial
[github-license]: https://img.shields.io/github/license/gapon2401/react-interactive-tutorial
[github-license-url]: https://github.com/gapon2401/react-interactive-tutorial/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/react-interactive-tutorial/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/react-interactive-tutorial/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-interactive-tutorial