import React from "react";
import styled from "../../typed-components";
import LoadingSpin from '../LoadingSpin';

const Container = styled.div``;

const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 40px;
  margin-left:auto;
  margin-right:auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
    uploading: boolean;
    fileUrl: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

  const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => (
    <Container>
      <Input id={"photo"} type="file" accept="image/*" onChange={onChange} />
      <Image htmlFor="photo">
      {/* loading image */}
        {uploading && <LoadingSpin/>}
      {/* profile image */}  
        {!uploading && <img src={fileUrl} />}
      </Image>
    </Container>
  );
  


export default PhotoInput;