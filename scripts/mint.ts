import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x99E7544f8516d9C672C58a1c8a8f4af0A65C4a4a"; // 你的合约地址
  const recipients = ["0xB61D46B92EdF56DD605480f55dfC2EF27df08c36", "0x7c5F46c52A93b4Bf48C466faC5CF59f8b7A52300"
    //TODO：填写接收者地址
  ];
  //TODO：填写元数据链接（可以用这个“ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i”）
  const tokenURI = "ipfs://bafkreibq3ngx7x7ys5u2rnphc7az7o5dm3pfvjwkwmsoaznywrdfz6d4xu"; // 固定元数据链接

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