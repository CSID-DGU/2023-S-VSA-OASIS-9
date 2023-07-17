import styled from 'styled-components';
import {
  pointColor,
  primaryColor,
  secondaryColor,
  whiteColor,
} from '../../GlobalStyles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: space-between;
  align-items: center;
  width: 60px;
  height: 450px;
  border-radius: 23px;
  border: 7px solid #D9D9D9;
  background-color: ${whiteColor};
`;

export const Button = styled.button`
  height: 50px;
  width: 50px;
  background-color: ${whiteColor};
  border-style: none;
`;
