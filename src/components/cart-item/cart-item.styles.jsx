import styled from 'styled-components'


export const CartItemContainer = styled.div`
width: 100%;
display: flex;
height: 80px;
margin-bottom: 15px;
`


export const CartItemImage = styled.div`
  width: 30%;
  background-position:center;
  background-size:cover;
  background-image:${({imageUrl})=>`url(${imageUrl})`}
`

export const ItemDetails = styled.div`
width: 70%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 10px 20px;`


export const ItemName= styled.span`
font-size: 16px;
`

export const ItemPrice = styled.span`
font-size: 16px;
`

// .cart-item-container {
//     width: 100%;
//     display: flex;
//     height: 80px;
//     margin-bottom: 15px;
  
//     img {
//       width: 30%;
//     }
  
//     .item-details {
//       width: 70%;
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       justify-content: center;
//       padding: 10px 20px;
  
//       .name {
//         font-size: 16px;
//       }
//     }
//   }
  