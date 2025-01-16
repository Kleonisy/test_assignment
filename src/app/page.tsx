import { CountriesList } from "@/components/CountriesList";
import styles from "@/app/page.module.css";
import { useFetchCountries } from "@/api/useFetchCountries";

export default async function Home() {
  /** список стран */
  const countriesList = await useFetchCountries()

  return (
    <main className={styles.main}>
      <CountriesList countries={countriesList} />
    </main>
  )
}
