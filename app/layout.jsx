import "@styles/globals.css";

import Nav from "@components/Nav";
// import Nav from "../components/Nav";
import Provider from "@components/Provider";
// import Provider from "../components/Provider";

export const metadata = {
  title: "Quiz App",
  description: "Discover & Take Variety of Quizzes",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
