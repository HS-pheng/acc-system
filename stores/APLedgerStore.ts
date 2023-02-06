import { defineStore } from "pinia";

interface LedgerEntry {
  date: Date;
  pr: string;
  debit: number;
  credit: number;
  balance: number;
}

export const useAPLedgerStore = defineStore("APLedgerStore", () => {
  const balance = ref(new Map<string, number>());
  const entries = ref<
    {
      name: string;
      ledgerEntries: LedgerEntry[];
    }[]
  >([]);

  const sortEntry = () => {
    entries.value.forEach((e) => {
      e.ledgerEntries.sort((a: any, b: any) => a.date - b.date);
    });
  };

  const addEntry = (name: any, entry: any) => {
    const duplicate = entries.value.findIndex((e) => e.name === name);

    if (duplicate >= 0) {
      let debit = 0;
      let credit = 0;
      entries.value[duplicate].ledgerEntries.forEach((e) => {
        if (e.date <= entry.date) {
          debit += e.debit;
          credit += e.credit;
        }
      });

      const balance = Math.abs(debit - credit);

      console.log("Balance here", balance);

      entries.value[duplicate].ledgerEntries.push({
        ...entry,
        balance,
      });

      recalculateBalance(name);
      sortEntry();
      return;
    }

    const balance = Math.abs(entry.debit - entry.credit);

    entries.value.push({
      name,
      ledgerEntries: [
        {
          ...entry,
          balance,
        },
      ],
    });
  };

  const recalculateBalance = (name: string) => {
    const index = entries.value.findIndex((e) => e.name === name);

    entries.value[index]?.ledgerEntries.forEach((e, i) => {
      let debit = 0;
      let credit = 0;
      entries.value[index].ledgerEntries.forEach((d) => {
        if (d.date < e.date) {
          debit += d.debit;
          credit += d.credit;
        }
      });
      const balance = Math.abs(debit - credit + e.debit - e.credit);
      console.log(`|${debit} - ${credit}| + |${e.debit} - ${e.credit}|`);
      entries.value[index].ledgerEntries[i].balance = balance;
    });
  };

  return { entries, addEntry };
});
