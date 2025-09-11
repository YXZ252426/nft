import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x76e618e4246C1B9e43fB302c1Aa0DdcD9c3f2e4c"; // 你的合约地址
  const recipients = [
    "0x8170Dde13D14E93Af7EDEdcE81db35479630cB8B",
    "0x7c5F46c52A93b4Bf48C466faC5CF59f8b7A52300"
    //TODO：填写接收者地址
  ];
  //TODO：填写元数据链接（例如：ipfs://<你的CID>）
  const tokenURI = "ipfs://bafkreidxblqzg74ojofxn5kgjsomfe5ttshtechnseifskhyo4scn62qra"; // 固定元数据链接

  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  for (const recipient of recipients) {
    const tx = await MyNFT.mintTo(recipient, tokenURI);
    await tx.wait();
    console.log(`✅ 成功发送 NFT 给 ${recipient}`);
  }

  console.log("🎉 所有接收者已成功获得 NFT");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

//1. 收集地址
//2. 导入到mint.ts
//3.执行脚本npx hardhat run scripts/mint.ts --network base