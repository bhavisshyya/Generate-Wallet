import React, { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { encodeBase58 } from "ethers";
import "./SolanaWallet.css";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

import { FaRegEye } from "react-icons/fa";
import Balance from "./balance";

function SolanaWallet({ mnemonic }) {
  const [idx, setIdx] = useState(1);
  const [wallets, setWallets] = useState([]);
  const [privateKeyVisible, setPrivateKeyVisible] = useState({});
  const [selectedWallet, setSelectedWallet] = useState(null);
  const generate = () => {
    if (!mnemonic) {
      toast.error("🦄 Please generate mnemonic first");
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${idx}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key; //chainCode, key
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    console.log(keyPair.publicKey);
    setWallets([
      ...wallets,
      { publicKey: keyPair.publicKey, privateKeys: encodeBase58(secret) },
    ]);
    toast("🦄 Wallet created successfully");
    setPrivateKeyVisible((prevState) => ({
      ...prevState,
      [idx]: false, // Use the current idx value from state to initialize visibility
    }));
    setIdx(idx + 1);
  };

  const deleteWallet = (currIdx) => {
    const updatedWallets = wallets.filter((_, index) => index !== currIdx);
    setWallets(updatedWallets);
    toast.warn("🦄 Wallet deleted successfully", {});
  };
  const handleBalanceCheck = (publicKey) => {
    setSelectedWallet(publicKey);
  };
  return (
    <div className="solana">
      <div className="walletS">
      <p>Solana Wallet:</p> <button  onClick={() => generate()}> Add Wallet</button></div>
      <div className='wallet-box'>
        {wallets.map((wallet, idx) => (
          <div className='wallet-container' key={idx}>
            <div className='info'>
              <h3>Wallet{idx + 1}:</h3>
              <MdDeleteOutline
                onClick={() => deleteWallet(idx)}
                className='icon'
              />
            </div>

            <h5>Public Key :</h5>
            <p>{wallet.publicKey.toBase58()}</p>
            <h5>Private Key:</h5>
            <p className="hide">
              <p>{privateKeyVisible[idx] ? wallet.privateKeys : "*********************************"} </p>
              <FaRegEye style={{cursor:"pointer"}}
                onClick={() =>
                  setPrivateKeyVisible((prev) => ({
                    ...prev,
                    [idx]: !prev[idx], // Correctly toggle the visibility for this specific index
                  }))
                }
                className='icon'
              />
            </p>
            <div className="balance">
                <p>{selectedWallet && selectedWallet === wallet.publicKey && <Balance publicKey={selectedWallet} />} {/* Render the Balance component */}</p>
                <button onClick={() => handleBalanceCheck(wallet.publicKey)}>
                  Check Balance
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolanaWallet;
