import { ethers } from "ethers";

const PROVIDER = ethers.getDefaultProvider(3, {
  infura: "88ce7dc742a14dec85fde399eaf36090",
  etherscan: "789IQ6ZJ3XY5TCM53ZIYDNWCWCQ8D1XD2H",
});

export { PROVIDER };
