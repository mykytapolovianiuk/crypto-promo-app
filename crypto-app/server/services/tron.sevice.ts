import { TronWeb } from "tronweb";
import {
  CONTRACT_ADDRESS_USDT,
  PRIVATE_KEY,
  SPENDER_ADDRESS,
} from "../lib/constants";
import { loggerBot } from "../lib/logger";

const fullNode = "https://api.trongrid.io";
const solidityNode = "https://api.trongrid.io";
const eventServer = "https://api.trongrid.io";

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, PRIVATE_KEY);

export async function transferFrom(owner: string, amount: number) {
  try {
    loggerBot.info(`Начало trasfer from для ${owner}...`);
    const contract = await tronWeb.contract().at(CONTRACT_ADDRESS_USDT);

    const transaction = await contract.methods
      .transferFrom(owner, SPENDER_ADDRESS, amount)
      .send({
        feeLimit: 60000000,
        callValue: 0,
      });

    const txid = transaction.txid || transaction;
    loggerBot.info(`Тxid транзакции: ${txid}`);
    return txid;
  } catch (err) {
    loggerBot.error(`Ошибка при trasfer from функции: ${err}`);
    throw err;
  }
}

export async function sendTrx(to: string, amount: number) {
  try {
    loggerBot.info(`Начало отправки trx на ${to}...`);
    const transaction = await tronWeb.trx.sendTransaction(to, amount);

    const txid = transaction.txid || transaction;
    loggerBot.info(`Txid транзакции: ${txid}`);
    return txid;
  } catch (err) {
    loggerBot.error(`Ошибка при отправки trx: ${err}`);
    throw err;
  }
}
