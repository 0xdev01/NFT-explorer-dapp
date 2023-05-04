import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Card from "./card";
import styles from "../styles/FetchData.module.css";

export default function FetchData() {
  const { address } = useAccount();
  const [data, setData] = useState([]);

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": "CoNTlRyNkYRLXxkb3AO1hkQEGpd0lpLBmrAQjxD4PXcTuwZ63WXluTTs423B9lqG",
      },
    };

    useEffect(() => {
      fetch(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=mumbai&format=decimal`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setData(response.result);
        })
        .catch((err) => console.error(err));
    }, [])

  return (
    <section className={styles.dataContainer}>
      {data?.map(nft => {
        return (
          <Card uri={nft} key={nft.block_number_minted} />
        )
      })}
    </section>
  );
}
