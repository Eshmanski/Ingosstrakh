import Container from './models/Container'
import './style.css'

const plusEl = document.getElementById('plus');
const minusEl = document.getElementById('minus');
const containerEl = document.getElementById('container');

if (containerEl) {
  const container = new Container(containerEl as HTMLElement);

  plusEl?.addEventListener('click', () => container.addBlock())
  minusEl?.addEventListener('click', () => container.removeBlock())
}
