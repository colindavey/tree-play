import './App.css';
import { useState } from 'react'
import TreeMenu, { ItemComponent} from 'react-simple-tree-menu';

// import default minimal styling or your own styling
// import '../node_modules/react-simple-tree-menu/dist/main.css';
import './tree.css';
import ChildList from './childList.js'

// as an array
const initTreeData = [
  {
    key: 'root',
    label: 'start',
    nodes: [
      {
        key: 'd4',
        label: '1. d4',
        nodes: [
          {
            key: 'd5',
            label: '1... d5',
          },
          {
            key: 'e5',
            label: '1... e5',
          }
        ]
      },
      {
        key: 'd3',
        label: '1. d3',
        nodes: [
          {
            key: 'd5',
            label: '1... d5',
          },
          {
            key: 'e5',
            label: '1... e5',
          }
        ]
      }
    ]
  }
];

// as an array
// const initTreeData = [
//   {
//     key: 'd4',
//     label: '1. d4',
//     nodes: [
//       {
//         key: 'd5',
//         label: '1... d5',
//       },
//       {
//         key: 'e5',
//         label: '1... e5',
//       }
//     ]
//   },
//   {
//     key: 'd3',
//     label: '1. d3',
//     nodes: [
//       {
//         key: 'd5',
//         label: '1... d5',
//       },
//       {
//         key: 'e5',
//         label: '1... e5',
//       }
//     ]
//   }
// ];

const getNode = (treeData, key) => {
  const keys = key.split('/')
  let nodes = treeData
  let node
  keys.forEach(k => {
    node = nodes.find(el => el.key === k)
    nodes = node.nodes
  })
  return node
}

const makeChildList = (treeData, key) => {
  const parentNode = getNode(treeData, key)
  const childNodes = parentNode.nodes ? parentNode.nodes : []
  const childData =
    childNodes
      ? childNodes.map(item => {
          let tmpItem = JSON.parse(JSON.stringify(item))
          tmpItem.origNodes = tmpItem.nodes
          tmpItem.nodes = []
          return tmpItem
        })
      : []
  return childData
}

const replaceChildNodes = (treeData, key, childNodes) => {
  const parentNode = getNode(treeData, key)
  parentNode.nodes = 
  childNodes
    ? childNodes.map(item => {
        let tmpItem = JSON.parse(JSON.stringify(item))
        tmpItem.nodes = tmpItem.origNodes
        tmpItem.origNodes = []
        return tmpItem
      })
    : []
  return treeData
}

const GameViewMock = ({ treeKey, childData, onChildChange, selectTreeItem }) => {
  const [value, setValue] = useState('')
  const [enabled, setEnabled] = useState(false)

  const onChange = (e) => {
    setValue(e.target.value)
    setEnabled(e.target.value ? true : false)
  }

  const addChild = () => {
    const values = childData.map(item => item.key)
    console.log('addChild', childData, values, value)
    if (!values.includes(value)) {
      childData.push({key: value, label: value, nodes: [], origNodes: []})
      onChildChange(childData)
    }
    selectTreeItem(`${treeKey}/${value}`)
  }

  return (
    <>
      <input id='move' onChange={onChange}></input>
      <button type='button' disabled={!enabled} onClick={addChild}>Add</button>
      <p>{treeKey}</p>
    </>
  )
}

const TreeEditor = ({treeData, treeKey, childData, childKey, onTreeItemClick, onChildClick, onChildChange, setChildKey, selectTreeItem}) => {
  return (
    <div>
      <GameViewMock
        treeKey={treeKey}
        childData={childData}
        onChildChange={onChildChange}
        selectTreeItem={selectTreeItem}
      />
      <div style={{float: 'left', width: '50%'}}>
        <TreeMenu
          data={treeData}
          hasSearch={false}
          onClickItem={onTreeItemClick}
          initialActiveKey={treeKey}
          activeKey={treeKey}
          initialFocusKey={treeKey}
          focusKey={treeKey}
        >
          {({ items }) => (
            <ul className='rstm-tree-item-group'>
                {
                  items.map(({key, ...props}) => {
                    // console.log('loop', treeKey, childKey)
                    return (
                      <ItemComponent 
                        key={key}
                        {...props}
                        style={
                          key === `${treeKey}/${childKey}` ? {background: '#ccc'} : {}
                        }
                      />
                    )
                  })
                }
            </ul>
          )}
        </TreeMenu>
      </div>
      <div style={{float: 'left', paddingTop: '0px'}}>
        <ChildList
          childData={childData}
          childKey={childKey}
          onChildClick={onChildClick}
          onChildChange={onChildChange}
          setChildKey={setChildKey}
        />
      </div>
    </div>
  )
}

function App() {
  const initialTreeKey = initTreeData[0].key
  const initialChildKey = initTreeData[0].nodes ? initTreeData[0].nodes[0].key : null
  const [treeData, setTreeData] = useState(initTreeData)
  const [treeKey, setTreeKey] = useState(initialTreeKey)
  const [childKey, setChildKey] = useState(initialChildKey)
  const [childData, setChildData] = useState(makeChildList(treeData, initialTreeKey))

  // const onTreeItemClick = ({key, nodes}) => {
  const onTreeItemClick = (props) => {
    const key = props.key
    selectTreeItem(key)
  }

  const selectTreeItem = key => {
    setTreeKey(key)
    const childData = makeChildList(treeData, key)
    setChildData(childData)
    const childKey = childData[0] ? childData[0].key : null
    setChildKey(childKey)
  }

  const onChildClick = key => {
    setChildKey(key)
  }

  const onChildChange = (childData) => {
    const newTreeData = replaceChildNodes(treeData, treeKey, childData)
    setTreeData(newTreeData)
    const newChildData = makeChildList(newTreeData, treeKey)
    setChildData(newChildData)
  }

  return (
    <div>
      <TreeEditor
        treeData={treeData}
        treeKey={treeKey}
        childData={childData}
        childKey={childKey}
        onTreeItemClick={onTreeItemClick}
        onChildClick={onChildClick}
        onChildChange={onChildChange}
        setChildKey={setChildKey}
        selectTreeItem={selectTreeItem}
      />
      </div>
  );
}

export default App;
