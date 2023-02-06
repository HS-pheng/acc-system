<template>
  <div>
    <v-card variant="outlined" title="Purchase Journal">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Account Credited</th>
            <th class="text-left">Date of Invoice</th>
            <th class="text-left">Terms</th>
            <th class="text-left">Account Payable Cr.</th>
            <th class="text-left">Inventory Dr.</th>
            <th class="text-left">Office Supplies Dr.</th>
            <th class="text-left">Other Accounts Dr.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in purchaseJournalStore.entries" :key="entry.date">
            <td>{{ entry.date.getDate() }}/{{ entry.date.getMonth() + 1 }}</td>
            <td>{{ entry.account }}</td>
            <td>{{ entry.doi }}</td>
            <td>{{ entry.terms }}</td>
            <td>{{ entry.ap }}</td>
            <td>{{ entry.inventory }}</td>
            <td>{{ entry.os }}</td>
            <td>{{ entry.oa }}</td>
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
        name="Account"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.doi"
        name="Date of Invoice"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.terms"
        name="Terms"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.ap"
        name="Accounts Payable Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.inventory"
        name="Inventory Dr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.os"
        name="Office Supplies Dr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.oa"
        name="Other Accounts Dr."
        type="text"
      />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { usePJournalStore } from "~~/stores/PJournalStore";

const { postToPurchaseJournal } = useTransactionHandler();

const newTransaction = ref({
  account: "",
  date: "",
  doi: "",
  terms: "",
  ap: "",
  inventory: "",
  os: "",
  oa: "",
});

const purchaseJournalStore = usePJournalStore();

const showCreateDialog = ref(false);

const onAddNewTransaction = () => {
  postToPurchaseJournal(newTransaction.value);
};
</script>
