import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    navBackground: "#24292e",
    mainBackgroud: "#e1e4e8",
    inputBorder: "#666666",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    android: "Roboto",
    ios: "Arial",
    default: "System",
  }),
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  button: {
    color: "white",
    backgroundColor: "#0366d6",
    borderRadius: 5,
    paddingVertical: 15,
    margin: 10,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 40,
  },
  deleteButton: {
    color: "white",
    borderRadius: 5,
    paddingVertical: 15,
    margin: 10,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 40,
    backgroundColor: "#d6394c",
  },
  separator: {
    height: 10,
  },
};

export default theme;
