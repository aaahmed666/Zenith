import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customColors: {
      primary: string;
      secondary: string;
      third: string;
      accent: string;
      card: string;
      text: string;
      divider: string;
      button: string;
      navbar: string;
      leader: string;
      comment: string;
      replay: string;
      footer: string;
      border: string;
      content: string;
    };
  }

  interface ThemeOptions {
    customColors?: {
      primary?: string;
      secondary?: string;
      third?: string;
      accent?: string;
      card?: string;
      text?: string;
      divider?: string;
      button?: string;
      navbar?: string;
      leader?: string;
      comment?: string;
      replay?: string;
      footer?: string;
      border?: string;
      content?: string;
    };
  }
}
