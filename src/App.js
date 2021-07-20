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
    key: 'k1',
    label: '1',
    nodes: [
      {
        key: 'k1.1',
        label: '1.1',
        nodes: [
          {
            key: 'k1.1.1',
            label: '1.1.1',
            nodes: [] // you can remove the nodes property or leave it as an empty array
          },
        ],
      },
      {
        key: 'k1.2',
        label: '1.2',
      },
      {
        key: 'k1.3',
        label: '1.3',
      }
    ]
  }
];

const getNodes = (treeData, key) => {
  const keys = key.split('/')
  let nodes = treeData
  let node
  keys.forEach(k => {
    node = nodes.find(el => el.key === k)
    nodes = node.nodes
  })
  return node.nodes ? node.nodes : []
}

const makeChildList = (treeData, key) => {
  const childNodes = getNodes(treeData, key)
  const childData =
  childNodes ?
  childNodes.map(item => {
        let tmpItem = JSON.parse(JSON.stringify(item))
        tmpItem.origNodes = tmpItem.nodes
        tmpItem.nodes = []
        return tmpItem
    })
  : []
  return childData
}

const TreeEditor = ({treeData, treeKey, childData, childKey, onTreeItemClick, onChildClick, onChildChange}) => {
  return (
    <div>
      <div >
        <div>
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
          <div style={{float: 'left'}}>
            <ChildList
              childData={childData}
              childKey={childKey}
              onChildClick={onChildClick}
              onChildChange={onChildChange}
            />
          </div>
        </div>
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
    setTreeKey(key)
    const childData = makeChildList(treeData, key)
    setChildData(childData)
    const childKey = childData[0] ? childData[0].key : null
    setChildKey(childKey)
  }

  const onChildClick = key => {
    setChildKey(key)
  }

  const onChildChange = () => {

  }

  return (
    <div>
      <input></input>
      <button type='button'>Add</button>
      <TreeEditor
        treeData={treeData}
        treeKey={treeKey}
        childData={childData}
        childKey={childKey}
        onTreeItemClick={onTreeItemClick}
        onChildClick={onChildClick}
        onChildChange={onChildChange}
      />
      </div>
  );
}

export default App;
