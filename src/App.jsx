import ErrorBoundary from './components/ErrorBoundary';
import RoomList from './components/RoomList';

function App() {
  return (
    <>
      <ErrorBoundary>
        <RoomList />
      </ErrorBoundary>
    </>
  );
}

export default App;
