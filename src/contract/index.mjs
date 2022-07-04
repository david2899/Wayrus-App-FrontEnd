import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const N = 3;
const names = ["Creator", "Alice", "Bob", "Carla"];

const createAccounts = async () => {
  const stdlib = await loadStdlib(process.env);
  const startingBalance = stdlib.parseCurrency(100);
  const creator = await stdlib.newTestAccount(startingBalance);
  const depositor1 = await stdlib.newTestAccount(startingBalance);

  const showBalance = async (acc, i) => {
    const amt = await stdlib.balanceOf(acc);
    console.log(`${names[i]} has ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit}`);
  };

  const ctcCreator = creator.contract(backend);

  await showBalance(creator, 0);
  const ctc = depositor1.contract(backend, ctcCreator.getInfo());
  let count = 0;
  (async () => {
    await backend.Creator(ctcCreator, {
      initialDeposit: () => stdlib.parseCurrency(1),
      newDeposit: (amount, balance) => {
        console.log(`new deposit amount ${stdlib.formatCurrency(amount)}, contract have balance ${stdlib.formatCurrency(balance)}`);
        count += 1;
        setTimeout(makeDeposit, 1500);
      },
      showOutcome: async () => {
        console.log('next show balance creator');
        await showBalance(creator, 0);
      },
      withdraw: () => {
        return count >= 2;
      }
    });
  })();
  async function makeDeposit() {
    await backend.Depositor(ctc, {
      getDeposit: () => {
        const amount = stdlib.parseCurrency(2);
        console.log('creating deposit amount ' + stdlib.formatCurrency(amount));
        return amount;
      },
    });
    setTimeout(async () => await showBalance(depositor1, 1), 1500);
  }
  setTimeout(makeDeposit, 1500);
  setTimeout(async () => await showBalance(creator, 0), 1500);
}

(async () => {
  await createAccounts()
})()