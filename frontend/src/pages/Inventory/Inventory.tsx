import { useEffect, useState } from "react";

import { api } from "../../services/api";
import type { InventoryItem } from "../../types/models";
import styles from "./Inventory.module.css";

function getRarityClass(rarity: InventoryItem["rarity"]): string {
  const rarityClasses = {
    comum: styles.common,
    raro: styles.rare,
    epico: styles.epic,
    lendario: styles.legendary,
    singular: styles.singular,
  };

  return rarityClasses[rarity];
}

function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getInventory()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.page}>Carregando inventário...</div>;
  }

  if (error) {
  return (
    <div className={styles.page}>
      Erro ao carregar inventário: {error}
    </div>
  );
}

  if (items.length === 0) {
  return (
    <div className={styles.page}>
      <h1>Inventário</h1>

      <div className={styles.emptyState}>
        <p>Seu inventário está vazio.</p>
        <span>Os itens obtidos durante sua jornada aparecerão aqui.</span>
      </div>
    </div>
  );
}

  return (
  <div className={styles.page}>
    <h1>Inventário</h1>

    <div className={styles.grid}>
      {items.map((item) => (
        <article key={item.id} className={styles.card}>
          <h2>{item.name}</h2>

          <p>{item.description}</p>

          <div className={styles.itemMeta}>
            <span className={getRarityClass(item.rarity)}>
  {item.rarity}
</span>
            <strong>Quantidade: {item.quantity}</strong>
          </div>
        </article>
      ))}
    </div>
  </div>
);
}
export default Inventory;