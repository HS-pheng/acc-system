<template>
  <div>
    <v-card title="General Ledger" variant="outlined">
      <v-row>
        <v-col
          v-for="entry in GeneralLedgerStore.generalLedger"
          :key="entry.name"
          cols="6"
        >
          <v-card :title="entry.name" variant="outlined">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">PR</th>
                  <th class="text-left">Debit</th>
                  <th class="text-left">Credit</th>
                  <th class="text-left">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in entry.ledgerEntries" :key="row.balance">
                  <td>
                    {{ row.date.getDate() }}/{{ row.date.getMonth() + 1 }}
                  </td>
                  <td>{{ row.pr }}</td>
                  <td>{{ row.debit }}</td>
                  <td>{{ row.credit }}</td>
                  <td>{{ row.balance }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useGeneralLedgerStore } from "~~/stores/GeneralLedgerStore";

const GeneralLedgerStore = useGeneralLedgerStore();

console.log(GeneralLedgerStore.generalLedger);
</script>
