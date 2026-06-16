import logo from './logo.svg';



import { useState, useEffect } from 'react'
import axios from 'axios'



function GetAllData(setCountries) {


  useEffect(() => {


    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)

      })


  }, [])

}

function GetWeather(city ,setWeather) {


  useEffect(() => {

    let apiKey = process.env.REACT_APP_API_KEY

    let url = "http://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey


    axios.get(url)
      .then((response) => {
        
        let data = response.data
        setWeather(data)



      })


  }, [])

}

function App() {

  const [countries, setCountries] = new useState([])
  const [filterName, setFilterName] = new useState("")
  const [weather, setWeather] = new useState(null)

  let filterInputHandler = (e) => {

    setFilterName(e.target.value)

  }

  
  let showButtonHandler = (countryName) => {

    setFilterName(countryName)

  }

  

  let filterProps = { filterInputHandler, filterName  }

  let allStates = { countries, filterName, showButtonHandler , setWeather, weather}

  GetAllData(setCountries)



  return (
    <div>

      <Filter {...filterProps} />
      <DisplayCountries {...allStates} />

    </div>
  );
}



function Filter({ filterName, filterInputHandler }) {
  return (
    <>
      <h2>Select country</h2>
      filter by name that includes: <input value={filterName} onChange={filterInputHandler} />
    </>
  )

}
function DisplayCountries(props) {
  let { countries, filterName, showButtonHandler } = props

  if (countries.length == 0) {
    return (<>
    </>)
  }



  let listCountriesSelected = countries.filter((country) => {

    let countryOfficialNameText = country.name.official.toLowerCase()
    let countryCommonNameText = country.name.common.toLowerCase()
    let filterText = filterName.toLowerCase()

    return countryOfficialNameText.includes(filterText) || countryCommonNameText.includes(filterText)


  })

  if (listCountriesSelected.length == 0) {
    return (

      <>
        <h2>Countries</h2>
        <p>No country match with that filter </p>


      </>
    )
  }

  if (listCountriesSelected.length > 10) {
    return (

      <>
        <h2>Countries</h2>
        <p>Too many matches , specify another filter </p>


      </>
    )
  }

  if (listCountriesSelected.length == 1) {
    let country = listCountriesSelected[0]
    return (

      <>
        <h2>Country</h2>
        <DisplaySpecificCountry country={country} {...props} />


      </>
    )
  }




  return (
    <>

      <h2>Countries</h2>
      {
        listCountriesSelected.map((country) => {
          return (
            <div key={"div" + country.name.common} style={{ display: 'flex', alignItems: 'center', gap: "2px" }}>
              <p key={country.name.common}> {country.name.common}  </p>
              <button onClick={() => {showButtonHandler(country.name.official)
              }}>  show </button>


            </div>)
        })
      }


    </>
  )
}

function DisplaySpecificCountry(props) {
  let { country, setWeather, weather } = props

  let name, officialName, capital, area, languages, flagLink, flagAlt , mainCapital

  
  name = country.name.common
  officialName = country.name.official
  capital = country.capital.join(" and ")
  mainCapital = country.capital[0]
  area = country.area
  languages = country.languages

  let languagesList = []
  for (const key in languages) {
    if (Object.hasOwnProperty.call(languages, key)) {
      const element = languages[key];
      languagesList.push(element)
      
    }
  }

  flagLink = country.flags.png
  flagAlt = country.flags.alt

  GetWeather(mainCapital, setWeather)


  return (

    <div key={"div" + name} >

      <h1> {name}</h1>
      <h2>{officialName}</h2>
      <p> {"capital: " + capital} </p>
      <p> {"area: " + area}</p>

      <h2> languages</h2>
      <ul>
      {languagesList.map((language) => {
        return (<li key = {language}> {language}</li>)
      })}
    </ul>

    <img src={flagLink} alt={flagAlt} ></img>

    <DisplayWeather weather = {weather} />






    </div>
  )

  function DisplayWeather({weather}){

    if (weather) {
      return ( 
        <>
      <h2> Weather</h2>
      <p> {"temperature: " + weather.main.temp} </p>
      <img src={"https://openweathermap.org/img/wn/"+ weather.weather[0].icon +"@2x.png"}  ></img>
        <p> {"wind: " + weather.wind.speed}</p>
        </>
        )
    }
    return ( 
       <>
     
        </>)

  }







}


export default App;
