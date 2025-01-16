'use client'
import Image from "next/image";
import { useState } from "react";
import { UseFetchCountries } from "@/api/useFetchCountries";
import styles from './CountriesList.module.css'

interface CountriesListPropTypes {
  countries: UseFetchCountries[]
}

/** компонент списка стран */
export const CountriesList = ({ countries }: CountriesListPropTypes ) => {
  /** стейт фильтруемого списка стран */
  const [countriesState, setCountriesState] = useState(countries)
  /** стейт для сохранения удаленного элемента с задержкой */
  const [deletedCountry, setDeletedCountry] = useState<string | null>(null)
  /** обработчик удаления страны из списка */
  const handleDeleteCountry = (countryTitle: string) => {
    setDeletedCountry(countryTitle)

    setTimeout(() => {
      const reducedCountriesList = countriesState.filter(country => country.name_ru !== countryTitle)
      setCountriesState(reducedCountriesList)
      setDeletedCountry(null)
    }, 500)
  }

  return (
    <>
      <ul className={styles.countriesList}>
        {countriesState.map(({ name_ru, flag_url }) => (
          <li
            key={name_ru}
            className={deletedCountry === name_ru ? styles.swipeLeft : ''}
          >
            <Image
              src={flag_url ? `https:${flag_url}` : '/default_flag.webp'}
              alt="flag"
              width={8}
              height={8}
              priority
            />
            {name_ru}
            <button
              type="button"
              onClick={() => handleDeleteCountry(name_ru)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
