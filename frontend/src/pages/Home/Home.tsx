import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

function Home() {
  return (
    <Card>
      <Badge variant="success">ONLINE</Badge>

      <br />
      <br />

      <h1>Zerion</h1>

      <p>Bem-vindo ao sistema.</p>

      <br />

      <Input
        id="username"
        label="Usuário"
        placeholder="Digite seu usuário"
      />

      <br />

      <Button>Entrar</Button>
    </Card>
  );
}

export default Home;