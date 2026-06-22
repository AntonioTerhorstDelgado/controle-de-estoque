import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import styles from "../../styles/cadastro.module.css";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

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
        <Typography variant="h5" className={styles.titulo}>
          Criar Conta
        </Typography>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </Box>
    </div>
  );
}
