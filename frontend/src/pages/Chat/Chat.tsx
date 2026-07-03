import { useEffect, useRef, useState } from "react";

import Button from "../../components/ui/Button";
import { api } from "../../services/api";
import type { ChatMessage } from "../../types/models";
import styles from "./Chat.module.css";

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Carrega o histórico ao abrir a tela.
  useEffect(() => {
    api.getChat().then(setMessages).catch((e) => setError(e.message));
  }, []);

  // Rola para a última mensagem sempre que a lista muda.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;

    setError(null);
    setSending(true);
    setInput("");

    try {
      const res = await api.sendMessage(text);
      setMessages((prev) => [...prev, res.userMessage, res.naviMessage]);
    } catch (e) {
      setError((e as Error).message);
      setInput(text); // devolve o texto para o usuário tentar de novo
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Conversa com Zerion</h1>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <p className={styles.empty}>Diga algo para o seu Navi começar a conversa.</p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.navi}`}
          >
            <span className={styles.author}>
              {m.role === "user" ? "Você" : "Zerion"}
            </span>
            {m.content}
          </div>
        ))}

        {sending && (
          <div className={`${styles.bubble} ${styles.navi}`}>
            <span className={styles.author}>Zerion</span>
            digitando...
          </div>
        )}

        <div ref={endRef} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.form}>
        <input
          value={input}
          placeholder="Escreva uma mensagem..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button onClick={handleSend} disabled={sending}>
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default Chat;
