import styled from 'styled-components';
import { SecurityContextProvider } from './context/SecurityContext';
import Routes from './routes';

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

function App() {
  return (
    <SecurityContextProvider>
      <Container>
        <Routes />
      </Container>
    </SecurityContextProvider>
  );
}

export default App;
