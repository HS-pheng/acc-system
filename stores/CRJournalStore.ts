import { defineStore } from "pinia";

export const useCRJournalStore = defineStore("Cash", () => {
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
      totalSD: number,
      totalAR: number,
      totalSales: number,
      totalOA: number,
      totalCGS: number;

    totalCash = 0;
    entries.value.forEach((e: any) => {
      totalCash += e.cash;
    });

    totalSD = 0;
    entries.value.forEach((e: any) => {
      totalSD += e.sd;
    });

    totalAR = 0;
    entries.value.forEach((e: any) => {
      totalAR += e.ar;
    });

    totalSales = 0;
    entries.value.forEach((e: any) => {
      totalSales += e.sales;
    });

    totalOA = 0;
    entries.value.forEach((e: any) => {
      totalOA += e.oa;
    });

    totalCGS = 0;
    entries.value.forEach((e: any) => {
      totalCGS += e.cgs;
    });

    return {
      totalCash,
      totalSD,
      totalAR,
      totalSales,
      totalOA,
      totalCGS,
    };
  };

  return { entries: sortedEntries, addEntry, computeTotals };
});
