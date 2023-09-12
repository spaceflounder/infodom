import { setupInputManager } from './InputManager.ts';
import './style.css'
import './round.css';
import { Info } from '../Info.ts';
import { sendTo } from '@infodom';

document.title = Info.title;
setupInputManager();
sendTo(Info.firstRoom);