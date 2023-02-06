import { defineStore } from "pinia";

export const usePJournalStore = defineStore("Purchase", () => {
  const entries = ref<any>([]);

  const addEntry = (entry: any) => {
    entries.value.push(entry);
  };

  const sortedEntries = computed(() => {
    entries.value.sort((a: any, b: any) => a.date - b.date);
    return entries.value;
  });

  const computeTotals = () => {
    let totalAP: number,
      totalInventory: number,
      totalOA: number,
      totalOS: number;

    totalAP= 0;
    entries.value.forEach((e: any) => {
      totalAP += e.ap;
    });

    totalInventory = 0;
    entries.value.forEach((e: any) => {
      totalInventory += e.inventory;
    });

    totalOA = 0;
    entries.value.forEach((e: any) => {
      totalOA += e.oa;
    });

    totalOS = 0;
    entries.value.forEach((e: any) => {
      totalOS += e.os;
    });

    return {
      totalAP,
      totalInventory,
      totalOA,
      totalOS,
    };
  };

  return { entries: sortedEntries, addEntry, computeTotals };
});
