import { defineStore } from "pinia";

export const useCDJournal = defineStore("CashDisbursement", () => {
  const entries = ref<any>([]);

  const addEntry = (entry: any) => {
    entries.value.push(entry);
  };

  const sortedEntries = computed(() => {
    entries.value.sort((a: any, b: any) => a.date - b.date);
    return entries.value;
  });

  const computeTotals = () => {
    let totalCash: number,
      totalOA: number,
      totalInventory: number,
      totalAP: number;

    totalCash = 0;
    entries.value.forEach((e: any) => {
      totalCash += e.cash;
    });

    totalAP = 0;
    entries.value.forEach((e: any) => {
      totalAP += e.ap;
    });

    totalOA = 0;
    entries.value.forEach((e: any) => {
      totalOA += e.oa;
    });

    totalInventory = 0;
    entries.value.forEach((e: any) => {
      totalInventory += e.inventory;
    });

    return {
      totalCash,
      totalOA,
      totalInventory,
      totalAP,
    };
  };

  return { entries: sortedEntries, addEntry, computeTotals };
});
