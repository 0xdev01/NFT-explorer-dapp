import styles from "../styles/LoggedIn.module.css";
import FetchData from "./fetchData";
import {contractAddress, contractABI} from "../components/contract";

export default function LoggedIn() {
  return (
    <section className={styles.loggedInMain}>
        <section className={styles.loggedInAccount}>
          <FetchData />
        </section>
    </section>
  );
}
