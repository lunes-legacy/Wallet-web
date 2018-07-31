import styled from 'styled-components'
import { InputBase } from 'Components/forms/bases';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  ${InputBase};
  color: white;
  font-weight: bold;
  &::placeholder {
    color: white;
    font-weight: 100;
  }
`;

export {
  Wrapper,
  Input,
}
