import { useState } from "react";
import { Alert, Box } from "@mui/material";
import styles from "../../styles/cadastro.module.css";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "As senhas não coincidem." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Conta criada com sucesso!" });
        setFormData({ nome: "", email: "", password: "", confirmPassword: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || data.error || "Erro ao criar conta.",
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
        <h5 className={styles.titulo}>Criar Conta</h5>
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome Completo"
            className={styles.input}
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Email"
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
          <input
            placeholder="Confirmar Senha"
            className={styles.input}
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className={styles.button} type="submit">
            Cadastrar
          </button>
        </form>
        <a className={styles.ancoralogin} href="/">
          Já tem conta?
        </a>
      </Box>
    </div>
  );
}
