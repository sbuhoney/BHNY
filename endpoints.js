const express = require("express");
const app = express();
const port = 3001;
const { ethers } = require("ethers");

app.use(express.json());

const CONTRACT = "0xCc802c45B55581713cEcd1Eb17BE9Ab7fcCb0844";
const RPC_PROVIDER = "";
const PRIV = "";

app.get("/total", async function (req, res) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
  const walletWithProvider = new ethers.Wallet(PRIV, provider);
  const contract = new ethers.Contract(
    CONTRACT,
    require("./abi.json"),
    walletWithProvider
  );

  const totalSupply = await contract.totalSupply();
  res.send(ethers.utils.formatEther(totalSupply));
});

app.get("/circulating", async function (req, res) {
    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
    const walletWithProvider = new ethers.Wallet(PRIV, provider);
    const contract = new ethers.Contract(
      CONTRACT,
      require("./abi.json"),
      walletWithProvider
    );
  
    const totalSupply = await contract.totalSupply();
    const burned = await contract.balanceOf('0x000000000000000000000000000000000000dEaD');
    
    const circulating = (totalSupply - burned).toLocaleString('fullwide', {useGrouping:false});

    res.send(ethers.utils.formatEther(circulating));
});

app.get("/ping", async function (req, res) {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

