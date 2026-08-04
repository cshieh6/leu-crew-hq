"use client";

import Header from "@/components/Header";
import ShoppingCard from "@/components/ShoppingCard";
import BottomNav from "@/components/mobile/BottomNav";

type Props = {
  shopping: any[];
  newItem: string;
  setNewItem: (value: string) => void;
  newItemStore: string;
  setNewItemStore: (value: string) => void;
  addItem: () => void;
  deleteItem: (id: number) => void;
  toggleShoppingItem: (id: number, completed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ShoppingScreen({
  shopping,
  newItem,
  setNewItem,
  newItemStore,
  setNewItemStore,
  addItem,
  deleteItem,
  toggleShoppingItem,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <main
      style={{
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui",
        paddingBottom: 90,
      }}
    >
      <Header />

      <ShoppingCard
        shopping={shopping}
        newItem={newItem}
        setNewItem={setNewItem}
        newItemStore={newItemStore}
        setNewItemStore={setNewItemStore}
        addItem={addItem}
        deleteItem={deleteItem}
        toggleShoppingItem={toggleShoppingItem}
      />

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </main>
  );
}
