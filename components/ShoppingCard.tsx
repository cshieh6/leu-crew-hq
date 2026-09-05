
"use client";

type Item = {
  id: number;
  text: string;
  completed: boolean;
  store?: string | null;
};

type ShoppingCardProps = {
  shopping: Item[];

  newItem: string;
  setNewItem: (value: string) => void;

  newItemStore: string;
  setNewItemStore: (value: string) => void;

  addItem: () => void;
  deleteItem: (id: number) => void;

  toggleShoppingItem: (
    id: number,
    completed: boolean
  ) => void;
};

const stores = [
  "Costco",
  "Target",
  "Trader Joe's",
  "99 Ranch Market",
  "Zion",
  "General",
];

export default function ShoppingCard({
  shopping,
  newItem,
  setNewItem,
  newItemStore,
  setNewItemStore,
  addItem,
  deleteItem,
  toggleShoppingItem,
}: ShoppingCardProps) {
  // Only show items that still need to be purchased
  const activeShopping = shopping.filter(
    (item) => !item.completed
  );

  const grouped = stores
    .map((store) => ({
      store,
      items: activeShopping.filter(
        (item) => (item.store || "General") === store
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 20,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <h2>🛒 Shopping</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 10,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <input
          style={{
            flex: "1 1 180px",
            minWidth: 0,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
        />

        <select
          value={newItemStore}
          onChange={(e) => setNewItemStore(e.target.value)}
          style={{
            flex: "0 1 150px",
            minWidth: 120,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "white",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>

        <button
          onClick={addItem}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            boxSizing: "border-box",
            flex: "0 0 auto",
          }}
        >
          Add
        </button>
      </div>

      {grouped.length === 0 ? (
        <div
          style={{
            color: "#666",
            fontSize: 14,
            padding: "16px 0 4px",
          }}
        >
          🎉 Shopping list is all clear!
        </div>
      ) : (
        grouped.map((group) => (
          <div
            key={group.store}
            style={{
              marginTop: 20,
            }}
          >
            <h3>🏬 {group.store}</h3>

            {group.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  marginBottom: 8,
                  borderRadius: 8,
                  background: "#f7f7f7",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() =>
                      toggleShoppingItem(
                        item.id,
                        item.completed
                      )
                    }
                  />

                  <span>{item.text}</span>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </section>
  );
}

