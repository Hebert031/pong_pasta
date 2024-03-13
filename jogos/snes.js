import { JSNES } from 'jsnes';

const JSNES = require('jsnes').JSNES;

// Cria um novo emulador
const nes = new JSNES({
  canvas: document.getElementById('emulator'),
});

// Carrega uma ROM
fetch('/home/hebert/Documentos/pong_pasta/roms/rom.nes')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const romData = new Uint8Array(buffer);
        console.log('ROM carregada com sucesso.'); // Log para confirmar que a ROM foi carregada
        nes.loadROM(romData);
    })
    .catch(error => {
        console.error('Erro ao carregar a ROM:', error); // Log para mostrar qualquer erro que ocorra ao carregar a ROM
    });

// Inicia o emulador
nes.start();