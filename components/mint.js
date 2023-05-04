import styles from "../styles/Mint.module.css";
import {contractAddress, contractABI} from "../components/contract";
import { ethers } from "ethers";
import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFT() {
  // Prepare the contract write configuration by providing the contract's address, ABI, function name, and overrides
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "mint",
    args:[1],
    overrides: {
      value: ethers.utils.parseEther("0"), //the integer value should match your nft minting requirements
    },
  });

  // Use the useContractWrite hook to write to the contract's mint function and obtain the transaction data and write function
  const { data, write } = useContractWrite(config);

  // Use the useWaitForTransaction hook to wait for the transaction to be mined and return loading and success states
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Render the component with a button that triggers the mint transaction when clicked, a loading message while the transaction is in progress, and a success message when the transaction is successful
  return (
    <div className={styles.mintcontainer}>
      <h1 className={styles.text}>Don't have any NFTs? Mint your Dogepunks NFT!</h1>
      <button
        disabled={!write || isLoading}
        onClick={() => write?.()}
        className={styles.button49}
      >
        {isLoading ? "Minting..." : "Free Mint"}
      </button>
      {isSuccess && (
        <div>
               <h1 className={styles.text}>Successfully minted your NFT!</h1>
        </div>
      )}
    </div>
  );
}