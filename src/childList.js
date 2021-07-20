// import { useState } from 'react'
import TreeMenu from 'react-simple-tree-menu';

export default function ChildList({childData, childKey, path, onChildClick, onChildChange}) {
    const onClickItem = ({key}) => {
        onChildClick(key)
    }

    // initialActiveKey={initialActiveKey}
    const moveItem = (data, from, to) => {
        console.log('moveItem', data, from, to)
        // remove `from` item and store it
        var f = data.splice(from, 1)[0];
        // insert stored item into position `to`
        data.splice(to, 0, f);
        console.log('  ', data)
    }

    const getOldIndex = (data, key) => {
        return data.findIndex(item => item.key === key)
    }

    const deleteChild = () => {
        console.log('delete')
    }

    const promoteToFirstChild = () => {
        console.log('promote')
    }

    const promoteChild = () => {
        const oldIndex = getOldIndex(childData, childKey)
        if (oldIndex !== 0) {
            moveItem(childData, oldIndex, oldIndex - 1)
        }
    }

    const demoteChild = () => {
        const oldIndex = getOldIndex(childData, childKey)
        if (oldIndex !== childData.length - 1) {
            moveItem(childData, oldIndex, oldIndex + 1)
        }
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
                activeKey={childKey}
                initialFocusKey={childKey}
                focusKey={childKey}
                data={childData}
                hasSearch={false}
                onClickItem={onClickItem}
            />
        </div>
    )
}
