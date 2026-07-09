import AuthProvider from "./app/providers/AuthProvider";
import { AppProvider } from "./app/providers/AppProvider";
import AppRouter from "./app/router";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;