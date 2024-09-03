import { generateMnemonic } from "bip39";
import React from "react";
import { useState } from "react";
import SolanaWallet from "./SolanaWallet";
import "./Component.css";
import { toast } from "react-toastify";
function Component() {
  const [mnemonic, setMnemonic] = useState("");
  const createSecretPhrase = () => {
    if (mnemonic) {
      toast.error("🦄 Mnemonic already generated");
      return;
    }
    const mne = generateMnemonic();
    setMnemonic(mne);
    toast("🦄 Mnemonic created successfully");
  };
  return (
    <div>
      <div className='center'>
        <h1>Wallet Generator </h1>
      </div>

      <div className='mnemonic'>
        <h3 style={{margin:0}} >SECRET RECOVERY PHRASE</h3>
        <h6 style={{margin:0}}>Save these words in a safe place.</h6>

        <div className="mnemonicContainer">
        <input
          type='text'
          placeholder='Generate your secret phrase '
          value={mnemonic}
          readOnly
        />
        <button className="generateBtn" onClick={() => createSecretPhrase()}>Generate Mnemonic</button>
        </div>
      </div>

      <div className='addWallet'>
        <SolanaWallet mnemonic={mnemonic} />
      </div>
    </div>
  );
}

export default Component;
