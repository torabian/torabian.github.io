import { actionCenter } from './izadom'
import { type MenuLayer } from './react-stacked-menu'
import { StackedMenuProvider, useLayer, useStackedMenuContext } from './react-stacked-menu/context'
import { StackedMenuManaged } from './react-stacked-menu/StackedMenuManaged'


const ActiveLayer: MenuLayer = {
  id: 'active_layer',
  items: [
    {
      key: 'active_layer',
      content: 'Active!',
      children: [
        {
          key: 'object',
          content: 'Object',
          children: [
            {
              key: 'delete',
              content: "Delete"
            }
          ]
        }
      ]
    }
  ]
}

const ExtraInsert: MenuLayer = {
  id: 'extra_insert',
  items: [
    {
      key: 'Insert',
      children: [
        {
          key: 'elements',
          children: [
            {
              key: 'insert double',
              content: "insert double"
            }
          ]
        }
      ]
    }
  ]
}

function App() {

  return (
    <>
      <StackedMenuProvider defaultState={{ default: actionCenter }}>
        <Ui />
      </StackedMenuProvider>
    </>
  )
}


const Ui = () => {

  const { addLayer, removeLayer } = useStackedMenuContext()

  useLayer('default', ExtraInsert)

  return <>

    <button style={{ marginBottom: '50px' }} onClick={() => {
      addLayer('default', ActiveLayer)
      addLayer('default', ExtraInsert)
    }}>
      Activate extra menu
    </button>
    <button style={{ marginBottom: '50px' }} onClick={() => {
      removeLayer('default', ActiveLayer.id)
      removeLayer('default', ExtraInsert.id)
    }}>
      Remove extra menu
    </button>
    <div style={{ height: '70px', backgroundColor: 'green' }}>
      <StackedMenuManaged
        onTrigger={(selector, meta) => console.log("Selected: " + selector + JSON.stringify(meta))}
        id='default'
        appendClass='ribbon-menu'
        defaultSelector='home'
      />
    </div>

  </>
}

export default App
