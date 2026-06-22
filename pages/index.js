import { Container, Button, Box } from "@mui/material";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <Container className="container" sx={{ textAlign: "center", mt: 10 }}>
      <h1 className="h1">Bem-vindo ao EstoquePro</h1>
      <p>Gestão eficiente e simples para seus produtos.</p>

      <Box sx={{ mt: 5, display: "flex", gap: 2, justifyContent: "center" }}>
        <Link href="/login" passHref>
          <Button variant="contained" size="large">
            Entrar no Sistema
          </Button>
        </Link>
        <Link href="/cadastro" passHref>
          <Button variant="outlined" size="large">
            Criar Conta
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
