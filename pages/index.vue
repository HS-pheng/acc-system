<template>
  <div class="h-100">
    <v-card>
      <v-layout>
        <v-navigation-drawer theme="dark" rail permanent>
          <v-list-item
            nav
            prepend-avatar="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"
          ></v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              value="dashboard"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer permanent>
          <v-list>
            <v-list-item
              title="Sale Journal"
              value="sale-journal"
              @click="onChangeComponent(SaleJournal)"
            ></v-list-item>

            <v-list-item
              title="Cash Receipt"
              value="cash-receipt"
              @click="onChangeComponent(CashReceipt)"
            ></v-list-item>

            <v-list-item
              title="Purchase"
              value="Purchase"
              @click="onChangeComponent(Purchase)"
            ></v-list-item>

            <v-list-item
              title="Cash Disbursement"
              value="cash-disbursement"
              @click="onChangeComponent(CashDisbursement)"
            ></v-list-item>

            <v-list-item
              title="Account Receivable Ledger"
              value="account-receivable-ledger"
              @click="onChangeComponent(ARLedger)"
            ></v-list-item>
            <v-list-item
              title="Account Payable Ledger"
              value="account-payable-ledger"
              @click="onChangeComponent(APLedger)"
            ></v-list-item>
            <v-list-item
              title="General Ledger"
              value="general-ledger"
              @click="onChangeComponent(GeneralLedger)"
            ></v-list-item>
            <v-list-item
              title="Trial Balance"
              value="1"
              @click="onChangeComponent(TrialBalance)"
            ></v-list-item>
            <v-list-item
              title="Income Statement"
              value="2"
              @click="onChangeComponent(GeneralLedger)"
            ></v-list-item>
            <v-list-item
              title="Statement of Owner's Equity"
              value="3"
              @click="onChangeComponent(GeneralLedger)"
            ></v-list-item>
            <v-list-item
              title="Balance Sheet"
              value="4"
              @click="onChangeComponent(GeneralLedger)"
            ></v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block class="bg-primary" @click="handleCloseTransaction">
                Close transaction
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main>
          <v-card class="pa-5">
            <v-row>
              <v-col col="12">
                <component :is="currentComponent"></component>
              </v-col>
            </v-row>
          </v-card>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const SaleJournal = resolveComponent("SaleJournal");
const CashReceipt = resolveComponent("CashReceipt");
const CashDisbursement = resolveComponent("CashDisbursement");
const Purchase = resolveComponent("Purchase");
const ARLedger = resolveComponent("LedgersARLedger");
const APLedger = resolveComponent("LedgersAPLedger");
const TrialBalance = resolveComponent("TrialBalance");
const GeneralLedger = resolveComponent("LedgersGeneralLedger");

const transactionHandler = useTransactionHandler();

const CompanyInfo = resolveComponent("CompanyInfo");

const currentComponent = shallowRef(CompanyInfo);

const onChangeComponent = (component: any) => {
  currentComponent.value = component;
};

const handleCloseTransaction = () => {
  transactionHandler.closeTransaction();
};
</script>
