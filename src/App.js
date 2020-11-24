import styled from 'styled-components';
import { AppContextProvider } from './context/AppContext';
import { EventSourceContextProvider } from './context/EventContext';
import { SecurityContextProvider } from './context/SecurityContext';
import Routes from './routes';

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

function App() {
  return (
    <SecurityContextProvider>
      <EventSourceContextProvider>
        <AppContextProvider>
          <Container>
            <Routes />
          </Container>
        </AppContextProvider>
      </EventSourceContextProvider>
    </SecurityContextProvider>
  );
}

export default App;
