import { StackedMenuProvider } from './lib/context'
import { sampleMenu } from './lib/mocks'
import { StackedMenuManaged } from './lib/StackedMenuManaged'


function App() {

  return (
    <>
      <StackedMenuProvider defaultState={{ default: sampleMenu }}>
        <StackedMenuManaged
          onTrigger={(selector) => alert("Selected: " + selector)}
          id='default'
        />
      </StackedMenuProvider>
    </>
  )
}

export default App
