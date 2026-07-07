type Item = {
  id: number;
  text: string;
};

type ShoppingCardProps = {
  shopping: Item[];
  newItem: string;
  setNewItem: (value: string) => void;
  addItem: () => void;
  deleteItem: (id: number) => void;
};

export default function ShoppingCard({
  shopping,
  newItem,
  setNewItem,
  addItem,
  deleteItem,
}: ShoppingCardProps) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <h2>🛒 Shopping</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item"
        />

        <button onClick={addItem}>Add</button>
      </div>

      <ul style={{ padding: 0, marginTop: 20 }}>
        {shopping.map((item) => (
          <li
            key={item.id}
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              marginBottom: 8,
              borderRadius: 8,
              background: "#f7f7f7",
            }}
          >
            <span>{item.text}</span>

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
          </li>
        ))}
      </ul>
    </section>
  );
}