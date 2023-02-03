<template>
  <div class="h-100">
    <v-card>
      <v-layout>
        <v-navigation-drawer theme="dark" rail permanent>
          <v-list-item
            nav
            prepend-avatar="https://picsum.photos/id/237/200/300"
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
          </v-list>
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

const currentComponent = shallowRef(SaleJournal);

const onChangeComponent = (component: any) => {
  currentComponent.value = component;
};
</script>
