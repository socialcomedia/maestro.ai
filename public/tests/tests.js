// Basic tests for maestro.ai

class TestApp extends maestro.Component {
      constructor(props) {
        super(props);
        this.state = { message: 'Hello, World!' };
      }
    
      render() {
        return maestro.createElement('div', { id: 'test-app' }, this.state.message);
      }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      const app = new TestApp();
      app.mount(document.getElementById('test-root'));
    
      // Basic test
      const testResult = document.getElementById('test-app').innerText === 'Hello, World!';
      console.log('Test Result: ', testResult ? 'Pass' : 'Fail');
    });
    