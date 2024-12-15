import { ethers } from 'ethers';

// Connect to Ethereum mainnet
const provider = new ethers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY"  // Replace with your Ethereum node URL
);

export async function sendEth(to: string, amount: string) {
    try {
        // Create wallet from private key
        const wallet = new ethers.Wallet(
            process.env.ETH_PRIVATE_KEY ?? "", 
            provider
        );
        
        console.log("Sending from:", wallet.address);

        // Create transaction object
        const tx = {
            to: to,
            value: ethers.parseEther(amount)  // Convert ETH to Wei (1 ETH = 10^18 Wei)
        };

        // Send transaction
        const transaction = await wallet.sendTransaction(tx);
        
        // Wait for confirmation
        await transaction.wait();
        
        console.log("ETH Sent! Transaction hash:", transaction.hash);
        return transaction.hash;
    } catch (error) {
        console.error("Error sending ETH:", error);
        throw error;
    }
}