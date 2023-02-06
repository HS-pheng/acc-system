<template>
  <div>
    <v-card variant="outlined" title="Cash Disbursement Journal">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Ck. No</th>
            <th class="text-left">Payee</th>
            <th class="text-left">Account Debited</th>
            <th class="text-left">Cash Cr.</th>
            <th class="text-left">Inventory Cr.</th>
            <th class="text-left">Other Accounts Dr.</th>
            <th class="text-left">Accounts Payable Dr.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in CRJournalStore.entries" :key="entry.date">
            <td>{{ entry.date.getDate() }}/{{ entry.date.getMonth() + 1 }}</td>
            <td>{{ entry.cn }}</td>
            <td>{{ entry.payee }}</td>
            <td>{{ entry.account }}</td>
            <td>{{ entry.cash }}</td>
            <td>{{ entry.inventory }}</td>
            <td>{{ entry.oa }}</td>
            <td>{{ entry.ap }}</td>
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
        v-model="newTransaction.cn"
        name="Ck. No."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.payee"
        name="Payee"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.account"
        name="Account Debited"
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.cash"
        name="Cash Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.inventory"
        name="Inventory Cr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.oa"
        name="Other Accounts Dr."
        type="text"
      />
      <CommonInputGroup
        v-model="newTransaction.ap"
        name="Accounts Payable Dr."
        type="text"
      />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { useCDJournal } from "~~/stores/CDJournalStore";

const { postToCDJournal } = useTransactionHandler();

const newTransaction = ref({
  date: "",
  cn: "",
  payee: "",
  account: "",
  cash: "",
  inventory: "",
  oa: "",
  ap: "",
});

const CRJournalStore = useCDJournal();

const showCreateDialog = ref(false);

const onAddNewTransaction = () => {
  postToCDJournal(newTransaction.value);
};
</script>
