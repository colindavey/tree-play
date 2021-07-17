import { useState } from 'react'
import TreeMenu from 'react-simple-tree-menu';
// import './childList.css';

export default function ChildList({children, onChange}) {
    console.log('ChildList')
    console.log(children)
    // const results =
    // children ?
    // children.map(item =>
    //     <li key={item.key}>
    //         {item.label}
    //     </li>)
    // : []

    const onClickItem = props => {
        console.log(props)
    }

    const the_children =
    children ?
    children.map(item => {
        let tmpItem = JSON.parse(JSON.stringify(item))
        tmpItem.nodes = []
        return tmpItem
    })
    : []

    // initialActiveKey={initialActiveKey}

    const deleteChild = () => {
        console.log('delete')
    }
    const promoteToFirstChild = () => {
        console.log('promote')
    }
    const promoteChild = () => {
        console.log('promote')
    }
    const demoteChild = () => {
        console.log('demote')
    }

    return (
        <div>
            <div>
                <button
                    onClick={deleteChild}
                >
                    x
                </button>
                <button
                    onClick={promoteToFirstChild}
                >
                    ^^
                </button>
                <button
                    onClick={promoteChild}
                >
                    ^
                </button>
                <button
                    onClick={demoteChild}
                >
                    v
                </button>
            </div>
            <TreeMenu
                data={the_children}
                hasSearch={false}
                onClickItem={onClickItem}
            />
        </div>
    )
}
/*  
<ul>
    {results}
</ul>
*/
