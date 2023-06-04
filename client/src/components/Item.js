import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

function Item({item}) {
  const dispatch = useDispatch()
  function addTocart(){
      dispatch({type:'addToCart' , payload : {...item , quantity:1}})
  }
  return (
    <div className='item' onClick={()=>addTocart()}>
        <p className='name'>{item.name}</p>
        <p className='price'><b>Price : </b>{item.price} tk</p>
        
    </div>
  )
}

export default Item