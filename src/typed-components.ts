import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export interface IThemeInterface {
    greenColor:string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;