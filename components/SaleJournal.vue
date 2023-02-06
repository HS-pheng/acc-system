<template>
  <div>
    <v-card variant="outlined" title="Sale Journal">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Account Debited</th>
            <th class="text-left">Invoice Number</th>
            <th class="text-left">Account Receivable Dr.<br />Sales Cr.</th>
            <th class="text-left">Cost of Goods Sold Dr.<br />Inventory Cr.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in SJournalStore.entries" :key="entry.invoiceNumber">
            <td>{{ entry.date.getDate() }}/{{ entry.date.getMonth() + 1 }}</td>
            <td>{{ entry.account }}</td>
            <td>{{ entry.invoiceNumber }}</td>
            <td>{{ entry.ARandSale }}</td>
            <td>{{ entry.CGSandInventory }}</td>
          </tr>
        </tbody>
      </v-table>

      <CommonButton class="m-5" @click="showCreateDialog = true"
        >Add Transaction</CommonButton
      >
    </v-card>
    <CommonModal
      v-model="showCreateDialog"
      title="Add New Transaction"
      confirm-text="Create"
      @submit="onAddNewTransaction"
    >
      <CommonInputGroup v-model="newTransaction.date" name="Date" type="text" />
      <CommonInputGroup
        v-model="newTransaction.account"
        name="Account Debited"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.invoiceNumber"
        name="Invoice Number"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.ARandSale"
        name="Account Receivable Dr. and Sale Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.CGSandInventory"
        name="Cost of Good Sold Dr. Inventory Cr. "
        type="text"
      />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { useSJournalStore } from "~~/stores/SJournalStore";

const { postToSaleJournal } = useTransactionHandler();

const newTransaction = ref({
  date: "",
  account: "",
  invoiceNumber: "",
  ARandSale: "",
  CGSandInventory: "",
});

const SJournalStore = useSJournalStore();

const showCreateDialog = ref(false);

const onAddNewTransaction = () => {
  postToSaleJournal(newTransaction.value);
};
</script>
