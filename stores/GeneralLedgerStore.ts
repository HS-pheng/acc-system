import { defineStore } from "pinia";

interface LedgerEntry {
  date: Date;
  pr: string;
  debit: number;
  credit: number;
  balance: number;
}

export const useGeneralLedgerStore = defineStore("GeneralLedger", () => {
  const generalLedger = ref<
    {
      name: string;
      ledgerEntries: LedgerEntry[];
    }[]
  >([
    {
      name: "Cash",
      ledgerEntries: [],
    },
    {
      name: "Account Receivable",
      ledgerEntries: [],
    },
    {
      name: "Inventory",
      ledgerEntries: [],
    },
    {
      name: "Office Supplies",
      ledgerEntries: [],
    },
    {
      name: "Store Supplies",
      ledgerEntries: [],
    },
    {
      name: "Store Equipment",
      ledgerEntries: [],
    },
    {
      name: "Account Payable",
      ledgerEntries: [],
    },
    {
      name: "Notes Payable",
      ledgerEntries: [],
    },
    {
      name: "R.Alcorn,Capital",
      ledgerEntries: [],
    },
    {
      name: "Sales",
      ledgerEntries: [],
    },
    {
      name: "Sales Discounts",
      ledgerEntries: [],
    },
    {
      name: "Cost of Goods Sold",
      ledgerEntries: [],
    },
    {
      name: "Sales Salaries Expense",
      ledgerEntries: [],
    },
    {
      name: "Advertising Expense",
      ledgerEntries: [],
    },
  ]);

  const postToLedger = (name: string, entry: any) => {
    generalLedger.value.forEach((e) => {
      if (e.name === name) {
        e.ledgerEntries.push({ ...entry, balance: 0 });

        sortEntry();
        for (let i = 0; i < e.ledgerEntries.length; i++) {
          let balance = 0;
          let debit = e.ledgerEntries[i].debit;
          let credit = e.ledgerEntries[i].credit;
          for (let k = i - 1; k >= 0; k--) {
            debit += e.ledgerEntries[k].debit;
            credit += e.ledgerEntries[k].credit;
          }
          balance = Math.abs(debit - credit);
          e.ledgerEntries[i].balance = balance;
        }

        console.log(name);

        // let debit = entry.debit;
        // let credit = entry.credit;
        // e.ledgerEntries.forEach((e) => {
        //   debit += e.debit;
        //   credit += e.credit;
        // });

        // const completeEntry = {
        //   ...entry,
        //   balance,
        // };

        // console.log({ completeEntry });

        // e.ledgerEntries.push(completeEntry);
        // const balance = Math.abs(debit - credit);

        // // recalculateBalance(name);
        // sortEntry();
      }
    });
  };

  const recalculateBalance = (name: string) => {
    const index = generalLedger.value.findIndex((e) => e.name === name);

    generalLedger.value[index]?.ledgerEntries.forEach((e, i) => {
      let debit = 0;
      let credit = 0;
      generalLedger.value[index].ledgerEntries.forEach((d) => {
        if (d.date < e.date) {
          debit += d.debit;
          credit += d.credit;
        }
      });
      const balance = Math.abs(debit - credit + e.debit - e.credit);
      console.log(`|${debit} - ${credit}| + |${e.debit} - ${e.credit}|`);
      generalLedger.value[index].ledgerEntries[i].balance = balance;
    });
  };

  const sortEntry = () => {
    generalLedger.value.forEach((e) => {
      e.ledgerEntries.sort((a: any, b: any) => a.date - b.date);
    });
  };

  const getAllBalance = () => {
    const balanceGuide = new Map<string, boolean>();
    let totalDebit = 0;
    let totalCredit = 0;

    balanceGuide.set("Cash", true);
    balanceGuide.set("Account Receivable", true);
    balanceGuide.set("Inventory", true);
    balanceGuide.set("Office Supplies", true);
    balanceGuide.set("Store Supplies", true);
    balanceGuide.set("Store Equipment", true);
    balanceGuide.set("Account Payable", false);
    balanceGuide.set("Note Payable", false);
    balanceGuide.set("R.Alcorn,Capital", false);
    balanceGuide.set("Sales", false);
    balanceGuide.set("Sales Discounts", true);
    balanceGuide.set("Costs of Goods Sold", true);
    balanceGuide.set("Sales Salaries Expense", true);
    balanceGuide.set("Advertising Expense", true);

    const result: any[] = [];
    generalLedger.value.forEach((e) => {
      let debit = 0;
      let credit = 0;
      e.ledgerEntries.forEach((entry) => {
        debit += entry.debit;
        credit += entry.credit;
      });

      const balance = Math.abs(debit - credit);
      let finalDebit, finalCredit;
      if (balanceGuide.get(e.name)) {
        finalDebit = balance;
        totalDebit += balance;
        finalCredit = 0;
      } else {
        finalCredit = balance;
        totalCredit += balance;
        finalDebit = 0;
      }
      result.push({ name: e.name, debit: finalDebit, credit: finalCredit });
    });
    return { result, totalDebit, totalCredit };
  };

  return { generalLedger, postToLedger, getAllBalance };
});
