import { useRef } from 'react';
import Input from './components/Input';
import Form, { type FormHandle } from './components/Form';
import Button from './components/Button';

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    const extractedData = data as { name?: string; age: string };
    console.log('Saved data:', { extractedData });
    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="Name" id="name" />
        <Input type="number" label="Age" id="age" />
        <Button>Save</Button>
      </Form>
    </main>
  );
}

export default App;
