// Component base class
class Component {
      constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
      }
    
      setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
      }
    
      update() {
        const newElement = this.render();
        if (this.element && this.element.parentElement) {
          this.element.parentElement.replaceChild(newElement, this.element);
        }
        this.element = newElement;
      }
    
      mount(element) {
        this.element = element;
        this.update();
      }
    
      render() {
        throw new Error('Component render method should be implemented.');
      }
    }
    
    // Virtual DOM creation
    const createElement = (tag, props, ...children) => {
      const element = document.createElement(tag);
    
      for (let key in props) {
        if (props.hasOwnProperty(key)) {
          element.setAttribute(key, props[key]);
        }
      }
    
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    
      return element;
    };
    
    // State Management
    class StateManager {
      constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
      }
    
      setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
      }
    
      getState() {
        return this.state;
      }
    
      subscribe(listener) {
        this.listeners.push(listener);
      }
    
      notify() {
        this.listeners.forEach(listener => listener(this.state));
      }
    }
    
    // Router
    class Router {
      constructor() {
        this.routes = {};
        this.init();
      }
    
      init() {
        window.addEventListener('hashchange', () => {
          this.loadRoute(window.location.hash);
        });
        this.loadRoute(window.location.hash);
      }
    
      registerRoute(path, component) {
        this.routes[path] = component;
      }
    
      loadRoute(path) {
        const component = this.routes[path] || this.routes['/'];
        const root = document.getElementById('root');
        root.innerHTML = '';
        const element = new component();
        element.mount(root);
      }
    }
    
    // Export to global scope
    window.maestro = {
      Component,
      createElement,
      StateManager,
      Router
    };
    