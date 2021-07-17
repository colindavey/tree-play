import './App.css';
import { useState } from 'react'
// import TreeMenu from 'react-simple-tree-menu';
import TreeMenu, { ItemComponent} from 'react-simple-tree-menu';
// import { ListGroupItem, Input, ListGroup } from 'reactstrap';
//, ListItem 

// import default minimal styling or your own styling
// import '../node_modules/react-simple-tree-menu/dist/main.css';
import './tree.css';
// Use the default minimal UI
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
  console.log('key', key)
  const keys = key.split('/')
  console.log('keys', keys)

  let nodes = treeData
  let node
  keys.forEach(k => {
    console.log('forEach', k, nodes)
    node = nodes.find(el => el.key === k)
    nodes = node.nodes
  })
  console.log(node.nodes)
  return node.nodes ? node.nodes : []
}

function App() {
  const [treeData, setTreeData] = useState(initTreeData)
  const initialActiveKey = initTreeData[0].key
  const [children, setChildren] = useState(getNodes(treeData, initialActiveKey))
  // console.log(treeData)
  console.log('children', children)

  const onClickItem = props => {
    // console.log('click', props.nodes())
    // console.log(treeData)
    setChildren(getNodes(treeData, props.key))
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
                        style={props.label === '1.2' ? {backgroundColor: 'red'} : {}}
                      />
                    ))}
                </ul>
              )}
            </TreeMenu>
          </div>
          <div style={{float: 'left'}}>
            <ChildList
              children={children}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
//<div style={{float: 'left'}}>
/*
{({ items }) => (
  <ul className='rstm-tree-item-group'>
      {items.map(({key, ...props}) => (
        <ItemComponent key={key} {...props} />
      ))}
  </ul>
)}
*/
export default App;
