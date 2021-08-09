// import { useState } from 'react'
import TreeMenu from 'react-simple-tree-menu';

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

export default function ChildList({childData, childKey, path, onChildClick, onChildChange, setChildKey}) {
    const onClickItem = ({key}) => {
        onChildClick(key)
    }

    const deleteChild = () => {
        console.log('delete')
        const oldIndex = getOldIndex(childData, childKey)
        childData.splice(oldIndex, 1)
        onChildChange(childData)
        const newIndex = oldIndex <= childData.length-1 ? oldIndex : oldIndex-1
        setChildKey(childData[newIndex].key)
    }

    const promoteToFirstChild = () => {
        const oldIndex = getOldIndex(childData, childKey)
        if (oldIndex !== 0) {
            moveItem(childData, oldIndex, 0)
        }
        onChildChange(childData)
    }

    const promoteChild = () => {
        const oldIndex = getOldIndex(childData, childKey)
        if (oldIndex !== 0) {
            moveItem(childData, oldIndex, oldIndex - 1)
        }
        onChildChange(childData)
    }

    const demoteChild = () => {
        const oldIndex = getOldIndex(childData, childKey)
        if (oldIndex !== childData.length - 1) {
            moveItem(childData, oldIndex, oldIndex + 1)
        }
        onChildChange(childData)
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
