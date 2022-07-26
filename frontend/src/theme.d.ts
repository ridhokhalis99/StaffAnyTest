import { Theme } from "@material-ui/core/styles/createTheme";

declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    color: {
      [name: string]: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: {
      [name: string]: string;
    };
  }
}
