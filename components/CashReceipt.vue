<template>
  <div>
    <v-card variant="outlined" title="Cash Receipt Journal">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Account Credited</th>
            <th class="text-left">Cash Dr.</th>
            <th class="text-left">Sales Discount Dr.</th>
            <th class="text-left">Accounts Receivable Cr.</th>
            <th class="text-left">Sales Cr.</th>
            <th class="text-left">Other Accounts Cr.</th>
            <th class="text-left">Cost of Goods Sold Dr.<br />Inventory Cr.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in CRJournalStore.entries" :key="entry.date">
            <td>{{ entry.date.getDate() }}/{{ entry.date.getMonth() + 1 }}</td>
            <td>{{ entry.account }}</td>
            <td>{{ entry.cash }}</td>
            <td>{{ entry.sd }}</td>
            <td>{{ entry.ar }}</td>
            <td>{{ entry.sales }}</td>
            <td>{{ entry.oa }}</td>
            <td>{{ entry.cgs }}</td>
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
        name="Account Credited"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.type"
        name="Account Type (1. Cash from credit customers, 2. Cash from cash sales, 3. Cash fro other sources)"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.cash"
        name="Cash Dr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.sd"
        name="Sale Discount Dr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.ar"
        name="Account Rceivable Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.sales"
        name="Sales Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.oa"
        name="Other Accounts Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.cgs"
        name="Cost of Good Sold Dr. Inventory Cr. "
        type="text"
      />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { useCRJournalStore } from "~~/stores/CRJournalStore";

const { postToCRJournal } = useTransactionHandler();

const newTransaction = ref({
  date: "",
  type: "",
  account: "",
  cash: "",
  sd: "",
  ar: "",
  sales: "",
  oa: "",
  cgs: "",
});

watchEffect(() => {
  console.log(newTransaction.value);
});

const CRJournalStore = useCRJournalStore();

const showCreateDialog = ref(false);

const onAddNewTransaction = () => {
  postToCRJournal(newTransaction.value);
};
</script>
