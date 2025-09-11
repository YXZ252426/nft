import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x11F1ca02cCF36268e9D53a69b91ee46934af4B78"; // 你的合约地址
  const recipients = [
    "0xde2f350f335eeee965b399232e9a624ae23b59e8"
    // TODO：填写接收者地址，例如：
    // "0x1111...","0x2222..."
  ];

  // TODO：填写元数据链接（建议使用 IPFS 链接）
  // 可先用仓库里提供的示例：ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i
  const tokenURI = "ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i";

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