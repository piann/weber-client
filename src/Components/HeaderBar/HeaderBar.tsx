import BackArrow from "../BackArrow";
import React from "react";
import styled from "../../typed-components";

interface IHeaderProps{
    backgroundColor?:string
    fontColor?:string    
}
interface IProps{
    backTo:string
    backArrowColor?:string
    className?:string
    text?:string
    backgroundColor?:string
    fontColor?:string
}

const HeaderContainer = styled<IHeaderProps&any>("div")`
    top:0px;
    height: 60px;
    background-color:${props=> props.backgroundColor || "rgba(27,30,55,0.5)"};
    color:${props=>props.fontColor || "whitesmoke"};
    font-size:23px;
    display:flex;
    align-items:center;
    font-family: 'Alegreya Sans SC', sans-serif;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
    margin-bottom:40px;
`

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;


const HeaderBar:React.SFC<IProps> = ({backTo, backArrowColor, className, text, backgroundColor, fontColor}) =>(
    <HeaderContainer backgroundColor={backgroundColor} fontColor={fontColor}>
        <BackArrow backTo={backTo} color={backArrowColor || "whitesmoke"}/><Text>{text || ""}</Text>
    </HeaderContainer>
)

export default HeaderBar;