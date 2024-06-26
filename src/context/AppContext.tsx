//@ts-nocheck
import { ReactNode, createContext, useState } from "react";
import { User } from "../types/user";

export const AppContext = createContext<User | null>(null);

const getUserFromLocalStorage = () => {
  //@ts-ignore
  return JSON.parse(localStorage.getItem("user")) || null;
};

const Appcontext = ({ children }: { children: ReactNode }) => {
  // const quizzes = [
  //   {
  //     question: "What does HTML stand for?",
  //     options: [
  //       "Hyper Trainer Marking Language",
  //       "Hyper Text Marketing Language",
  //       "Hyper Text Markup Language",
  //       "Hyper Text Markup Leveler",
  //     ],
  //     answer: "Hyper Text Markup Language",
  //   },
  //   {
  //     question:
  //       "Which of the following is the correct structure for an HTML document?",
  //     options: [
  //       "<html><head></head><body></body></html>",
  //       "<head><html></html><body></body></head>",
  //       "<body><head></head><html></html></body>",
  //       "<html><body></body><head></head></html>",
  //     ],
  //     answer: "<html><head></head><body></body></html>",
  //   },
  //   {
  //     question: "Which HTML element is used to define the title of a document?",
  //     options: ["<head>", "<title>", "<header>", "<top>"],
  //     answer: "<title>",
  //   },
  //   {
  //     question: "What is the purpose of the <body> tag in HTML?",
  //     options: [
  //       "It defines the document's head section.",
  //       "It contains all the content such as text, images, and links.",
  //       "It is used to define the main content of an HTML document.",
  //       "It specifies the body of the email content in HTML.",
  //     ],
  //     answer: "It contains all the content such as text, images, and links.",
  //   },
  //   {
  //     question: "Which HTML tag is used to create a hyperlink?",
  //     options: ["<hyperlink>", "<link>", "<a>", "<href>"],
  //     answer: "<a>",
  //   },
  //   {
  //     question: "Which tag is used to display images in HTML?",
  //     options: ["<img>", "<image>", "<src>", "<pic>"],
  //     answer: "<img>",
  //   },
  //   {
  //     question:
  //       "What attribute is used to provide the path of an image in the <img> tag?",
  //     options: ["link", "src", "href", "url"],
  //     answer: "src",
  //   },
  //   {
  //     question: "Which HTML tag is used to create an unordered list?",
  //     options: ["<ul>", "<ol>", "<list>", "<li>"],
  //     answer: "<ul>",
  //   },
  //   {
  //     question: "What does the <br> tag do?",
  //     options: [
  //       "It breaks the text into two sections.",
  //       "It creates a bold text.",
  //       "It inserts a line break.",
  //       "It adds a new row in a table.",
  //     ],
  //     answer: "It inserts a line break.",
  //   },
  //   {
  //     question: "In HTML, what does the `fieldset` tag do?",
  //     options: [
  //       "It is used to group related data in a form.",
  //       "It sets the field to a fixed size.",
  //       "It automatically validates the fields within a form.",
  //       "It hides the fields in a form.",
  //     ],
  //     answer: "It is used to group related data in a form.",
  //   },
  // ];
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  function login(user: User) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default Appcontext;
