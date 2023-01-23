async function executeFlashbot() {
    const ethers = require("ethers")
    const {
        FlashbotsBundleProvider,
      } = require("@flashbots/ethers-provider-bundle");
    
    const provider = await new ethers.getDefaultProvider("goerli");
    const authSigner = await new ethers.Wallet(
      '0x2000000000000000000000000000000000000000000000000000000000000000',
      provider
    );
      
    const flashbotsProvider = await FlashbotsBundleProvider.create(
      provider,
      authSigner,
      "https://relay-goerli.flashbots.net",
      "goerli"
    );


    const wallet = await new ethers.Wallet(PRIVATE_KEY);
    const signedTransactions =  await flashbotsProvider.signBundle([
        {
          signer: wallet,
          transaction: {
            to: "0x7bC0F471b287da69f0fb1bCF2218Fab947BBe0e9",
            gasPrice: 10,
            gasLimit: 21000,
            chainId: 5,
            value: 1000,
          },
        },
        {
          signer: wallet,
          transaction: {
            to: "0x7bC0F471b287da69f0fb1bCF2218Fab947BBe0e9",
            gasPrice: 10,
            gasLimit: 21000,
            chainId: 5,
            value: 2000,
          },
        },
        {
        signer: wallet,
        transaction: {
          to: "0x7bC0F471b287da69f0fb1bCF2218Fab947BBe0e9",
          gasPrice: 10,
          gasLimit: 21000,
          chainId: 5,
          value: 3000,
        },
      },
      ]);
    
    const blockNumber =  await provider.getBlockNumber();
    
    const bundleSubmission = await flashbotsProvider.sendRawBundle(
          signedTransactions,
          blockNumber + 3
        );
    console.log("submitted for block # ", blockNumber + 3);
}

executeFlashbot()