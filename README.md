# Drone Delivery Front End

Este é o Front End do projeto Drone Delivery, uma aplicação web desenvolvida em React que simula a entrega de pacotes por drones utilizando um tabuleiro de xadrez. Este projeto utiliza a biblioteca `chessboardjsx` para renderizar o tabuleiro e consome uma API de backend para calcular rotas de entrega.

## Características

- Interface interativa para visualizar a rota de entrega do drone.
- Consumo da API de backend para calcular a rota mais rápida.

## Utilização da Biblioteca chessboardjsx

`chessboardjsx` é uma biblioteca React para renderizar tabuleiros de xadrez. No contexto do nosso projeto, ela é usada para visualizar o tabuleiro de xadrez e a rota de entrega do drone.

### Exemplo Básico

```jsx
import Chessboard from "chessboardjsx";

function MyChessboard() {
  return <Chessboard position="start" />;
}
```
#### Consumo da API do Backend
O Front End consome a API do backend para obter a rota de entrega mais rápida com base nas posições de partida, coleta e entrega.

##### Requisição da Rota
Para solicitar a rota, o Front End envia uma requisição POST para /calculate-route com as posições desejadas.

```javascript
Copy code
axios.post('http://BACKEND_URL/calculate-route', {
  positions: [startPosition, pickupPoint, deliveryPoint]
})
.then(response => {
  // Manipulação da resposta
})
.catch(error => {
  // Tratamento de erro
});
```
#### Validação dos Dados
Antes de enviar a requisição, as posições de entrada são validadas para garantir que estejam no formato correto (letra seguida de número, ex: A1, C3).

```javascript
Copy code
function validatePosition(position) {
  const regex = /^[A-H][1-8]$/i;
  return regex.test(position);
}
```
#### Como Rodar o Projeto
Instruções sobre como instalar e rodar o projeto localmente.
```bash
Copy code
git clone URL_DO_REPOSITORIO_FRONTEND
cd drone-delivery-frontend
npm install
npm start
```