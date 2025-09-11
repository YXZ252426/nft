import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.trim().length === 0) {
    console.error("❌ 未在 .env 中找到 PRIVATE_KEY，请先配置测试私钥");
    process.exit(1);
  }

  const provider = ethers.provider;
  const wallet = new ethers.Wallet(privateKey, provider);

  const [network, address, balanceWei] = await Promise.all([
    provider.getNetwork(),
    wallet.getAddress(),
    provider.getBalance(await wallet.getAddress()),
  ]);

  console.log(`Network: ${network.name} (chainId=${network.chainId})`);
  console.log(`Address: ${address}`);
  console.log(`Balance: ${ethers.formatEther(balanceWei)} ETH`);

  if (balanceWei === 0n) {
    console.warn("⚠️  余额为 0，请到对应测试网水龙头领取测试币后再尝试部署");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});



