import styled from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  // this means any button that contains these classes will have following styles, this is called nesting
  ${BaseButton},${GoogleSignInButton},${InvertedButton} {
    margin-top: auto;
  }
`;

//empty message
export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

//cart items
export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

//   .hide{
//     opacity: 0;
//   }
