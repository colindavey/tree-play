// import { useState } from 'react'
import TreeMenu from 'react-simple-tree-menu';

export default function ChildList({children, childKey, path, onChildClick, onChildChange}) {
    // console.log('ChildList')
    // console.log(children, childKey)

    const onClickItem = ({key}) => {
        console.log('clickChild', key)
        onChildClick(key)
    }

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
                    type='button'
                    onClick={deleteChild}
                >
                    x
                </button>
                <button
                    type='button'
                    onClick={promoteToFirstChild}
                >
                    ^^
                </button>
                <button
                    type='button'
                    onClick={promoteChild}
                >
                    ^
                </button>
                <button
                    type='button'
                    onClick={demoteChild}
                >
                    v
                </button>
            </div>
            <TreeMenu
                initialActiveKey={childKey}
                data={children}
                hasSearch={false}
                onClickItem={onClickItem}
            />
        </div>
    )
}
