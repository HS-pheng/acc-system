<template>
  <div>
    <v-card variant="outlined" title="Alcorn Industries">
      <v-table theme="light">
        <thead>
          <tr>
            <th class="text-left">Account</th>
            <th class="text-left">Debit</th>
            <th class="text-left">Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in data" :key="entry.name">
            <td>{{ entry.name }}</td>
            <td>{{ haha(entry.debit) }}</td>
            <td>{{ haha(entry.credit) }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ debit }}</td>
            <td>{{ credit }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useGeneralLedgerStore } from "~~/stores/GeneralLedgerStore";

const data = ref<any[]>([]);
const credit = ref(0);
const debit = ref(0);

const GeneralLedger = useGeneralLedgerStore();
onMounted(() => {
  const { result, totalCredit, totalDebit } = GeneralLedger.getAllBalance();
  credit.value = totalCredit;
  debit.value = totalDebit;
  data.value = result;
});

const haha = (val: any) => {
  if (val === 0) {
    return "";
  }
  return val;
};
</script>
