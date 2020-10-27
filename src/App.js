import React, {Fragment} from 'react';
//Importamos el NAVIGATION
import Navigation from './components/navigation/Navigation';
//Importamos MATERIALIZE
import 'materialize-css/dist/css/materialize.min.css'
//Importamos los CONTEXT
import LoginState from './context/login/LoginState';
import InformationState from './context/information/InformationState';
import PlataformaState from './context/plataform/PlataformState';
import DownloadState from './context/download/DownloadState';
import UploadState from './context/upload/UploadState';
//+++++++++++++++++++++++++++++++++++++++++++
const App = () => {
  return ( 
    <Fragment>
      <LoginState>
        <InformationState>
          <PlataformaState>
            <DownloadState>
              <UploadState>
                <Navigation/>
              </UploadState>
            </DownloadState>
          </PlataformaState>
        </InformationState>
      </LoginState>
    </Fragment>
   );
}
 
export default App;
