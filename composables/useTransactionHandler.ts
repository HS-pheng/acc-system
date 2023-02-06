import { useAPLedgerStore } from "~~/stores/APLedgerStore";
import { useARLedgerStore } from "~~/stores/ARLedgerStore";
import { useCDJournal } from "~~/stores/CDJournalStore";
import { useCRJournalStore } from "~~/stores/CRJournalStore";
import { useGeneralLedgerStore } from "~~/stores/GeneralLedgerStore";
import { usePJournalStore } from "~~/stores/PJournalStore";
import { useSJournalStore } from "../stores/SJournalStore";

export default function useTransactionHandler() {
  const SJournalStore = useSJournalStore();
  const ARLedgerStore = useARLedgerStore();
  const APLedgerStore = useAPLedgerStore();
  const CRJournalStore = useCRJournalStore();
  const CDJounralStore = useCDJournal();
  const PurchaseJournalStore = usePJournalStore();
  const GeneralLedgerStore = useGeneralLedgerStore();

  const postToSaleJournal = (payload: any) => {
    const { date, account, invoiceNumber, ARandSale, CGSandInventory } =
      payload;

    const objectDate = new Date(date);

    SJournalStore.addEntry({
      date: objectDate,
      account,
      invoiceNumber: Number(invoiceNumber),
      ARandSale: Number(ARandSale),
      CGSandInventory: Number(CGSandInventory),
    });

    ARLedgerStore.addEntry(account, {
      date: objectDate,
      pr: "S3",
      debit: Number(ARandSale),
      credit: 0,
    });
  };

  const postToPurchaseJournal = (payload: any) => {
    const { date, account, doi, terms, ap, inventory, os, oa } = payload;

    const objectDate = new Date(date);

    PurchaseJournalStore.addEntry({
      date: objectDate,
      account,
      doi,
      terms,
      ap: new Number(ap),
      inventory: new Number(inventory),
      os: new Number(os),
      oa: new Number(oa),
    });

    APLedgerStore.addEntry(account, {
      date: objectDate,
      pr: "P1",
      debit: 0,
      credit: new Number(ap),
    });
  };

  const postToCRJournal = (payload: any) => {
    const { date, account, cash, ar, sd, sales, oa, cgs, type } = payload;

    const objectDate = new Date(date);

    CRJournalStore.addEntry({
      date: objectDate,
      account,
      type,
      cash: new Number(cash),
      ar: new Number(ar),
      sd: new Number(sd),
      sales: new Number(sales),
      oa: new Number(oa),
      cgs: new Number(cgs),
    });

    if (type === "1") {
      ARLedgerStore.addEntry(account, {
        date: objectDate,
        pr: "R2",
        debit: 0,
        credit: new Number(ar),
      });
    }

    if (type === "3") {
      GeneralLedgerStore.postToLedger(account, {
        date: objectDate,
        debit: 0,
        credit: oa,
        pr: "R2",
      });
    }
  };

  const postToCDJournal = (payload: any) => {
    const { date, cn, payee, account, cash, inventory, oa, ap } = payload;

    const objectDate = new Date(date);

    CDJounralStore.addEntry({
      date: objectDate,
      account,
      cn,
      payee,
      cash: new Number(cash),
      inventory: new Number(inventory),
      ap: new Number(ap),
      oa: new Number(oa),
    });

    if (payee === account) {
      APLedgerStore.addEntry(account, {
        date: objectDate,
        pr: "D1",
        debit: new Number(ap),
        credit: 0,
      });
    } else {
      GeneralLedgerStore.postToLedger(account, {
        date: objectDate,
        debit: oa,
        credit: 0,
        pr: "D1",
      });
    }
  };

  const closeTransaction = () => {
    const computedTotals = SJournalStore.computeTotals();

    const CRTotals = CRJournalStore.computeTotals();

    const PTotals = PurchaseJournalStore.computeTotals();

    const DTotals = CDJounralStore.computeTotals();

    if (computedTotals.totalAR > 0) {
      GeneralLedgerStore.postToLedger("Account Receivable", {
        date: new Date("2023-07-31"),
        debit: computedTotals.totalAR,
        credit: 0,
        pr: "S3",
      });
    }

    if (computedTotals.totalInventory > 0) {
      GeneralLedgerStore.postToLedger("Inventory", {
        date: new Date("2023-07-31"),
        credit: computedTotals.totalInventory,
        debit: 0,
        pr: "S3",
      });
    }

    if (computedTotals.totalSales > 0) {
      GeneralLedgerStore.postToLedger("Sales", {
        date: new Date("2023-07-31"),
        credit: computedTotals.totalSales,
        debit: 0,
        pr: "S3",
      });
    }

    if (computedTotals.totalCGS > 0) {
      GeneralLedgerStore.postToLedger("Cost of Goods Sold", {
        date: new Date("2023-07-31"),
        debit: computedTotals.totalCGS,
        credit: 0,
        pr: "S3",
      });
    }

    if (CRTotals.totalCash > 0) {
      GeneralLedgerStore.postToLedger("Cash", {
        date: new Date("2023-07-31"),
        debit: CRTotals.totalCash,
        credit: 0,
        pr: "R2",
      });
    }

    if (CRTotals.totalAR > 0) {
      GeneralLedgerStore.postToLedger("Account Receivable", {
        date: new Date("2023-07-31"),
        debit: 0,
        credit: CRTotals.totalAR,
        pr: "R2",
      });
    }

    if (CRTotals.totalCGS > 0) {
      GeneralLedgerStore.postToLedger("Inventory", {
        date: new Date("2023-07-31"),
        debit: 0,
        credit: CRTotals.totalCGS,
        pr: "R2",
      });

      GeneralLedgerStore.postToLedger("Cost of Goods Sold", {
        date: new Date("2023-07-31"),
        debit: CRTotals.totalCGS,
        credit: 0,
        pr: "R2",
      });
    }

    if (CRTotals.totalSD > 0) {
      GeneralLedgerStore.postToLedger("Sales Discounts", {
        date: new Date("2023-07-31"),
        debit: CRTotals.totalSD,
        credit: 0,
        pr: "R2",
      });
    }

    if (CRTotals.totalSales > 0) {
      GeneralLedgerStore.postToLedger("Sales", {
        date: new Date("2023-07-31"),
        debit: 0,
        credit: CRTotals.totalSales,
        pr: "R2",
      });
    }

    if (PTotals.totalInventory > 0) {
      GeneralLedgerStore.postToLedger("Inventory", {
        date: new Date("2023-07-31"),
        debit: PTotals.totalInventory,
        credit: 0,
        pr: "P1",
      });
    }

    if (PTotals.totalOS > 0) {
      GeneralLedgerStore.postToLedger("Office Supplies", {
        date: new Date("2023-07-31"),
        debit: PTotals.totalOS,
        credit: 0,
        pr: "P1",
      });
    }

    if (PTotals.totalAP > 0) {
      GeneralLedgerStore.postToLedger("Account Payable", {
        date: new Date("2023-07-31"),
        credit: PTotals.totalAP,
        debit: 0,
        pr: "P1",
      });
    }

    if (DTotals.totalCash > 0) {
      GeneralLedgerStore.postToLedger("Cash", {
        date: new Date("2023-07-31"),
        debit: DTotals.totalCash,
        credit: 0,
        pr: "D1",
      });
    }

    if (DTotals.totalAP > 0) {
      GeneralLedgerStore.postToLedger("Account Payable", {
        date: new Date("2023-07-31"),
        debit: DTotals.totalCash,
        credit: 0,
        pr: "D1",
      });
    }

    if (DTotals.totalInventory > 0) {
      GeneralLedgerStore.postToLedger("Inventory", {
        date: new Date("2023-07-31"),
        debit: DTotals.totalInventory,
        credit: 0,
        pr: "D1",
      });
    }
  };

  return {
    postToSaleJournal,
    closeTransaction,
    postToCRJournal,
    postToPurchaseJournal,
    postToCDJournal,
  };
}
