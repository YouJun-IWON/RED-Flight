import { MediaRenderer, TransactionButton, useConnectedWallets, useReadContract } from "thirdweb/react";
import { getAllContracts } from "@/utils/contract";
import { getNFT } from "thirdweb/extensions/erc721";
import { client } from "@/lib/client";
import { prepareContractCall } from "thirdweb";

type StakedNFTCardProps = {
  tokenId: bigint;
  refetchStakedInfo: () => void;
  refetchOwnedNFTs: () => void;
};

export const StakedNFTCard: React.FC<StakedNFTCardProps> = ({ tokenId, refetchStakedInfo, refetchOwnedNFTs }) => {
  const wallet = useConnectedWallets();
  const chainId = wallet[0]?.getChain()?.id ?? 7001;
  const { contract, STAKING_CONTRACT } = getAllContracts(chainId);

  const { data: nft } = useReadContract(getNFT, {
    contract: contract,
    tokenId: tokenId,
  });

  return (
    <div style={{ margin: "10px" }}>
      <MediaRenderer
        client={client}
        src={nft?.metadata.image}
        style={{
          borderRadius: "10px",
          marginBottom: "10px",
          height: "200px",
          width: "200px",
        }}
      />
      <p style={{ margin: "0 10px 10px 10px" }}>{nft?.metadata.name}</p>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: STAKING_CONTRACT,
            method: "withdraw",
            params: [[tokenId]],
          })
        }
        onTransactionConfirmed={() => {
          refetchOwnedNFTs();
          refetchStakedInfo();
          alert("Withdrawn!");
        }}
        style={{
          border: "none",
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          fontSize: "12px",
        }}
      >
        Withdraw
      </TransactionButton>
    </div>
  );
};
