import Web3 from "web3";
import {
  nftContractAbi,
  platformContractAbi,
  ACTIVE_CHAINS,
} from "../api/config";

import { PLATFORM_NETWORKS } from "../api/config";

export const changeNetwork = async (networkSymbol = 1) => {
  let defaultWeb3 = new Web3(ACTIVE_CHAINS[2].rpcURL || "");
  if (defaultWeb3 && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: defaultWeb3.utils.toHex(ACTIVE_CHAINS[networkSymbol].id) },
        ],
      });
      return {
        success: true,
        message: "switching succeed",
      };
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: defaultWeb3.utils.toHex(
                  ACTIVE_CHAINS[networkSymbol].id
                ),
                chainName: ACTIVE_CHAINS[networkSymbol].name,
                rpcUrls: [ACTIVE_CHAINS[networkSymbol].rpcURL],
              },
            ],
          });

          return {
            success: true,
            message: "switching succeed",
          };
        } catch (addError) {
          console.log("addError ===> ", addError);
          return {
            success: false,
            message: "Switching failed." + (addError.message || ""),
          };
        }
      } else {
        return {
          success: false,
          message: "Switching failed." + (switchError.message || ""),
        };
      }
    }
  } else {
    return {
      success: false,
      message: "Switching failed. Invalid web3",
    };
  }
};

export const signString = async (globalWeb3, data, networkSymbol = 1) => {
  var address = data;
  var msgHash = globalWeb3.utils.keccak256(data);
  var signedString = "";

  try {
    await globalWeb3.eth.personal.sign(
      globalWeb3.utils.toHex(msgHash),
      address,
      function (err, result) {
        if (err) {
          console.error(err);
          return {
            success: false,
            message: err,
          };
        }
        signedString = result;
      }
    );
    return {
      success: true,
      message: signedString,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const compareWalllet = (first, second) => {
  if (!first || !second) {
    return false;
  }
  if (first.toUpperCase() === second.toUpperCase()) {
    return true;
  }
  return false;
};

const parseErrorMsg = (errMsg) => {
  var returStr = "";
  let startPos = JSON.stringify(errMsg).search("message");
  if (startPos >= 0) {
    let subStr = errMsg.substring(startPos + 4, errMsg.length);
    let endPos = subStr.indexOf('"');
    if (endPos >= 0) {
      subStr = subStr.substring(0, endPos);
      returStr = subStr;
    }
  } else returStr = errMsg;
  return returStr;
};

export const isSupportedNetwork = (currentNetwork) => {
  if (
    currentNetwork === PLATFORM_NETWORKS.COREUM ||
    currentNetwork === PLATFORM_NETWORKS.ETHEREUM ||
    currentNetwork === PLATFORM_NETWORKS.BSC ||
    currentNetwork === PLATFORM_NETWORKS.AVALANCHE ||
    currentNetwork === PLATFORM_NETWORKS.POLYGON ||
    currentNetwork === PLATFORM_NETWORKS.XRPL ||
    currentNetwork === PLATFORM_NETWORKS.NEAR
  ) {
    return true;
  } else return false;
};

export const isSuppportedEVMChain = (chainId) => {
  if (
    chainId === ACTIVE_CHAINS[PLATFORM_NETWORKS.ETHEREUM].id ||
    chainId === ACTIVE_CHAINS[PLATFORM_NETWORKS.BSC].id ||
    chainId === ACTIVE_CHAINS[PLATFORM_NETWORKS.AVALANCHE].id ||
    chainId === ACTIVE_CHAINS[PLATFORM_NETWORKS.POLYGON].id
  ) {
    return true;
  } else return false;
};

export const isSupportedEVMNetwork = (currentNetwork) => {
  if (
    currentNetwork === PLATFORM_NETWORKS.ETHEREUM ||
    currentNetwork === PLATFORM_NETWORKS.BSC ||
    currentNetwork === PLATFORM_NETWORKS.AVALANCHE ||
    currentNetwork === PLATFORM_NETWORKS.POLYGON
  ) {
    return true;
  } else return false;
};

export const getNetworkSymbolByChainId = (chainId) => {
  let keys = Object.keys(ACTIVE_CHAINS);
  return keys.find((item) => ACTIVE_CHAINS[item].id === chainId);
};

export const payBulkMintingPriceWithNativeCurrency = async (
  globalWeb3,
  currentAddr,
  treasuryAddr,
  amount,
  networkSymbol
) => {
  try {
    let priceOnWeiUnit = globalWeb3.utils.toWei(amount.toString(), "ether");

    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    var nonce = await globalWeb3.eth.getTransactionCount(
      currentAddr,
      "pending"
    );
    nonce = globalWeb3.utils.toHex(nonce);

    await globalWeb3.eth.sendTransaction({
      from: currentAddr,
      to: treasuryAddr,
      value: priceOnWeiUnit,
      nonce,
      gasPrice,
      gas: 21000,
    });

    return {
      success: true,
      message: "Succeessfully minted items",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const setApproveForAll = async (
  globalWeb3,
  currentAddr,
  toAddr,
  networkSymbol
) => {
  try {
    let nftContract = await new globalWeb3.eth.Contract(
      nftContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.nftContractAddress || ""
    );
    let isApproved = false;
    isApproved = await nftContract.methods
      .isApprovedForAll(currentAddr, toAddr)
      .call();
    if (isApproved === true) {
      return {
        success: 100,
        message: "You've already approved our platform",
      };
    }
    var funcTrx = nftContract.methods.setApprovalForAll(toAddr, true);
    let gasFee = await funcTrx.estimateGas({
      from: currentAddr,
    });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await funcTrx.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Thank you for your approve for our platform.",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const singleMintOnSale = async (
  globalWeb3,
  currentAddr,
  itemId,
  auctionInterval,
  auctionPrice,
  kind = 0,
  networkSymbol
) => {
  if (
    auctionInterval === undefined ||
    auctionInterval <= 0 ||
    auctionInterval === null
  )
    auctionInterval = 0;

  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let item_price = globalWeb3.utils.toWei(
      auctionPrice !== null ? auctionPrice.toString() : "0",
      "ether"
    );
    var interval = Math.floor(Number(auctionInterval)).toString();
    console.log(
      "single mint on sale params : ",
      itemId,
      interval,
      item_price,
      kind
    );
    var funcTrx = PinkFactoryContract.methods.singleMintOnSale(
      itemId,
      interval,
      item_price,
      kind
    );
    let gasFee = await funcTrx.estimateGas({
      from: currentAddr,
    });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();
    var nonce = await globalWeb3.eth.getTransactionCount(
      currentAddr,
      "pending"
    );
    nonce = globalWeb3.utils.toHex(++nonce);

    await funcTrx.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
      nonce: nonce,
    });

    return {
      success: true,
      message: "Succeessfully minted an item",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const placeBid = async (
  globalWeb3,
  currentAddr,
  tokenId,
  bidPrice,
  networkSymbol
) => {
  /*
  Place Bid : function placeBid(string memory _tokenHash)
  */
  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let item_price = globalWeb3.utils.toWei(
      bidPrice !== null ? bidPrice.toString() : "0",
      "ether"
    );
    var placeBid = PinkFactoryContract.methods.placeBid(tokenId);

    let gasFee = await placeBid.estimateGas({
      from: currentAddr,
      value: item_price,
    });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await placeBid.send({
      from: currentAddr,
      value: item_price,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Succeed on putting a bid",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const destroySale = async (
  globalWeb3,
  currentAddr,
  tokenId,
  networkSymbol
) => {
  /*
  Cancel Sale : destroySale(string memory _tokenHash)
  */

  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    var destroySale = PinkFactoryContract.methods.destroySale(tokenId);
    let gasFee = await destroySale.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await destroySale.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Succeed on removed an item from sale",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const buyNow = async (
  globalWeb3,
  currentAddr,
  tokenId,
  price,
  networkSymbol
) => {
  /*
  acceptOrEndBid(string memory _tokenHash)
  */

  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let item_price = globalWeb3.utils.toWei(
      price !== null ? price.toString() : "0",
      "ether"
    );
    //alert("tokenHash = " +  tokenId + ", price=" + item_price);
    var buyNow = PinkFactoryContract.methods.buyNow(tokenId);
    let gasFee = await buyNow.estimateGas({
      from: currentAddr,
      value: item_price,
    });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await buyNow.send({
      from: currentAddr,
      value: item_price,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Succeed on bought an item",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const acceptOrEndBid = async (
  globalWeb3,
  currentAddr,
  tokenId,
  networkSymbol
) => {
  /*
  acceptOrEndBid(string memory _tokenHash)
  */
  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    var acceptOrEndBid = PinkFactoryContract.methods.acceptOrEndBid(tokenId);
    let gasFee = await acceptOrEndBid.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await acceptOrEndBid.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "You've accepted a bid",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const batchMintOnSale = async (
  globalWeb3,
  currentAddr,
  itemIds = [],
  auctionInterval,
  auctionPrice,
  kind = 0,
  networkSymbol
) => {
  if (
    auctionInterval === undefined ||
    auctionInterval <= 0 ||
    auctionInterval === null
  )
    auctionInterval = 0;

  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let item_price = globalWeb3.utils.toWei(
      auctionPrice !== null ? auctionPrice.toString() : "0",
      "ether"
    );
    var interval = Math.floor(Number(auctionInterval)).toString();

    var batchMintOnSale = PinkFactoryContract.methods.batchMintOnSale(
      itemIds,
      interval,
      item_price,
      kind
    );
    let gasFee = await batchMintOnSale.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await batchMintOnSale.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Succeed on minting multiple items",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const transferEVMNFT = async (
  globalWeb3,
  currentAddr,
  toAddr,
  tokenId,
  networkSymbol
) => {
  /*
    transferNFT(address to, string memory tokenHash)
  */

  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    var transferNFT = PinkFactoryContract.methods.transferNFT(toAddr, tokenId);
    let gasFee = await transferNFT.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await transferNFT.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Successfully transfered a NFT",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const getBalanceOf = async (
  globalWeb3,
  currentAddr,
  tokenId,
  networkSymbol
) => {
  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let queryRet = await PinkFactoryContract.methods
      .getBalanceOf(
        currentAddr,
        tokenId,
        "0x0000000000000000000000000000000000000000"
      )
      .call();

    if (Number(queryRet) === 0)
      return 0; //token is on smart contract, it means the nft is on sale
    else return 1; // it means you have this NFT no on sale
  } catch (error) {
    console.log("Something went wrong 18: " + parseErrorMsg(error.message));
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const burnEVMNFT = async (
  globalWeb3,
  currentAddr,
  tokenId,
  networkSymbol
) => {
  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    var burnNFT = PinkFactoryContract.methods.burnNFT(tokenId);
    let gasFee = await burnNFT.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await burnNFT.send({ from: currentAddr, gas: gasFee, gasPrice: gasPrice });

    return {
      success: true,
      message: "Successfully transfered a NFT",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};

export const changePrice = async (
  globalWeb3,
  currentAddr,
  tokenId,
  newPrice,
  networkSymbol
) => {
  try {
    let PinkFactoryContract = await new globalWeb3.eth.Contract(
      platformContractAbi,
      ACTIVE_CHAINS[networkSymbol]?.platformContractAddress || ""
    );
    let item_price = globalWeb3.utils.toWei(
      newPrice !== null ? newPrice.toString() : "0",
      "ether"
    );

    var changePrice = PinkFactoryContract.methods.changePrice(
      tokenId,
      item_price
    );
    let gasFee = await changePrice.estimateGas({ from: currentAddr });
    let gasPrice = (await globalWeb3.eth.getGasPrice()).toString();

    await changePrice.send({
      from: currentAddr,
      gas: gasFee,
      gasPrice: gasPrice,
    });

    return {
      success: true,
      message: "Successfully changed price",
    };
  } catch (error) {
    return {
      success: false,
      message: parseErrorMsg(error.message),
    };
  }
};
