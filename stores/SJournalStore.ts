import { defineStore } from "pinia";
import { SJournalEntry } from "~~/constants/interfaces";

export const useSJournalStore = defineStore("SaleJournal", () => {
  const entries = ref<SJournalEntry[]>([]);

  const addEntry = (entry: SJournalEntry) => {
    entries.value.push(entry);
  };

  const sortedEntries = computed(() => {
    entries.value.sort((a: any, b: any) => a.date - b.date);
    return entries.value;
  });

  const computeTotals = () => {
    let totalAR: number,
      totalSales: number,
      totalCGS: number,
      totalInventory: number;

    totalAR = 0;
    entries.value.forEach((e) => {
      totalAR += e.ARandSale;
    });

    console.log("total:", totalAR);

    totalSales = totalAR;

    totalCGS = 0;
    entries.value.forEach((e) => {
      totalCGS += e.CGSandInventory;
    });

    totalInventory = totalCGS;

    return {
      totalAR: totalAR,
      totalSales: totalSales,
      totalInventory: totalInventory,
      totalCGS: totalCGS,
    };
  };

  return { entries: sortedEntries, addEntry, computeTotals };
});
