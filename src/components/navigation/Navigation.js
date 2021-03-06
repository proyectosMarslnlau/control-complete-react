import React, { Fragment, useEffect, useContext } from "react";
//Importamos el Navigation
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Importamos las paginas de cambio
import Login from "../parts/login/Login";
import Information from "../parts/information/Information";
import Download from "../parts/download/Download";
import Upload from "../parts/upload/Upload";
import Modify from "../parts/modify/Modify";
import Plataform from "../parts/plataform/Plataform";
import Insert from "../parts/insert/Insert";
//Importamos los errores
import ErrorPage from "../error/ErrorPage";
//Importamos los ITEM necesarios
import Navbar from "../items/Navbar";
import Footer from '../items/Footer';
//Importamos los USECONTEXT
import loginContext from "../../context/login/loginContext";
//+++++++++++++++++++++++++++++++++++++++++++
const Navigation = (props) => {
  //Invocamos las variables de CONTEXT
  const { logueo } = useContext(loginContext);
  useEffect(() => {
    if (logueo === false) {
    }
  }, []);
  return (
    <Fragment>
      <BrowserRouter>
        {logueo === false ? null : (
          <header>
            <Navbar />
          </header>
        )}
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/information" component={Information} />
            <Route exact path="/download" component={Download} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/modify/:id" component={Modify} />
            <Route exact path="/plataform" component={Plataform} />
            <Route exact path="/insert" component={Insert} />
            <Route component={ErrorPage} />
          </Switch>
        </main>
        {logueo === false ? null : (
          <Footer />
        )}
      </BrowserRouter>
    </Fragment>
  );
};

export default Navigation;
