import { StackedMenuProvider } from './react-stacked-menu/context'
import { sampleMenu } from './react-stacked-menu/mocks'
import { StackedMenuManaged } from './react-stacked-menu/StackedMenuManaged'


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
