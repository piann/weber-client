import React from "react";
import styled from "../../typed-components";


const Container = styled.div`
 width:75vw;
 margin-top:17px;
 margin-left:5vw;
 z-index:7;
 background-color: whitesmoke;
 height: 40px;
 border-radius: 40px;
 display: flex;
 justify-content:space-between;
 align-items:center;
 box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
`;

const InputInner = styled.input`
z-index:8;
width:55vw;
margin-left:22px;
background: transparent;
border: none;
border-radius: 5px;
-webkit-appearance: none;
border: 0;
font-size: 14px;
padding-top:5px;
padding-bottom:5px;
`;

const ButtonWrapper = styled.button`
border: 0;
background: transparent;
margin-right:7px;
`;

interface IProps{
    className? : string;
    onBlur?: ()=>void;
    value:string;
    name:string;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?:string;
    onClick?:any
}


const SearchBar:React.SFC<IProps> = ({className, onBlur, value, name, onChange, placeholder, onClick}) => {
    
    return(
    <Container className={className}>
        <InputInner 
        onBlur={onBlur}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        />
        <ButtonWrapper onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/>
        </svg>
        </ButtonWrapper>
    </Container>
    );
}

export default SearchBar;