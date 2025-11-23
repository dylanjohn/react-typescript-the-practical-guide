import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Input label="Your name" id="name" type="text" />
      <Input label="Your age" id="age" type="number" />
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
      <Button href="https://google.com">Click Me</Button>
    </div>
  );
}

export default App;
