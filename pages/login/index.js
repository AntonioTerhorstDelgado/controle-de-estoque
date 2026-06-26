import { useState } from "react";
import { Alert, Box } from "@mui/material";
import Link from "next/link";
import styles from "../../styles/login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Login realizado com sucesso! A redirecionar...",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || data.error || "E-mail ou senha inválidos.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Falha de comunicação com o servidor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Box className={styles.boxFormulario}>
        <h5 className={styles.titulo}>Entrar</h5>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            className={styles.input}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Senha"
            className={styles.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className={styles.Button} type="submit" disabled={isLoading}>
            {isLoading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <div className={styles.div}>
          <Link href="/cadastro" className={styles.ancora}>
            Não tem conta? Cadastre-se
          </Link>
        </div>
      </Box>
    </div>
  );
}
