import React, { useEffect, useState } from 'react'
import './App.css';
import Linegraph from './components/Linegraph';
import Card from './components/Card';
import CovidSummary from './components/CovidSummary';
import axios from './axios'

function App() {
  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [totalDeath, setTotalDeath] = useState(0)
  const [country, setCountry] = useState('')
  const [days, setDays] = useState(7)
  const [loading, setLoading] = useState(false)
  const [covideSummary, setCovidSummary] = useState({})
  const [coronaCountArr, setCoronaCountArr] = useState([])
  const [label, setLabel] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get('/summary')
      .then(res => {
        console.log(res);
        setLoading(false)
        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed)
          setTotalRecovered(res.data.Global.TotalRecovered)
          setTotalDeath(res.data.Global.TotalDeaths)
          setCovidSummary(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })

  }, [])

  const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate()
    return `${year}-${month}-${_date}`
  }

  const countryHandler = (e) => {
    setCountry(e.target.value)
    const d = new Date();
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - days))
    console.log(from, to);
    getCoronaReportByDateRange(e.target.value, from, to)
  }
  const daysHandler = (e) => {
    setDays(e.target.value)
    const d = new Date();
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - e.target.value))
    getCoronaReportByDateRange(country, from, to)
  }

  const getCoronaReportByDateRange = (countrySlug, from, to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
      .then(res => {
        console.log(res);

        const yAxisCoronaCount = res.data.map(d => d.Cases);
        const xaxisLabel = res.data.map(d => d.Date)
        const covidDetails = covideSummary.Countries.find(country => country.Slug === countrySlug)
        setCoronaCountArr(yAxisCoronaCount);
        setTotalConfirmed(covidDetails.TotalConfirmed)
        setTotalRecovered(covidDetails.TotalRecovered)
        setTotalDeath(covidDetails.TotalDeaths)
        setLabel(xaxisLabel);
      })
      .catch(err => {
        console.log(err);
      })
  }


  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading Please Wait...</h1>
  }
  return (
    <div className="App">
      <CovidSummary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeath={totalDeath}
        country={country}
      />
      <div>
        <select value={country} onChange={countryHandler}>
          <option value="">Select Country</option>
          {
            covideSummary.Countries && covideSummary.Countries.map(country =>
              <option value={country.Slug} key={country.Slug}>{country.Country}</option>
            )
          }
        </select>
        <select value={days} onChange={daysHandler}>
          <option value='7'>Last 7 Days</option>
          <option value='30'>Last 30 Days</option>
          <option value='90'>Last 90 Days</option>
        </select>
      </div>
      <Linegraph
        yAxis={coronaCountArr}
        label={label}
      />
    </div>
  );
}

export default App;
