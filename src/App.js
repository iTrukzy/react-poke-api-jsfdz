import React, { useState, useEffect } from 'react'
import { ErrorMessage } from './components/ErrorMessage'
import { SearchBar } from './components/SearchBar'
import { Filters } from './components/Filters'
import { PokeCard } from './components/PokeCard'

function App() {
  const
    BASE = "https://pokeapi.co/api/v2/",

    [value, setValue] = useState(''),
    [query, setQuery] = useState(''),
    [amount, setAmount] = useState('10'),
    [check, setCheck] = useState(false),
    [errorMsg, setErrorMsg] = useState(''),

    [onePoke, setOnePoke] = useState([]),
    [pokes, setPokes] = useState([])

  useEffect(() => {
    const
      getPokemonName = async (query) => {
        fetch(`${BASE}pokemon/${query}`)
          .then(response => response.ok ? response.json() : Promise.reject(response))
          .then(data => setOnePoke([data]))
          .catch(error => error.status === 404 ? setErrorMsg('No results found with that pokemon name or id') : console.error(error))
      },

      getPokemonType = async (query) => {
        fetch(`${BASE}type/${query}`)
          .then(response => response.ok ? response.json() : Promise.reject(response))
          .then(data => setPokes(data.pokemon.slice(0, amount)))
          .catch(error => error.status === 404 ? setErrorMsg('No results found with that type of pokemon or id') : console.error(error))
      }

    if (query !== '') {
      if (check) {
        getPokemonType(query)
        setOnePoke([])
      } else {
        getPokemonName(query)
        setPokes([])
      }
    }

  }, [query])

  const
    handleSubmit = (e) => {
      e.preventDefault()
      setQuery(value)
      e.target[0].value = ''
    },

    getValue = (e) => {
      setValue(e.target.value)
      setErrorMsg('')
    },

    getAmount = (e) => {
      setAmount(e.target.value)
      setErrorMsg('')
    },

    handleCheck = () => {
      setCheck(!check)
      setErrorMsg('')
    },

    arrPokes = pokes.map((poke, index) => <PokeCard key={index + 1} name={poke.pokemon.name} url={poke.pokemon.url} />),
    arrPoke = onePoke.map((poke, index) => <PokeCard key={index + 1} name={poke.name} url={`${BASE}pokemon/${poke.id}`} />)

  return (
    <div className="PokeApp">

      <h1>PokeApi</h1>

      <ErrorMessage msg={errorMsg} />

      <form onSubmit={handleSubmit}>
        <SearchBar value={getValue} check={check} />
        <Filters handleCheck={handleCheck} check={check} amount={getAmount} />
      </form>

      <div className="poke-container">
        {onePoke.length > 0 && arrPoke}
        {pokes.length > 0 && arrPokes}
      </div>

    </div>
  )
}

export default App
