import * as readline from "readline";

// ==========================================
// CLASE TERMOSTATO
// ==========================================
class Termostato {
  private _temperatura: number;

  constructor(temperaturaInicial: number) {
    this._temperatura = 21; // Temperatura segura inicial
    this.temperatura = temperaturaInicial; // Validar con el setter
  }

  // GETTER: Retorna con "°C" pegado
  get temperatura(): number {
    return this._temperatura;
  }

  get temperaturaFormateada(): string {
    return `${this._temperatura}°C`;
  }

  // SETTER: Ajusta automáticamente entre 18°C y 25°C
  set temperatura(valor: number) {
    if (valor < 18) {
      console.log(`\n⚠️  ADVERTENCIA: Temperatura ${valor}°C muy baja`);
      console.log(`   Ajustando automáticamente a 18°C (mínimo permitido)\n`);
      this._temperatura = 18;
    } else if (valor > 25) {
      console.log(`\n⚠️  ADVERTENCIA: Temperatura ${valor}°C muy alta`);
      console.log(`   Ajustando automáticamente a 25°C (máximo permitido)\n`);
      this._temperatura = 25;
    } else {
      console.log(`\n✅ Temperatura ${valor}°C establecida correctamente\n`);
      this._temperatura = valor;
    }
  }

  mostrarEstado(): void {
    console.log("╔════════════════════════════════════════╗");
    console.log("║    🌡️  ESTADO DEL TERMOSTATO 🌡️      ║");
    console.log("╚════════════════════════════════════════╝");
    console.log(`  Temperatura actual: ${this.temperaturaFormateada}`);
    console.log(`  Rango permitido: 18°C - 25°C`);
    
    if (this._temperatura < 20) {
      console.log(`  Estado: ❄️  FRÍO`);
    } else if (this._temperatura > 23) {
      console.log(`  Estado: 🔥 CALIENTE`);
    } else {
      console.log(`  Estado: ✅ ÓPTIMO`);
    }
    console.log("════════════════════════════════════════\n");
  }
}

// ==========================================
// SISTEMA CON READLINE
// ==========================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n╔════════════════════════════════════════╗");
console.log("║  EJERCICIO 1: TERMOSTATO SALA SERVIDORES ║");
console.log("╚════════════════════════════════════════╝\n");

const termostato = new Termostato(21);
termostato.mostrarEstado();

function pedirTemperatura() {
  rl.question("🌡️  Ingrese la temperatura deseada (°C): ", (temp: string) => {
    const temperatura = parseFloat(temp);

    if (isNaN(temperatura)) {
      console.log("\n❌ Error: Ingrese un número válido\n");
      pedirTemperatura();
      return;
    }

    termostato.temperatura = temperatura;
    termostato.mostrarEstado();

    rl.question("¿Desea ajustar nuevamente? (s/n): ", (respuesta: string) => {
      if (respuesta.toLowerCase() === "s") {
        pedirTemperatura();
      } else {
        console.log("\n✅ Sistema finalizado\n");
        rl.close();
      }
    });
  });
}

pedirTemperatura();