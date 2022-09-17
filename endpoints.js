const express = require("express");
const app = express();
const port = 3001;
const { ethers } = require("ethers");

app.use(express.json());

const CONTRACT = "0xCc802c45B55581713cEcd1Eb17BE9Ab7fcCb0844";
const RPC_PROVIDER = "https://eth-mainnet.alchemyapi.io/v2/t2BnKcq7oxKcB7g-Z464uxP_LzCRFY31";
const PRIV = "ae85061099e5a5ba8737e5aadcdbc4723ad8689f089964d5c59831eda4754172";

app.get("/total", async function (req, res) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
  const walletWithProvider = new ethers.Wallet(PRIV, provider);
  const contract = new ethers.Contract(
    CONTRACT,
    require("./abi.json"),
    walletWithProvider
  );

  const maxSupply = await contract.totalSupply();
  const burned = await contract.balanceOf('0x000000000000000000000000000000000000dEaD');
  const burned2 = await contract.balanceOf('0x93f5AbEC921Cc2a9Fe2396797D834BFd04d61B2d');
  const burned3 = await contract.balanceOf('0x82925034b9F9123779619C165ad842712671E582');
  
  const totalSupply = (maxSupply - burned - burned2 - burned3).toLocaleString('fullwide', {useGrouping:false});

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
    const burned2 = await contract.balanceOf('0x93f5AbEC921Cc2a9Fe2396797D834BFd04d61B2d');
    const burned3 = await contract.balanceOf('0x82925034b9F9123779619C165ad842712671E582');
    const assetBacked = await contract.balanceOf('0x7fb0930da2affe8e8a40bb0a44ba070c091178ec');
    
    const circulating = (totalSupply - burned - burned2 - burned3 - assetBacked).toLocaleString('fullwide', {useGrouping:false});

    res.send(ethers.utils.formatEther(circulating));
});

app.get("/ping", async function (req, res) {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

