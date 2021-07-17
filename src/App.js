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
      }
    ]
  }
];

const getNodes = (treeData, key) => {
  // console.log('key', key)
  const keys = key.split('/')
  // console.log('keys', keys)

  let nodes = treeData
  let node
  keys.forEach(k => {
    // console.log('forEach', k, nodes)
    node = nodes.find(el => el.key === k)
    nodes = node.nodes
  })
  // console.log(node.nodes)
  return node.nodes ? node.nodes : []
}

const makeChildList = (treeData, key) => {
  const childNodes = getNodes(treeData, key)
  const children =
  childNodes ?
  childNodes.map(item => {
        let tmpItem = JSON.parse(JSON.stringify(item))
        tmpItem.origNodes = tmpItem.nodes
        tmpItem.nodes = []
        return tmpItem
    })
  : []
  return children
}

function App() {
  const [treeData, setTreeData] = useState(initTreeData)
  const initialActiveKey = initTreeData[0].key
  const initialChildKey = initTreeData[0].nodes ? initTreeData[0].nodes[0].key : null
  const [activeKey, setActiveKey] = useState(initialActiveKey)
  const [childKey, setChildKey] = useState(initialChildKey)
  const [children, setChildren] = useState(makeChildList(treeData, initialActiveKey))

  // const onClickItem = ({key, nodes}) => {
  const onClickItem = (props) => {
    const key = props.key
    console.log('clickedKey', key, props) //nodes)
    setActiveKey(key)
    // setChildKey(nodes ? `${activeKey}/${nodes[0].key}` : {})
    setChildren(makeChildList(treeData, key))
  }

  const onChildClick = key => {
    console.log('onChildClick', key, `${activeKey}/${key}`)
    setChildKey(`${activeKey}/${key}`)
  }

  const onChildChange = () => {

  }

  return (
    <div>
      <div>
        <input>
        </input>
        <button type='button'>
          Add
        </button>
      </div>
      <div >
        <div>
          <div style={{float: 'left', width: '50%'}}>
            <TreeMenu
              data={treeData}
              hasSearch={false}
              onClickItem={onClickItem}
              initialActiveKey={initialActiveKey}
            >
              {({ items }) => (
                <ul className='rstm-tree-item-group'>
                    {items.map(({key, ...props}) => (
                      <ItemComponent 
                        key={key}
                        {...props}
                        style={
                          key === childKey ? {background: '#ccc'} : {}
                        }
                      />
                    ))}
                </ul>
              )}
            </TreeMenu>
          </div>
          <div style={{float: 'left'}}>
            <ChildList
              children={children}
              childKey={childKey}
              onChildClick={onChildClick}
              onChildChange={onChildChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
