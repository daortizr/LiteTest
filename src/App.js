import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [companies, setCompanies] = useState([]);
  const [crearEmpresa, setCrearEmpresa] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(undefined);
  const [dataCompany, setDataCompany] = useState(undefined);
  const [tempNit, setTempNit] = useState(undefined);
  const [tempName, setTempName] = useState(undefined);
  const [tempPhone, setTempPhone] = useState(undefined);
  const [tempAddress, setTempAddress] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const list = await getCompanies()
      setCompanies(list)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const data = companies.filter(company => company.nit === selectedCompany);
    setDataCompany(data[0]);
  }, [selectedCompany])

  useEffect(() => {
    if (dataCompany !== undefined) {
      setTempNit(dataCompany.nit);
      setTempAddress(dataCompany.address);
      setTempName(dataCompany.name);
      setTempPhone(dataCompany.phoneNumber);
    }
  }, [dataCompany])

  const getCompanies = async () => {
    const functionURL = 'https://77gf84bqc9.execute-api.us-east-1.amazonaws.com/test/get-companies';
    const companiesList = await axios.get(functionURL);
    return companiesList.data
  }
  
  const createCompany = async () => {
    const body = {
      nit: `${tempNit}`,
      name: `${tempName}`,
      address: `${tempAddress}`,
      phoneNumber: `${tempPhone}`
    };
    const functionURL = 'https://ybrxp74ckf.execute-api.us-east-1.amazonaws.com/test/create-company';
    const companiesList = await axios.post(functionURL, body);
  }
  
  const deleteCompany = async () => {
    const body = {
      nit: `${tempNit}`,
    };
    const functionURL = 'https://xx6sveahhl.execute-api.us-east-1.amazonaws.com/Test/delete-company';
    const companiesList = await axios.post(functionURL, body);
  }

  const getDisable = () => {
    return !(tempName !== undefined && tempNit !== undefined && tempAddress !== undefined && tempPhone !== undefined && tempName !== '' && tempNit !== '' && tempAddress !== '' && tempPhone !== '')
  }

  const getRows = () => {
    if (companies.length > 0) {
      return companies.map((company, index) => {
        return (
          <div className='App-card' onClick={() => {
            setSelectedCompany(company.nit)
            setCrearEmpresa(false)
          }}>
            <b>{company.name}</b>
          </div>
        )
      })
    }
    else {
      return (
        <b>No hay data</b>
      );
    }
  }

  const renderDescription = () => {
    if (crearEmpresa) {
      return (
        <div className='App-column2'>
          <div className='App-char'>
            <div className='App-char'>
              <b>NIT</b>
              <input value={tempNit} onChange={(e) => { setTempNit(e.target.value) }}></input>
            </div>
            <div className='App-char'>
              <b>NOMBRE</b>
              <input value={tempName} onChange={(e) => { setTempName(e.target.value) }}></input>
            </div>
            <div className='App-char'>
              <b>DIRECCION</b>
              <input value={tempAddress} onChange={(e) => { setTempAddress(e.target.value) }}></input>
            </div>
            <div className='App-char'>
              <b>TELEFONO</b>
              <input value={tempPhone} onChange={(e) => { setTempPhone(e.target.value) }}></input>
            </div>
          </div>
          <div className='App-button-area'>
            <button onClick={() => { createCompany() }} disabled={getDisable()}>Crear</button>
            <button onClick={() => { setCrearEmpresa(false) }}>Cancelar</button>
          </div>
        </div>
      );
    }
    else {
      if (selectedCompany !== undefined && selectedCompany !== null && dataCompany !== undefined) {
        return (
          <div className='App-column2'>
            <div className='App-char'>
              <div className='App-char'>
                <b>NIT</b>
                <input value={dataCompany.nit ?? ''} disabled></input>
              </div>
              <div className='App-char'>
                <b>NOMBRE</b>
                <input value={tempName} onChange={(e) => { setTempName(e.target.value) }}></input>
              </div>
              <div className='App-char'>
                <b>DIRECCION</b>
                <input value={tempAddress} onChange={(e) => { setTempAddress(e.target.value) }}></input>
              </div>
              <div className='App-char'>
                <b>TELEFONO</b>
                <input value={tempPhone} onChange={(e) => { setTempPhone(e.target.value) }}></input>
              </div>
            </div>
            <div className='App-button-area'>
              <button onClick={() => { createCompany() }} disabled={getDisable()}>Actualizar</button>
              <button onClick={() => { deleteCompany() }}>Eliminar</button>
            </div>
          </div>
        )
      }
      else {
        return (
          <b>aca va mas data</b>
        );
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          LiteApp
        </h1>
        <div className="App-body">
          <div className='App-column1'>
            {getRows()}
            <div className='App-card' onClick={() => {
              setCrearEmpresa(true)
              setSelectedCompany(undefined)
            }}>
              <b>Crear empresa</b>
            </div>
          </div>
          <div className='App-column2'>
            {renderDescription()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
