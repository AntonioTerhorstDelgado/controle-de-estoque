import { Container, Box } from "@mui/material";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <Container className={styles.Container}>
      <h1 className="h1">Bem-vindo ao EstoquePro</h1>
      <p>Gestão eficiente e simples para seus produtos.</p>

      <Box className={styles.Box}>
        <Link href="/login" passHref>
          <button className={styles.Button}>Entrar no Sistema</button>
        </Link>
        <Link href="/cadastro" passHref>
          <button className={styles.Button}>Criar Conta</button>
        </Link>
      </Box>
    </Container>
  );
}
